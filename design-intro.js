/* Decorative intro and hero tools own their animations; no global motion flags. */
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-main');
  const title = hero?.querySelector('h1');
  if (!hero || !title) return;
  title.classList.add('design-shared-title');
  let currentIntro = null;
  let audioContext = null;
  let soundEnabled = false;
  let designEnabled = true;
  const cursorIcon = '<svg viewBox="0 0 24 30" fill="none" aria-hidden="true"><path d="M3 2v23l5.8-5.8 4.1 9.1 4.2-1.9-4.2-9.1H22L3 2Z" fill="#161719" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const mode = hero.querySelector('[data-design-mode]');
  const replay = hero.querySelector('[data-replay-intro]');
  const tour = createDesignTour();
  createPointerLight();
  mode?.addEventListener('click', () => {
    designEnabled = !designEnabled;
    mode.setAttribute('aria-pressed', String(designEnabled));
    tour.refresh();
  });
  replay?.addEventListener('click', () => playIntro());

  function createDesignTour() {
    const section = hero.closest('.hero');
    const layer = document.createElement('div');
    layer.className = 'design-tour-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = `<div class="design-tour-frame"><span class="design-tour-label"></span><i></i><i></i><i></i><i></i><span class="design-tour-measure"></span></div><div class="design-tour-cursor">${cursorIcon}</div>`;
    section.append(layer);
    const frame = layer.querySelector('.design-tour-frame');
    const cursor = layer.querySelector('.design-tour-cursor');
    const icon = cursor.querySelector('svg');
    const label = layer.querySelector('.design-tour-label');
    const measure = layer.querySelector('.design-tour-measure');
    const steps = [
      [title, '01 / Tipografía', 'General Sans · Identidad'],
      [section.querySelector('.hero-role'), '02 / Jerarquía', 'Rol y especialidad'],
      [section.querySelector('.hero-lead'), '03 / Composición', 'Mensaje principal'],
      [section.querySelector('.hero-actions'), '04 / Interacción', 'Dos caminos, una intención'],
      [section.querySelector('.hero-tags'), '05 / Sistema visual', 'Disciplinas conectadas'],
      ...Array.from(section.querySelectorAll('.hero-card'), (card, index) => [card, `0${index + 6} / Componentes`, card.querySelector('span').textContent])
    ].filter(([element]) => element);
    let index = 0;
    let timeline = null;
    let delay = null;
    let fallbackAnimations = [];
    let visible = false;
    let suspended = true;
    let scrolling = false;
    let scrollTimer;
    let disposed = false;

    function allowed() {
      return !disposed && designEnabled && visible && !suspended && !scrolling && !document.hidden && !document.body.classList.contains('modal-open');
    }
    function stop() {
      timeline?.kill();
      timeline = null;
      clearTimeout(delay);
      delay = null;
      fallbackAnimations.forEach(animation => animation.cancel());
      fallbackAnimations = [];
      layer.dataset.active = 'false';
    }
    function advance() {
      if (!allowed()) { stop(); return; }
      // Read geometry only between steps, never on each animation frame.
      const origin = layer.getBoundingClientRect();
      let step;
      let rect;
      for (let attempt = 0; attempt < steps.length; attempt++) {
        step = steps[index++ % steps.length];
        rect = step[0].getBoundingClientRect();
        if (rect.width && rect.height && rect.top >= 8 && rect.bottom < window.innerHeight - 24) break;
        rect = null;
      }
      if (!rect) { stop(); return; }
      const box = { x: rect.left - origin.left - 5, y: rect.top - origin.top - 5, width: rect.width + 10, height: rect.height + 10 };
      const point = { x: box.x + Math.min(box.width - 28, box.width * .68), y: box.y + box.height * .6 };
      const entering = layer.dataset.active !== 'true';
      layer.dataset.active = 'true';
      const selectTarget = () => {
        label.textContent = step[1];
        measure.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)} · ${step[2]}`;
        layer.dataset.step = step[1];
      };
      if (window.gsap) {
        if (entering) {
          gsap.set(frame, { opacity: 0 });
          gsap.set(cursor, { x: point.x + 30, y: point.y + 20, opacity: 0 });
        }
        timeline = gsap.timeline({ onComplete: advance });
        // The cursor travels; the frame is resized only while invisible.
        timeline.to(frame, { opacity: 0, duration: .18, ease: 'power2.out' }, 0)
          .to(cursor, { ...point, opacity: 1, duration: .85, ease: 'power2.inOut' }, .08)
          .call(selectTarget, [], .22)
          .set(frame, { ...box, scale: 1, opacity: 0 }, .22)
          .to(frame, { opacity: 1, duration: .32, ease: 'power2.out' }, .65)
          .to(icon, { scale: .84, duration: .12, ease: 'power2.out' }, .93)
          .to(icon, { scale: 1, duration: .2, ease: 'power2.out' }, 1.05)
          .to(frame, { opacity: 1, duration: 1.65, ease: 'none' }, 1.25);
      } else {
        const transform = `translate(${box.x}px, ${box.y}px)`;
        const cursorTransform = `translate(${point.x}px, ${point.y}px)`;
        fallbackAnimations.forEach(animation => animation.cancel());
        const departure = frame.animate([{ opacity: entering ? 0 : 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
        const movement = cursor.animate([{ transform: cursor.style.transform || cursorTransform }, { transform: cursorTransform }], { duration: 850, easing: 'ease-in-out' });
        fallbackAnimations = [departure, movement];
        Object.assign(cursor.style, { transform: cursorTransform, opacity: '1' });
        delay = setTimeout(() => {
          delay = null;
          if (!allowed()) { stop(); return; }
          departure.cancel();
          selectTarget();
          Object.assign(frame.style, { transform, width: `${box.width}px`, height: `${box.height}px`, opacity: '1' });
          fallbackAnimations.push(frame.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 }));
          delay = setTimeout(() => { delay = null; advance(); }, 2250);
        }, 650);
      }
    }
    function refresh() {
      stop();
      if (allowed()) delay = setTimeout(() => { delay = null; advance(); }, 450);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    observer.observe(section);
    const resize = new ResizeObserver(refresh);
    resize.observe(section);
    const modalObserver = new MutationObserver(refresh);
    modalObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('scroll', () => {
      scrolling = true;
      stop();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; refresh(); }, 180);
    }, { passive: true });
    window.addEventListener('pagehide', event => {
      stop();
      clearTimeout(scrollTimer);
      if (!event.persisted) {
        disposed = true;
        observer.disconnect();
        resize.disconnect();
        modalObserver.disconnect();
      }
    });
    window.addEventListener('pageshow', refresh);
    return { refresh, suspend(value) { suspended = value; refresh(); } };
  }

  function createPointerLight() {
    const light = document.createElement('div');
    light.className = 'design-pointer-light';
    light.setAttribute('aria-hidden', 'true');
    document.body.append(light);
    let point = null;
    let frame = null;
    let activeProject = null;
    let activeCover = null;
    let nativeDragging = false;
    const blocked = () => currentIntro || document.hidden || document.body.classList.contains('modal-open');
    function selectProject(project, cover = null) {
      if (project === activeProject) return;
      activeProject?.classList.remove('is-pointer-lit', 'is-pointer-dragging');
      activeCover?.style.removeProperty('transform');
      activeProject = project;
      activeCover = cover;
    }
    const clear = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      point = null;
      nativeDragging = false;
      light.dataset.visible = 'false';
      selectProject(null);
    };
    function render() {
      frame = null;
      if (!point || blocked()) { clear(); return; }
      const { x, y, dragging } = point;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) { clear(); return; }
      // Hit-test coordinates instead of event.target so pointer capture during a drag
      // cannot leave the light attached to the previous card.
      const project = document.elementFromPoint(x, y)?.closest('.project-card-shell') || null;
      const cover = project === activeProject ? activeCover : project?.querySelector('.experience-card-art');
      const rect = project?.getBoundingClientRect();
      const relative = (value, start, size) => Math.max(0, Math.min(1, (value - start) / size));
      const nx = rect?.width ? relative(x, rect.left, rect.width) : .5;
      const ny = rect?.height ? relative(y, rect.top, rect.height) : .5;
      const shiftX = cover ? (nx * 2 - 1) * Math.min(7, cover.clientWidth * .022) : 0;
      const shiftY = cover ? (ny * 2 - 1) * Math.min(5, cover.clientHeight * .022) : 0;
      const dragPosition = dragging && project ? [nx * project.offsetWidth, ny * project.offsetHeight] : null;
      selectProject(project, cover);
      if (!project) light.style.transform = `translate3d(${x - 110}px, ${y - 110}px, 0)`;
      const showHalo = String(!project);
      if (light.dataset.visible !== showHalo) light.dataset.visible = showHalo;
      if (cover) {
        cover.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) scale(1.05)`;
      }
      if (project) {
        if (dragPosition) {
          project.style.setProperty('--project-light-x', `${dragPosition[0].toFixed(1)}px`);
          project.style.setProperty('--project-light-y', `${dragPosition[1].toFixed(1)}px`);
        }
        project.classList.add('is-pointer-lit');
        project.classList.toggle('is-pointer-dragging', dragging);
      }
    }
    function requestRender() {
      if (point && frame === null) frame = requestAnimationFrame(render);
    }
    function update(x, y, dragging) {
      if (blocked()) { clear(); return; }
      point = { x, y, dragging };
      requestRender();
    }
    function onPointer(event) {
      if (event.pointerType !== 'mouse') { clear(); return; }
      update(event.clientX, event.clientY, Boolean(event.buttons & 1));
    }
    // The halo and cover share one hit test and one queued frame.
    document.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerdown', onPointer, { passive: true });
    document.addEventListener('pointerup', onPointer, { passive: true });
    document.addEventListener('pointercancel', () => { if (!nativeDragging) clear(); });
    document.addEventListener('pointerout', event => { if (!event.relatedTarget) clear(); });
    document.addEventListener('pointerleave', clear);
    for (const eventName of ['dragstart', 'dragover']) {
      document.addEventListener(eventName, event => {
        nativeDragging = true;
        update(event.clientX, event.clientY, true);
      }, { passive: true });
    }
    for (const eventName of ['dragend', 'drop']) {
      document.addEventListener(eventName, () => {
        nativeDragging = false;
        if (point) { point.dragging = false; requestRender(); }
      }, { passive: true });
    }
    document.addEventListener('keydown', event => { if (event.key === 'Tab' || event.key === 'Escape') clear(); });
    document.addEventListener('visibilitychange', clear);
    document.addEventListener('portfolio:intro-start', clear);
    window.addEventListener('blur', clear);
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender, { passive: true });
    const modalObserver = new MutationObserver(() => { if (blocked()) clear(); });
    modalObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('pagehide', event => {
      clear();
      if (!event.persisted) modalObserver.disconnect();
    });
  }

  function keySound() {
    if (!soundEnabled || audioContext?.state !== 'running') return;
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(460 + Math.random() * 200, now);
    oscillator.frequency.exponentialRampToValueAtTime(120, now + .024);
    gain.gain.setValueAtTime(.025, now);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .045);
    oscillator.connect(gain); gain.connect(audioContext.destination);
    oscillator.start(now); oscillator.stop(now + .05);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }

  function playIntro() {
    currentIntro?.();
    tour.suspend(true);
    document.dispatchEvent(new Event('portfolio:intro-start'));
    // Keep the actual hero heading, reserving its space while it lives in the canvas.
    window.gsap?.killTweensOf(title);
    window.gsap?.set(title, { clearProps: 'transform,opacity,visibility' });
    title.classList.remove('is-glowing');
    const originalStyle = title.style.cssText;
    const fullName = title.textContent.trim().replace(/\s+/g, ' ');
    const words = fullName.split(' ');
    const slot = document.createElement('span');
    slot.className = 'design-name-slot';
    slot.setAttribute('aria-hidden', 'true');
    function reserveSpace(rect, style) {
      Object.assign(slot.style, { display: 'inline-block', width: `${rect.width}px`, height: `${rect.height}px`, margin: style.margin, verticalAlign: style.verticalAlign, maxWidth: '100%' });
    }
    reserveSpace(title.getBoundingClientRect(), getComputedStyle(title));
    title.replaceWith(slot);
    title.classList.add('is-designing');
    title.replaceChildren();
    const lines = words.map((word, index) => {
      if (index) title.append(document.createTextNode(' '));
      const span = document.createElement('span');
      span.className = 'design-name-line';
      title.append(span);
      return span;
    });
    const overlay = document.createElement('aside');
    overlay.id = 'design-intro';
    overlay.setAttribute('aria-label', 'Bienvenida al portfolio');
    overlay.innerHTML = `
      <div class="design-intro-top"><span><i aria-hidden="true"></i> LEONEL KUNST <small>/ lienzo personal</small></span><div class="design-intro-actions"><button type="button" data-intro-sound aria-pressed="${soundEnabled}">${soundEnabled ? 'Sonido activado' : 'Activar sonido'}</button><button type="button" data-intro-skip>Entrar al portfolio ↗</button></div></div>
      <div class="design-intro-workspace">
        <div class="design-intro-rail" aria-hidden="true"><span>↖</span><span>▧</span><span>T</span><span>✧</span></div>
        <div class="design-intro-art" aria-hidden="true">
          <p class="design-intro-file">PORTFOLIO / MESA DE TRABAJO 01</p>
          <div class="design-intro-frame"><span class="design-intro-label">Identidad / Leonel Kunst</span><div data-intro-name></div><i></i><i></i><i></i><i></i><span class="design-intro-dimensions" data-intro-status>Herramienta de texto seleccionada</span></div>
          <div class="design-intro-cursor">${cursorIcon}</div>
        </div>
        <div class="design-intro-properties"><span>APARIENCIA</span><button type="button" data-intro-color aria-label="Cambiar color del lienzo"><i></i> Cambiar acento</button><div aria-hidden="true"><span>Diseño</span><b>Con intención.</b><hr><span>Modo</span><b>Crear conexiones</b></div></div>
      </div>
      <div class="design-intro-bottom"><span>De una idea a una experiencia.</span><span>Escribiendo una identidad, no cargando una página.</span></div>`;
    document.body.append(overlay);
    overlay.querySelector('[data-intro-name]').append(title);
    document.documentElement.classList.remove('design-intro-pending');
    const caret = document.createElement('span');
    caret.className = 'design-typing-caret';
    caret.setAttribute('aria-hidden', 'true');
    const abort = new AbortController();
    const signal = abort.signal;
    const animations = [];
    let ended = false;
    let settled = false;
    let timeline;
    let flight;
    let exit;
    let safetyTimer;
    const timers = new Set();
    function schedule(callback, delay) {
      const timer = setTimeout(() => { timers.delete(timer); if (!ended) callback(); }, delay);
      timers.add(timer);
    }
    function settle() {
      if (settled) return;
      settled = true;
      clearTimeout(safetyTimer);
      flight?.kill?.();
      flight?.cancel?.();
      exit?.cancel();
      title.style.cssText = originalStyle;
      title.classList.remove('is-designing', 'design-name-flight', 'is-glowing');
      if (slot.isConnected) slot.replaceWith(title);
      overlay.remove();
      abort.abort();
      currentIntro = null;
      tour.suspend(false);
      document.dispatchEvent(new Event('portfolio:intro-end'));
    }
    function finish({ immediate = false } = {}) {
      if (ended) { if (immediate) settle(); return; }
      ended = true;
      timers.forEach(clearTimeout);
      lines.forEach((span, index) => { span.textContent = words[index]; });
      caret.remove();
      const from = title.getBoundingClientRect();
      const fromStyle = getComputedStyle(title);
      const sourceSize = parseFloat(fromStyle.fontSize);
      const sourceColor = fromStyle.color;
      timeline?.kill();
      animations.forEach(animation => animation.cancel());
      window.gsap?.killTweensOf(overlay.querySelectorAll('*'));
      title.style.cssText = originalStyle;
      slot.replaceWith(title);
      const destination = title.getBoundingClientRect();
      const targetStyle = getComputedStyle(title);
      const size = parseFloat(targetStyle.fontSize);
      const color = targetStyle.color;
      if (immediate || destination.top < 0 || destination.bottom > innerHeight || !from.width) { settle(); return; }
      const typography = { fontFamily: targetStyle.fontFamily, fontWeight: targetStyle.fontWeight, fontSize: targetStyle.fontSize, lineHeight: targetStyle.lineHeight, letterSpacing: targetStyle.letterSpacing };
      reserveSpace(destination, targetStyle);
      title.replaceWith(slot);
      document.body.append(title);
      title.classList.add('design-name-flight');
      Object.assign(title.style, typography, { width: `${destination.width}px`, color, margin: '0' });
      // FLIP scales the same heading uniformly, preserving glyph spacing during the handoff.
      const start = { x: from.left, y: from.top, scale: sourceSize / size, color: sourceColor };
      const end = { x: destination.left, y: destination.top, scale: 1, color };
      overlay.style.pointerEvents = 'none';
      exit = overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, easing: 'ease-in-out', fill: 'forwards' });
      if (window.gsap) {
        flight = gsap.fromTo(title, start, { ...end, duration: 1.1, ease: 'power3.inOut', onComplete: settle });
      } else {
        flight = title.animate([
          { transform: `translate(${start.x}px, ${start.y}px) scale(${start.scale})`, color: sourceColor },
          { transform: `translate(${end.x}px, ${end.y}px) scale(1)`, color }
        ], { duration: 1100, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
        flight.onfinish = settle;
      }
      safetyTimer = setTimeout(settle, 1300);
    }
    currentIntro = () => finish({ immediate: true });
    schedule(() => finish({ immediate: true }), 12000);
    overlay.querySelector('[data-intro-skip]').addEventListener('click', () => finish(), { signal });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Tab') finish({ immediate: true });
    }, { signal });
    window.addEventListener('wheel', () => finish({ immediate: true }), { signal, passive: true });
    window.addEventListener('touchmove', () => finish({ immediate: true }), { signal, passive: true });
    window.addEventListener('resize', () => finish({ immediate: true }), { signal });
    window.addEventListener('pagehide', () => finish({ immediate: true }), { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish({ immediate: true }); }, { signal });
    overlay.querySelector('[data-intro-color]').addEventListener('click', () => {
      overlay.classList.toggle('design-intro-warm');
    }, { signal });
    overlay.querySelector('[data-intro-sound]').addEventListener('click', async event => {
      const button = event.currentTarget;
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        try {
          const Audio = window.AudioContext || window.webkitAudioContext;
          if (!Audio) throw new Error('Audio no disponible');
          audioContext ||= new Audio();
          await audioContext.resume();
          if (ended) return;
          keySound();
        } catch { soundEnabled = false; }
      }
      if (ended) return;
      button.setAttribute('aria-pressed', String(soundEnabled));
      button.textContent = soundEnabled ? 'Sonido activado' : 'Activar sonido';
    }, { signal });
    const cursor = overlay.querySelector('.design-intro-cursor');
    // Coordinates are measured against the viewport because the cursor leaves the canvas.
    function travelTo(target, duration = .55) {
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width * .6;
      const y = rect.top + rect.height * .5;
      if (window.gsap) gsap.to(cursor, { left: x, top: y, duration, ease: 'power2.inOut', overwrite: true });
      else { cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; }
    }
    let line = 0;
    let character = 0;
    const status = overlay.querySelector('[data-intro-status]');
    function typeLetter() {
      lines[line].textContent = words[line].slice(0, ++character);
      lines[line].append(caret);
      keySound();
      if (character < words[line].length) schedule(typeLetter, character % 3 === 0 ? 175 : 105);
      else if (line < words.length - 1) { line++; character = 0; schedule(typeLetter, 240); }
      else {
        caret.remove();
        status.textContent = 'Identidad lista. Vamos al portfolio.';
        schedule(() => {
          const enter = overlay.querySelector('[data-intro-skip]');
          travelTo(enter, .7);
          schedule(() => {
            enter.classList.add('is-cursor-clicked');
            cursor.classList.add('is-clicking');
            keySound();
            schedule(finish, 260);
          }, 780);
        }, 450);
      }
    }
    schedule(() => { travelTo(overlay.querySelector('.design-intro-frame'), .5); }, 120);
    schedule(typeLetter, 720);
    if (window.gsap) {
      timeline = gsap.timeline();
      timeline.fromTo(overlay.querySelector('.design-intro-frame'), { opacity: 0, scale: .93 }, { opacity: 1, scale: 1, duration: .8, ease: 'power3.out' }, .12)
        .fromTo(title, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, .3)
        .fromTo(overlay.querySelector('.design-intro-properties'), { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: .5 }, .65);
    } else {
      animations.push(overlay.querySelector('.design-intro-frame').animate([{ opacity: 0, transform: 'scale(.95)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700 }));
    }
  }
  if (document.documentElement.classList.contains('design-intro-pending')) playIntro();
  else tour.suspend(false);
});
