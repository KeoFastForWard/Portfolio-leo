const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const recipient = 'leonelivankunst19@gmail.com';

function setup(response) {
  class Element {
    classList = new Set();
    constructor() {
      this.classList.remove = (...names) => names.forEach(name => this.classList.delete(name));
    }
  }
  class Button extends Element {}
  const status = new Element();
  const button = new Button();
  const emailLink = { hidden: true };
  let resets = 0;
  let requests = 0;
  class Form {
    dataset = {};
    action = `https://formsubmit.co/${recipient}`;
    querySelector(selector) {
      if (selector === '[data-form-status]') return status;
      if (selector === '[data-contact-email-fallback]') return emailLink;
      return button;
    }
    reset() { resets++; }
  }
  const context = vm.createContext({
    window: { history: {}, addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }), setTimeout, clearTimeout },
    document: { documentElement: { dataset: {} }, addEventListener() {} },
    portfolioData: { profile: { email: recipient } },
    HTMLFormElement: Form, HTMLButtonElement: Button, HTMLElement: Element, AbortController,
    FormData: class extends Map {
      constructor() { super([['nombre', ' Prueba '], ['email', 'test@example.com'], ['mensaje', ' Consulta de prueba ']]); }
    },
    async fetch(url, options) {
      requests++;
      assert.equal(url, `https://formsubmit.co/ajax/${recipient}`);
      assert.equal(options.body.get('nombre'), 'Prueba');
      assert.equal(options.body.get('mensaje'), 'Consulta de prueba');
      return response();
    }
  });
  vm.runInContext(source, context);
  const form = new Form();
  return {
    async submit() { await context.handleContactSubmit({ currentTarget: form, preventDefault() {} }); },
    status, button, form, emailLink, counts: () => ({ requests, resets })
  };
}

test('Contact clears the message only when FormSubmit confirms receipt', async () => {
  const contact = setup(() => ({ ok: true, json: async () => ({ success: 'true' }) }));
  await contact.submit();
  assert.ok(contact.status.classList.has('is-success'));
  assert.equal(contact.emailLink.hidden, true);
  assert.deepEqual(contact.counts(), { requests: 1, resets: 1 });
});

test('Contact preserves the message and does not retry on activation or network failure', async () => {
  for (const [response, expected] of [
    [() => ({ ok: true, json: async () => ({ success: 'true', message: 'This form needs activation' }) }), /requiere activación/],
    [() => ({ ok: true, json: async () => ({ success: 'false' }) }), /No pude confirmar/],
    [() => { throw new Error('offline'); }, /No pude confirmar/]
  ]) {
    const contact = setup(response);
    await contact.submit();
    assert.ok(contact.status.classList.has('is-error'));
    assert.match(contact.status.textContent, expected);
    assert.ok(contact.status.textContent.includes(recipient));
    assert.equal(contact.form.dataset.submitting, 'false');
    assert.equal(contact.button.disabled, false);
    assert.equal(contact.emailLink.hidden, false);
    assert.ok(contact.emailLink.href.startsWith(`mailto:${recipient}?`));
    assert.match(decodeURIComponent(contact.emailLink.href), /Consulta de prueba\r\n\r\nNombre: Prueba/);
    assert.deepEqual(contact.counts(), { requests: 1, resets: 0 });
  }
});
