(function () {
  var allNavLinksCache = null;

  function normalize(path) {
    if (!path) return "/";
    var p = path;
    p = p.replace(/\/index\.html$/, "/");
    if (!p.startsWith("/")) p = "/" + p;
    if (!p.endsWith("/")) p = p + "/";
    return p.replace(/\/+/g, "/");
  }

  function isActiveTarget(target, current) {
    var isActive = current === target || (target !== "/" && current.indexOf(target) === 0);
    if (!isActive && current === "/" && target === "/about/") {
      isActive = true;
    }
    return isActive;
  }

  function collectAllNavLinks() {
    if (allNavLinksCache) return allNavLinksCache;

    var anchors = document.querySelectorAll(".greedy-nav .visible-links a, .greedy-nav .hidden-links a");
    var seen = {};
    var collected = [];

    anchors.forEach(function (link) {
      if (link.dataset.generatedMobileLink === "true") return;

      var href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      if (seen[href]) return;

      seen[href] = true;
      collected.push({
        href: href,
        text: link.textContent.trim(),
        title: link.getAttribute("title") || "",
        target: link.getAttribute("target") || ""
      });
    });

    allNavLinksCache = collected;
    return allNavLinksCache;
  }

  function syncMobileHiddenLinks() {
    var nav = document.querySelector(".greedy-nav");
    var toggle = nav ? nav.querySelector(".greedy-nav__toggle") : null;
    var hiddenLinks = nav ? nav.querySelector(".hidden-links") : null;
    if (!toggle || !hiddenLinks) return;

    if (toggle.classList.contains("hidden")) {
      hiddenLinks.classList.remove("mobile-all-links");
      return;
    }

    var links = collectAllNavLinks();
    var current = normalize(window.location.pathname);
    var html = "";

    links.forEach(function (item) {
      var target = normalize(item.href);
      var activeAttr = isActiveTarget(target, current) ? ' aria-current="page" class="is-active"' : "";
      var titleAttr = item.title ? ' title="' + item.title.replace(/"/g, "&quot;") + '"' : "";
      var targetAttr = item.target ? ' target="' + item.target + '"' : "";

      html +=
        '<li class="masthead__menu-item">' +
        '<a data-generated-mobile-link="true" href="' +
        item.href +
        '"' +
        titleAttr +
        targetAttr +
        activeAttr +
        ">" +
        item.text +
        "</a></li>";
    });

    hiddenLinks.innerHTML = html;
    hiddenLinks.classList.add("mobile-all-links");
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
      var isActive = isActiveTarget(target, current);

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
    syncMobileHiddenLinks();
    markActiveNav();
    updateMobileLabel();

    var toggle = document.querySelector(".greedy-nav .greedy-nav__toggle");
    if (toggle) {
      var observer = new MutationObserver(function () {
        syncMobileHiddenLinks();
        markActiveNav();
        updateMobileLabel();
      });
      observer.observe(toggle, { attributes: true, attributeFilter: ["class"] });
    }

    window.addEventListener("resize", function () {
      syncMobileHiddenLinks();
      markActiveNav();
      updateMobileLabel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
