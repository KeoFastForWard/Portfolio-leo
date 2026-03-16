if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const THEME_STORAGE_KEY = "leonel-portfolio-theme";

function resetPageScrollPosition() {
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
  return desktopViewportQuery.matches && reducedMotionQuery.matches;
}

function shouldAllowEnhancedMotion() {
  return !isMotionReduced() || shouldUseDesktopLightMotion();
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
let headerScrollBound = false;
let headerIsHidden = false;
let headerVisibilityTween = null;
let contactSubmitTimeout = null;
let lastScrollY = 0;
let scrollTicking = false;
let backgroundGlintFrame = null;

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
  renderExperience();
  renderEducation();
  renderSkills();
  bindEvents();
  updateCurrentYear();
  initAnimations();
});

function hydrateProfile() {
  const profile = portfolioData.profile;

  document.querySelectorAll("[data-profile-name]").forEach((node) => {
    node.textContent = profile.name;
  });

  document.querySelectorAll("[data-profile-role]").forEach((node) => {
    node.textContent = profile.role;
  });

  document.querySelectorAll("[data-profile-tagline]").forEach((node) => {
    node.textContent = profile.tagline;
  });

  document.querySelectorAll("[data-profile-email]").forEach((node) => {
    node.textContent = profile.email;
    node.setAttribute("href", `mailto:${profile.email}`);
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm instanceof HTMLFormElement) {
    contactForm.setAttribute("action", `https://formsubmit.co/${profile.email}`);
  }

  document.querySelectorAll("[data-profile-linkedin]").forEach((node) => {
    node.setAttribute("href", profile.linkedin);
  });

  document.querySelectorAll("[data-profile-behance]").forEach((node) => {
    node.setAttribute("href", profile.behance);
  });
}

function renderFilters() {
  const filterGroup = document.querySelector("[data-filter-group]");
  if (!filterGroup) return;

  filterGroup.innerHTML = portfolioData.filters
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

  const visibleProjects =
    state.activeFilter === "Todos"
      ? portfolioData.projects
      : portfolioData.projects.filter((project) =>
          project.categories.includes(state.activeFilter)
        );

  if (!visibleProjects.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <strong>No hay proyectos cargados en esta categoría todavía.</strong>
        <p>Podés sumar nuevos casos desde <code>portfolio-data.js</code> cuando quieras ampliar el portfolio.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = visibleProjects
    .map((project, index) => createProjectCard(project, index))
    .join("");

  animateRenderedProjects();
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

function createProjectCard(project, index) {
  const number = String(index + 1).padStart(2, "0");
  const thumbClass = project.cover?.src ? "project-thumb has-cover" : "project-thumb";

  return `
    <article class="project-card" data-reveal="up">
      <button type="button" data-project-trigger="${project.id}" aria-label="Abrir ${project.title}">
        <div class="project-card-shell">
          <div
            class="${thumbClass}"
            style="${getProjectSurfaceStyle(project)}"
          >
            <div class="project-thumb-inner">
              <div class="project-thumb-top">
                <span class="project-index">${number}</span>
                <span class="project-year">${project.year}</span>
              </div>

              <div class="project-preview" aria-hidden="true">
                <div class="project-preview-head">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="project-preview-body">
                  <span class="project-preview-chip">${project.category}</span>
                  <span class="preview-line short"></span>
                  <span class="preview-line"></span>
                  <span class="preview-line medium"></span>
                  <div class="preview-grid">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
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
              <span class="category-pill">${project.category}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            <div class="project-footer">
              <span class="project-tools">${project.tools.slice(0, 3).join(" / ")}</span>
              <span class="project-link">Ver caso</span>
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

  container.innerHTML = portfolioData.experiences
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

  container.innerHTML = portfolioData.education
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

  board.innerHTML = portfolioData.skillGroups
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
  }

  const contactFrame = document.querySelector("[data-contact-frame]");
  if (contactFrame instanceof HTMLIFrameElement) {
    contactFrame.addEventListener("load", handleContactFrameLoad);
  }

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
}

function handleDocumentClick(event) {
  if (event.target.closest("[data-theme-toggle]")) {
    toggleTheme();
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    state.activeFilter = filterButton.dataset.filter;
    renderFilters();
    renderProjects();
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

  if (event.target.closest("[data-nav-toggle]")) {
    toggleMobileNav();
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
  const project = portfolioData.projects.find((item) => item.id === projectId);
  if (!project) return;

  state.activeProjectId = project.id;
  state.lastFocusedElement = document.activeElement;

  const modal = document.querySelector("[data-project-modal]");
  const hero = document.querySelector("[data-modal-hero]");
  const body = document.querySelector("[data-modal-body]");

  if (!modal || !hero || !body) return;

  hero.className = project.cover?.src ? "modal-hero has-cover" : "modal-hero";
  hero.setAttribute("style", getProjectSurfaceStyle(project));
  hero.innerHTML = `
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

  body.innerHTML = `
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
            ? `<a class="btn btn-secondary" href="${project.external.href}" target="_blank" rel="noreferrer">${project.external.label}</a>`
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
  showHeader(true);
  resetProjectModalScroll(modal);
  hydrateProjectModalMedia(modal);

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();

  if (window.gsap && shouldAllowEnhancedMotion()) {
    gsap.fromTo(
      ".modal-dialog",
      { y: 24, autoAlpha: 0, scale: 0.985 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.42, ease: "power3.out" }
    );
  }
}

function resetProjectModalScroll(modal) {
  const modalScroll = modal?.querySelector(".modal-scroll");
  if (!(modalScroll instanceof HTMLElement)) return;

  modalScroll.scrollTop = 0;

  window.requestAnimationFrame(() => {
    modalScroll.scrollTop = 0;
  });
}

function hydrateProjectModalMedia(modal) {
  const modalScroll = modal?.querySelector(".modal-scroll");
  if (!(modalScroll instanceof HTMLElement)) return;

  const videoObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              const video = entry.target;
              if (!(video instanceof HTMLVideoElement)) return;

              const source = video.querySelector("source[data-src]");
              if (!(source instanceof HTMLSourceElement) || !source.dataset.src) return;

              if (source.dataset.loaded !== "true") {
                source.src = source.dataset.src;
                source.dataset.loaded = "true";
                video.load();
              }

              observer.unobserve(video);
            });
          },
          {
            root: modalScroll,
            rootMargin: "220px 0px",
            threshold: 0.08
          }
        )
      : null;

  modal._videoObserver = videoObserver ?? null;

  modal.querySelectorAll(".media-video").forEach((video) => {
    if (!(video instanceof HTMLVideoElement)) return;

    const source = video.querySelector("source[data-src]");
    if (!(source instanceof HTMLSourceElement)) return;

    const loadVideoSource = () => {
      if (!source.dataset.src || source.dataset.loaded === "true") return;
      source.src = source.dataset.src;
      source.dataset.loaded = "true";
      video.load();
    };

    if (videoObserver) {
      videoObserver.observe(video);
    } else {
      loadVideoSource();
    }

    video.addEventListener("play", loadVideoSource, { once: true });
    video.addEventListener("pointerenter", loadVideoSource, { once: true });
    video.addEventListener("focus", loadVideoSource, { once: true });
  });
}

function cleanupProjectModalMedia(modal) {
  if (modal?._videoObserver instanceof IntersectionObserver) {
    modal._videoObserver.disconnect();
  }

  if (modal && "_videoObserver" in modal) {
    delete modal._videoObserver;
  }

  modal?.querySelectorAll(".media-video").forEach((video) => {
    if (!(video instanceof HTMLVideoElement)) return;

    video.pause();
    video.currentTime = 0;

    const source = video.querySelector("source[data-src]");
    if (source instanceof HTMLSourceElement && source.dataset.loaded === "true") {
      source.removeAttribute("src");
      source.dataset.loaded = "false";
      video.load();
    }
  });

  modal?.querySelectorAll(".embed-frame").forEach((frame) => {
    if (!(frame instanceof HTMLIFrameElement)) return;
    frame.src = "about:blank";
  });
}

function createMediaBlock(item, project) {
  if (item.type === "video") {
    if (item.src) {
      return `
        <article class="media-card">
          <video class="media-video" controls preload="none" playsinline ${item.poster ? `poster="${item.poster}"` : ""}>
            <source data-src="${item.src}" type="video/mp4" />
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
          <a class="btn btn-secondary" href="https://www.figma.com/" target="_blank" rel="noreferrer">Agregar Figma</a>
        </div>
      </article>
    `;
  }

  if (item.image) {
    return `
      <article class="media-card">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
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

function closeProject() {
  const modal = document.querySelector("[data-project-modal]");
  if (!modal) return;

  resetProjectModalScroll(modal);
  modal.hidden = true;
  cleanupProjectModalMedia(modal);
  document.body.classList.remove("modal-open");
  state.activeProjectId = null;

  if (state.lastFocusedElement instanceof HTMLElement) {
    state.lastFocusedElement.focus();
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;

  const data = new FormData(form);
  const name = String(data.get("nombre") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("mensaje") || "").trim();

  if (!name || !email || !message) {
    event.preventDefault();
    setContactFormStatus(form, "error", "Completá nombre, email y mensaje antes de enviar.");
    return;
  }

  const subjectInput = form.querySelector('input[name="_subject"]');
  const replyToInput = form.querySelector('input[name="_replyto"]');

  if (subjectInput instanceof HTMLInputElement) {
    subjectInput.value = `Consulta desde portfolio | ${name}`;
  }

  if (replyToInput instanceof HTMLInputElement) {
    replyToInput.value = email;
  }

  form.dataset.submitting = "true";
  setContactFormStatus(form, "sending", "Enviando consulta...");
  setContactFormDisabled(form, true);

  window.clearTimeout(contactSubmitTimeout);
  contactSubmitTimeout = window.setTimeout(() => {
    if (form.dataset.submitting !== "true") return;

    form.dataset.submitting = "false";
    setContactFormDisabled(form, false);
    setContactFormStatus(
      form,
      "error",
      "No pude confirmar el envío. Probá de nuevo o escribime directo a leonelivankunst19@gmail.com."
    );
  }, 12000);

  const requestBody = new FormData(form);
  const endpoint = form.action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: requestBody
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    const sentSuccessfully =
      response.ok && (result?.success === true || result?.success === "true");

    if (!sentSuccessfully) {
      throw new Error(typeof result?.message === "string" ? result.message : "No pude confirmar el envío.");
    }

    form.dataset.submitting = "false";
    window.clearTimeout(contactSubmitTimeout);
    setContactFormDisabled(form, false);
    setContactFormStatus(form, "success", "Consulta enviada correctamente.");
    form.reset();
  } catch {
    try {
      form.submit();
    } catch {
      form.dataset.submitting = "false";
      window.clearTimeout(contactSubmitTimeout);
      setContactFormDisabled(form, false);
      setContactFormStatus(
        form,
        "error",
        "No pude confirmar el envío. Probá de nuevo o escribime directo a leonelivankunst19@gmail.com."
      );
    }
  }
}

function handleContactFrameLoad() {
  const frame = document.querySelector("[data-contact-frame]");
  const form = document.querySelector("[data-contact-form]");
  if (!(frame instanceof HTMLIFrameElement) || !(form instanceof HTMLFormElement)) return;

  if (form.dataset.submitting !== "true") return;

  form.dataset.submitting = "false";
  window.clearTimeout(contactSubmitTimeout);
  setContactFormDisabled(form, false);
  setContactFormStatus(form, "success", "Consulta enviada correctamente.");
  form.reset();
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

function toggleMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!header || !toggle) return;

  const isOpen = header.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    showHeader(true);
  }
}

function closeMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!header || !toggle) return;

  header.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  showHeader(true);
}

