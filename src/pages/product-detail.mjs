import { page } from '../layout.mjs';
import { allProducts, boards, routes, site, sheet } from '../data.mjs';
import { esc, img, ic, lines, kicker, crumbs, specs, useList, downloads, ctaBand, waterMeter, contactHref } from '../ui.mjs';

function hero(p) {
  const isBoard = 'water' in p;
  return `<section class="prod-hero">
  <div class="prod-grid">
    <div class="prod-copy">
      ${crumbs([{ label: 'Products', href: routes.products }, { label: p.name }])}
      <div class="prod-tags">
        ${isBoard ? `<span class="chip">${ic.water} ${esc(p.water)}</span><span class="chip">8 x 4 ft · 4–50 mm</span>` : `<span class="chip">Made from waste</span>`}
        ${p.sister ? `<span class="chip chip--dark">Sister brand</span>` : ''}
      </div>
      <h1 class="d1 rv-line">${lines(p.name)}</h1>
      <p class="lead rv" style="--d:250ms">${esc(p.sub || p.line)}</p>
      <div class="btns rv" style="--d:350ms">
        <a class="btn btn--lime" href="${contactHref('Sales')}">${esc(p.quote)} ${ic.arrow}</a>
        ${p.sister ? `<a class="btn btn--ghost" href="${site.ecoshaktiUrl}" target="_blank" rel="noopener">Visit ecoshakti.in ${ic.ext}</a>` : `<a class="btn btn--ghost" href="#specs">At a glance</a>`}
      </div>
    </div>
    <div class="prod-media">${img(p.hero, `${p.name}`, { eager: true })}</div>
  </div>
</section>`;
}

function glance(p) {
  const isBoard = 'water' in p;
  return `<section class="sec" id="specs">
  <div class="wrap split split--top">
    <div class="split-copy">
      ${kicker('01', 'What it is')}
      <div class="prose rv" style="font-size:clamp(19px,1.6vw,23px);line-height:1.5">${p.what.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
      ${isBoard ? `<div class="rv" style="max-width:360px">${waterMeter(p.waterLevel, p.water)}</div>` : ''}
      ${p.note ? `<div class="note rv">${ic.info}<div><strong>Good to know</strong><p>${esc(p.note)}</p></div></div>` : ''}
    </div>
    <div class="split-copy rv" style="--d:120ms">
      ${kicker('02', 'At a glance')}
      ${specs(p.specs)}
      ${isBoard ? `<p class="muted" style="font-size:15px">${esc(sheet.custom)}</p>` : ''}
      ${p.downloads && p.downloads.length ? `<div style="display:grid;gap:12px;margin-top:8px">${kicker(null, 'Downloads')}${downloads(p.downloads)}</div>` : ''}
    </div>
  </div>
</section>`;
}

function uses(p) {
  if (!p.uses.length) return '';
  return `<section class="sec paper-2">
  <div class="wrap">
    <div class="head head--split"><div>${kicker('03', 'Where it works')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Where it works.')}</h2></div></div>
    ${useList(p.uses, p.usesImg)}
  </div>
</section>`;
}

const sister = (p) =>
  p.sister
    ? `<section class="sec sister">
  <div class="sister-bg" aria-hidden="true">${img('assets/img/film/mlp-pile.jpg', '')}</div>
  <div class="wrap split">
    <div class="split-copy">
      ${kicker('Ecoshakti', 'Visit the Ecoshakti site')}
      <h2 class="d2 rv-line">${lines('Ecoshakti has its own website.')}</h2>
      <p class="lead rv" style="color:rgba(255,255,255,.85)">The full range and details live there.</p>
      <div class="btns rv"><a class="btn btn--lime" href="${site.ecoshaktiUrl}" target="_blank" rel="noopener">Visit ecoshakti.in ${ic.ext}</a></div>
    </div>
    <p class="sister-url rv" style="justify-self:end">${site.ecoshaktiUrl.replace('https://', '')} ↗</p>
  </div>
</section>`
    : '';

function related(p) {
  const list = 'water' in p ? boards.filter((b) => b.slug !== p.slug) : allProducts.filter((x) => !('water' in x) && x.slug !== p.slug);
  return `<section class="sec--tight" style="padding-top:clamp(56px,6vw,90px)">
  <div class="wrap">
    <div style="margin-bottom:24px">${kicker(null, 'Related')}</div>
    <div class="related">
      ${list
        .map(
          (r) => `<a class="rel rv" href="${r.href}">${img(r.img, '')}<div><strong>${esc(r.name)}</strong><span>${esc(r.water || r.line)}</span></div>${ic.arrow}</a>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

const render = (p) => () =>
  page({
    title: p.seoTitle,
    description: p.seoDesc,
    current: p.href,
    ogImage: p.hero,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.seoDesc,
      brand: { '@type': 'Brand', name: p.sister ? 'Ecoshakti' : 'Ecolink' },
      manufacturer: { '@type': 'Organization', name: site.legalName }
    },
    body: [hero(p), glance(p), uses(p), sister(p), related(p), ctaBand({ title: p.cta, btn: p.quote, href: contactHref('Sales') })].join('\n')
  });

export const productPages = Object.fromEntries(allProducts.map((p) => [p.slug, render(p)]));
