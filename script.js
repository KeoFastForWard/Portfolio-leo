if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const THEME_STORAGE_KEY = "leonel-portfolio-theme";

/* ---------------------------------------------------------------------------
   Content safety
   Everything in portfolio-data.js reaches the page through HTML templates.
   getViewData() returns a copy where every string is escaped, every URL is
   checked and every CSS value is reduced to harmless characters, so a stray
   "<" or quote in the data shows up as text instead of breaking the markup.
--------------------------------------------------------------------------- */
const HTML_ESCAPES = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "`": "&#96;" };
const HTML_UNESCAPES = { "&#38;": "&", "&#60;": "<", "&#62;": ">", "&#34;": '"', "&#39;": "'", "&#96;": "`" };
const URL_FIELDS = new Set(["src", "image", "poster", "embedUrl", "href", "pages", "cv"]);
const CSS_FIELDS = new Set(["start", "end", "position", "size", "tint", "shadow", "frameHeight"]);
const EMBED_HOSTS = new Set(["embed.figma.com", "www.figma.com"]);

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"'`]/g, (character) => HTML_ESCAPES[character]);
}

function unescapeHTML(value) {
  return String(value ?? "").replace(/&#(?:38|60|62|34|39|96);/g, (entity) => HTML_UNESCAPES[entity]);
}

// Accepts https links and local relative paths. Everything else (javascript:,
// data:, http:, protocol-relative, path traversal) comes back empty.
function safeUrl(value, { embed = false } = {}) {
  if (typeof value !== "string") return "";
  const url = value.trim();
  if (!url || /[\u0000-\u001f'"<>`\\(){}]/.test(url)) return "";

  if (/^https:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      if (embed && !EMBED_HOSTS.has(parsed.hostname)) return "";
      return url;
    } catch {
      return "";
    }
  }

  if (embed || /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//")) return "";
  if (url.split(/[\/?#]/).includes("..")) return "";
  return url;
}

function safeCssValue(value) {
  return String(value ?? "").replace(/[^\w\s#.,%()-]/g, "");
}

function sanitizeForTemplates(value, key = "") {
  if (typeof value === "string") {
    if (URL_FIELDS.has(key)) return escapeHTML(safeUrl(value, { embed: key === "embedUrl" }));
    if (CSS_FIELDS.has(key)) return escapeHTML(safeCssValue(value));
    return escapeHTML(value);
  }
  if (Array.isArray(value)) return value.map((item) => sanitizeForTemplates(item, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([name, item]) => [name, sanitizeForTemplates(item, name)])
    );
  }
  return value;
}

let viewDataCache = null;

function getViewData() {
  if (!viewDataCache) viewDataCache = sanitizeForTemplates(portfolioData);
  return viewDataCache;
}

function resetPageScrollPosition() {
  // A link such as /#contacto must land on its section, not on the top.
  if (window.location?.hash) return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });

  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, 0);
}

window.addEventListener("load", resetPageScrollPosition);
window.addEventListener("pageshow", resetPageScrollPosition);
const state = {
  activeFilter: "Todos",
  activeProjectId: null,
  lastFocusedElement: null
};

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopViewportQuery = window.matchMedia("(min-width: 781px)");

function isMotionReduced() {
  return reducedMotionQuery.matches;
}

function shouldUseDesktopLightMotion() {
  return false;
}

// The background lines always animate, even when the system asks for less motion.
function shouldAllowBackgroundEnhancement() {
  return true;
}

function syncMotionMode() {
  document.documentElement.dataset.desktopLightMotion = shouldUseDesktopLightMotion()
    ? "true"
    : "false";
}

syncMotionMode();
reducedMotionQuery.addEventListener("change", syncMotionMode);
desktopViewportQuery.addEventListener("change", syncMotionMode);

let immersiveMotionBooted = false;
let pointerDepthBooted = false;
let backgroundGlintFrame = null;
let activeProjectExperience = null;

const heroRevealSelectors = [
  ".hero-label",
  ".hero-role",
  ".hero-main h1",
  ".hero-support > *",
  ".hero-card"
];

document.addEventListener("DOMContentLoaded", () => {
  resetPageScrollPosition();
  initTheme();

  if (typeof portfolioData === "undefined") {
    return;
  }

  hydrateProfile();
  renderFilters();
  renderProjects();
  setupProjectGridReveal();
  renderExperience();
  renderEducation();
  renderSkills();
  bindEvents();
  updateCurrentYear();
  initAnimations();
  scrollToInitialHash();
});

function scrollToInitialHash() {
  const hash = window.location?.hash;
  if (!hash || hash.length < 2) return;

  let target = null;
  try {
    target = document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {}
  if (!target) return;

  // Sections are filled in by script, so jump again once layout has settled.
  const jump = () => target.scrollIntoView({ behavior: "auto", block: "start" });
  jump();
  window.addEventListener("load", jump, { once: true });
}

function hydrateProfile() {
  const profile = portfolioData.profile;
  const setText = (selector, value) => {
    if (typeof value !== "string" || !value) return;
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  setText("[data-profile-name]", profile.name);
  setText("[data-profile-role]", profile.role);
  setText("[data-profile-tagline]", profile.tagline);
  setText("[data-profile-availability]", profile.availability);
  setText("[data-profile-location]", profile.location);
  setText("[data-profile-mode]", profile.mode);
  setText("[data-profile-languages]", profile.languages);

  document.querySelectorAll("[data-profile-email]").forEach((node) => {
    node.textContent = profile.email;
    node.setAttribute("href", `mailto:${profile.email}`);
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm instanceof HTMLFormElement) {
    // FormSubmit gives every activated form a random alias. Using it here
    // keeps the address out of the form markup.
    const recipient = /^[a-z0-9]{16,64}$/i.test(profile.formAlias || "") ? profile.formAlias : profile.email;
    contactForm.setAttribute("action", `https://formsubmit.co/${recipient}`);
  }

  const setLink = (selector, value) => {
    const href = safeUrl(value);
    document.querySelectorAll(selector).forEach((node) => {
      if (href) node.setAttribute("href", href);
      else node.hidden = true;
    });
  };

  setLink("[data-profile-linkedin]", profile.linkedin);
  setLink("[data-profile-behance]", profile.behance);
  setLink("[data-profile-cv]", profile.cv);
}

function renderFilters() {
  const filterGroup = document.querySelector("[data-filter-group]");
  if (!filterGroup) return;

  filterGroup.innerHTML = getViewData().filters
    .map(
      (filter) => `
        <button
          class="filter-button ${filter === state.activeFilter ? "is-active" : ""}"
          type="button"
          data-filter="${filter}"
          aria-pressed="${filter === state.activeFilter}"
        >
          ${filter}
        </button>
      `
    )
    .join("");
}

function renderProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  // Filter on the original categories, render from the sanitized copy.
  const visibleProjects = getViewData().projects.filter(
    (_, index) =>
      state.activeFilter === "Todos" ||
      portfolioData.projects[index].categories.includes(state.activeFilter)
  );

  if (!visibleProjects.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <strong>No hay proyectos cargados en esta categoría todavía.</strong>
        <p>Podés sumar nuevos casos desde <code>portfolio-data.js</code> cuando quieras ampliar el portfolio.</p>
      </div>
    `;
    if (immersiveMotionBooted) window.ScrollTrigger?.refresh();
    return;
  }

  grid.innerHTML = visibleProjects
    .map((project, index) => createProjectCard(project, index))
    .join("");
  if (immersiveMotionBooted) window.ScrollTrigger?.refresh();
}

function getProjectSurfaceStyle(project) {
  const styles = [
    `--cover-start: ${project.accent.start}`,
    `--cover-end: ${project.accent.end}`
  ];

  if (project.cover?.src) {
    styles.push(`--cover-image: url('${project.cover.src}')`);
    styles.push(`--cover-position: ${project.cover.position || "center center"}`);
    styles.push(`--cover-size: ${project.cover.size || "cover"}`);
    styles.push(`--cover-tint: ${project.cover.tint || "rgba(8, 10, 16, 0.18)"}`);
    styles.push(`--cover-shadow: ${project.cover.shadow || "rgba(8, 10, 16, 0.58)"}`);
  }

  return styles.join("; ");
}

function createProjectCard(project, index = 0) {
  const thumbClass = project.cover?.src ? `project-thumb has-cover${project.experience ? " has-experience-art" : ""}` : "project-thumb";
  const role = project.presentation?.role || project.experience?.role;
  const roleClass = project.presentation ? "project-contribution" : "project-role";
  // The first row is likely above the fold on desktop: load it right away.
  const loading = index < 2 ? "eager" : "lazy";

  return `
    <article class="project-card ${project.experience ? `project-card--${project.experience.theme}` : ""}" style="--card-index: ${Number(index) || 0}">
      <button type="button" data-project-trigger="${project.id}" aria-label="Abrir el caso ${project.title}">
        <div class="project-card-shell">
          <div
            class="${thumbClass}"
            style="${getProjectSurfaceStyle(project)}"
          >
            ${project.experience ? `<img class="experience-card-art" src="${project.cover.src}" alt="" loading="${loading}" decoding="async" draggable="false" />` : ""}
            <div class="project-thumb-inner">
              <div class="project-thumb-top">
                <span class="project-year">${project.year}</span>
              </div>

              <div class="project-thumb-bottom">
                <span class="project-kicker">${project.accent.label}</span>
                <strong>${project.title}</strong>
              </div>
            </div>
          </div>

          <div class="project-body">
            <div class="project-meta-top">
              <p class="project-badge">${project.context}</p>
              <span class="category-pill">${project.category} · ${project.year}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            ${role ? `<p class="${roleClass}"><span class="project-role-label">Mi rol</span> ${role}</p>` : ""}
            <div class="project-footer">
              <span class="project-tools">${project.tools.slice(0, 3).join(" / ")}</span>
              <span class="project-link">Ver caso <span class="project-link-arrow" aria-hidden="true">→</span></span>
            </div>
          </div>
        </div>
      </button>
    </article>
  `;
}

function renderExperience() {
  const container = document.querySelector("[data-experience-list]");
  if (!container) return;

  container.innerHTML = getViewData().experiences
    .map(
      (item) => `
        <article class="timeline-item">
          <span class="timeline-period">${item.period}</span>
          <h4>${item.company} | ${item.role}</h4>
          <p>${item.type}</p>
          ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
          <ul>
            ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderEducation() {
  const container = document.querySelector("[data-education-list]");
  if (!container) return;

  container.innerHTML = getViewData().education
    .map(
      (item) => `
        <article class="timeline-item">
          <span class="timeline-period">${item.period}</span>
          <h4>${item.degree}</h4>
          <p>${item.institution}</p>
          ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
        </article>
      `
    )
    .join("");
}

function renderSkills() {
  const board = document.querySelector("[data-skills-board]");
  if (!board) return;

  board.innerHTML = getViewData().skillGroups
    .map(
      (group) => `
        <article class="skill-group" data-reveal="up">
          <h3>${group.title}</h3>
          <p>${group.description}</p>
          <div class="skill-tags">
            ${group.items.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", handleContactSubmit);
    form.addEventListener("input", () => {
      const emailLink = form.querySelector("[data-contact-email-fallback]");
      if (emailLink && !emailLink.hidden) offerContactEmail(form);
    });
  }

  if (form) form.dataset.readyAt = String(Date.now());

  setupDockLocation();
  setupScrollProgress();
}

function handleDocumentClick(event) {
  const caseLink = event.target.closest(".case-navigation a");
  if (caseLink) {
    const scroll = caseLink.closest(".modal-scroll");
    const section = scroll?.querySelector(caseLink.getAttribute("href"));
    if (scroll && section) {
      event.preventDefault();
      const top = scroll.scrollTop + section.getBoundingClientRect().top - scroll.getBoundingClientRect().top - 32;
      scroll.scrollTo({ top, behavior: isMotionReduced() ? "auto" : "smooth" });
      section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
    }
    return;
  }

  if (event.target.closest("[data-theme-toggle]")) {
    toggleTheme();
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    state.activeFilter = filterButton.dataset.filter;
    renderFilters();
    renderProjects();
    // Re-rendering replaces the buttons: hand focus back to the chosen one.
    document.querySelector("[data-filter-group] .filter-button.is-active")?.focus({ preventScroll: true });
    return;
  }

  const projectTrigger = event.target.closest("[data-project-trigger]");
  if (projectTrigger) {
    openProject(projectTrigger.dataset.projectTrigger);
    return;
  }

  if (event.target.closest("[data-close-modal]")) {
    closeProject();
    return;
  }

}

function initTheme() {
  applyTheme(getPreferredTheme());
}

function getPreferredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {}
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const themeColorMeta = document.querySelector("#theme-color-meta");
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", theme === "dark" ? "#050608" : "#f7f6f2");
  }
  updateThemeToggleUI(theme);
}

function updateThemeToggleUI(theme) {
  const isDark = theme === "dark";

  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
    toggle.dataset.themeState = theme;
  });

  document.querySelectorAll("[data-theme-label]").forEach((label) => {
    label.textContent = isDark ? "Claro" : "Oscuro";
  });

  document.querySelectorAll("[data-theme-title]").forEach((label) => {
    label.textContent = isDark ? "Modo claro" : "Modo oscuro";
  });
}

function handleKeydown(event) {
  if (event.key === "Escape" && state.activeProjectId) {
    closeProject();
  }
}

function openProject(projectId) {
  const project = getViewData().projects.find((item) => unescapeHTML(item.id) === projectId);
  if (!project) return;

  state.activeProjectId = projectId;
  state.lastFocusedElement = document.activeElement;

  const modal = document.querySelector("[data-project-modal]");
  const hero = document.querySelector("[data-modal-hero]");
  const body = document.querySelector("[data-modal-body]");

  if (!modal || !hero || !body) return;
  finishModalClose?.();
  activeProjectExperience?.();
  activeProjectExperience = null;
  if (project.experience && window.ProjectExperiences) {
    modal.dataset.experience = project.experience.theme;
  } else {
    delete modal.dataset.experience;
  }

  hero.className = project.cover?.src ? "modal-hero has-cover" : "modal-hero";
  hero.setAttribute("style", getProjectSurfaceStyle(project));
  const useCaseCover = Boolean(project.presentation || modal.dataset.experience);
  hero.classList.toggle("case-hero", useCaseCover);
  hero.hidden = Boolean(modal.dataset.experience && project.experience.showCover === false);
  hero.innerHTML = hero.hidden ? "" : useCaseCover && project.cover?.src
    ? `<img class="case-cover-image" src="${project.cover.src}" alt="Portada de ${project.title}" />`
    : `
    <div class="modal-hero-top">
      <span>${project.category}</span>
      <span>${project.context}</span>
    </div>

    <div class="modal-hero-bottom">
      <div>
        <p class="project-badge">${project.year}</p>
        <h2 class="modal-title" id="project-modal-title">${project.title}</h2>
      </div>
      <p class="modal-summary">${project.summary}</p>
    </div>
  `;

  body.innerHTML = project.experience && window.ProjectExperiences
    ? window.ProjectExperiences.render(project, createMediaBlock)
    : project.presentation ? createUXCaseStudy(project) : `
    <section class="modal-overview">
      <article class="modal-section">
        <h3>Descripción general</h3>
        <p>${project.overview}</p>

        <h3>Objetivo del trabajo</h3>
        <p>${project.objective}</p>

        <h3>Problema o necesidad</h3>
        <p>${project.challenge}</p>
      </article>

      <article class="modal-section">
        <h3>Herramientas utilizadas</h3>
        <div class="modal-tags">
          ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
        </div>

        <h3>Entregables</h3>
        <ul class="modal-list">
          ${project.deliverables.map((item) => `<li>${item}</li>`).join("")}
        </ul>

        ${
          project.external
            ? `<a class="btn btn-secondary" href="${project.external.href}" target="_blank" rel="noopener noreferrer">${project.external.label}</a>`
            : ""
        }
      </article>
    </section>

    <section class="modal-section">
      <h3>Proceso creativo</h3>
      <ul class="modal-list">
        ${project.process.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    </section>

    <section class="modal-section">
      <h3>Bocetos, mockups, imágenes o videos</h3>
      <div class="media-grid">
        ${project.media.map((item) => createMediaBlock(item, project)).join("")}
      </div>
    </section>

    <section class="modal-overview">
      <article class="modal-section">
        <h3>Resultado final</h3>
        <p>${project.outcome}</p>
      </article>
      <article class="modal-section">
        <h3>Aprendizajes</h3>
        <p>${project.learnings}</p>
      </article>
    </section>
  `;

  resetProjectModalScroll(modal);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  resetProjectModalScroll(modal);
  prepareProjectMedia(modal);
  if (project.experience && window.ProjectExperiences) {
    activeProjectExperience = window.ProjectExperiences.mount(modal);
  }

  // Everything behind the dialog stops receiving focus and clicks.
  const shell = document.querySelector(".site-shell");
  if (shell) shell.inert = true;

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();

  if (window.gsap && !isMotionReduced()) {
    gsap.fromTo(".modal-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      ".modal-dialog",
      { y: 24, opacity: 0, scale: 0.985 },
      { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: "power3.out" }
    );
  }
}

function createUXCaseStudy(project) {
  const presentation = project.presentation;
  // Keep demos before the gallery, without loading or duplicating extra media.
  const demos = project.media.filter((item) => item.type === "video" || item.type === "embed");
  const visuals = project.media.filter((item) => item.type !== "video" && item.type !== "embed");
  const orderedDemos = [...demos.filter((item) => item.type === "video"), ...demos.filter((item) => item.type === "embed")];
  const prototype = demos.find((item) => item.type === "embed" && item.embedUrl?.startsWith("https://embed.figma.com/"));
  let prototypeLink = "";

  if (prototype) {
    const url = new URL(unescapeHTML(prototype.embedUrl));
    url.hostname = "www.figma.com";
    url.searchParams.delete("embed-host");
    prototypeLink = `<a class="text-link" href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer">Abrir prototipo en Figma ↗</a>`;
  }

  return `
    <header class="case-title-block">
      <p class="project-badge">${project.category} · ${project.year}</p>
      <h2 id="project-modal-title">${project.title}</h2>
      <p>${project.summary}</p>
    </header>
    <section class="modal-section case-at-a-glance" aria-label="Ficha del proyecto">
      <dl class="case-facts">
        <div><dt>Mi aporte</dt><dd>${presentation.role}</dd></div>
        <div><dt>Formato</dt><dd>${presentation.format}</dd></div>
        <div><dt>Foco del proyecto</dt><dd>${presentation.focus}</dd></div>
      </dl>
      <nav class="case-navigation" aria-label="Dentro del proyecto">
        ${demos.length ? `<a href="#case-demo">Explorar el recorrido</a>` : ""}
        <a href="#case-process">Enfoque de diseño</a>
        ${visuals.length ? `<a href="#case-visuals">Ver pantallas</a>` : ""}
      </nav>
    </section>

    <section class="modal-overview">
      <article class="modal-section">
        <h3>El reto</h3>
        <p>${project.challenge}</p>
        <h3>Objetivo de diseño</h3>
        <p>${project.objective}</p>
      </article>
      <article class="modal-section">
        <h3>Contexto y alcance</h3>
        <p>${project.overview}</p>
        <p>${presentation.evidence}</p>
        <div class="modal-tags">${project.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
      </article>
    </section>

    ${orderedDemos.length ? `
      <section class="modal-section case-section" id="case-demo" aria-labelledby="case-demo-title">
        <div class="case-section-heading">
          <div><h3 id="case-demo-title">Explorá cómo funciona</h3>
          <p>${orderedDemos.some((item) => item.type === "video") ? "Mirá el recorrido en video o probá el prototipo a tu ritmo." : "Probá el recorrido en Figma. También podés abrirlo en otra pestaña."}</p></div>
          ${prototypeLink}
        </div>
        <div class="case-demo-media">${orderedDemos.map((item) => createMediaBlock(item, project)).join("")}</div>
      </section>` : ""}

    <section class="modal-section case-section" id="case-process" aria-labelledby="case-process-title">
      <h3 id="case-process-title">Enfoque de diseño</h3>
      <ol class="case-process-list">${project.process.map((step) => `<li>${step}</li>`).join("")}</ol>
    </section>

    ${visuals.length ? `
      <section class="modal-section case-section" id="case-visuals" aria-labelledby="case-visuals-title">
        <h3 id="case-visuals-title">Pantallas y detalles</h3>
        <div class="media-grid">${visuals.map((item) => createMediaBlock(item, project)).join("")}</div>
      </section>` : ""}

    <section class="modal-overview">
      <article class="modal-section">
        <h3>Resultado de diseño</h3><p>${project.outcome}</p>
        <h3>Entregables</h3>
        <ul class="modal-list">${project.deliverables.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article class="modal-section">
        <h3>Reflexión</h3><p>${project.learnings}</p>
      </article>
    </section>
  `;
}

function prepareProjectMedia(modal) {
  const videos = Array.from(modal.querySelectorAll(".media-video"));
  if (!videos.length) return;

  const enableVideoPerformanceMode = (activeVideo) => {
    videos.forEach((video) => {
      if (video !== activeVideo) {
        video.pause();
      }
    });

    document.body.classList.add("video-performance-mode");
    stopBackgroundGlintMotion();
  };

  const restoreMotionAfterVideo = (event) => {
    if (modal.hidden || !event.currentTarget.isConnected || videos.some((video) => !video.paused && !video.ended)) return;
    if (document.body.classList.contains("video-performance-mode")) {
      document.body.classList.remove("video-performance-mode");
      setupBackgroundLineMotion();
    }
  };

  videos.forEach((video) => {
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("preload", "metadata");
    video.playsInline = true;
    video.preload = "metadata";

    const activate = () => {
      if (video.preload !== "auto") {
        video.preload = "auto";
      }

      enableVideoPerformanceMode(video);
    };

    video.addEventListener("play", activate);
    video.addEventListener("playing", activate);
    video.addEventListener("pause", restoreMotionAfterVideo);
    video.addEventListener("ended", restoreMotionAfterVideo);
  });
}

function resetProjectModalScroll(modal) {
  const modalScroll = modal?.querySelector(".modal-scroll");
  if (!(modalScroll instanceof HTMLElement)) return;

  modalScroll.scrollTop = 0;

  window.requestAnimationFrame(() => {
    modalScroll.scrollTop = 0;
  });
}

function createMediaBlock(item, project) {
  if (item.type === "video") {
    if (item.src) {
      return `
        <article class="media-card">
          <video class="media-video" controls preload="metadata" ${item.poster ? `poster="${item.poster}"` : ""}>
            <source src="${item.src}" type="video/mp4" />
          </video>
          <div class="media-caption">
            <strong>${item.title}</strong>
            ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
          </div>
        </article>
      `;
    }

    return `
      <article class="media-card">
        <div
          class="media-placeholder"
          style="--media-start: ${project.accent.start}; --media-end: ${project.accent.end};"
        >
          <div>
            <span class="project-badge">Video / Motion</span>
            <strong>${item.title}</strong>
          </div>
          ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
        </div>
      </article>
    `;
  }

  if (item.type === "embed") {
    if (item.embedUrl) {
      const frameStyle = item.frameHeight ? `style="min-height: ${item.frameHeight};"` : "";

      return `
        <article class="media-card">
          <iframe
            class="embed-frame"
            src="${item.embedUrl}"
            title="${item.title}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            ${frameStyle}
            allowfullscreen
          ></iframe>
          <div class="embed-caption">
            <strong>${item.title}</strong>
            ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
          </div>
        </article>
      `;
    }

    return `
      <article class="media-card">
        <div
          class="embed-placeholder"
          style="--media-start: ${project.accent.start}; --media-end: ${project.accent.end};"
        >
          <div>
            <span class="project-badge">Embed listo</span>
            <strong>${item.title}</strong>
          </div>
          ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
          <a class="btn btn-secondary" href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">Agregar Figma</a>
        </div>
      </article>
    `;
  }

  if (item.image) {
    return `
      <article class="media-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
        <div class="media-caption">
          <strong>${item.title}</strong>
          ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
        </div>
      </article>
    `;
  }

  return `
    <article class="media-card">
      <div
        class="media-placeholder"
        style="--media-start: ${project.accent.start}; --media-end: ${project.accent.end};"
      >
        <div>
          <span class="project-badge">${project.category}</span>
          <strong>${item.title}</strong>
        </div>
        ${item.description ? `${item.description ? `${item.description ? `<p>${item.description}</p>` : ""}` : ""}` : ""}
      </div>
    </article>
  `;
}

let finishModalClose = null;

function closeProject() {
  const modal = document.querySelector("[data-project-modal]");
  if (!modal || modal.hidden || finishModalClose) return;

  const finish = () => {
    finishModalClose = null;
    if (window.gsap) {
      gsap.killTweensOf([".modal-dialog", ".modal-backdrop"]);
      gsap.set([".modal-dialog", ".modal-backdrop"], { clearProps: "all" });
    }
    activeProjectExperience?.();
    activeProjectExperience = null;

    modal.querySelectorAll(".media-video").forEach((video) => {
      video.pause();

      try {
        video.currentTime = 0;
      } catch {}
    });

    resetProjectModalScroll(modal);
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    document.body.classList.remove("video-performance-mode");
    state.activeProjectId = null;

    const shell = document.querySelector(".site-shell");
    if (shell) shell.inert = false;

    setupBackgroundLineMotion();

    if (state.lastFocusedElement instanceof HTMLElement) {
      state.lastFocusedElement.focus();
    }
  };

  if (!window.gsap || isMotionReduced()) {
    finish();
    return;
  }

  // Leave the way it came in, a little faster.
  finishModalClose = finish;
  gsap.to(".modal-backdrop", { autoAlpha: 0, duration: 0.24, ease: "power2.in" });
  gsap.to(".modal-dialog", {
    y: 16,
    opacity: 0,
    scale: 0.985,
    duration: 0.24,
    ease: "power2.in",
    onComplete: finish
  });
}

const CONTACT_LIMITS = { nombre: 80, email: 120, mensaje: 2000 };
const CONTACT_MIN_FILL_MS = 2500;
const CONTACT_COOLDOWN_MS = 20000;

async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement) || form.dataset.submitting === "true") return;
  const data = new FormData(form);

  // Bots fill every field, including the hidden one. Drop those quietly.
  if (String(data.get("_honey") || "").trim()) {
    setContactFormStatus(form, "success", "Consulta recibida por el servicio de envío.");
    form.reset();
    return;
  }

  const now = Date.now();
  const readyAt = Number(form.dataset.readyAt) || 0;
  const cooldownUntil = Number(form.dataset.cooldownUntil) || 0;
  if ((readyAt && now - readyAt < CONTACT_MIN_FILL_MS) || now < cooldownUntil) {
    setContactFormStatus(form, "error", "Esperá unos segundos y volvé a enviar.");
    return;
  }

  for (const field of ["nombre", "email", "mensaje"]) {
    const value = String(data.get(field) || "").trim();
    if (!value) {
      setContactFormStatus(form, "error", "Completá nombre, email y mensaje antes de enviar.");
      return;
    }
    if (value.length > CONTACT_LIMITS[field]) {
      setContactFormStatus(form, "error", "El texto es demasiado largo. Acortalo y volvé a enviar.");
      return;
    }
    data.set(field, value);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.get("email"))) {
    setContactFormStatus(form, "error", "Revisá el email: no parece una dirección válida.");
    return;
  }

  form.dataset.submitting = "true";
  setContactFormStatus(form, "sending", "Enviando consulta. La confirmación puede tardar unos segundos.");
  setContactFormDisabled(form, true);

  const endpoint = form.action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);
  const fallback = `Podés escribirme directamente a ${portfolioData.profile.email}.`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: controller.signal
    });

    const result = await response.json();
    if (/activat|confirm (?:your|the) (?:form|email)/i.test(result?.message || "")) {
      setContactFormStatus(form, "error", `El formulario todavía requiere activación. ${fallback}`);
      offerContactEmail(form);
      return;
    }

    if (!response.ok || (result?.success !== true && result?.success !== "true")) {
      throw new Error("FormSubmit did not confirm the submission");
    }

    setContactFormStatus(form, "success", "Consulta recibida por el servicio de envío.");
    const emailLink = form.querySelector("[data-contact-email-fallback]");
    if (emailLink) emailLink.hidden = true;
    form.dataset.cooldownUntil = String(Date.now() + CONTACT_COOLDOWN_MS);
    form.reset();
  } catch {
    setContactFormStatus(form, "error", `No pude confirmar el envío. ${fallback}`);
    offerContactEmail(form);
  } finally {
    window.clearTimeout(timeout);
    form.dataset.submitting = "false";
    setContactFormDisabled(form, false);
  }
}

function offerContactEmail(form) {
  const link = form.querySelector("[data-contact-email-fallback]");
  if (!link) return;
  const data = new FormData(form);
  const name = String(data.get("nombre") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("mensaje") || "").trim();
  const subject = encodeURIComponent("Consulta desde el portfolio");
  const body = encodeURIComponent(`${message}\r\n\r\nNombre: ${name}\r\nEmail: ${email}`);
  link.href = `mailto:${portfolioData.profile.email}?subject=${subject}&body=${body}`;
  link.hidden = false;
}

function setContactFormDisabled(form, disabled) {
  const submitButton = form.querySelector("[data-contact-submit]");
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = disabled;
    submitButton.textContent = disabled ? "Enviando..." : "Enviar consulta";
  }
}