function initAnimations() {
  setupBackgroundLineMotion();

  if (!shouldAllowEnhancedMotion()) {
    return;
  }

  if (!window.gsap) {
    initFallbackReveal();
    return;
  }

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const header = document.querySelector(".site-header");
  if (header) {
    gsap.set(header, { y: -22, autoAlpha: 0 });
  }

  gsap.set(".hero-label, .hero-role", { y: 16, autoAlpha: 0 });
  gsap.set(".hero-main h1", { y: 34, autoAlpha: 0 });
  gsap.set(".hero-support > *", { y: 24, autoAlpha: 0 });
  gsap.set(".hero-card", { y: 18, autoAlpha: 0, scale: 0.985 });

  const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  introTimeline
    .to(".site-header", { y: 0, autoAlpha: 1, duration: 0.82 })
    .to(".hero-label, .hero-role", { y: 0, autoAlpha: 1, duration: 0.54, stagger: 0.07 }, "-=0.44")
    .to(".hero-main h1", { y: 0, autoAlpha: 1, duration: 0.88 }, "-=0.18")
    .to(".hero-support > *", { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08 }, "-=0.56")
    .to(".hero-card", { y: 0, autoAlpha: 1, scale: 1, duration: 0.66, stagger: 0.08 }, "-=0.48");

  initAmbientMotion();
  initHeroGlow();
  initImmersiveMotion();
}


