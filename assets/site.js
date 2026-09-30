/* ============================================================
   Moyin's Dev — shared site interactions
   Include on every page, right before </body>:
   <script src="assets/site.js" defer></script>
   ============================================================ */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Mouse glow — smooth, lagging follow (not instant snap)
  --------------------------------------------------------- */
  var glow = document.getElementById("mouse-glow");
if (glow) {
  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 3;
  var currentX = targetX;
  var currentY = targetY;
  var hasMoved = false;

  window.addEventListener("pointermove", function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    hasMoved = true;
  }, { passive: true });

  (function loop() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0) translate(-50%, -50%)";
    glow.style.opacity = hasMoved ? "1" : "0";
    requestAnimationFrame(loop);
  })();
}
  /* ---------------------------------------------------------
     2. Header shadow once the page is scrolled
  --------------------------------------------------------- */
  var header = document.querySelector("[data-site-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     3. Hamburger menu — button + animated panel
  --------------------------------------------------------- */
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;

    var close = function () {
      btn.setAttribute("aria-expanded", "false");
      panel.classList.remove("open");
    };
    var open = function () {
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("open");
    };

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) close(); else open();
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && !btn.contains(e.target)) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  });


  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
})();
var progressBar = document.getElementById("scroll-progress");
if (progressBar) {
  var updateProgress = function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}
var progressBar = document.getElementById("scroll-progress");
if (progressBar) {
  var updateProgress = function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

document.querySelectorAll("[data-menu-close]").forEach(function (closeBtn) {
  closeBtn.addEventListener("click", function () {
    var panel = closeBtn.closest("[data-menu-panel]");
    if (!panel) return;
    var toggle = document.querySelector('[aria-controls="' + panel.id + '"]');
    panel.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
});

// Click on the dimmed backdrop (not the card itself) to close
document.querySelectorAll("[data-menu-panel]").forEach(function (panel) {
  panel.addEventListener("click", function (e) {
    if (e.target === panel) {
      var toggle = document.querySelector('[aria-controls="' + panel.id + '"]');
      panel.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  });
});