function setContactFormStatus(form, stateName, message) {
  const statusNode = form.querySelector("[data-form-status]");
  if (!(statusNode instanceof HTMLElement)) return;

  statusNode.textContent = message;
  statusNode.classList.remove("is-sending", "is-success", "is-error");

  if (stateName === "sending") {
    statusNode.classList.add("is-sending");
  } else if (stateName === "success") {
    statusNode.classList.add("is-success");
  } else if (stateName === "error") {
    statusNode.classList.add("is-error");
  }
}

function updateCurrentYear() {
  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

function setupDockLocation() {
  // Only in-page links (#section); the language switch is a normal link.
  const entries = [...document.querySelectorAll('[data-portfolio-dock] a[href^="#"]')].map(link => ({
    link, section: document.querySelector(link.getAttribute("href"))
  })).filter(entry => entry.section);
  let frame = null;
  let current = entries.find(({ link }) => link.hasAttribute("aria-current"));
  const update = () => {
    frame = null;
    const marker = window.innerHeight * 0.4;
    let active = entries[0];
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= marker) active = entry;
    }
    if (active === current) return;
    current?.link.removeAttribute("aria-current");
    active?.link.setAttribute("aria-current", "location");
    current = active;
  };
  const schedule = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();
}

function setupScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;

  let frame = null;
  const update = () => {
    frame = null;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    bar.style.transform = `scaleX(${progress.toFixed(4)})`;
  };
  const schedule = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();
}

