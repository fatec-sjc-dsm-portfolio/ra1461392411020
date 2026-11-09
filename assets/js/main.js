/* Portfólio Thiago Martins — interações leves, sem dependências */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- Tema claro e escuro ---------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("tm-theme", theme); } catch (e) { /* armazenamento indisponível */ }
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", theme === "light" ? "Ativar tema escuro" : "Ativar tema claro");
    }
  }
  if (themeBtn) {
    setTheme(currentTheme());
    themeBtn.addEventListener("click", function () {
      setTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  /* ---------- Menu no celular ---------- */
  var nav = document.querySelector(".nav");
  var menuBtn = document.querySelector("[data-menu-toggle]");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* ---------- Link ativo conforme a rolagem ---------- */
  function spy(links, attr, onChange) {
    var map = new Map();
    links.forEach(function (link) {
      var id = (link.getAttribute(attr) || "").replace("#", "");
      var el = id && document.getElementById(id);
      if (el) map.set(el, link);
    });
    if (!("IntersectionObserver" in window) || map.size === 0) return;
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
        else visible.delete(entry.target);
      });
      var best = null;
      var bestTop = Infinity;
      visible.forEach(function (_ratio, el) {
        var top = Math.abs(el.getBoundingClientRect().top);
        if (top < bestTop) { bestTop = top; best = el; }
      });
      links.forEach(function (l) { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
      if (best) {
        var active = map.get(best);
        active.classList.add("is-active");
        active.setAttribute("aria-current", "true");
        if (onChange) onChange(active);
      }
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] });
    map.forEach(function (_link, el) { io.observe(el); });
  }

  spy(Array.prototype.slice.call(document.querySelectorAll(".nav__links a")), "href");
  spy(Array.prototype.slice.call(document.querySelectorAll(".step")), "href");

  /* ---------- Animação de entrada ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          ro.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Filtro de projetos ---------- */
  var filters = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      projects.forEach(function (p) {
        p.hidden = !(f === "all" || p.getAttribute("data-type") === f);
      });
    });
  });

  /* ---------- Troca de telas de cada API ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var img = gallery.querySelector(".frame__img");
    var url = gallery.querySelector("[data-gallery-url]");
    var buttons = gallery.querySelectorAll(".shot");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.getAttribute("aria-pressed") === "true") return;
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        img.classList.add("is-swapping");
        var next = new Image();
        next.onload = next.onerror = function () {
          img.src = btn.getAttribute("data-src");
          img.alt = btn.getAttribute("data-alt");
          img.classList.toggle("fit-contain", btn.hasAttribute("data-contain"));
          if (url) url.textContent = btn.getAttribute("data-url");
          img.classList.remove("is-swapping");
        };
        next.src = btn.getAttribute("data-src");
      });
    });
  });

  /* ---------- Visualizador de imagens ---------- */
  var box = document.querySelector(".lightbox");
  if (box && typeof box.showModal === "function") {
    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector("p");
    document.querySelectorAll("[data-zoom]").forEach(function (img) {
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      function open() {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt;
        boxCap.textContent = img.alt;
        box.showModal();
      }
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".lightbox__close")) box.close();
    });
  }

  /* ---------- Ano no rodapé ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
