(function () {
  function normalize(path) {
    if (!path) return "/";
    var p = path;
    p = p.replace(/\/index\.html$/, "/");
    if (!p.startsWith("/")) p = "/" + p;
    if (!p.endsWith("/")) p = p + "/";
    return p.replace(/\/+/g, "/");
  }

  function getActiveTitle() {
    var current = normalize(window.location.pathname);
    var links = document.querySelectorAll(".greedy-nav .visible-links a, .greedy-nav .hidden-links a");
    var title = null;
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      var target = normalize(href);
      var isActive = current === target || (target !== "/" && current.indexOf(target) === 0);
      if (!isActive && current === "/" && target === "/about/") isActive = true;
      if (isActive) title = link.textContent.trim();
    });
    return title;
  }

  function markActiveNav() {
    var current = normalize(window.location.pathname);
    var links = document.querySelectorAll(".greedy-nav .visible-links a, .greedy-nav .hidden-links a");

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;

      var target = normalize(href);
      var isActive = current === target || (target !== "/" && current.indexOf(target) === 0);

      if (!isActive && current === "/" && target === "/about/") {
        isActive = true;
      }

      if (isActive) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
        if (link.parentElement) {
          link.parentElement.classList.add("is-active");
        }
      }
    });
  }

  function updateMobileLabel() {
    var label = document.querySelector(".mobile-nav-label");
    if (!label) return;
    var title = getActiveTitle();
    if (title) label.textContent = title;
  }

  function init() {
    markActiveNav();
    updateMobileLabel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