function initHeroGlow() {
  const heroTitle = document.querySelector(".hero-main h1");
  const allowHeroGlow = shouldAllowEnhancedMotion();
  if (!heroTitle || !allowHeroGlow) return;

  heroTitle.setAttribute("data-glow", heroTitle.textContent.trim());

  const triggerGlow = () => {
    heroTitle.classList.remove("is-glowing");
    void heroTitle.offsetWidth;
    heroTitle.classList.add("is-glowing");
  };

  heroTitle.addEventListener("animationend", () => {
    heroTitle.classList.remove("is-glowing");
  });

  window.setTimeout(triggerGlow, 1100);

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
  if (immersiveMotionBooted || !shouldAllowEnhancedMotion() || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  immersiveMotionBooted = true;

  setupHeaderPolish();
  setupHeaderAutoHide();
  setupHeroScrollScenes();
  setupSectionScrollScenes();
  setupPanelRevealScenes();
  setupProjectScrollScenes();
  setupBackgroundLineMotion();

  ScrollTrigger.refresh();
}

function setupHeaderPolish() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  gsap.to(header, {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 22px 50px rgba(17, 18, 20, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.96)",
    ease: "none",
    scrollTrigger: {
      id: "header-polish",
      start: 0,
      end: "+=260",
      scrub: 1
    }
  });
}