// Cards are rendered by script and re-rendered by the filters, so their
// entrance is a CSS animation that starts once the grid is on screen.
function setupProjectGridReveal() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  if (isMotionReduced() || !("IntersectionObserver" in window)) {
    grid.classList.add("is-inview");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        grid.classList.add("is-inview");
        observer.disconnect();
      }
    },
    { rootMargin: "0px 0px -12% 0px" }
  );
  observer.observe(grid);
}

function initAnimations() {
  setupBackgroundLineMotion();
  initHeroGlow();

  if (isMotionReduced() || !window.gsap) {
    initFallbackReveal();
    return;
  }

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  initAmbientMotion();
  initImmersiveMotion();
}


function initHeroGlow() {
  const heroTitle = document.querySelector(".hero-main h1");
  if (!heroTitle || !shouldAllowBackgroundEnhancement()) return;

  heroTitle.setAttribute("data-glow", heroTitle.textContent.trim());

  const triggerGlow = () => {
    if (!heroTitle.closest('.hero-main') || heroTitle.classList.contains('is-designing')) return;
    heroTitle.classList.remove("is-glowing");
    void heroTitle.offsetWidth;
    heroTitle.classList.add("is-glowing");
  };

  heroTitle.addEventListener("animationend", () => {
    heroTitle.classList.remove("is-glowing");
  });

  window.setTimeout(triggerGlow, 1100);
  document.addEventListener("portfolio:intro-end", triggerGlow);

  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      id: "hero-glow-return",
      trigger: ".hero",
      start: "top 35%",
      end: "bottom top",
      onEnterBack: triggerGlow
    });
  }
}
function initAmbientMotion() {
  if (!window.gsap) return;

  gsap.to(".ambient-one", {
    x: 24,
    y: -18,
    duration: 8.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".ambient-two", {
    x: -20,
    y: 18,
    duration: 9.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".ambient-three", {
    x: 16,
    y: 10,
    duration: 7.6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
}

function initImmersiveMotion() {
  if (immersiveMotionBooted || isMotionReduced() || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  immersiveMotionBooted = true;

  setupHeroScrollScenes();
  setupSectionScrollScenes();
  setupPanelRevealScenes();
  setupBackgroundLineMotion();
  setupPointerDepth();

  ScrollTrigger.refresh();
}

function setupHeroScrollScenes() {
  gsap.to(".hero-main", {
    yPercent: -7,
    ease: "none",
    scrollTrigger: {
      id: "hero-main-parallax",
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.05
    }
  });

  gsap.to(".hero-support", {
    yPercent: -4,
    ease: "none",
    scrollTrigger: {
      id: "hero-support-parallax",
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.1
    }
  });

  gsap.to(".hero-cards", {
    yPercent: 7,
    ease: "none",
    scrollTrigger: {
      id: "hero-cards-parallax",
      trigger: ".hero",
      start: "top 5%",
      end: "bottom top",
      scrub: 1.2
    }
  });
}

function setupSectionScrollScenes() {
  const intros = Array.from(document.querySelectorAll(".section-intro"));

  intros.forEach((intro, index) => {
    const meta = intro.querySelector(".section-meta");
    const heading = intro.querySelector(".section-copy h2");
    let line = null;

    // The heading rises from behind a mask: one clear move per section.
    if (heading && !heading.querySelector(".heading-mask-line")) {
      line = document.createElement("span");
      line.className = "heading-mask-line";
      line.append(...heading.childNodes);
      heading.append(line);
      heading.classList.add("heading-mask");
    }

    if (meta) gsap.set(meta, { x: -14, autoAlpha: 0 });
    if (line) gsap.set(line, { yPercent: 112 });

    ScrollTrigger.create({
      id: `section-intro-${index}`,
      trigger: intro,
      start: "top 86%",
      once: true,
      onEnter: () => {
        if (meta) {
          gsap.to(meta, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", overwrite: true });
        }
        if (line) {
          gsap.to(line, { yPercent: 0, duration: 0.85, ease: "power4.out", delay: 0.06, overwrite: true });
        }
      }
    });
  });
}

function setupPanelRevealScenes() {
  const elements = Array.from(
    document.querySelectorAll("[data-reveal]:not(.section-intro):not(.hero [data-reveal])")
  );
  if (!elements.length) return;

  // Opacity and position only: no blur filters and no per-panel parallax,
  // so text never moves while someone is reading it.
  gsap.set(elements, { y: 22, autoAlpha: 0 });

  ScrollTrigger.batch(elements, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
        clearProps: "transform"
      });
    }
  });
}

function stopBackgroundGlintMotion() {
  if (backgroundGlintFrame !== null) {
    window.cancelAnimationFrame(backgroundGlintFrame);
    backgroundGlintFrame = null;
  }
}

function getGlintOpacity(progress) {
  if (progress <= 0.08) {
    return progress / 0.08;
  }

  if (progress >= 0.84) {
    return Math.max(0, 1 - (progress - 0.84) / 0.16);
  }

  return 1;
}

function startBackgroundGlintMotion(glintLines) {
  stopBackgroundGlintMotion();

  if (!glintLines.length) {
    return;
  }

  const states = glintLines.map((line) => {
    const length =
      Number.parseFloat(line.style.getPropertyValue("--line-length")) || line.getTotalLength();
    const segment = Number.parseFloat(line.style.getPropertyValue("--glint-segment")) || 180;
    const duration =
      (Number.parseFloat(line.style.getPropertyValue("--glint-duration")) || 10) * 1000;
    const delay =
      (Number.parseFloat(line.style.getPropertyValue("--glint-delay")) || 0) * 1000;
    const startOffset = length + segment;
    const endOffset = -(segment + 240);

    line.style.setProperty("stroke-dasharray", `${segment} ${length + 420}`, "important");
    line.style.setProperty("stroke-dashoffset", `${startOffset}`, "important");
    line.style.setProperty("opacity", "0", "important");

    return {
      line,
      duration,
      delay,
      startOffset,
      endOffset
    };
  });

  const tick = (now) => {
    states.forEach((state) => {
      const elapsed = now - state.delay;
      const progress = ((elapsed % state.duration) + state.duration) % state.duration / state.duration;
      const offset = state.startOffset + (state.endOffset - state.startOffset) * progress;

      state.line.style.setProperty("stroke-dashoffset", `${offset}`, "important");
      state.line.style.setProperty("opacity", `${getGlintOpacity(progress)}`, "important");
    });

    backgroundGlintFrame = window.requestAnimationFrame(tick);
  };

  backgroundGlintFrame = window.requestAnimationFrame(tick);
}


function setupBackgroundLineMotion() {
  stopBackgroundGlintMotion();

  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => {
      const id = trigger.vars && trigger.vars.id;
      if (typeof id === "string" && id.startsWith("bg-line")) {
        trigger.kill();
      }
    });
  }

  document.querySelectorAll(".bg-line-glint").forEach((line) => line.remove());
  document.querySelectorAll(".background-lines--glints").forEach((layer) => layer.remove());

  const svg = document.querySelector(".background-lines:not(.background-lines--glints)");
  const allLines = Array.from(document.querySelectorAll(".bg-line-base, .bg-line"));
  const primaryLines = Array.from(document.querySelectorAll(".bg-line"));
  if (!svg || !allLines.length) return;
  const allowLineEnhancement = shouldAllowBackgroundEnhancement();

  const linePresets = {
    "bg-line-one": { draw: 18, delay: -2.4, glint: 9.8 },
    "bg-line-two": { draw: 21, delay: -8.2, glint: 11.6 },
    "bg-line-three": { draw: 19, delay: -12.4, glint: 10.4 },
    "bg-line-four": { draw: 22, delay: -5.6, glint: 12.8 },
    "bg-line-five": { draw: 24, delay: -15.1, glint: 14.2 },
    "bg-line-six": { draw: 22, delay: -10.3, glint: 12.1 }
  };

  allLines.forEach((line) => {
    const variantClass = Array.from(line.classList).find((className) =>
      Object.prototype.hasOwnProperty.call(linePresets, className)
    );
    const preset = variantClass ? linePresets[variantClass] : linePresets["bg-line-one"];
    const length = line.getTotalLength();

    line.style.setProperty("--line-length", `${length.toFixed(2)}`);
    line.style.setProperty("--line-drift-x", "0px");
    line.style.setProperty("--line-drift-y", "0px");
    line.style.setProperty("--line-rotate", "0deg");
    line.style.setProperty("--float-duration", "0s");
    line.style.setProperty("--float-delay", `${preset.delay}s`);
    line.style.setProperty("--draw-duration", `${preset.draw}s`);
    line.style.setProperty("--draw-delay", `${preset.delay * 0.8}s`);

    if (!allowLineEnhancement) {
      line.style.removeProperty("stroke-dasharray");
      line.style.removeProperty("stroke-dashoffset");
      line.style.removeProperty("transform");
    }
  });

  if (!allowLineEnhancement) {
    return;
  }

  // The moving glints repaint every frame. Keeping them in their own SVG means
  // the static lines (and their blurred glow) are rasterized once instead of on
  // every frame, so other animations no longer make the background stutter.
  const glintSvg = svg.cloneNode(false);
  glintSvg.classList.add("background-lines--glints");
  svg.insertAdjacentElement("afterend", glintSvg);

  primaryLines.forEach((line) => {
    const variantClass = Array.from(line.classList).find((className) =>
      Object.prototype.hasOwnProperty.call(linePresets, className)
    );
    const preset = variantClass ? linePresets[variantClass] : linePresets["bg-line-one"];
    const strokeWidth = Number.parseFloat(line.getAttribute("stroke-width") || "2");
    const length = line.getTotalLength();
    const segment = Math.max(140, Math.min(length * 0.12, 220));
    const clone = line.cloneNode(false);

    clone.setAttribute("class", ["bg-line-glint", variantClass || "bg-line-one"].join(" "));
    clone.setAttribute("stroke-width", String((strokeWidth + 0.9).toFixed(2)));
    clone.removeAttribute("style");
    clone.style.setProperty("--line-length", `${length.toFixed(2)}`);
    clone.style.setProperty("--line-drift-x", "0px");
    clone.style.setProperty("--line-drift-y", "0px");
    clone.style.setProperty("--line-rotate", "0deg");
    clone.style.setProperty("--float-duration", "0s");
    clone.style.setProperty("--float-delay", `${preset.delay}s`);
    clone.style.setProperty("--glint-duration", `${preset.glint}s`);
    clone.style.setProperty("--glint-delay", `${preset.delay * 0.36}s`);
    clone.style.setProperty("--glint-segment", `${segment.toFixed(2)}`);
    glintSvg.append(clone);
  });

  startBackgroundGlintMotion(Array.from(document.querySelectorAll(".bg-line-glint")));
}

function setupPointerDepth() {
  if (pointerDepthBooted || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  pointerDepthBooted = true;

  gsap.utils
    .toArray(".hero-card")
    .forEach((surface) => {
      surface.addEventListener("pointermove", (event) => {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(surface, {
          x: x * 7,
          y: y * 7,
          rotateX: y * -2.2,
          rotateY: x * 2.6,
          duration: 0.44,
          ease: "power3.out",
          transformPerspective: 900,
          transformOrigin: "center center",
          overwrite: true
        });
      });

      surface.addEventListener("pointerleave", () => {
        gsap.to(surface, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.58,
          ease: "power3.out",
          overwrite: true
        });
      });
    });
}

function initFallbackReveal() {
  if (isMotionReduced()) return;
  const elements = document.querySelectorAll("[data-reveal]:not(.hero [data-reveal])");
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            {
              duration: 620,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "forwards"
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}



















