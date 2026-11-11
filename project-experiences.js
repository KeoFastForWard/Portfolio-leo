/* Project presentations share a layout while keeping their own art direction. */
window.ProjectExperiences = (() => {
  function render(project, mediaBlock) {
    const experience = project.experience;
    const chapters = experience.chapters;
    const selected = new Set(chapters.map(chapter => chapter.mediaIndex));
    const rest = project.media.filter((item, index) => !selected.has(index) && item.type === 'visual');
    const demos = project.media.filter((item, index) => !selected.has(index) && ['embed', 'video', 'book'].includes(item.type));
    const hasTabs = chapters.length > 1;
    const hasVideo = chapters.some(chapter => project.media[chapter.mediaIndex].type === 'video');
    const manual = demos.find(item => item.type === 'book');
    const cosmos = experience.theme === 'cosmos';
    const motors = experience.theme === 'motors';
    const phone = experience.theme === 'pulso';
    const desktop = project.category === 'UX/UI' && !phone;
    return `
      <div class="experience-page" data-motion="on">
        <header class="experience-intro" data-case-reveal>
          <p class="experience-eyebrow">${experience.eyebrow} <span>${project.category} · ${project.year}</span></p>
          <div class="experience-intro-grid">
            <div><p class="experience-name">${project.title}</p><h2 id="project-modal-title">${experience.headline}</h2></div>
            <div class="experience-intro-aside"><p>${experience.introduction}</p><a href="#experience-tour" data-experience-jump>Explorar el diseño <span aria-hidden="true">↓</span></a>${manual ? '<a href="#brand-book" data-experience-jump>Hojear el manual <span aria-hidden="true">↓</span></a>' : ''}<button class="experience-motion-toggle" type="button" data-case-motion aria-pressed="true">Pausar movimiento</button></div>
          </div>
          <dl class="experience-facts">
            <div><dt>Mi aporte</dt><dd>${experience.role || project.presentation.role}</dd></div>
            <div><dt>Formato</dt><dd>${experience.format || project.presentation.format}</dd></div>
            <div><dt>Entregable</dt><dd>${experience.deliverable || 'Interfaz y prototipo navegable'}</dd></div>
          </dl>
        </header>

        <section class="experience-tour" id="experience-tour" aria-labelledby="tour-heading" data-case-reveal>
          <div class="experience-section-label"><span>${cosmos ? 'El recorrido' : 'Diseño en detalle'}</span><span aria-hidden="true">${cosmos ? '✳' : '↗'}</span></div>
          <div class="experience-tour-heading"><h3 id="tour-heading">${experience.tourTitle || (cosmos ? 'Elegí tu próxima órbita.' : 'Cada vista tiene una función.')}</h3>${experience.tourDescription ? `<p>${experience.tourDescription}</p>` : ''}</div>
          ${hasTabs ? `<div class="experience-tabs" role="tablist" aria-label="Vistas de ${project.title}">
            ${chapters.map((chapter, index) => `<button type="button" role="tab" id="experience-tab-${index}" aria-selected="${index === 0}" aria-controls="experience-panel-${index}" tabindex="${index === 0 ? 0 : -1}" data-experience-tab="${index}">${chapter.label}</button>`).join('')}
          </div>` : ''}
          <div class="experience-stage" data-experience-stage>
            <div class="${cosmos ? 'experience-orbits' : motors ? 'experience-speedlines' : 'experience-scenery'}" data-case-scenery aria-hidden="true"><i></i><i></i><i></i></div>
            <div class="experience-browser${phone ? ' experience-iphone18' : ''}" ${hasVideo ? '' : 'data-case-tilt'}>
              ${desktop ? `<div class="experience-browser-bar" aria-hidden="true"><span>● ● ●</span><span>${project.title.toLocaleUpperCase('es')} / ${cosmos ? 'EXPLORACIÓN DIGITAL' : 'DISEÑO WEB'}</span><span>↗</span></div>` : ''}
              ${phone ? '<div class="experience-phone-buttons" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="experience-phone-screen">' : ''}
              ${chapters.map((chapter, index) => {
                const item = project.media[chapter.mediaIndex];
                return `<div class="experience-panel" id="experience-panel-${index}" ${hasTabs ? `role="tabpanel" aria-labelledby="experience-tab-${index}" tabindex="0"` : ''} ${index ? 'hidden' : ''}>${item.type === 'video' ? mediaBlock(item, project) : `<img src="${item.image}" alt="${project.title}: ${chapter.label}" loading="lazy" />`}</div>`;
              }).join('')}
              ${phone ? '<span class="experience-phone-island" aria-hidden="true"></span></div>' : ''}
            </div>
            ${phone ? '<p class="experience-device-caption">Vista en iPhone 18 Pro</p>' : ''}
          </div>
          <div class="experience-chapter-notes" aria-live="polite" aria-atomic="true">
            ${chapters.map((chapter, index) => `<div data-chapter-note="${index}" ${index ? 'hidden' : ''}><h4>${chapter.title}</h4><p>${chapter.description}</p></div>`).join('')}
          </div>
        </section>

        <section class="experience-thinking" data-case-reveal>
          <div class="experience-section-label"><span>Intención y decisiones</span><span aria-hidden="true">+</span></div>
          <div class="experience-thinking-grid"><h3>${experience.thinkingTitle || (cosmos ? 'Atmósfera sin perder el rumbo.' : 'Impacto visual. Control de la información.')}</h3><div><h4>El reto</h4><p>${project.challenge}</p><h4>Objetivo de diseño</h4><p>${project.objective}</p></div></div>
          <ol class="experience-decisions">${project.process.map(step => `<li data-case-reveal><p>${step}</p></li>`).join('')}</ol>
        </section>

        ${demos.length ? `<section class="experience-demo" id="case-demo" data-case-reveal>
          <div class="experience-section-label"><span>${manual ? 'Documentación' : 'Prototipo'}</span><span aria-hidden="true">↗</span></div>
          ${manual ? `<h3>Manual de marca.</h3><p>${manual.description}</p>` : '<h3>Ahora, probalo vos.</h3><p>Recorré la interfaz en Figma, sin salir del caso.</p>'}
          <div class="experience-media">${demos.map(item => item.type === 'book' ? renderBook(item) : mediaBlock(item, project)).join('')}</div>
        </section>` : ''}

        ${rest.length ? `<section class="experience-gallery" data-case-reveal><div class="experience-section-label"><span>Más del proyecto</span><span aria-hidden="true">+</span></div><div class="experience-gallery-grid">${rest.map(item => mediaBlock(item, project)).join('')}</div></section>` : ''}
        <footer class="experience-outcome" data-case-reveal><p class="experience-eyebrow">Resultado de diseño</p><h3>${project.outcome}</h3><div><span>Lo que me llevo</span><p>${project.learnings}</p></div><p class="experience-tools">${project.tools.join(' / ')}</p><a href="#experience-tour" data-experience-jump>Volver al recorrido ↑</a></footer>
      </div>`;
  }

  function renderBook(book) {
    return `<section class="brand-book" id="brand-book" data-brand-book aria-label="${book.title}">
      <div class="brand-book-controls">
        <button type="button" data-book-prev aria-label="Página anterior" aria-disabled="true">← <span>Anterior</span></button>
        <label class="brand-book-picker">Página <select aria-label="Ir a la página">${book.pages.map((src, index) => `<option value="${src}">${index + 1}</option>`).join('')}</select> de ${book.pages.length}</label>
        <button type="button" data-book-next aria-label="Página siguiente"><span>Siguiente</span> →</button>
      </div>
      <div class="brand-book-viewport" tabindex="0" aria-label="Páginas del manual">
        <div class="brand-book-sheet"><img src="${book.pages[0]}" alt="${book.title}, portada" width="${book.width}" height="${book.height}" loading="lazy" decoding="async" data-book-page /></div>
      </div>
      <div class="brand-book-footer"><p role="status" data-book-status>Página 1 de ${book.pages.length}</p><button type="button" data-book-zoom aria-pressed="false">Ampliar página</button></div>
    </section>`;
  }

  function mountBook(book, signal, allowMotion) {
    const viewport = book.querySelector('.brand-book-viewport');
    const sheet = book.querySelector('.brand-book-sheet');
    const picker = book.querySelector('select');
    const prev = book.querySelector('[data-book-prev]');
    const next = book.querySelector('[data-book-next]');
    const status = book.querySelector('[data-book-status]');
    const zoom = book.querySelector('[data-book-zoom]');
    const count = picker.options.length;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let request = 0;
    let turning;
    function update() {
      picker.selectedIndex = current;
      prev.setAttribute('aria-disabled', String(current === 0));
      next.setAttribute('aria-disabled', String(current === count - 1));
      status.textContent = `Página ${current + 1} de ${count}`;
    }
    async function go(index) {
      if (index < 0 || index >= count) return;
      const revision = ++request;
      if (index === current) { update(); return; }
      const old = sheet.querySelector('[data-book-page]');
      const incoming = old.cloneNode(false);
      incoming.loading = 'eager';
      incoming.src = picker.options[index].value;
      incoming.alt = `${book.getAttribute('aria-label')}, página ${index + 1} de ${count}`;
      try { await incoming.decode(); }
      catch {
        if (!signal.aborted && request === revision) {
          update();
          status.textContent = `No se pudo cargar la página ${index + 1}. Volvé a intentarlo.`;
        }
        return;
      }
      if (signal.aborted || request !== revision) return;
      turning?.cancel();
      const forward = index > current;
      current = index;
      update();
      old.replaceWith(incoming);
      if (!allowMotion() || reduced.matches || !old.complete || !old.naturalWidth) return;
      old.removeAttribute('data-book-page');
      old.setAttribute('aria-hidden', 'true');
      old.classList.add('brand-book-turn');
      old.style.transformOrigin = forward ? 'left center' : 'right center';
      sheet.append(old);
      turning = old.animate([{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${forward ? -92 : 92}deg)` }], { duration: 540, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' });
      turning.onfinish = turning.oncancel = () => old.remove();
    }
    prev.addEventListener('click', () => go(current - 1), { signal });
    next.addEventListener('click', () => go(current + 1), { signal });
    picker.addEventListener('change', () => go(picker.selectedIndex), { signal });
    book.addEventListener('keydown', event => {
      if (event.target === picker || book.classList.contains('is-zoomed')) return;
      const step = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      if (step) { event.preventDefault(); go(current + step); }
    }, { signal });
    zoom.addEventListener('click', () => {
      turning?.cancel();
      const expanded = book.classList.toggle('is-zoomed');
      zoom.setAttribute('aria-pressed', String(expanded));
      zoom.textContent = expanded ? 'Ajustar a pantalla' : 'Ampliar página';
      if (!expanded) viewport.scrollLeft = 0;
    }, { signal });
    signal.addEventListener('abort', () => turning?.cancel(), { once: true });
    return () => turning?.cancel();
  }

  function mount(modal) {
    const root = modal.querySelector('.experience-page');
    const scroll = modal.querySelector('.modal-scroll');
    if (!root || !scroll) return () => {};
    const abort = new AbortController();
    const signal = abort.signal;
    const motionButton = root.querySelector('[data-case-motion]');
    let explicitMotion = true;
    const allowMotion = () => explicitMotion;
    const book = root.querySelector('[data-brand-book]');
    const stopBookMotion = book ? mountBook(book, signal, allowMotion) : null;
    function syncMotion() {
      root.dataset.motion = allowMotion() ? 'on' : 'off';
      motionButton.setAttribute('aria-pressed', String(allowMotion()));
      motionButton.textContent = allowMotion() ? 'Pausar movimiento' : 'Activar movimiento';
    }
    syncMotion();
    const tweens = [];
    const tabs = [...root.querySelectorAll('[data-experience-tab]')];
    const panels = [...root.querySelectorAll('.experience-panel')];
    const notes = [...root.querySelectorAll('[data-chapter-note]')];
    const revealNodes = [...root.querySelectorAll('[data-case-reveal]')];
    function select(index) {
      panels.forEach((panel, i) => { if (i !== index) panel.querySelector('video')?.pause(); });
      tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = i !== index; notes[i].hidden = i !== index; });
      if (window.gsap && allowMotion()) {
        gsap.killTweensOf(panels);
        gsap.set(panels, { clearProps: 'opacity,transform' });
        gsap.fromTo(panels[index], { y: 6 }, { y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'transform' });
      }
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index), { signal });
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(next); tabs[next].focus(); }
      }, { signal });
    });
    root.querySelectorAll('[data-experience-jump]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const target = root.querySelector(link.getAttribute('href'));
      const offset = target === book ? 68 : 24;
      scroll.scrollTo({ top: scroll.scrollTop + target.getBoundingClientRect().top - scroll.getBoundingClientRect().top - offset, behavior: allowMotion() ? 'smooth' : 'auto' });
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }, { signal }));

    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (window.gsap && allowMotion()) tweens.push(gsap.fromTo(entry.target, { y: 12 }, { y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }));
      observer.unobserve(entry.target);
    }), { root: scroll, threshold: 0.08 });
    revealNodes.forEach(node => observer.observe(node));

    const stage = root.querySelector('[data-experience-stage]');
    const stageObserver = new IntersectionObserver(entries => {
      stage.classList.toggle('is-in-view', entries.at(-1).isIntersecting);
    }, { root: scroll });
    stageObserver.observe(stage);
    const mockup = root.querySelector('[data-case-tilt]');
    let tilt;
    if (mockup && window.gsap && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      stage.addEventListener('pointermove', event => {
        if (!allowMotion()) return;
        tilt ??= {
          x: gsap.quickTo(mockup, 'rotationY', { duration: 0.8, ease: 'power3.out' }),
          y: gsap.quickTo(mockup, 'rotationX', { duration: 0.8, ease: 'power3.out' })
        };
        const rect = stage.getBoundingClientRect();
        tilt.x((event.clientX - rect.left - rect.width / 2) / rect.width * 7);
        tilt.y(-(event.clientY - rect.top - rect.height / 2) / rect.height * 5);
      }, { signal });
      stage.addEventListener('pointerleave', () => { tilt?.x(0); tilt?.y(0); }, { signal });
    }
    function clearMotion() {
      if (!window.gsap) return;
      const nodes = [...revealNodes, ...panels, ...(mockup ? [mockup] : [])];
      gsap.killTweensOf(nodes);
      gsap.set(nodes, { clearProps: 'opacity,transform' });
      tilt = null;
    }
    motionButton.addEventListener('click', () => {
      explicitMotion = !allowMotion();
      syncMotion();
      if (!allowMotion()) { clearMotion(); stopBookMotion?.(); }
    }, { signal });
    return () => {
      abort.abort(); observer.disconnect(); stageObserver.disconnect();
      tweens.forEach(tween => tween.kill());
      window.gsap?.killTweensOf([...panels, ...(mockup ? [mockup] : [])]);
    };
  }
  return { render, mount };
})();
