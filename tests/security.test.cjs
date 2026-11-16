const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const vercel = JSON.parse(read('vercel.json'));
const headers = Object.fromEntries(vercel.headers[0].headers.map(({ key, value }) => [key, value]));

function load(data) {
  const query = { matches: false, addEventListener() {} };
  const context = vm.createContext({
    URL,
    window: { history: {}, addEventListener() {}, matchMedia: () => query },
    document: { documentElement: { dataset: {} }, addEventListener() {} }
  });
  if (data) context.portfolioData = data;
  else vm.runInContext(read('portfolio-data.js'), context);
  vm.runInContext(read('script.js'), context);
  vm.runInContext(read('project-experiences.js'), context);
  return context;
}

test('The page ships no inline or third-party scripts', () => {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length >= 6);
  for (const [, attributes, body] of scripts) {
    if (/type="application\/ld\+json"/.test(attributes)) continue;
    assert.equal(body.trim(), '', 'inline script found');
    const src = attributes.match(/src="([^"]+)"/)[1];
    assert.doesNotMatch(src, /^(?:https?:)?\/\//, `third-party script: ${src}`);
    assert.ok(fs.existsSync(path.join(root, src)), `missing ${src}`);
  }
  assert.doesNotMatch(html, /\son[a-z]+="/i, 'inline event handler found');
  assert.match(read('vendor/gsap.min.js'), /GSAP 3\.12\.7/);
});

test('The policy in the page matches the one sent as a header', () => {
  const meta = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
  const header = headers['Content-Security-Policy'];
  // frame-ancestors and upgrade-insecure-requests only work as headers.
  assert.equal(header, `${meta}; frame-ancestors 'none'; upgrade-insecure-requests`);
  assert.match(header, /script-src 'self';/);
  assert.match(header, /object-src 'none'/);
  assert.match(header, /base-uri 'self'/);
  assert.doesNotMatch(header.match(/script-src[^;]*/)[0], /unsafe|https?:|\*/);
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.match(headers['Strict-Transport-Security'], /max-age=\d{8,}/);
});

test('Every link that opens a new tab drops the opener', () => {
  for (const source of [html, read('script.js'), read('project-experiences.js')]) {
    for (const [tag] of source.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(tag, /rel="noopener noreferrer"/, tag);
    }
  }
});

test('URLs from the data file are limited to https and local paths', () => {
  const { safeUrl } = load();
  assert.equal(safeUrl('assets/projects/a b/cover.webp'), 'assets/projects/a b/cover.webp');
  assert.equal(safeUrl('https://www.behance.net/leonelkunst'), 'https://www.behance.net/leonelkunst');
  for (const bad of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<p>', 'http://example.com/a.png',
    '//evil.example/a.js', '../../secret.txt', 'assets/../../x', "a.png') ; background:url(x", 'a"onerror="x', 'vbscript:x', '', null, 42]) {
    assert.equal(safeUrl(bad), '', String(bad));
  }
  assert.equal(safeUrl('https://embed.figma.com/proto/abc?node-id=1-2&scaling=contain', { embed: true }), 'https://embed.figma.com/proto/abc?node-id=1-2&scaling=contain');
  assert.equal(safeUrl('https://embed.figma.com.evil.example/proto/abc', { embed: true }), '');
  assert.equal(safeUrl('https://evil.example/embed', { embed: true }), '');
  assert.equal(safeUrl('assets/local.html', { embed: true }), '');
});