function setupHeaderAutoHide() {
  if (headerScrollBound) return;
  headerScrollBound = true;

  const header = document.querySelector(".site-header");
  if (!header) return;

  lastScrollY = window.scrollY;

  const updateHeaderState = () => {
    const currentScroll = window.scrollY;
    const isDesktopHeader = window.matchMedia("(min-width: 781px)").matches;
    const trajectorySection = document.querySelector("#trayectoria");
    const desktopHideStart =
      trajectorySection instanceof HTMLElement
        ? Math.max(1080, trajectorySection.offsetTop - 140)
        : 1080;
    const headerRevealZone = isDesktopHeader ? 72 : 24;
    const headerHideStart = isDesktopHeader ? desktopHideStart : 72;
    const hideDelta = isDesktopHeader ? 18 : 8;
    const showDelta = isDesktopHeader ? 9 : 5;

    if (document.body.classList.contains("modal-open") || header.classList.contains("is-open")) {
      showHeader(true);
      lastScrollY = currentScroll;
      scrollTicking = false;
      return;
    }

    if (currentScroll <= headerRevealZone) {
      showHeader(true);
      lastScrollY = currentScroll;
      scrollTicking = false;
      return;
    }

    if (currentScroll < headerHideStart) {
      showHeader();
      lastScrollY = currentScroll;
      scrollTicking = false;
      return;
    }

    if (currentScroll > lastScrollY + hideDelta) {
      hideHeader();
    } else if (currentScroll < lastScrollY - showDelta) {
      showHeader();
    }

    lastScrollY = currentScroll;
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateHeaderState);
        scrollTicking = true;
      }
    },
    { passive: true }
  );
}

