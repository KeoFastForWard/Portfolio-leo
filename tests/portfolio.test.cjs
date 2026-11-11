const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const query = { matches: false, addEventListener() {} };
const context = vm.createContext({
  URL,
  window: { history: {}, addEventListener() {}, matchMedia: () => query },
  document: { documentElement: { dataset: {} }, addEventListener() {} }
});
vm.runInContext(fs.readFileSync(path.join(root, 'portfolio-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'script.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'project-experiences.js'), 'utf8'), context);
const projects = vm.runInContext('portfolioData.projects', context);

test('Flick/ProtoTV is not part of the published collection', () => {
  assert.equal(projects.length, 7);
  assert.ok(!projects.some(p => /prototv|flick/i.test(`${p.id} ${p.title}`)));
  assert.ok(!projects.some(p => p.media.some(m => /prototv|m9QyksYlUIQ9oRZDibRemz/i.test(m.embedUrl || ''))));
});

test('Public names and project IDs are consistent', () => {
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const [id, title] of Object.entries({ protodealership: 'Vértice Motors', protogalaxy: 'Órbita', protored: 'Pulso' })) {
    assert.equal(projects.find(p => p.id === id).title, title);
  }
});

test('Every active local media reference exists', () => {
  for (const project of projects) {
    for (const item of [project.cover, ...project.media]) {
      for (const key of ['src', 'image', 'poster', 'embedUrl']) {
        if (!item?.[key] || /^https?:\/\//.test(item[key])) continue;
        assert.ok(fs.existsSync(path.join(root, item[key])), `${project.title}: ${item[key]}`);
      }
    }
  }
});

test('UX cases prioritize demos and render each media item only once', () => {
  for (const project of projects.filter(p => p.presentation)) {
    const html = context.createUXCaseStudy(project);
    assert.ok(html.indexOf('id="case-demo"') < html.indexOf('id="case-process"'));
    assert.ok(html.indexOf('id="case-process"') < html.indexOf('id="case-visuals"'));
    assert.ok(html.includes('Mi aporte'));
    assert.ok(html.includes('Resultado de diseño'));
    assert.ok(html.includes('https://www.figma.com/proto/'));
    for (const item of project.media) {
      const url = item.image || item.src || item.embedUrl;
      assert.equal(html.split(url).length - 1, 1, `${project.title}: duplicated ${url}`);
    }
    assert.ok(!html.includes('autoplay'));
  }
});

test('Project cards show the contribution without changing legacy cards', () => {
  for (const project of projects) {
    const html = context.createProjectCard(project, 0);
    assert.equal(html.includes('class="project-contribution"'), Boolean(project.presentation));
    assert.doesNotMatch(html, /data-reveal/);
    assert.equal((html.match(/class="experience-card-art"/g) || []).length, 1);
  }
});

test('Every project has a distinct, complete experience with valid chapters', () => {
  assert.ok(projects.every(p => p.experience));
  assert.equal(new Set(projects.map(p => p.experience.theme)).size, projects.length);
  for (const project of projects) {
    const { chapters } = project.experience;
    const html = context.window.ProjectExperiences.render(project, context.createMediaBlock);
    assert.ok(html.includes('class="experience-page" data-motion="on"'));
    assert.ok(html.includes('data-case-motion aria-pressed="true">Pausar movimiento'));
    assert.equal((html.match(/id="project-modal-title"/g) || []).length, 1);
    assert.ok(html.includes(`${project.category} · ${project.year}`));
    assert.match(html, /data-case-scenery aria-hidden="true"/);
    const tabCount = chapters.length > 1 ? chapters.length : 0;
    assert.equal((html.match(/role="tab"/g) || []).length, tabCount);
    assert.equal((html.match(/role="tabpanel"/g) || []).length, tabCount);
    assert.equal(new Set(chapters.map(c => c.mediaIndex)).size, chapters.length);
    for (const chapter of chapters) {
      assert.ok(['visual', 'video'].includes(project.media[chapter.mediaIndex].type));
    }
    for (const media of project.media) {
      if (media.type === 'book') continue;
      const url = media.image || media.src || media.embedUrl;
      assert.equal(html.split(`src="${url}"`).length - 1, 1, `${project.title}: missing/duplicate ${url}`);
    }
    assert.ok(!html.includes('autoplay'));
  }
});

test('Brand, motion and poster cases use media-specific sections', () => {
  const render = id => context.window.ProjectExperiences.render(projects.find(p => p.id === id), context.createMediaBlock);
  const brand = render('napoly-brand-manual');
  assert.match(brand, /data-brand-book/);
  assert.doesNotMatch(brand, /<iframe|\.pdf|Recorré la interfaz en Figma/);
  const motion = render('motion-launch');
  assert.equal((motion.match(/<video /g) || []).length, 2);
  assert.doesNotMatch(motion, /id="case-demo"|data-case-tilt/);
  const poster = render('mastantuono-real-madrid');
  assert.doesNotMatch(poster, /role="tablist"|id="case-demo"/);
  assert.equal(projects.find(p => p.id === 'mastantuono-real-madrid').experience.showCover, false);
});

test('Napoly book lists 25 distinct, ordered local pages and only loads the first initially', () => {
  const project = projects.find(p => p.id === 'napoly-brand-manual');
  const book = project.media.find(item => item.type === 'book');
  const html = context.window.ProjectExperiences.render(project, context.createMediaBlock);
  assert.equal(book.pages.length, 25);
  book.pages.forEach((file, index) => {
    assert.ok(file.endsWith(`pagina-${String(index + 1).padStart(2, '0')}.jpg`));
    assert.ok(fs.statSync(path.join(root, file)).size > 0);
    assert.ok(html.includes(`<option value="${file}">${index + 1}</option>`));
    assert.equal(html.includes(`src="${file}"`), index === 0);
  });
});

test('Pulso places its original screen assets inside the iPhone frame', () => {
  const project = projects.find(p => p.id === 'protored');
  const html = context.window.ProjectExperiences.render(project, context.createMediaBlock);
  assert.match(html, /experience-browser experience-iphone18/);
  assert.match(html, /experience-phone-island" aria-hidden="true"/);
  assert.doesNotMatch(html, /experience-browser-bar/);
  for (const { mediaIndex } of project.experience.chapters) {
    assert.ok(html.includes(`src="${project.media[mediaIndex].image}"`));
  }
});
