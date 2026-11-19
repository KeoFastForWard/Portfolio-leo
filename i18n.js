/* English version of the portfolio.
   Open the site with ?lang=en (or use the EN button in the dock). The choice is
   remembered in this browser. Spanish stays the default and needs no changes:
   this file only rewrites text when English is active. */
window.PortfolioI18n = (() => {
  const params = new URLSearchParams(location.search);
  let stored = null;
  try { stored = localStorage.getItem('portfolio-lang'); } catch {}
  const requested = params.get('lang');
  const lang = requested === 'en' || requested === 'es' ? requested : stored === 'en' ? 'en' : 'es';
  try { if (requested) localStorage.setItem('portfolio-lang', lang); } catch {}

  function setupToggle() {
    const toggle = document.querySelector('[data-lang-toggle]');
    if (!toggle) return;
    const next = lang === 'en' ? 'es' : 'en';
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    toggle.setAttribute('href', url.pathname + url.search + url.hash);
    toggle.setAttribute('hreflang', next);
    toggle.setAttribute('lang', next);
    toggle.setAttribute('aria-label', next === 'en' ? 'View in English' : 'Ver en español');
    toggle.querySelector('[data-lang-label]').textContent = next.toUpperCase();
  }

  if (lang !== 'en') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupToggle);
    else setupToggle();
    return { lang, t: text => text };
  }

  // ---- Content: merge the English copy into portfolioData ----
  const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
  function merge(base, over) {
    if (Array.isArray(over)) {
      if (!Array.isArray(base) || over.every(item => !isObject(item))) return over;
      return base.map((item, index) => (isObject(over[index]) ? merge(item, over[index]) : item));
    }
    if (!isObject(over) || !isObject(base)) return over === undefined ? base : over;
    const result = { ...base };
    for (const [key, value] of Object.entries(over)) result[key] = merge(base[key], value);
    return result;
  }
  if (typeof portfolioData !== 'undefined' && typeof portfolioDataEn !== 'undefined') {
    const { projects, ...rest } = portfolioDataEn;
    Object.assign(portfolioData, merge(portfolioData, rest));
    portfolioData.projects = portfolioData.projects.map(project => merge(project, projects[project.id] || {}));
  }

  // ---- Interface text ----
  const dictionary = {
    'Saltar a los proyectos': 'Skip to projects',
    'Inicio': 'Home', 'Proyectos': 'Projects', 'Sobre mí': 'About', 'Trayectoria': 'Background',
    'Habilidades': 'Skills', 'Contacto': 'Contact', 'Navegación principal': 'Main navigation',
    'Claro': 'Light', 'Oscuro': 'Dark', 'Modo claro': 'Light mode', 'Modo oscuro': 'Dark mode',
    'Activar modo claro': 'Switch to light mode', 'Activar modo oscuro': 'Switch to dark mode',
    'Modo diseño': 'Design mode', 'Repetir entrada': 'Replay intro',
    'Ubicación': 'Location', 'Modalidad': 'Work mode', 'Idiomas': 'Languages',
    'Ver proyectos': 'View projects', 'Descargar CV': 'Download CV (Spanish)', 'Contactarme': 'Get in touch',
    'Experiencia': 'Experience', 'Formación': 'Education', 'Herramientas': 'Tools',
    '2022 – 2024 en diseño digital: Artisse Interactive y Metadev.': '2022 – 2024 in digital design: Artisse Interactive and Metadev.',
    'Lic. en Diseño Gráfico, UAI (en curso).': "Bachelor's in Graphic Design, UAI (in progress).",
    'Figma, Photoshop, Illustrator, After Effects y Premiere.': 'Figma, Photoshop, Illustrator, After Effects and Premiere.',
    'Trabajo seleccionado': 'Selected work', 'Ver Behance': 'View Behance', 'Filtros por categoría': 'Filter by category',
    'Todos': 'All', 'Mi rol': 'My role', 'Ver caso': 'View case',
    'No hay proyectos cargados en esta categoría todavía.': 'There are no projects in this category yet.',
    'Diseño UX/UI y gráfico': 'UX/UI and graphic design', 'Mi perfil': 'My profile', 'Soy': "I'm",
    ', diseñador UX/UI con formación en diseño gráfico. Trabajo con investigación y prototipado para crear interfaces claras y funcionales.':
      ', a UX/UI designer with a background in graphic design. I use research and prototyping to build clear, functional interfaces.',
    'También trabajo en identidad visual, diseño editorial, motion graphics y piezas para medios digitales e impresos.':
      'I also work on visual identity, editorial design, motion graphics and pieces for digital and print media.',
    'Descargar CV en PDF': 'Download CV as PDF (Spanish)', 'Qué aporto a un equipo': 'What I bring to a team',
    'Wireframes, user flows y prototipos navegables en Figma.': 'Wireframes, user flows and clickable prototypes in Figma.',
    'Identidad visual y sistemas gráficos para medios digitales e impresos.': 'Visual identity and graphic systems for digital and print media.',
    'Motion graphics para presentar interfaces y marcas en movimiento.': 'Motion graphics to present interfaces and brands in motion.',
    'Idiomas y modalidad': 'Languages and work mode', 'Castellano nativo e inglés intermedio.': 'Native Spanish and intermediate English.',
    'Experiencia y formación': 'Experience and education', 'Diseño y herramientas': 'Design and tools',
    'Hablemos': "Let's talk", 'Canales directos': 'Direct channels',
    'Escribime por el canal que te resulte más cómodo.': 'Reach out through whichever channel works best for you.',
    'Nombre': 'Name', 'Mensaje': 'Message', 'Tu nombre': 'Your name', 'tu@email.com': 'you@email.com',
    'Contame brevemente en qué puedo ayudarte.': 'Tell me briefly how I can help.',
    'Enviar consulta': 'Send message', 'Enviando...': 'Sending...',
    'Tu consulta llega directo a mi correo. No comparto tus datos.': "Your message goes straight to my inbox. I don't share your data.",
    'Enviar desde mi correo': 'Send from my email',
    'Consulta recibida por el servicio de envío.': 'Message received by the delivery service.',
    'Esperá unos segundos y volvé a enviar.': 'Wait a few seconds and send it again.',
    'Completá nombre, email y mensaje antes de enviar.': 'Fill in your name, email and message before sending.',
    'El texto es demasiado largo. Acortalo y volvé a enviar.': 'The text is too long. Shorten it and send it again.',
    'Revisá el email: no parece una dirección válida.': "Check the email: it doesn't look like a valid address.",
    'Enviando consulta. La confirmación puede tardar unos segundos.': 'Sending your message. Confirmation can take a few seconds.',
    'Portfolio UX/UI y Diseño Gráfico': 'UX/UI and Graphic Design Portfolio',
    'Leonel Kunst. Todos los derechos reservados.': 'Leonel Kunst. All rights reserved.',
    'Cerrar': 'Close', 'Cerrar detalle': 'Close details',
    // Case pages
    'Pausar movimiento': 'Pause motion', 'Reanudar movimiento': 'Resume motion',
    'Mi aporte': 'My contribution', 'Formato': 'Format', 'Entregable': 'Deliverable',
    'Interfaz y prototipo navegable': 'Interface and clickable prototype',
    'Explorar el diseño': 'Explore the design', 'Hojear el manual': 'Flip through the manual',
    'Diseño en detalle': 'Design in detail', 'El recorrido': 'The journey', 'Motion de marca': 'Brand motion',
    'Elegí tu próxima órbita.': 'Choose your next orbit.', 'Cada vista tiene una función.': 'Every view has a job.',
    'Intención y decisiones': 'Intent and decisions', 'El reto': 'The challenge', 'Objetivo de diseño': 'Design goal',
    'Atmósfera sin perder el rumbo.': 'Atmosphere without losing the way.',
    'Impacto visual. Control de la información.': 'Visual impact. Information under control.',
    'Prototipo': 'Prototype', 'Documentación': 'Documentation', 'Manual de marca.': 'Brand manual.',
    'Ahora, probalo vos.': 'Now, try it yourself.',
    'Recorré la interfaz en Figma, sin salir del caso.': 'Explore the interface in Figma without leaving the case.',
    'Más del proyecto': 'More from the project', 'Aplicaciones del isotipo': 'Isotype applications',
    'Resultado de diseño': 'Design outcome', 'Lo que me llevo': 'What I took away', 'Volver al recorrido ↑': 'Back to the journey ↑',
    'Vista en iPhone 18 Pro': 'Shown on iPhone 18 Pro',
    'Validación': 'Validation', 'Lo probé con personas reales.': 'I tested it with real people.',
    'Cómo lo probé': 'How I tested it', 'Lo que encontré': 'What I found', 'Lo que cambié': 'What I changed',
    'Anterior': 'Previous', 'Siguiente': 'Next', 'Página': 'Page', 'Página anterior': 'Previous page',
    'Página siguiente': 'Next page', 'Ir a la página': 'Go to page', 'Páginas del manual': 'Manual pages',
    'Ampliar página': 'Enlarge page', 'Ajustar a pantalla': 'Fit to screen',
    // Older case layout
    'Descripción general': 'Overview', 'Bocetos, mockups, imágenes o videos': 'Sketches, mockups, images or videos',
    'Abrir prototipo en Figma ↗': 'Open prototype in Figma ↗', 'Explorar el recorrido': 'Explore the journey',
    'Enfoque de diseño': 'Design approach', 'Ver pantallas': 'View screens', 'Explorá cómo funciona': 'See how it works',
    'Reflexión': 'Reflection',
    // Intro animation
    'Bienvenida al portfolio': 'Welcome to the portfolio', 'Sonido activado': 'Sound on', 'Activar sonido': 'Turn on sound',
    'Entrar al portfolio ↗': 'Enter the portfolio ↗', 'PORTFOLIO / MESA DE TRABAJO 01': 'PORTFOLIO / ARTBOARD 01',
    '/ lienzo personal': '/ personal canvas', 'Herramienta de texto seleccionada': 'Text tool selected',
    'Cambiar color del lienzo': 'Change canvas color', 'Cambiar acento': 'Change accent', 'APARIENCIA': 'APPEARANCE',
    'Diseño': 'Design', 'Con intención.': 'With intent.', 'Modo': 'Mode', 'Crear conexiones': 'Make connections',
    'De una idea a una experiencia.': 'From an idea to an experience.', 'Clic, scroll o Esc para saltar.': 'Click, scroll or Esc to skip.',
    'Identidad lista. Vamos al portfolio.': 'Identity ready. On to the portfolio.',
    '01 / Tipografía': '01 / Typography', 'General Sans · Identidad': 'General Sans · Identity',
    '02 / Jerarquía': '02 / Hierarchy', 'Rol y especialidad': 'Role and specialty',
    '03 / Composición': '03 / Composition', 'Mensaje principal': 'Key message',
    '04 / Interacción': '04 / Interaction', 'Dos caminos, una intención': 'Two paths, one intent',
    '05 / Sistema visual': '05 / Visual system', 'Disciplinas conectadas': 'Connected disciplines'
  };
  const patterns = [
    [/^Abrir el caso (.+)$/, 'Open the $1 case'],
    [/^Vistas de (.+)$/, '$1 views'],
    [/^Portada de (.+)$/, '$1 cover'],
    [/^Página (\d+) de (\d+)$/, 'Page $1 of $2'],
    [/^de (\d+)$/, 'of $1'],
    [/^(.+), página (\d+) de (\d+)$/, '$1, page $2 of $3'],
    [/^(.+), portada$/, '$1, cover'],
    [/^(0\d) \/ Componentes$/, '$1 / Components'],
    [/^(\d+ × \d+) · (.+)$/, (match, size, rest) => `${size} · ${translate(rest) ?? rest}`],
    [/^(.+) \/ EXPLORACIÓN DIGITAL$/, '$1 / DIGITAL EXPLORATION'],
    [/^(.+) \/ DISEÑO WEB$/, '$1 / WEB DESIGN'],
    [/^El formulario todavía requiere activación\. (.+)$/, (m, rest) => `The form still needs to be activated. ${translate(rest) ?? rest}`],
    [/^No pude confirmar el envío\. (.+)$/, (m, rest) => `I couldn't confirm it was sent. ${translate(rest) ?? rest}`],
    [/^Podés escribirme directamente a (.+)\.$/, 'You can email me directly at $1.']
  ];

  function translate(text) {
    const trimmed = text.replace(/\s+/g, ' ').trim();
    if (!trimmed) return null;
    if (Object.prototype.hasOwnProperty.call(dictionary, trimmed)) return dictionary[trimmed];
    for (const [pattern, replacement] of patterns) {
      if (pattern.test(trimmed)) return trimmed.replace(pattern, replacement);
    }
    return null;
  }

  const ATTRIBUTES = ['aria-label', 'title', 'placeholder', 'alt'];
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('script, style')) return;
      const english = translate(node.nodeValue);
      if (english !== null) {
        if (english === node.nodeValue.trim()) return;
        const lead = node.nodeValue.match(/^\s*/)[0];
        const tail = node.nodeValue.match(/\s*$/)[0];
        const next = lead + english + tail;
        if (next !== node.nodeValue) node.nodeValue = next;
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const elements = [node, ...node.querySelectorAll('*')];
    for (const element of elements) {
      for (const name of ATTRIBUTES) {
        const value = element.getAttribute(name);
        const english = value && translate(value);
        if (english !== null && english !== undefined && english !== value) element.setAttribute(name, english);
      }
    }
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let text;
    while ((text = walker.nextNode())) translateNode(text);
  }

  function start() {
    document.documentElement.lang = 'en';
    document.title = 'Leonel Kunst | UX/UI Designer and Graphic Designer';
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Leonel Kunst, UX/UI designer with a background in graphic design. Interfaces, Figma prototypes, visual identity and motion. Open to remote UX/UI roles.');
    const subject = document.querySelector('input[name="_subject"]');
    if (subject) subject.value = 'Message from portfolio | Leonel Kunst';
    setupToggle();
    translateNode(document.body);
    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') translateNode(mutation.target);
        else if (mutation.type === 'attributes') {
          const value = mutation.target.getAttribute(mutation.attributeName);
          const english = value && translate(value);
          if (english && english !== value) mutation.target.setAttribute(mutation.attributeName, english);
        } else mutation.addedNodes.forEach(translateNode);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRIBUTES });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  return { lang, t: text => translate(text) ?? text };
})();