function showHeader(immediate = false) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  headerIsHidden = false;
  header.classList.remove("is-hidden");

  if (immediate && window.gsap) {
    headerVisibilityTween?.kill();
    gsap.set(header, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      clearProps: "transform,opacity,filter,visibility"
    });
    return;
  }

  if (window.gsap) {
    headerVisibilityTween?.kill();
    headerVisibilityTween = gsap.to(header, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.86,
      ease: "power2.out",
      overwrite: "auto",
      onStart: () => {
        header.classList.remove("is-hidden");
      }
    });
  }
}

function hideHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (headerIsHidden) return;

  headerIsHidden = true;

  if (window.gsap) {
    headerVisibilityTween?.kill();
    headerVisibilityTween = gsap.to(header, {
      y: -18,
      autoAlpha: 0,
      scale: 0.992,
      filter: "blur(14px)",
      duration: 1.12,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        header.classList.add("is-hidden");
      }
    });
    return;
  }

  header.classList.add("is-hidden");
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

}

function setupSectionScrollScenes() {
  const intros = Array.from(document.querySelectorAll(".section-intro"));

  intros.forEach((intro, index) => {
    const meta = intro.querySelector(".section-meta");
    const copy = intro.querySelector(".section-copy");

    if (meta) {
      gsap.set(meta, { x: -16, autoAlpha: 0, filter: "blur(3px)" });
      ScrollTrigger.create({
        id: `section-meta-${index}`,
        trigger: intro,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(meta, {
            x: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.24,
            ease: "power3.out",
            clearProps: "filter",
            overwrite: true
          });
        }
      });
    }

    if (copy) {
      gsap.set(copy, { y: 24, autoAlpha: 0, filter: "blur(3px)" });
      ScrollTrigger.create({
        id: `section-copy-${index}`,
        trigger: intro,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(copy, {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power3.out",
            clearProps: "filter",
            overwrite: true
          });
        }
      });
    }
  });
}

function setupPanelRevealScenes() {
  const elements = Array.from(
    document.querySelectorAll("[data-reveal]:not(.section-intro):not(.project-card)")
  );

  elements.forEach((element, index) => {
    gsap.set(element, { y: 18, autoAlpha: 0 });

    ScrollTrigger.create({
      id: `panel-reveal-${index}`,
      trigger: element,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          duration: 0.37,
          ease: "power3.out",
          overwrite: true
        });
      }
    });

  });
}

function setupProjectScrollScenes() {
  if (!window.ScrollTrigger) return;

  killProjectTriggers();

  const cards = Array.from(document.querySelectorAll(".project-card"));
  cards.forEach((card, index) => {
    const projectId =
      card.querySelector("[data-project-trigger]")?.dataset.projectTrigger || `card-${index}`;
    const shell = card.querySelector(".project-card-shell");
    const thumb = card.querySelector(".project-thumb");
    const preview = card.querySelector(".project-preview");
    const body = card.querySelector(".project-body");

    if (shell) {
      gsap.set(shell, { y: 28, autoAlpha: 0 });
      ScrollTrigger.create({
        id: `project-shell-${projectId}`,
        trigger: card,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(shell, {
            y: 0,
            autoAlpha: 1,
            duration: 0.44,
            ease: "power3.out",
            overwrite: true
          });
        }
      });
    }

    if (preview) {
      gsap.set(preview, { y: 24, autoAlpha: 0 });
      ScrollTrigger.create({
        id: `project-preview-${projectId}`,
        trigger: card,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(preview, {
            y: 0,
            autoAlpha: 1,
            duration: 0.41,
            ease: "power3.out",
            delay: 0.02,
            overwrite: true
          });
        }
      });
    }

    if (body) {
      gsap.set(body, { y: 22, autoAlpha: 0 });
      ScrollTrigger.create({
        id: `project-body-${projectId}`,
        trigger: card,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(body, {
            y: 0,
            autoAlpha: 1,
            duration: 0.37,
            ease: "power3.out",
            delay: 0.03,
            overwrite: true
          });
        }
      });
    }

    if (thumb) {
      gsap.to(thumb, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          id: `project-thumb-${projectId}`,
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.12
        }
      });
    }
  });
}

