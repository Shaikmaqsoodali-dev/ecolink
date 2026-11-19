/* ============================================================
   Ecolink India — main.js  (no dependencies)
   header · drawer · mega menu · reveals · counters · hero video
   film modal · inline film · YouTube facades · before/after
   tabs · plant sizes · accordion · form · cookies · to-top
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- header: solid on scroll, hide on scroll down ---------- */
  var hdr = $('[data-header]');
  if (hdr) {
    var lastY = 0;
    var onScroll = function () {
      var y = window.scrollY;
      hdr.classList.toggle('is-stuck', y > 24);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- drawer ---------- */
  var drawer = $('[data-drawer]');
  var drawerBtn = $('[data-drawer-open]');
  var lastFocus = null;
  function openDrawer() {
    lastFocus = doc.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    drawerBtn.setAttribute('aria-expanded', 'true');
    doc.body.style.overflow = 'hidden';
    var f = $('.drawer-x', drawer); if (f) f.focus();
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawerBtn.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
    setTimeout(function () { drawer.hidden = true; }, reduce ? 0 : 350);
    if (lastFocus) lastFocus.focus();
  }
  if (drawer && drawerBtn) {
    drawerBtn.addEventListener('click', openDrawer);
    $$('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });
  }

  /* ---------- mega menu ---------- */
  var menuBtn = $('[data-menu-btn]');
  var menu = $('[data-menu]');
  if (menuBtn && menu) {
    var timer;
    var setMenu = function (open) { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); };
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    var li = menuBtn.parentElement;
    if (window.matchMedia('(hover: hover)').matches) {
      li.addEventListener('mouseenter', function () { clearTimeout(timer); setMenu(true); });
      li.addEventListener('mouseleave', function () { timer = setTimeout(function () { setMenu(false); }, 180); });
    }
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
    doc.addEventListener('click', function (e) { if (!menu.hidden && !li.contains(e.target)) setMenu(false); });
    menu.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) setMenu(false); });
  }

  /* ---------- reveals ---------- */
  var revealables = $$('.rv, .rv-line, .fig-bar, .progress, .map');
  if (reduce || !hasIO) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px 15% 0px', threshold: 0 }); // start just before it scrolls in
    revealables.forEach(function (el) { io.observe(el); });
    // safety net: never leave content hidden
    setTimeout(function () {
      revealables.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 1200);
  }

  /* ---------- counters (Indian grouping) ---------- */
  function formatIN(n) {
    var s = String(Math.round(n));
    if (s.length <= 3) return s;
    return s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3);
  }
  var counters = $$('[data-count]');
  if (counters.length && !reduce && hasIO) {
    var run = function (el) {
      var target = +el.getAttribute('data-count');
      var grouped = el.hasAttribute('data-group');
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1700, 1);
        var v = target * (1 - Math.pow(1 - p, 4));
        el.textContent = grouped ? formatIN(v) : String(Math.round(v));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- hero background video ---------- */
  var hero = $('[data-hero]');
  var heroVid = $('[data-hero-video]');
  var heroBtn = $('[data-hero-toggle]');
  if (heroVid) {
    if (reduce) { heroVid.removeAttribute('autoplay'); heroVid.pause(); hero.classList.add('is-paused'); }
    if (heroBtn) heroBtn.addEventListener('click', function () {
      if (heroVid.paused) { heroVid.play(); hero.classList.remove('is-paused'); heroBtn.setAttribute('aria-label', 'Pause background video'); }
      else { heroVid.pause(); hero.classList.add('is-paused'); heroBtn.setAttribute('aria-label', 'Play background video'); }
    });
    if (hasIO) {
      new IntersectionObserver(function (en) {
        if (hero.classList.contains('is-paused')) return;
        if (en[0].isIntersecting) { var p = heroVid.play(); if (p && p.catch) p.catch(function () {}); } else heroVid.pause();
      }).observe(hero);
    }
  }

  /* ---------- film modal ---------- */
  var modal = $('[data-modal]');
  if (modal) {
    var mv = $('[data-modal-video]', modal);
    var opener = null;
    var closeModal = function () {
      mv.pause(); modal.hidden = true; doc.body.style.overflow = '';
      if (opener) opener.focus();
    };
    $$('[data-film-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b; modal.hidden = false; doc.body.style.overflow = 'hidden';
        $('[data-modal-close]', modal).focus();
        var p = mv.play(); if (p && p.catch) p.catch(function () {});
      });
    });
    $('[data-modal-close]', modal).addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* ---------- inline film ---------- */
  $$('[data-film]').forEach(function (f) {
    var v = $('video', f);
    $('[data-film-play]', f).addEventListener('click', function () {
      v.hidden = false; f.classList.add('is-playing');
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      v.focus();
    });
  });

  /* ---------- YouTube facades (youtube-nocookie, load on click) ---------- */
  $$('[data-yt]').forEach(function (f) {
    $('[data-yt-play]', f).addEventListener('click', function () {
      var id = f.getAttribute('data-yt');
      var ifr = doc.createElement('iframe');
      ifr.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      ifr.title = f.getAttribute('data-title') || 'Video';
      ifr.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      ifr.allowFullscreen = true;
      f.appendChild(ifr); f.classList.add('is-playing');
    });
  });

  /* ---------- before / after ---------- */
  $$('[data-ba]').forEach(function (ba) {
    var r = $('.ba-range', ba);
    var set = function () { ba.style.setProperty('--pos', r.value + '%'); };
    r.addEventListener('input', set); set();
    // gentle hint on first view
    if (!reduce && hasIO) {
      var hio = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        hio.disconnect();
        var t0 = null;
        var anim = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1600, 1);
          if (r.dataset.touched) return;
          r.value = 50 + Math.sin(p * Math.PI * 2) * 18; set();
          if (p < 1) requestAnimationFrame(anim);
        };
        setTimeout(function () { requestAnimationFrame(anim); }, 500);
      }, { threshold: 0.6 });
      hio.observe(ba);
      r.addEventListener('pointerdown', function () { r.dataset.touched = '1'; });
      r.addEventListener('keydown', function () { r.dataset.touched = '1'; });
    }
  });

  /* ---------- tabs (board picker + plant sizes) ---------- */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    var select = function (t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        var panel = doc.getElementById(x.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) t.focus();
      root.dispatchEvent(new CustomEvent('tabchange', { detail: { index: tabs.indexOf(t) } }));
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key; var n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === 'Home') n = tabs[0];
        if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* plant floor-area plot follows the selected size */
  $$('[data-sizes]').forEach(function (root) {
    var boxes = $$('.sizes-plot i', root);
    root.addEventListener('tabchange', function (e) {
      boxes.forEach(function (b, i) { b.classList.toggle('on', i === e.detail.index); });
    });
  });

  /* ---------- accordion ---------- */
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      doc.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });

  /* ---------- back to top ---------- */
  var top = $('[data-to-top]');
  if (top) {
    var tt = function () { top.classList.toggle('is-on', window.scrollY > 900); };
    tt(); window.addEventListener('scroll', tt, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  }

  /* ---------- cookie consent (gates analytics) ---------- */
  var cookie = $('[data-cookie]');
  var KEY = 'ecolink-consent';
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var put = function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } };
  function loadAnalytics() {
    // Wire the real provider here once a measurement ID is supplied.
    if (window.__ecoAnalytics) return;
    window.__ecoAnalytics = true;
    doc.dispatchEvent(new CustomEvent('ecolink:analytics-allowed'));
  }
  if (cookie) {
    var c = get();
    if (!c) setTimeout(function () { cookie.hidden = false; }, 1500);
    else if (c === 'accepted') loadAnalytics();
    $('[data-cookie-accept]', cookie).addEventListener('click', function () { put('accepted'); cookie.hidden = true; loadAnalytics(); });
    $('[data-cookie-decline]', cookie).addEventListener('click', function () { put('declined'); cookie.hidden = true; });
  }

  /* ---------- enquiry form ---------- */
  var wrap = $('[data-enquiry]');
  if (wrap) {
    var form = $('form', wrap);
    var endpoint = wrap.getAttribute('data-endpoint');
    var status = $('[data-status]', wrap);
    var btn = $('[data-submit]', wrap);
    var busy = false;

    var topic = new URLSearchParams(location.search).get('topic');
    if (topic) {
      $$('input[name="type"]', form).forEach(function (r) { if (r.value.toLowerCase() === topic.toLowerCase()) r.checked = true; });
    }

    var err = function (name, msg) {
      var el = $('[data-error-for="' + name + '"]', wrap);
      if (el) el.textContent = msg || '';
      if (name === 'type') { $('[data-topics]', wrap).classList.toggle('is-invalid', !!msg); return; }
      var inp = form.elements[name];
      if (inp) { inp.classList.toggle('is-invalid', !!msg); inp.setAttribute('aria-invalid', msg ? 'true' : 'false'); }
    };
    var say = function (msg, kind) { status.textContent = msg || ''; status.className = 'form-status' + (kind ? ' is-' + kind : ''); };

    var validate = function () {
      var ok = true;
      var v = function (n) { return (form.elements[n].value || '').trim(); };
      ['name', 'email', 'type', 'message'].forEach(function (n) { err(n, ''); });
      if (!v('name')) { err('name', 'Please tell us your name.'); ok = false; }
      if (!v('email')) { err('email', 'Please add your email address.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) { err('email', 'That email address doesn’t look right.'); ok = false; }
      if (!form.querySelector('input[name="type"]:checked')) { err('type', 'Please pick one.'); ok = false; }
      if (!v('message')) { err('message', 'Please tell us what you need.'); ok = false; }
      return ok;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      if (!validate()) { var bad = form.querySelector('.is-invalid, .topics.is-invalid input'); if (bad) bad.focus(); return; }
      if (form.elements.website.value) return; // honeypot
      if (!endpoint) { say('The form isn’t connected yet. Please email info@ecolinkindia.com in the meantime.', 'error'); return; }

      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.name === 'website') return;
        if (el.type === 'radio' && !el.checked) return;
        if (el.value) data[el.name] = el.value.trim();
      });
      data.page = location.pathname;

      busy = true; btn.classList.add('is-loading'); btn.disabled = true; say('Sending…');
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); say(wrap.getAttribute('data-ok'), 'success'); })
        .catch(function () { say(wrap.getAttribute('data-fail'), 'error'); })
        .then(function () { busy = false; btn.classList.remove('is-loading'); btn.disabled = false; });
    });

    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name) el.addEventListener(el.type === 'radio' ? 'change' : 'input', function () { err(el.name, ''); });
    });
  }
})();
