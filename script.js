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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let immersiveMotionBooted = false;
let pointerDepthBooted = false;
let headerScrollBound = false;
let headerIsHidden = false;
let headerVisibilityTween = null;
let contactSubmitTimeout = null;
let lastScrollY = 0;
let scrollTicking = false;

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

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();

  if (window.gsap && !prefersReducedMotion) {
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

  if (prefersReducedMotion || !window.gsap) {
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
  if (!heroTitle || prefersReducedMotion) return;

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
  if (immersiveMotionBooted || prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
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
  setupPointerDepth();

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
    const copy = intro.querySelector(".section-copy");

    if (meta) {
      gsap.set(meta, { x: -20, autoAlpha: 0, filter: "blur(10px)" });
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
            duration: 0.86,
            ease: "power3.out",
            overwrite: true
          });
        }
      });
    }

    if (copy) {
      gsap.set(copy, { y: 34, autoAlpha: 0, filter: "blur(12px)" });
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
            duration: 1,
            ease: "power3.out",
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
    gsap.set(element, { y: 28, autoAlpha: 0, filter: "blur(10px)" });

    ScrollTrigger.create({
      id: `panel-reveal-${index}`,
      trigger: element,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.82,
          ease: "power3.out",
          overwrite: true
        });
      }
    });

    gsap.to(element, {
      yPercent: index % 2 === 0 ? -2.2 : 2.2,
      ease: "none",
      scrollTrigger: {
        id: `panel-depth-${index}`,
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.35
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
      gsap.set(shell, { y: 44, autoAlpha: 0, scale: 0.982, filter: "blur(12px)" });
      ScrollTrigger.create({
        id: `project-shell-${projectId}`,
        trigger: card,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(shell, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            overwrite: true
          });
        }
      });
    }

    if (preview) {
      gsap.set(preview, { y: 24, autoAlpha: 0, rotate: index % 2 === 0 ? -1.6 : 1.6 });
      ScrollTrigger.create({
        id: `project-preview-${projectId}`,
        trigger: card,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.to(preview, {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.84,
            ease: "power3.out",
            delay: 0.08,
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
            duration: 0.72,
            ease: "power3.out",
            delay: 0.12,
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
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger || !immersiveMotionBooted) {
    return;
  }

  setupProjectScrollScenes();
  ScrollTrigger.refresh();
}


function setupBackgroundLineMotion() {
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
  if (!svg || !allLines.length) return;

  const linePresets = {
    "bg-line-one": { x: 12, y: -8, rotate: -0.35, float: 28, draw: 30, delay: -2.4 },
    "bg-line-two": { x: -10, y: 7, rotate: 0.28, float: 34, draw: 36, delay: -8.2 },
    "bg-line-three": { x: 14, y: 9, rotate: -0.26, float: 31, draw: 33, delay: -12.4 },
    "bg-line-four": { x: -9, y: -10, rotate: 0.32, float: 37, draw: 39, delay: -5.6 },
    "bg-line-five": { x: 8, y: 12, rotate: -0.18, float: 40, draw: 42, delay: -15.1 },
    "bg-line-six": { x: -7, y: -11, rotate: 0.22, float: 35, draw: 38, delay: -10.3 }
  };

  allLines.forEach((line) => {
    const variantClass = Array.from(line.classList).find((className) =>
      Object.prototype.hasOwnProperty.call(linePresets, className)
    );
    const preset = variantClass ? linePresets[variantClass] : linePresets["bg-line-one"];
    const isPrimaryLine = line.classList.contains("bg-line") && !line.classList.contains("bg-line-base");
    const driftScale = isPrimaryLine ? 1 : 0.54;
    const length = line.getTotalLength();

    line.style.setProperty("--line-length", `${length.toFixed(2)}`);
    line.style.setProperty("--line-drift-x", `${(preset.x * driftScale).toFixed(2)}px`);
    line.style.setProperty("--line-drift-y", `${(preset.y * driftScale).toFixed(2)}px`);
    line.style.setProperty("--line-rotate", `${(preset.rotate * driftScale).toFixed(3)}deg`);
    line.style.setProperty("--float-duration", `${preset.float}s`);
    line.style.setProperty("--float-delay", `${preset.delay}s`);
    line.style.setProperty("--draw-duration", `${preset.draw}s`);
    line.style.setProperty("--draw-delay", `${preset.delay * 0.8}s`);

    if (prefersReducedMotion) {
      line.style.removeProperty("stroke-dasharray");
      line.style.removeProperty("stroke-dashoffset");
      line.style.removeProperty("transform");
    }
  });
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
  const elements = document.querySelectorAll("[data-reveal], .project-card-shell, .project-body, .project-preview");
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(24px)", filter: "blur(10px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" }
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



