function killProjectTriggers() {
  if (!window.ScrollTrigger) return;

  ScrollTrigger.getAll().forEach((trigger) => {
    const id = trigger.vars && trigger.vars.id;
    if (typeof id === "string" && id.startsWith("project-")) {
      trigger.kill();
    }
  });
}

function animateRenderedProjects() {
  if (!shouldAllowEnhancedMotion() || !window.gsap || !window.ScrollTrigger || !immersiveMotionBooted) {
    return;
  }

  setupProjectScrollScenes();
  ScrollTrigger.refresh();
}

function stopBackgroundGlintMotion() {
  if (backgroundGlintFrame !== null) {
    window.cancelAnimationFrame(backgroundGlintFrame);
    backgroundGlintFrame = null;
  }
}

function startBackgroundGlintMotion(glintLines) {
  stopBackgroundGlintMotion();

  if (!glintLines.length) {
    return;
  }

  const states = glintLines
    .map((line) => {
      const length = Number.parseFloat(line.style.getPropertyValue("--line-length")) || line.getTotalLength();
      const segment = Number.parseFloat(line.style.getPropertyValue("--glint-segment")) || 150;
      const durationSeconds = Number.parseFloat(line.style.getPropertyValue("--glint-duration")) || 5.8;
      const delaySeconds = Number.parseFloat(line.style.getPropertyValue("--glint-delay")) || 0;

      return {
        line,
        length,
        segment,
        durationMs: Math.max(durationSeconds * 1000, 3200),
        delayMs: delaySeconds * 1000,
        travelBuffer: 260
      };
    })
    .filter((state) => Number.isFinite(state.length) && state.length > 0);

  if (!states.length) {
    return;
  }

  const tick = (now) => {
    states.forEach((state) => {
      const cycle = ((now + state.delayMs) % state.durationMs + state.durationMs) % state.durationMs;
      const progress = cycle / state.durationMs;
      const travel = state.length + state.segment + state.travelBuffer;
      const dashOffset = state.length + state.segment - travel * progress;

      let opacity = 1;
      if (progress < 0.12) {
        opacity = progress / 0.12;
      } else if (progress > 0.82) {
        opacity = Math.max(0, 1 - (progress - 0.82) / 0.18);
      }

      state.line.style.setProperty("stroke-dashoffset", dashOffset.toFixed(2), "important");
      state.line.style.setProperty("opacity", opacity.toFixed(3), "important");
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

  const svg = document.querySelector(".background-lines");
  const allLines = Array.from(document.querySelectorAll(".bg-line-base, .bg-line"));
  const primaryLines = Array.from(document.querySelectorAll(".bg-line"));
  if (!svg || !allLines.length) return;
  const useDesktopLightMotion = shouldUseDesktopLightMotion();
  const allowBackgroundMotion = !isMotionReduced() || useDesktopLightMotion;
  const glintDurationFactor = useDesktopLightMotion ? 1.18 : 1;

  const linePresets = {
    "bg-line-one": { delay: -2.4, glint: 4.6 },
    "bg-line-two": { delay: -8.2, glint: 5.1 },
    "bg-line-three": { delay: -12.4, glint: 4.4 },
    "bg-line-four": { delay: -5.6, glint: 5.4 },
    "bg-line-five": { delay: -15.1, glint: 5.8 },
    "bg-line-six": { delay: -10.3, glint: 5.2 }
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
    line.style.setProperty("transform", "none", "important");
    line.style.removeProperty("--glint-duration");
    line.style.removeProperty("--glint-delay");
    line.style.removeProperty("--glint-segment");
    line.style.setProperty("stroke-dasharray", "none", "important");
    line.style.setProperty("stroke-dashoffset", "0", "important");
    line.style.setProperty("animation", "none", "important");

    if (!allowBackgroundMotion) {
      line.style.setProperty("opacity", line.classList.contains("bg-line-base") ? "0.12" : "0.24");
    }
  });

  if (!allowBackgroundMotion) {
    return;
  }

  primaryLines.forEach((line) => {
    const variantClass = Array.from(line.classList).find((className) =>
      Object.prototype.hasOwnProperty.call(linePresets, className)
    );
    const preset = variantClass ? linePresets[variantClass] : linePresets["bg-line-one"];
    const length = line.getTotalLength();
    const segment = useDesktopLightMotion
      ? Math.max(118, Math.min(length * 0.11, 158))
      : Math.max(126, Math.min(length * 0.115, 172));

    const strokeWidth = Number.parseFloat(line.getAttribute("stroke-width") || "2");
    const clone = line.cloneNode(false);

    line.style.setProperty("--line-length", `${length.toFixed(2)}`);
    line.style.setProperty("animation", "none", "important");
    line.style.setProperty("stroke-dasharray", "none", "important");
    line.style.setProperty("stroke-dashoffset", "0", "important");

    clone.setAttribute("class", ["bg-line-glint", variantClass || "bg-line-one"].join(" "));
    clone.setAttribute("stroke-width", String((strokeWidth + 0.55).toFixed(2)));
    clone.removeAttribute("style");
    clone.style.setProperty("--line-length", `${length.toFixed(2)}`);
    clone.style.setProperty("--line-drift-x", "0px");
    clone.style.setProperty("--line-drift-y", "0px");
    clone.style.setProperty("--line-rotate", "0deg");
    clone.style.setProperty("--glint-duration", `${(preset.glint * glintDurationFactor).toFixed(2)}s`);
    clone.style.setProperty("--glint-delay", `${(preset.delay * 0.68).toFixed(2)}s`);
    clone.style.setProperty("--glint-segment", `${segment.toFixed(2)}`);
    clone.style.setProperty("transform", "none", "important");
    clone.style.setProperty("opacity", "0", "important");
    clone.style.setProperty(
      "stroke-dasharray",
      `${segment.toFixed(2)} ${(length + segment + 420).toFixed(2)}`,
      "important"
    );
    clone.style.setProperty(
      "stroke-dashoffset",
      `${(length + segment).toFixed(2)}`,
      "important"
    );
    clone.style.setProperty(
      "animation",
      "none",
      "important"
    );

    line.insertAdjacentElement("afterend", clone);
  });

  startBackgroundGlintMotion(Array.from(document.querySelectorAll(".bg-line-glint")));
}

function setupPointerDepth() {
  if (pointerDepthBooted || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  pointerDepthBooted = true;

  gsap.utils
    .toArray(".hero-card, .content-panel, .skill-group, .project-card-shell")
    .forEach((surface) => {
      surface.addEventListener("pointermove", (event) => {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(surface, {
          x: x * 4,
          y: y * 4,
          duration: 0.32,
          ease: "power3.out",
          overwrite: true
        });
      });

      surface.addEventListener("pointerleave", () => {
        gsap.to(surface, {
          x: 0,
          y: 0,
          duration: 0.26,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(surface, { clearProps: "transform" });
          }
        });
      });
    });
}

function initFallbackReveal() {
  const elements = document.querySelectorAll("[data-reveal], .project-card-shell, .project-body, .project-preview");
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            {
              duration: 290,
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



















