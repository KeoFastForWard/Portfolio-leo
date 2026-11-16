/* Runs before first paint: sets the theme and decides whether the intro plays.
   Kept in its own file so the page can ship without inline scripts (CSP: script-src 'self'). */
(function () {
  var root = document.documentElement;
  var theme = "light";

  try {
    var stored = window.localStorage.getItem("leonel-portfolio-theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  } catch (error) {}

  root.dataset.theme = theme;
  root.classList.add("js");

  // The intro plays once per browser session, never over a deep link and
  // never when the visitor asked the system for less motion.
  var seen = false;
  try {
    seen = window.sessionStorage.getItem("leonel-intro-seen") === "1";
  } catch (error) {}
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!seen && !reduced && !window.location.hash) {
    root.classList.add("design-intro-pending");
    window.setTimeout(function () {
      root.classList.remove("design-intro-pending");
    }, 3000);
  }
})();
