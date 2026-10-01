/* Full Nova Digital — Cartilla operativa
   Navegación, scroll-spy, progreso y reveal. Sin dependencias. */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Barra de progreso de lectura ---------- */
  var bar = document.getElementById('bar');
  var ticking = false;

  function progress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
    if (bar) bar.style.width = Math.min(100, Math.max(0, pct)).toFixed(2) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(progress); }
  }, { passive: true });
  progress();

  /* ---------- Reveal al entrar en viewport ---------- */
  var items = [].slice.call(document.querySelectorAll('.rv'));

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Scroll-spy del índice ---------- */
  var sections = [].slice.call(document.querySelectorAll('section[id]'));
  var links = [].slice.call(document.querySelectorAll('.rail__nav a'));
  var byHash = {};
  links.forEach(function (a) { byHash[a.getAttribute('href').slice(1)] = a; });

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && links.length) {
    var seen = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e; });

      var best = null;
      sections.forEach(function (s) {
        var e = seen[s.id];
        if (e && e.isIntersecting) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-18% 0px -55% 0px', threshold: [0, 0.12, 0.3, 0.6] });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Índice móvil ---------- */
  var burger = document.getElementById('burger');
  var sheet = document.getElementById('sheet');
  var close = document.getElementById('sheetClose');

  function openSheet() {
    if (!sheet) return;
    sheet.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (burger) burger.setAttribute('aria-expanded', 'true');
  }
  function closeSheet() {
    if (!sheet) return;
    sheet.classList.remove('is-open');
    document.body.style.overflow = '';
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  if (burger) burger.addEventListener('click', openSheet);
  if (close) close.addEventListener('click', closeSheet);
  if (sheet) {
    sheet.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) closeSheet();
    });
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeSheet();
  });

  /* ---------- Navegación por teclado entre capítulos ---------- */
  document.addEventListener('keydown', function (ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var tag = (ev.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp' &&
        ev.key !== 'PageDown' && ev.key !== 'PageUp') return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      if (!ev.shiftKey) return; // Shift+flecha salta de capítulo
    }

    var y = window.scrollY + 6;
    var fwd = (ev.key === 'ArrowDown' || ev.key === 'PageDown');
    var target = null;

    for (var i = 0; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top + window.scrollY;
      if (fwd && top > y) { target = sections[i]; break; }
      if (!fwd && top < y - 40) { target = sections[i]; }
    }
    if (target) {
      ev.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  });
})();
