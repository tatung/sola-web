(function () {
  function normalize(path) {
    if (!path) return "/";
    var p = path;
    p = p.replace(/\/index\.html$/, "/");
    if (!p.startsWith("/")) p = "/" + p;
    if (!p.endsWith("/")) p = p + "/";
    return p.replace(/\/+/g, "/");
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markActiveNav);
  } else {
    markActiveNav();
  }
})();