test('Markup in the data file is rendered as text, never as elements', () => {
  const attack = '<img src=x onerror=alert(1)>"\'`&';
  const context = load();
  const raw = vm.runInContext('portfolioData', context);
  const project = raw.projects.find(item => item.presentation);
  project.title = attack;
  project.summary = attack;
  project.presentation.role = attack;
  project.tools[0] = attack;
  project.accent.start = 'red;"><script>alert(1)</script>';
  project.cover.src = "x') ; } body { display:none } .a { background: url('y";
  project.media.push({ type: 'embed', title: attack, embedUrl: 'https://evil.example/frame' });
  project.media.push({ type: 'visual', title: attack, image: 'javascript:alert(1)' });
  raw.experiences[0].company = attack;
  raw.skillGroups[0].items[0] = attack;

  const view = context.getViewData();
  const safe = view.projects[raw.projects.indexOf(project)];
  const output = [
    context.createProjectCard(safe, 0),
    context.createUXCaseStudy(safe),
    context.window.ProjectExperiences.render(safe, context.createMediaBlock),
    JSON.stringify(view.experiences),
    JSON.stringify(view.skillGroups)
  ].join('\n');

  assert.doesNotMatch(output, /<img src=x|<script>|onerror=alert\(1\)>/);
  assert.doesNotMatch(output, /javascript:/i);
  assert.doesNotMatch(output, /evil\.example/);
  assert.doesNotMatch(output, /display:none/);
  assert.ok(output.includes('&#60;img src=x onerror=alert(1)&#62;&#34;&#39;&#96;&#38;'));
  // Escaping must not disturb a clean project.
  const clean = raw.projects.find(item => item.id === 'protodealership');
  const cleanView = view.projects.find(item => item.id === 'protodealership');
  assert.equal(context.createProjectCard(cleanView, 1), context.createProjectCard(clean, 1));
});

test('The contact form ignores bots and oversized or malformed input', async () => {
  const source = read('script.js');
  const run = async (fields, dataset = {}) => {
    let requests = 0;
    const status = { classList: { add(name) { status.state = name; }, remove() {} } };
    class Form {
      dataset = { ...dataset };
      action = 'https://formsubmit.co/test@example.com';
      querySelector(selector) { return selector === '[data-form-status]' ? status : { hidden: true }; }
      reset() {}
    }
    const context = vm.createContext({
      window: { history: {}, addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }), setTimeout, clearTimeout },
      document: { documentElement: { dataset: {} }, addEventListener() {} },
      portfolioData: { profile: { email: 'test@example.com' } },
      HTMLFormElement: Form, HTMLButtonElement: class {}, HTMLElement: Object, AbortController,
      FormData: class extends Map { constructor() { super(Object.entries(fields)); } },
      async fetch() { requests++; return { ok: true, json: async () => ({ success: 'true' }) }; }
    });
    vm.runInContext(source, context);
    await context.handleContactSubmit({ currentTarget: new Form(), preventDefault() {} });
    return { requests, state: status.state, text: status.textContent };
  };
  const valid = { nombre: 'Ana', email: 'ana@example.com', mensaje: 'Hola' };

  assert.deepEqual(await run(valid), { requests: 1, state: 'is-success', text: 'Consulta recibida por el servicio de envío.' });
  assert.equal((await run({ ...valid, _honey: 'http://spam.example' })).requests, 0);
  assert.equal((await run({ ...valid, _honey: 'x' })).state, 'is-success');
  assert.equal((await run({ ...valid, mensaje: 'x'.repeat(2001) })).requests, 0);
  assert.equal((await run({ ...valid, nombre: 'x'.repeat(81) })).requests, 0);
  assert.equal((await run({ ...valid, email: 'no-es-un-mail' })).requests, 0);
  assert.equal((await run(valid, { readyAt: String(Date.now()) })).requests, 0);
  assert.equal((await run(valid, { cooldownUntil: String(Date.now() + 5000) })).requests, 0);
  assert.equal((await run(valid, { readyAt: String(Date.now() - 60000) })).requests, 1);
});

test('Recruiter essentials are present and nothing internal is published', () => {
  assert.match(html, /<h1 data-profile-name>Leonel Kunst<\/h1>/);
  assert.ok((html.match(/data-profile-cv/g) || []).length >= 2);
  const portfolioData = vm.runInContext('portfolioData', load());
  assert.ok(fs.statSync(path.join(root, portfolioData.profile.cv)).size > 10000);
  for (const field of ['availability', 'location', 'mode', 'languages']) {
    assert.ok(portfolioData.profile[field], field);
    assert.ok(html.includes(`data-profile-${field}`), field);
  }
  assert.match(html, /property="og:image" content="https:\/\/[^"]+\.png"/);
  assert.match(html, /rel="canonical" href="https:\/\//);
  assert.doesNotMatch(html, /name="_captcha" value="false"/);
  const ignored = read('.vercelignore');
  for (const entry of ['/backups', '/tests', '*.md', '/preview.cjs']) assert.ok(ignored.includes(entry), entry);
});
