/* ============================================================
   Ecolink India — main.js
   Sticky header · drawer · dropdown · reveals · counters ·
   accordion · enquiry form · cookie consent · back-to-top
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  /* ----------------------------------------------------------
     Sticky header — transparent over hero, solid on scroll
     ---------------------------------------------------------- */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     Mobile drawer
     ---------------------------------------------------------- */
  var drawer = $('[data-drawer]');
  var drawerOpen = $('[data-drawer-open]');
  var lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = doc.activeElement;
    drawer.hidden = false;
    // next frame so the transition runs
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    if (drawerOpen) drawerOpen.setAttribute('aria-expanded', 'true');
    doc.body.style.overflow = 'hidden';
    var first = $('.drawer-panel a, .drawer-panel button', drawer);
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (drawerOpen) drawerOpen.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
    window.setTimeout(function () { drawer.hidden = true; }, reduceMotion ? 0 : 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (drawerOpen) drawerOpen.addEventListener('click', openDrawer);
  $$('[data-drawer-close]').forEach(function (el) { el.addEventListener('click', closeDrawer); });

  /* ----------------------------------------------------------
     Products dropdown (hover on desktop, click + keyboard)
     ---------------------------------------------------------- */
  var menuBtn = $('[data-menu-btn]');
  var menu = $('[data-menu]');
  var menuTimer = null;

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.classList.toggle('is-open', open);
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menu.hidden);
    });

    // hover intent on desktop
    var item = menuBtn.closest('.has-menu');
    if (item && window.matchMedia('(hover: hover) and (min-width: 1081px)').matches) {
      item.addEventListener('mouseenter', function () {
        window.clearTimeout(menuTimer);
        setMenu(true);
      });
      item.addEventListener('mouseleave', function () {
        menuTimer = window.setTimeout(function () { setMenu(false); }, 160);
      });
    }

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    doc.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.has-menu')) setMenu(false);
    });

    // close when tabbing out of the menu
    menu.addEventListener('focusout', function (e) {
      if (!menu.contains(e.relatedTarget)) setMenu(false);
    });
  }

  /* ----------------------------------------------------------
     Reveal on scroll (+ stagger via --d)
     ---------------------------------------------------------- */
  var revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else if (revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     Split headlines — word/line wrap for the reveal animation
     ---------------------------------------------------------- */
  $$('[data-split]').forEach(function (el) {
    if (reduceMotion) return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    el.setAttribute('aria-label', words.join(' '));
    words.forEach(function (w, i) {
      var span = doc.createElement('span');
      span.className = 'word';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--wi', i);
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(doc.createTextNode(' '));
    });
    el.classList.add('is-split');
  });

  /* ----------------------------------------------------------
     Counters — Indian digit grouping (1,00,000)
     ---------------------------------------------------------- */
  function formatIN(n) {
    var s = String(Math.round(n));
    if (s.length <= 3) return s;
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + ',' + last3;
  }

  var counters = $$('[data-count]');
  if (counters.length) {
    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var grouped = el.hasAttribute('data-group');
      if (reduceMotion) {
        el.textContent = grouped ? formatIN(target) : String(target);
        return;
      }
      var start = null;
      var dur = 1600;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = grouped ? formatIN(val) : String(Math.round(val));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
    } else {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animate(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ----------------------------------------------------------
     Accordion
     ---------------------------------------------------------- */
  $$('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = doc.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.closest('.acc-item').classList.toggle('is-open', !open);
      if (panel) panel.hidden = open;
    });
  });

  /* ----------------------------------------------------------
     Back to top
     ---------------------------------------------------------- */
  var toTop = $('[data-to-top]');
  if (toTop) {
    var toc = function () { toTop.classList.toggle('is-on', window.scrollY > 600); };
    toc();
    window.addEventListener('scroll', toc, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var b = $('.skip-link');
      if (b) b.focus({ preventScroll: true });
    });
  }

  /* ----------------------------------------------------------
     Cookie consent — gates analytics
     ---------------------------------------------------------- */
  var cookieBar = $('[data-cookie]');
  var CONSENT_KEY = 'ecolink-consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* private mode */ }
  }

  function loadAnalytics() {
    // Analytics are only loaded after explicit consent.
    // Wire the real provider here once the client supplies a measurement ID.
    if (window.__analyticsLoaded) return;
    window.__analyticsLoaded = true;
    doc.dispatchEvent(new CustomEvent('ecolink:analytics-allowed'));
  }

  if (cookieBar) {
    var consent = getConsent();
    if (!consent) cookieBar.hidden = false;
    else if (consent === 'accepted') loadAnalytics();

    var accept = $('[data-cookie-accept]', cookieBar);
    var decline = $('[data-cookie-decline]', cookieBar);
    if (accept) accept.addEventListener('click', function () {
      setConsent('accepted');
      cookieBar.hidden = true;
      loadAnalytics();
    });
    if (decline) decline.addEventListener('click', function () {
      setConsent('declined');
      cookieBar.hidden = true;
    });
  }

  /* ----------------------------------------------------------
     Enquiry form
     ---------------------------------------------------------- */
  var enquiry = $('[data-endpoint]');
  if (enquiry) {
    var form = $('form', enquiry);
    var endpoint = enquiry.getAttribute('data-endpoint');
    var status = $('[data-status]', enquiry);
    var submitBtn = $('[data-submit]', enquiry);
    var submitting = false;

    // Pre-fill topic from ?topic=… (used by solution CTAs)
    var params = new URLSearchParams(window.location.search);
    var topic = params.get('topic');
    if (topic) {
      var typeSel = $('#f-type', enquiry);
      if (typeSel) {
        Array.prototype.some.call(typeSel.options, function (o) {
          if (o.value.toLowerCase() === topic.toLowerCase()) {
            typeSel.value = o.value;
            return true;
          }
          return false;
        });
      }
    }

    function setError(name, msg) {
      var field = enquiry.querySelector('[data-error-for="' + name + '"]');
      var input = form.elements[name];
      if (field) field.textContent = msg || '';
      if (input) input.classList.toggle('is-invalid', Boolean(msg));
      if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function validate() {
      var ok = true;
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var type = form.elements.type.value;
      var message = form.elements.message.value.trim();

      setError('name', '');
      setError('email', '');
      setError('type', '');
      setError('message', '');

      if (!name) { setError('name', 'Please enter your name.'); ok = false; }
      if (!email) { setError('email', 'Please enter your email address.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Please enter a valid email address.'); ok = false; }
      if (!type) { setError('type', 'Please choose an enquiry type.'); ok = false; }
      if (!message) { setError('message', 'Please enter a message.'); ok = false; }

      return ok;
    }

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg || '';
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return; // duplicate prevention

      if (!validate()) {
        setStatus('Please fix the highlighted fields.', 'error');
        var bad = form.querySelector('.is-invalid');
        if (bad) bad.focus();
        return;
      }

      var payload = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.name && el.value) payload[el.name] = el.value.trim();
      });
      payload.page = window.location.pathname;

      if (!endpoint) {
        // Honest state: endpoint not configured — never fake success.
        setStatus('The form is not connected yet. Please email us directly in the meantime.', 'error');
        return;
      }

      submitting = true;
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      setStatus('Sending…', 'pending');

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed with status ' + res.status);
          form.reset();
          setStatus('Thank you — your enquiry has been sent. We will respond within one working day.', 'success');
        })
        .catch(function (err) {
          console.error(err);
          setStatus('Sorry, something went wrong sending your enquiry. Please email us directly.', 'error');
        })
        .then(function () {
          submitting = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        });
    });

    // clear field errors as the user types
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name) el.addEventListener('input', function () { setError(el.name, ''); });
    });
  }

  /* ----------------------------------------------------------
     Solution CTA topic → carried on links that already
     point at /contact#enquiry
     ---------------------------------------------------------- */
  $$('a[data-topic]').forEach(function (a) {
    a.addEventListener('click', function () {
      try {
        sessionStorage.setItem('ecolink-topic', a.getAttribute('data-topic'));
      } catch (e) { /* ignore */ }
    });
  });

  /* ----------------------------------------------------------
     Inline plant walkthrough video — lime badge starts it
     ---------------------------------------------------------- */
  $$('[data-video]').forEach(function (frame) {
    var vid = $('.video-el', frame);
    var playBtn = $('[data-video-play]', frame);
    if (!vid || !playBtn) return;

    var sync = function () {
      frame.classList.toggle('is-playing', !vid.paused && !vid.ended);
    };
    playBtn.addEventListener('click', function () {
      frame.classList.add('is-playing');
      var p = vid.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { frame.classList.remove('is-playing'); });
      }
    });
    vid.addEventListener('play', sync);
    vid.addEventListener('pause', sync);
    vid.addEventListener('ended', sync);
  });

  /* ----------------------------------------------------------
     Image reveal polish
     ---------------------------------------------------------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var imgIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            imgIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    $$('.img-reveal').forEach(function (el) { imgIo.observe(el); });
  } else {
    $$('.img-reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----------------------------------------------------------
     Zoom-on-scroll images — images sit slightly zoomed at the
     edges of the viewport and ease to their natural size as
     they pass through the centre. Driven by the independent
     `scale` property so it composes with the hover zooms in
     the stylesheet (the two multiply together).
     ---------------------------------------------------------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var ZOOM_AMP = 0.05; // +5% at the viewport edge, 0 at the centre

    // Only zoom images whose frame clips, so nothing can ever
    // bleed outside its card, figure or section.
    var frameClips = function (el) {
      for (var p = el.parentElement; p; p = p.parentElement) {
        var cs = window.getComputedStyle(p);
        if (
          cs.overflow === 'hidden' || cs.overflow === 'clip' ||
          cs.overflowX === 'hidden' || cs.overflowX === 'clip' ||
          cs.overflowY === 'hidden' || cs.overflowY === 'clip'
        ) return true;
      }
      return false;
    };

    var zoomImgs = $$('main img').filter(function (img) {
      var src = img.getAttribute('src') || '';
      if (/\.svg(?:$|[?#])/.test(src)) return false;              // icons / maps
      if (img.classList.contains('brand-logo')) return false;      // logos
      if (img.classList.contains('logo-img')) return false;
      return frameClips(img);
    });

    if (zoomImgs.length) {
      var zoomLive = new Set();
      var zoomQueued = false;

      var zoomUpdate = function () {
        zoomQueued = false;
        var vh = window.innerHeight || doc.documentElement.clientHeight;
        zoomLive.forEach(function (img) {
          var r = img.getBoundingClientRect();
          var mid = r.top + r.height / 2;
          var t = Math.min(Math.abs(mid - vh / 2) / (vh / 2), 1);
          img.style.scale = (1 + ZOOM_AMP * t).toFixed(4);
        });
      };

      var zoomRequest = function () {
        if (zoomQueued) return;
        zoomQueued = true;
        requestAnimationFrame(zoomUpdate);
      };

      var zoomIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var img = entry.target;
            if (entry.isIntersecting) {
              zoomLive.add(img);
              img.classList.add('is-live');
            } else {
              zoomLive.delete(img);
              img.classList.remove('is-live');
            }
          });
          zoomRequest();
        },
        { rootMargin: '15% 0px' } // start/keep updating just off-screen
      );

      zoomImgs.forEach(function (img) {
        img.classList.add('is-zoom');
        zoomIo.observe(img);
      });

      window.addEventListener('scroll', zoomRequest, { passive: true });
      window.addEventListener('resize', zoomRequest);
      window.addEventListener('load', zoomRequest);
    }
  }
})();
