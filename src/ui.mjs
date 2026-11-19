import { site, nav, routes, enquiryTypes } from './data.mjs';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Root-relative asset path. */
export const asset = (p) => '/' + String(p).replace(/^\/+/, '');

export function img(src, alt, opts = {}) {
  const { className = '', eager = false, width, height } = opts;
  const loading = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  const wh = width ? ` width="${width}"` : '';
  const hh = height ? ` height="${height}"` : '';
  return `<img src="${asset(src)}" alt="${esc(alt)}" class="${className}" ${loading}${wh}${hh} decoding="async">`;
}

export function circleArrow(label = 'Learn more') {
  return `<span class="btn-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span><span class="sr-only">${esc(label)}</span>`;
}

export const arrowRight = (cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

export const arrowUp = (cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>`;

const icons = {
  sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h12v-2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4H2v-4z"/>',
  car: '<path d="M5 17h14M6 17l-1.5-5.5A2 2 0 0 1 6.4 9h11.2a2 2 0 0 1 1.9 2.5L18 17"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
  plane: '<path d="M10.2 3.3a1.5 1.5 0 0 1 3 0L13 9l7 4v2l-7-2-1 5 3 2v1l-4-1-4 1v-1l3-2-1-5-7 2v-2l7-4z"/>',
  boat: '<path d="M3 17l1.5-5h15L21 17"/><path d="M6 12V7h12v5"/><path d="M2 17c1.5 1.5 3 1.5 4.5 0S9.5 15.5 11 17s3 1.5 4.5 0S18.5 15.5 20 17"/>',
  box: '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
  case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
  bed: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 14h18"/><path d="M7 10V7h10v3"/>',
  rail: '<rect x="5" y="3" width="14" height="13" rx="2"/><path d="M5 10h14"/><path d="M8 20l-1 2M16 20l1 2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
  leaf: '<path d="M4 20c8 0 16-4 16-16C10 4 4 10 4 20z"/><path d="M4 20c4-4 8-6 12-8"/>'
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.leaf}</svg>`;

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function navLink(item, current, cls = 'nav-link') {
  const active = current === item.href || (item.href !== '/' && current.startsWith(item.href));
  const aria = active ? ' aria-current="page"' : '';
  if (item.children) {
    const open = current.startsWith(item.href);
    return `<li class="nav-item has-menu${active ? ' is-current' : ''}">
      <button class="${cls} nav-menu-btn${open ? ' is-section' : ''}" type="button" aria-expanded="false" aria-controls="products-menu" data-menu-btn>
        ${esc(item.label)} <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="nav-menu" id="products-menu" data-menu hidden>
        <p class="nav-menu-eyebrow">Products</p>
        <ul>
          ${item.children
            .map(
              (c) => `<li><a href="${c.href}"${current === c.href ? ' aria-current="page"' : ''}>
                <span class="nav-menu-title">${esc(c.label)}</span>
                <span class="nav-menu-desc">${esc(c.desc)}</span>
              </a></li>`
            )
            .join('')}
        </ul>
        <a class="nav-menu-all" href="${item.href}">All products ${arrowRight()}</a>
      </div>
    </li>`;
  }
  return `<li class="nav-item${active ? ' is-current' : ''}"><a class="${cls}" href="${item.href}"${aria}>${esc(item.label)}</a></li>`;
}

export function header(current) {
  return `<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${routes.home}">
      ${img('assets/img/logo-deluxe.png', '', { className: 'brand-logo', eager: true })}
      <span class="brand-text"><strong>Ecolink India</strong><span>Recycled composite boards</span></span>
    </a>
    <nav class="main-nav" aria-label="Primary">
      <ul class="nav-list">${nav.map((i) => navLink(i, current)).join('')}</ul>
    </nav>
    <a class="btn btn-sm header-cta" href="${routes.contact}#enquiry">Get a Quote${arrowRight()}</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-drawer" data-drawer-open>
      <span class="nav-toggle-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="sr-only">Open menu</span>
    </button>
  </div>
</header>`;
}

export function drawer(current) {
  return `<div class="drawer" id="site-drawer" data-drawer hidden>
  <div class="drawer-backdrop" data-drawer-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-head">
      <a class="brand" href="${routes.home}">
        ${img('assets/img/logo-deluxe.png', '', { className: 'brand-logo' })}
        <span class="brand-text"><strong>Ecolink India</strong></span>
      </a>
      <button class="drawer-close" type="button" data-drawer-close><span class="sr-only">Close menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <nav class="drawer-nav" aria-label="Mobile">
      <ul>
        ${nav
          .map((i) => {
            const active = current === i.href || (i.href !== '/' && current.startsWith(i.href));
            if (i.children) {
              return `<li class="drawer-group${active ? ' is-current' : ''}">
                <a href="${i.href}"${active ? ' aria-current="page"' : ''}>${esc(i.label)}</a>
                <ul class="drawer-sub">
                  ${i.children.map((c) => `<li><a href="${c.href}"${current === c.href ? ' aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}
                </ul>
              </li>`;
            }
            return `<li${active ? ' class="is-current"' : ''}><a href="${i.href}"${active ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`;
          })
          .join('')}
      </ul>
    </nav>
    <a class="btn drawer-cta" href="${routes.contact}#enquiry">Get a Quote${arrowRight()}</a>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function footer(current) {
  const productLinks = nav.find((n) => n.children).children;
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="${routes.home}">
          ${img('assets/img/logo-deluxe.png', '', { className: 'brand-logo' })}
          <span class="brand-text"><strong>Ecolink India</strong><span>Deluxe Recycling (India) Pvt. Ltd.</span></span>
        </a>
        <p class="footer-tagline">${esc(site.taglineFull)}</p>
        <div class="footer-social">
          <a href="${site.linkedin}" rel="noopener"><span class="sr-only">LinkedIn </span><span aria-hidden="true">in</span></a>
          <a href="${site.youtube}" rel="noopener"><span class="sr-only">YouTube </span><span aria-hidden="true">yt</span></a>
          <a href="${site.instagram}" rel="noopener"><span class="sr-only">Instagram </span><span aria-hidden="true">ig</span></a>
        </div>
      </div>
      <div class="footer-col">
        <h3>Company</h3>
        <ul>
          <li><a href="${routes.about}">About</a></li>
          <li><a href="${routes.environment}">Environment</a></li>
          <li><a href="${routes.faq}">FAQ</a></li>
          <li><a href="${routes.contact}">Contact</a></li>
          <li><a href="${routes.privacy}">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Products</h3>
        <ul>${productLinks.map((p) => `<li><a href="${p.href}">${esc(p.label)}</a></li>`).join('')}</ul>
      </div>
      <div class="footer-col">
        <h3>Solutions</h3>
        <ul>
          <li><a href="${routes.solutions}">Recycling plants</a></li>
          <li><a href="${routes.solutions}#process">Turnkey projects</a></li>
          <li><a href="${routes.solutions}#epr">EPR support</a></li>
          <li><a href="${routes.solutions}#waste">What we take</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <ul class="footer-contact">
          <li><a href="tel:${site.phone.replace(/\s/g, '')}">${esc(site.phone)}</a></li>
          <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
          <li><span>${esc(site.address)}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${esc(site.copyright)}</p>
      <p class="footer-note">Recycled composite boards · Sheets · Roofing · Doors · Pallets</p>
    </div>
  </div>
  <div class="footer-wordmark" aria-hidden="true">Ecolink</div>
</footer>`;
}

export function backToTop() {
  return `<button class="to-top" type="button" data-to-top aria-label="Back to top">${arrowUp()}</button>`;
}

export function cookieBar() {
  return `<div class="cookie" data-cookie hidden role="region" aria-label="Cookie consent">
  <div class="cookie-inner">
    <p>We use cookies to understand how the site is used. Analytics are only enabled if you accept. <a href="${routes.privacy}">Privacy Policy</a></p>
    <div class="cookie-actions">
      <button class="btn btn-ghost btn-sm btn-plain" type="button" data-cookie-decline>Decline</button>
      <button class="btn btn-primary btn-sm" type="button" data-cookie-accept>Accept${arrowRight()}</button>
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ */
/* Shared sections                                                     */
/* ------------------------------------------------------------------ */

export function breadcrumb(current, label) {
  if (current === routes.home) return '';
  return `<nav class="breadcrumb container" aria-label="Breadcrumb">
    <ol>
      <li><a href="${routes.home}">Home</a></li>
      <li aria-current="page">${esc(label)}</li>
    </ol>
  </nav>`;
}

export function pageHero({ eyebrow, title, text, current, label, size = '' }) {
  return `<section class="page-hero ${size}">
  <div class="container">
    ${eyebrow ? `<p class="eyebrow reveal">${esc(eyebrow)}</p>` : ''}
    <h1 class="display reveal" data-split>${esc(title)}</h1>
    ${text ? `<p class="lead reveal">${esc(text)}</p>` : ''}
  </div>
  ${breadcrumb(current, label || title)}
</section>`;
}

export function sectionHead({ eyebrow, title, text, align = '' }) {
  return `<div class="section-head ${align}">
    ${eyebrow ? `<p class="eyebrow reveal">${esc(eyebrow)}</p>` : ''}
    <h2 class="reveal" data-split>${esc(title)}</h2>
    ${text ? `<p class="section-text reveal">${esc(text)}</p>` : ''}
  </div>`;
}

/** Infinite uppercase word strip (Manufact "MANUFACTURING EXCELLENCE"). */
export function marquee(words) {
  const group = (cls = '') => `<div class="marquee-group${cls ? ' ' + cls : ''}" aria-hidden="${cls ? 'true' : 'false'}">
      ${words.map((w, i) => `${i % 2 ? '<i></i>' : ''}<span${i % 3 === 2 ? ' class="hollow"' : ''}>${esc(w)}</span>`).join('')}
      <i></i>
    </div>`;
  return `<section class="marquee" aria-label="${esc(words.join(' · '))}">
    <div class="marquee-track">
      ${group('')}
      ${group('is-clone')}
    </div>
  </section>`;
}

export function statsStrip(items, extraClass = '') {
  return `<section class="stats ${extraClass}" aria-label="Key figures">
  <div class="container stats-grid">
    ${items
      .map(
        (s) => `<div class="stat reveal">
        <p class="stat-value"><span data-count="${s.value}"${s.grouping ? ' data-group="1"' : ''}>0</span><span class="stat-suffix">${esc(s.suffix || '')}</span></p>
        <p class="stat-label">${esc(s.label)}</p>
      </div>`
      )
      .join('')}
  </div>
</section>`;
}

export function logoStrip(items) {
  if (!items || !items.length) return '';
  return `<section class="logos" aria-label="Trusted by">
  <div class="container">
    <p class="logos-label reveal">Trusted by</p>
    <div class="logos-row">
      ${items.map((l) => `<div class="logo-item reveal">${img(l.img, l.alt, { className: 'logo-img' })}</div>`).join('')}
    </div>
  </div>
</section>`;
}

export function testimonialSection(items) {
  if (!items || !items.length) return '';
  return `<section class="section testimonials">
  <div class="container">
    ${sectionHead({ eyebrow: 'Testimonials', title: 'What our clients say.' })}
    <div class="quote-grid">
      ${items
        .map(
          (t) => `<figure class="quote-card reveal">
          <blockquote><p>${esc(t.quote)}</p></blockquote>
          <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption>
        </figure>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

export function ctaBanner({ title, text, primary, primaryHref, secondary, secondaryHref, topic } = {}) {
  const p = primaryHref || routes.contact;
  const s = secondaryHref || routes.products;
  const topicAttr = topic ? ` data-topic="${esc(topic)}"` : '';
  return `<section class="section cta-section">
  <div class="container">
    <div class="cta reveal">
      <div class="cta-copy">
        <h2 data-split>${esc(title)}</h2>
        ${text ? `<p>${esc(text)}</p>` : ''}
      </div>
      <div class="cta-actions">
        <a class="btn btn-light" href="${p}"${topicAttr}>${esc(primary || 'Get a Quote')}${arrowRight()}</a>
        <a class="btn btn-outline-light" href="${s}">${esc(secondary || 'View products')}</a>
      </div>
    </div>
  </div>
</section>`;
}

export function productCard(p, i = 0) {
  return `<a class="product-card reveal" href="${p.href}" style="--d:${i * 60}ms">
    <div class="product-card-img">${img(p.img, p.alt)}</div>
    <div class="product-card-body">
      <span class="tag">${esc(p.tag)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.blurb)}</p>
      <span class="card-link">View product ${arrowRight()}</span>
    </div>
  </a>`;
}

export function appCard(a, i = 0) {
  const media = a.img
    ? `<div class="app-card-media">${img(a.img, a.alt || a.title, { width: 1024, height: 640 })}</div>`
    : '';
  return `<div class="app-card reveal" style="--d:${(i % 3) * 70}ms">
    ${media}
    <div class="app-card-body">
      ${icon(a.icon)}
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.body)}</p>
    </div>
  </div>`;
}

export function specList(specs) {
  return `<dl class="spec-list">
    ${specs
      .map(
        (s) => `<div class="spec-row reveal">
        <dt>${esc(s.label)}</dt>
        <dd>${esc(s.value)}${s.pending ? ' <span class="pending">— to be confirmed</span>' : ''}</dd>
      </div>`
      )
      .join('')}
  </dl>`;
}

export function accordion(items, idPrefix = 'faq') {
  return `<div class="accordion">
    ${items
      .map(
        (f, i) => `<div class="acc-item reveal${f.pending ? ' is-pending' : ''}">
        <h3>
          <button class="acc-btn" type="button" aria-expanded="false" aria-controls="${idPrefix}-${i}" id="${idPrefix}-btn-${i}">
            <span>${esc(f.q)}</span>
            <svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </h3>
        <div class="acc-panel" id="${idPrefix}-${i}" role="region" aria-labelledby="${idPrefix}-btn-${i}" hidden>
          <div class="acc-body"><p>${esc(f.a)}</p></div>
        </div>
      </div>`
      )
      .join('')}
  </div>`;
}

export function comparisonTable(cmp) {
  return `<div class="table-wrap reveal">
    <table class="compare">
      <thead><tr>${cmp.head.map((h, i) => `<th scope="col"${i === 0 ? '' : ' class="col-brand"'}>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${cmp.rows
          .map(
            (r) => `<tr>${r
              .map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td${i === 1 ? ' class="col-brand"' : ''}>${esc(c)}</td>`))
              .join('')}</tr>`
          )
          .join('')}
      </tbody>
    </table>
    <p class="verify-note">${esc(cmp.note)}</p>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */

export function enquiryForm(endpoint) {
  const connected = Boolean(endpoint);
  return `<div class="enquiry" data-enquiry data-endpoint="${esc(endpoint)}">
    ${connected ? '' : `<p class="notice" role="status">This form is not connected yet — submission will go live once the endpoint is configured. You can also email <a href="mailto:${site.email}">${site.email}</a>.</p>`}
    <form class="form" novalidate>
      <div class="form-row">
        <div class="field">
          <label for="f-name">Name *</label>
          <input id="f-name" name="name" type="text" autocomplete="name" required>
          <span class="field-error" data-error-for="name"></span>
        </div>
        <div class="field">
          <label for="f-email">Email *</label>
          <input id="f-email" name="email" type="email" autocomplete="email" required>
          <span class="field-error" data-error-for="email"></span>
        </div>
      </div>
      <div class="form-row">
        <div class="field">
          <label for="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" autocomplete="tel">
          <span class="field-error" data-error-for="phone"></span>
        </div>
        <div class="field">
          <label for="f-type">Enquiry type *</label>
          <select id="f-type" name="type" required>
            <option value="">Select…</option>
            ${enquiryTypeOptions()}
          </select>
          <span class="field-error" data-error-for="type"></span>
        </div>
      </div>
      <div class="field">
        <label for="f-message">Message *</label>
        <textarea id="f-message" name="message" rows="5" required></textarea>
        <span class="field-error" data-error-for="message"></span>
      </div>
      <div class="form-foot">
        <button class="btn btn-primary" type="submit" data-submit>
          <span class="btn-label">Send enquiry</span>
          <span class="btn-arrow" aria-hidden="true">${arrowRight()}</span>
          <span class="btn-spinner" aria-hidden="true"></span>
        </button>
        <p class="form-status" data-status role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>`;
}

function enquiryTypeOptions() {
  return enquiryTypes.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('');
}
