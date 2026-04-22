(function () {
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

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, "&quot;");
  }

  function getNavLinksData() {
    var dataScript = document.getElementById("nav-links-data");
    if (!dataScript) return [];

    try {
      var data = JSON.parse(dataScript.textContent || "[]");
      if (!Array.isArray(data)) return [];
      return data;
    } catch (e) {
      return [];
    }
  }

  function syncMobileMenu() {
    var nav = document.querySelector(".greedy-nav");
    var toggle = nav ? nav.querySelector(".greedy-nav__toggle") : null;
    var mobileList = nav ? nav.querySelector(".mobile-all-links-list") : null;
    if (!toggle || !mobileList) return;

    var isHamburgerVisible = !toggle.classList.contains("hidden");
    var isOpen = toggle.classList.contains("close");

    if (!isHamburgerVisible) {
      mobileList.innerHTML = "";
      mobileList.classList.add("hidden");
      return;
    }

    var links = getNavLinksData();
    var current = normalize(window.location.pathname);
    var html = "";

    links.forEach(function (item) {
      var href = item.url || "";
      var text = item.title || "";
      if (!href || !text) return;

      var target = normalize(href);
      var activeAttr = isActiveTarget(target, current) ? ' aria-current="page" class="is-active"' : "";
      var titleAttr = item.description ? ' title="' + escapeAttr(item.description) + '"' : "";
      var targetAttr = item.target ? ' target="' + item.target + '"' : "";

      html +=
        '<li class="masthead__menu-item">' +
        '<a href="' +
        escapeAttr(href) +
        '"' +
        titleAttr +
        targetAttr +
        activeAttr +
        ">" +
        escapeHtml(text) +
        "</a></li>";
    });

    mobileList.innerHTML = html;

    if (isOpen) {
      mobileList.classList.remove("hidden");
    } else {
      mobileList.classList.add("hidden");
    }
  }

  function getActiveTitle() {
    var current = normalize(window.location.pathname);
    var links = getNavLinksData();
    var title = null;

    links.forEach(function (link) {
      var href = link.url;
      if (!href) return;
      var target = normalize(href);
      if (isActiveTarget(target, current)) title = link.title;
    });

    return title;
  }

  function markActiveNav() {
    var current = normalize(window.location.pathname);
    var links = document.querySelectorAll(
      ".greedy-nav .visible-links a, .greedy-nav .hidden-links a, .greedy-nav .mobile-all-links-list a"
    );

    links.forEach(function (link) {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
      if (link.parentElement) {
        link.parentElement.classList.remove("is-active");
      }
    });

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
    if (title) {
      label.textContent = title;
      label.classList.add("is-active");
    } else {
      label.textContent = "";
      label.classList.remove("is-active");
    }
  }

  function init() {
    syncMobileMenu();
    markActiveNav();
    updateMobileLabel();

    var toggle = document.querySelector(".greedy-nav .greedy-nav__toggle");
    if (toggle) {
      var observer = new MutationObserver(function () {
        syncMobileMenu();
        markActiveNav();
        updateMobileLabel();
      });
      observer.observe(toggle, { attributes: true, attributeFilter: ["class"] });
    }

    window.addEventListener("resize", function () {
      syncMobileMenu();
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
