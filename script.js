/* ===========================================================
   SnapnStick — interactions
   - sticky navbar styling on scroll
   - mobile menu
   - scroll reveal (IntersectionObserver)
   - gallery lightbox
   - footer year
   =========================================================== */

(function () {
  'use strict';

  /* ---- Year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar on scroll ---- */
  var navbar = document.getElementById('navbar');
  var onScroll = function () {
    if (window.scrollY > 24) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var toggleMenu = function (open) {
    var willOpen = open !== undefined ? open : mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !willOpen);
    menuBtn.setAttribute('aria-expanded', String(willOpen));
  };
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { toggleMenu(); });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggleMenu(false); });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Reduced-motion: don't autoplay the highlight video ---- */
  if (prefersReduced) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.setAttribute('controls', '');
      try { v.pause(); } catch (e) {}
    });
  }

  /* ---- Lightbox ---- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');

  var openLightbox = function (src, caption, alt) {
    lbImg.src = src;
    lbImg.alt = alt || caption || 'Sample magnet';
    lbCap.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  var closeLightbox = function () {
    lightbox.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.gallery-item[data-full]').forEach(function (item) {
    var trigger = function () {
      var img = item.querySelector('img');
      openLightbox(item.getAttribute('data-full'), item.getAttribute('data-caption'), img ? img.alt : '');
    };
    item.addEventListener('click', trigger);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();
