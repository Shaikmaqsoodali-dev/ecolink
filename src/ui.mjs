import { site, nav, routes, enquiryTypes, media, clients, testimonials, contactPage } from './data.mjs';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Root-relative asset path (external URLs pass through). */
export const asset = (p) => (/^https?:/.test(p) ? p : '/' + String(p).replace(/^\/+/, ''));

export const pad = (n) => String(n).padStart(2, '0');

/** Indian digit grouping: 100000 → 1,00,000 */
export const formatIN = (n) => {
  const s = String(Math.round(n));
  if (s.length <= 3) return s;
  return s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3);
};

export function img(src, alt = '', opts = {}) {
  const { cls = '', eager = false, w, h, sizes } = opts;
  const loading = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<img src="${asset(src)}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${loading} decoding="async"${w ? ` width="${w}"` : ''}${h ? ` height="${h}"` : ''}${sizes ? ` sizes="${sizes}"` : ''}>`;
}

const svg = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;

export const ic = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUp: svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),
  ext: svg('<path d="M7 17L17 7M9 7h8v8"/>'),
  caret: svg('<path d="M6 9l6 6 6-6"/>', ' class="caret"'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  drop: svg('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
  download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  factory: svg('<path d="M3 21V10l6 4V10l6 4V5h6v16z"/><path d="M7 17h2M13 17h2"/>'),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
  swap: svg('<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>'),
  water: svg('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>')
};

/** Split a headline into sentences → animated lines. */
export const lines = (text) =>
  String(text)
    .split(/(?<=[.?!])\s+/)
    .map((l, i) => `<span class="line" style="--i:${i}"><span>${esc(l)}</span></span>`)
    .join(' ');

export const kicker = (n, label) =>
  `<p class="kicker"><span>${n ? `<b>${esc(n)}</b> · ` : ''}${esc(label)}</span></p>`;

/* ------------------------------------------------------------------ */
/* Header / drawer                                                     */
/* ------------------------------------------------------------------ */

const isActive = (href, current) => current === href || (href !== '/' && current.startsWith(href + '/')) || (href !== '/' && current === href);

function megaMenu(item, current) {
  const boards = item.children.slice(0, 3);
  const others = item.children.slice(3);
  return `<div class="mega" id="products-menu" data-menu hidden>
    <div class="mega-col">
      <p class="mega-label">The boards</p>
      ${boards
        .map(
          (c) => `<a class="mega-board" href="${c.href}"${current === c.href ? ' aria-current="page"' : ''}>
            ${img(c.img, '')}
            <span class="mb-txt"><strong>${esc(c.label)}${c.badge ? ` <span class="badge">${esc(c.badge)}</span>` : ''}</strong><span class="mb-desc">${esc(c.desc)}</span></span>
          </a>`
        )
        .join('')}
    </div>
    <div class="mega-col mega-simple">
      <p class="mega-label">Made from the boards</p>
      ${others
        .map((c) => `<a href="${c.href}"${current === c.href ? ' aria-current="page"' : ''}><strong>${esc(c.label)}</strong><span class="mb-desc">${esc(c.desc)}</span></a>`)
        .join('')}
      <a class="link mega-all" href="${item.href}">All products ${ic.arrow}</a>
    </div>
  </div>`;
}

export function header(current) {
  const items = nav
    .map((i) => {
      const active = isActive(i.href, current);
      if (i.children) {
        return `<li class="has-menu${active ? ' is-section' : ''}">
          <button class="nav-a" type="button" aria-expanded="false" aria-controls="products-menu" data-menu-btn>${esc(i.label)} ${ic.caret}</button>
          ${megaMenu(i, current)}
        </li>`;
      }
      return `<li><a class="nav-a" href="${i.href}"${active ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`;
    })
    .join('');
  return `<header class="hdr" data-header>
  <div class="wrap hdr-in">
    <a class="brand" href="${routes.home}" aria-label="Ecolink India — home">
      ${img('assets/img/deluxe-logo.png', 'Deluxe Recycling', { cls: 'brand-mark', eager: true, w: 48, h: 48 })}
      <span class="brand-name"><strong>Ecolink India</strong><span>Since ${site.since}</span></span>
    </a>
    <nav class="nav" aria-label="Primary"><ul>${items}</ul></nav>
    <a class="btn btn--sm hdr-cta" href="${routes.contact}#enquiry">Get a Quote ${ic.arrow}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" data-drawer-open><i></i><span class="sr-only">Open menu</span></button>
  </div>
</header>`;
}

export function drawer(current) {
  return `<div class="drawer" id="drawer" data-drawer hidden>
  <div class="drawer-bg" data-drawer-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-head">
      <a class="brand" href="${routes.home}">${img('assets/img/deluxe-logo.png', 'Deluxe Recycling', { cls: 'brand-mark', w: 48, h: 48 })}<span class="brand-name"><strong>Ecolink India</strong></span></a>
      <button class="drawer-x" type="button" data-drawer-close>${ic.close}<span class="sr-only">Close menu</span></button>
    </div>
    <nav class="drawer-nav" aria-label="Mobile">
      <ul>
        ${nav
          .map((i) => {
            const a = isActive(i.href, current) ? ' aria-current="page"' : '';
            const sub = i.children
              ? `<ul class="drawer-sub">${i.children.map((c) => `<li><a href="${c.href}"${current === c.href ? ' aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}</ul>`
              : '';
            return `<li><a href="${i.href}"${a}>${esc(i.label)} ${ic.arrow.replace('<svg', '<svg width="22" height="22"')}</a>${sub}</li>`;
          })
          .join('')}
      </ul>
    </nav>
    <div class="drawer-foot">
      <a class="btn btn--lime" href="${routes.contact}#enquiry">Get a Quote ${ic.arrow}</a>
      <a href="mailto:${site.email}">${site.email}</a>
      ${site.phones.map((p) => `<a href="${p.href}">${esc(p.value)}</a>`).join('')}
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function footer() {
  const products = nav.find((n) => n.children).children;
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div class="ftr-brand">
        <a class="brand" href="${routes.home}">${img('assets/img/deluxe-logo-600.png', 'Deluxe Recycling', { cls: 'brand-mark brand-mark--lg', w: 96, h: 97 })}<span class="brand-name"><strong>Ecolink India</strong><span>Deluxe Recycling (India) Pvt. Ltd.</span></span></a>
        <p class="ftr-tag">${esc(site.tagline)}</p>
        <p class="ftr-about">${esc(site.about)}</p>
      </div>
      <div>
        <h3>Products</h3>
        <ul>${products.map((p) => `<li><a href="${p.href}">${esc(p.label)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li><a href="${routes.about}">About</a></li>
          <li><a href="${routes.solutions}">Recycling plants</a></li>
          <li><a href="${routes.environment}">Environment</a></li>
          <li><a href="${routes.faq}">FAQ</a></li>
          <li><a href="${routes.contact}">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Get in touch</h3>
        <address class="ftr-addr">
          <strong>Head office</strong>
          ${site.office.map(esc).join('<br>')}
          <strong>Factory</strong>
          ${esc(site.factory)}
          <strong>Talk to us</strong>
          ${site.phones.map((p) => `<a href="${p.href}">${esc(p.value)}</a><br>`).join('')}
          <a href="mailto:${site.email}">${site.email}</a>
        </address>
      </div>
    </div>
    <div class="ftr-bottom">
      <p>${esc(site.copyright)}</p>
      <p><a href="${routes.privacy}">Privacy Policy</a></p>
    </div>
  </div>
  <div class="ftr-word" aria-hidden="true">Ecolink</div>
</footer>`;
}

export const toTop = () => `<button class="to-top" type="button" data-to-top aria-label="Back to top">${ic.arrowUp}</button>`;

export const cookieBar = () => `<div class="cookie" data-cookie hidden role="region" aria-label="Cookie consent">
  <p>We use cookies to see how people use the site. Nothing creepy. <a href="${routes.privacy}">Privacy Policy</a></p>
  <div class="btns">
    <button class="btn btn--lime btn--sm" type="button" data-cookie-accept>Accept</button>
    <button class="btn btn--ghost btn--sm" type="button" data-cookie-decline>No thanks</button>
  </div>
</div>`;

/** Full corporate film in a dialog (opened by [data-film-open]). */
export const filmModal = () => `<div class="modal" data-modal hidden role="dialog" aria-modal="true" aria-label="${esc(media.film.title)}">
  <div class="modal-box">
    <button class="modal-x" type="button" data-modal-close>${ic.close}<span class="sr-only">Close video</span></button>
    <video controls playsinline preload="none" poster="${media.film.poster}" data-modal-video>
      <source src="${media.film.src}" type="video/mp4">
    </video>
  </div>
</div>`;

/* ------------------------------------------------------------------ */
/* Page sections                                                       */
/* ------------------------------------------------------------------ */

export function crumbs(trail) {
  return `<nav aria-label="Breadcrumb"><ol class="crumbs">
    <li><a href="${routes.home}">Home</a></li>
    ${trail.map((t) => (t.href ? `<li><a href="${t.href}">${esc(t.label)}</a></li>` : `<li aria-current="page">${esc(t.label)}</li>`)).join('')}
  </ol></nav>`;
}

/** Inner page hero. With `bg` it is a dark full-bleed image hero. */
export function pageHero({ k, title, sub, trail, bg, side = '' }) {
  const dark = Boolean(bg);
  return `<section class="phero${dark ? ' phero--img' : ''}">
  ${dark ? `<div class="phero-bg">${img(bg, '', { eager: true })}</div>` : ''}
  <div class="wrap">
    ${k ? kicker(null, k) : ''}
    <h1 class="d1 rv-line" style="margin-top:20px">${lines(title)}</h1>
    ${sub ? `<p class="lead rv" style="--d:300ms">${esc(sub)}</p>` : ''}
    <div class="phero-foot">${crumbs(trail)}${side}</div>
  </div>
</section>`;
}

export function figures(items, { paper = false } = {}) {
  const current = items.find((i) => i.value === 37000)?.value || 37000;
  return `<div class="figures${paper ? ' paper-figs' : ''}">
    ${items
      .map((s, i) => {
        const shown = s.grouping ? formatIN(s.value) : String(s.value);
        const bar = s.target
          ? `<div class="fig-bar rv" style="--p:${((current / s.value) * 100).toFixed(0)}%"><i></i></div>
             <div class="fig-bar-l"><span>${formatIN(current)} today</span><span>target</span></div>`
          : '';
        return `<div class="fig rv${s.target ? ' fig--target' : ''}" style="--d:${i * 90}ms">
          <p class="fig-n"><span data-count="${s.value}"${s.grouping ? ' data-group' : ''}>${shown}</span>${s.unit ? `<small>${esc(s.unit)}</small>` : ''}</p>
          <p class="fig-l">${esc(s.label)}</p>
          ${bar}
        </div>`;
      })
      .join('')}
  </div>`;
}

export function ctaBand({ title, text, btn = 'Get a Quote', href = routes.contact + '#enquiry', secondary } = {}) {
  return `<section class="sec cta">
  <div class="cta-tex" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <h2 class="d1 rv-line">${lines(title)}</h2>
    <div class="cta-side rv">
      ${text ? `<p>${esc(text)}</p>` : ''}
      <div class="btns">
        <a class="btn btn--lime" href="${href}">${esc(btn)} ${ic.arrow}</a>
        ${secondary ? `<a class="btn btn--ghost" href="${secondary.href}">${esc(secondary.label)}</a>` : ''}
      </div>
      <p class="cta-contact"><a href="mailto:${site.email}">${site.email}</a>${site.phones.map((p) => `<a href="${p.href}">${esc(p.value)}</a>`).join('')}</p>
    </div>
  </div>
</section>`;
}

/** Contact link that pre-selects an enquiry type. */
export const contactHref = (topic) => `${routes.contact}/?topic=${encodeURIComponent(topic)}#enquiry`;

export const specs = (list) =>
  `<dl class="specs">${list.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('')}</dl>`;

export function useList(uses, imgs = []) {
  if (!uses.length) return '';
  return `<ul class="uselist uselist--${uses.length >= 4 ? 4 : 3}">
    ${uses
      .map(
        (u, i) => `<li class="rv" style="--d:${i * 80}ms">
        ${imgs[i] ? `<div class="ui">${img(imgs[i], u)}</div>` : ''}
        <div class="ut"><span>${pad(i + 1)}</span><strong>${esc(u)}</strong></div>
      </li>`
      )
      .join('')}
  </ul>`;
}

export function downloads(keys) {
  const list = keys.map((k) => media.docs[k]).filter(Boolean);
  if (!list.length) return '';
  return `<div class="dl">
    ${list
      .map(
        (d) => `<a href="${asset(d.href)}" download>
        <span class="dl-ic">PDF</span>
        <span class="dl-txt"><strong>${esc(d.label)}</strong><span class="dl-meta">${esc(d.size)}</span></span>
        ${ic.download}
      </a>`
      )
      .join('')}
  </div>`;
}

export function waterMeter(level, label) {
  return `<div class="water">
    <span class="water-k">Water</span>
    <span class="water-v">${ic.drop} ${esc(label)}</span>
    <span class="water-bar" aria-hidden="true"><i class="on"></i><i${level > 1 ? ' class="on"' : ''}></i></span>
    <span class="water-scale" aria-hidden="true"><span>Resistant</span><span>100% waterproof</span></span>
  </div>`;
}

export function clientGrid() {
  return `<div class="clients">
    ${clients
      .map(
        (c) => `<div class="client${c.wide ? ' client--wide' : ''}">${
          c.logo ? `${img(c.logo, c.name)}${c.note ? `<small>${esc(c.note)}</small>` : ''}` : `<span><strong>${esc(c.name)}</strong>${c.note ? `<small>${esc(c.note)}</small>` : ''}</span>`
        }</div>`
      )
      .join('')}
  </div>
  ${
    testimonials.length
      ? `<div class="quotes">${testimonials
          .map(
            (t) => `<figure class="quote rv"><blockquote><p>“${esc(t.quote)}”</p></blockquote>
            <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}, ${esc(t.company)}</span></figcaption></figure>`
          )
          .join('')}</div>`
      : ''
  }`;
}

/** Self-hosted / Cloudinary film, plays inline on click. */
export function filmPlayer({ src, poster, title, duration }) {
  return `<div class="film frame" data-film>
    <img src="${asset(poster)}" alt="" loading="lazy">
    <video playsinline controls preload="none" poster="${asset(poster)}" hidden><source src="${asset(src)}" type="video/mp4"></video>
    <button class="film-play" type="button" data-film-play><span class="pb">${ic.play}</span><span class="sr-only">Play ${esc(title)}</span></button>
    <p class="film-meta">${esc(title)}${duration ? ` · ${esc(duration)}` : ''}</p>
  </div>`;
}

/** YouTube click-to-load (privacy-enhanced domain, nothing loads until clicked). */
export function ytFacade(v) {
  return `<div class="press-item rv">
    <div class="film" data-yt="${esc(v.id)}" data-title="${esc(v.title)}">
      <img src="${asset(`assets/img/press/${v.id}.jpg`)}" alt="" loading="lazy">
      <button class="film-play" type="button" data-yt-play><span class="pb">${ic.play}</span><span class="sr-only">Play: ${esc(v.title)}</span></button>
    </div>
    <div><span class="press-outlet">${esc(v.outlet)}</span><strong>${esc(v.title)}</strong></div>
  </div>`;
}

export function accordion(items, prefix) {
  return `<div class="acc">
    ${items
      .map(
        (f, i) => `<div class="acc-item">
        <h3><button class="acc-btn" type="button" aria-expanded="false" aria-controls="${prefix}-${i}" id="${prefix}-b${i}">
          <span>${esc(f.q)}</span><span class="acc-ic">${ic.plus}</span>
        </button></h3>
        <div class="acc-panel" id="${prefix}-${i}" role="region" aria-labelledby="${prefix}-b${i}" hidden><p>${f.html || esc(f.a)}</p></div>
      </div>`
      )
      .join('')}
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */

export function enquiryForm(endpoint) {
  const connected = Boolean(endpoint);
  const field = (id, label, type = 'text', req = false, ac = '') => `<div class="field">
      <label for="f-${id}">${esc(label)}${req ? ' *' : ''}</label>
      <input id="f-${id}" name="${id}" type="${type}"${ac ? ` autocomplete="${ac}"` : ''}${req ? ' required' : ''}>
      <span class="field-error" data-error-for="${id}"></span>
    </div>`;
  return `<div class="form-card" id="enquiry" data-enquiry data-endpoint="${esc(endpoint)}" data-ok="${esc(contactPage.sent)}" data-fail="${esc(contactPage.failed)}">
    ${connected ? '' : `<p class="notice" role="status">The form isn’t connected yet. Until it is, please email <a href="mailto:${site.email}">${site.email}</a>.</p>`}
    <form class="form" novalidate>
      <div class="form-row">${field('name', 'Your name', 'text', true, 'name')}${field('company', 'Company', 'text', false, 'organization')}</div>
      <div class="form-row">${field('phone', 'Phone', 'tel', false, 'tel')}${field('email', 'Email', 'email', true, 'email')}</div>
      <fieldset class="field">
        <legend>What is this about? *</legend>
        <div class="topics" data-topics>
          ${enquiryTypes
            .map((t, i) => `<label class="topic"><input type="radio" name="type" value="${esc(t)}"${i === 0 ? ' required' : ''}><span>${esc(t)}</span></label>`)
            .join('')}
        </div>
        <span class="field-error" data-error-for="type"></span>
      </fieldset>
      <div class="field">
        <label for="f-message">Tell us what you need *</label>
        <textarea id="f-message" name="message" rows="5" required></textarea>
        <span class="field-error" data-error-for="message"></span>
      </div>
      <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="form-foot">
        <button class="btn btn--lime" type="submit" data-submit>Send enquiry <span class="arr">${ic.arrow}</span><span class="spin" aria-hidden="true"></span></button>
        <p class="form-status" data-status role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>`;
}
