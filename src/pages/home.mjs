import { page } from '../layout.mjs';
import { home as H, stats, boards, sheet, endUses, threeZeros, routes, media, site, wasteStreams } from '../data.mjs';
import { esc, img, ic, lines, kicker, figures, ctaBand, clientGrid, waterMeter, pad, asset } from '../ui.mjs';

const hero = () => `<section class="hero" data-hero>
  <div class="hero-media" aria-hidden="true">
    <video autoplay muted loop playsinline preload="auto" poster="${asset(media.heroLoop.poster)}" data-hero-video>
      <source src="${asset(media.heroLoop.small)}" type="video/mp4" media="(max-width: 760px)">
      <source src="${asset(media.heroLoop.large)}" type="video/mp4">
    </video>
  </div>
  <div class="wrap hero-in">
    ${kicker('Since 1999', 'India’s pioneer in recycled composite boards')}
    <h1 class="d1 rv-line" style="margin-top:22px">${lines(H.hero.headline)}</h1>
    <div class="hero-row">
      <p class="hero-sub rv" style="--d:350ms">${esc(H.hero.sub)}</p>
      <div class="btns rv on-dark" style="--d:450ms">
        <a class="btn btn--lime" href="${routes.products}">See what we make ${ic.arrow}</a>
        <a class="btn btn--ghost" href="${routes.contact}#enquiry">Talk to us</a>
      </div>
    </div>
    <div class="hero-bar">
      <span>Factories in Gujarat &amp; Maharashtra</span>
      <span>3,000 t of waste a month</span>
      <span>Plants in 7 countries</span>
      <div class="hero-ctrl">
        <button class="icon-btn" type="button" data-film-open><span class="ic">${ic.play}</span>Watch the film · ${media.film.duration}</button>
        <button class="icon-btn icon-btn--sq hero-pause" type="button" data-hero-toggle aria-label="Pause background video">
          <span class="i-pause">${ic.pause}</span><span class="i-play">${ic.play}</span>
        </button>
      </div>
    </div>
  </div>
</section>`;

const numbers = () => `<section class="sec--tight dark dark--ink" aria-label="Ecolink in numbers">
  <div class="wrap">${figures(stats)}</div>
</section>`;

const whatWeDo = () => `<section class="sec">
  <div class="wrap split split--top">
    <div class="split-copy">
      ${kicker('01', 'What we do')}
      <h2 class="d2 rv-line">${lines(H.whatWeDo.title)}</h2>
      <div class="prose rv">${H.whatWeDo.paras.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
      <a class="link rv" href="#process">How it works ${ic.arrow}</a>
    </div>
    <div class="rv" style="--d:150ms">
      <div class="ba frame" data-ba>
        ${img('assets/img/film/mlp-closeup.jpg', 'Multi-layer plastic packaging waste: chips packets and wrappers')}
        <div class="ba-after">${img('assets/img/film/board-edges.jpg', 'Stack of finished recycled composite boards')}</div>
        <span class="ba-tag ba-tag--l">Goes in</span>
        <span class="ba-tag ba-tag--r">Comes out</span>
        <span class="ba-line" aria-hidden="true"></span>
        <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Drag to compare packaging waste with the finished board">
        <span class="ba-knob" aria-hidden="true">${ic.swap}</span>
      </div>
      <p class="mono muted" style="margin-top:14px">Drag to compare · Footage from our plant</p>
    </div>
  </div>
</section>`;

const process = () => `<section class="sec dark" id="process">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('02', 'The process')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(H.process.title)}</h2></div>
      <p class="muted rv">Four steps, one plant, no trees. Everything below is filmed on our own line.</p>
    </div>
    <ol class="steps">
      ${H.process.steps
        .map(
          (s, i) => `<li class="step rv" style="--d:${i * 100}ms">
          <div class="step-img">${img(s.img, `${s.title}: ${s.body}`)}</div>
          <span class="step-arrow" aria-hidden="true">${ic.arrow}</span>
          <div class="step-body"><span class="step-n">STEP ${pad(i + 1)}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div>
        </li>`
        )
        .join('')}
    </ol>
  </div>
</section>`;

const picker = () => `<section class="sec">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('03', 'Our boards')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Three boards. Three kinds of waste.')}</h2></div>
      <p class="muted rv">Pick the waste. We’ll show you the board it becomes and how it handles water.</p>
    </div>
    <div class="picker rv" data-tabs>
      <div class="picker-tabs" role="tablist" aria-label="Waste streams">
        ${boards
          .map(
            (b, i) => `<button class="picker-tab" role="tab" type="button" id="pk-t${i}" aria-controls="pk-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
            ${img(b.rawImg, '')}
            <span><span class="pt-k">Waste stream ${pad(i + 1)}</span><span class="pt-t">${esc(b.wasteShort)}</span></span>
            ${ic.arrow}
          </button>`
          )
          .join('')}
      </div>
      ${boards
        .map(
          (b, i) => `<div class="picker-panel" role="tabpanel" id="pk-p${i}" aria-labelledby="pk-t${i}"${i ? ' hidden' : ''}>
          <div class="pp-media">${img(b.img, `${b.name} — finished board`)}</div>
          <div class="pp-body">
            <p class="pp-flow"><b>${esc(b.wasteShort)}</b> ${ic.arrow} <b>${esc(b.name)}</b></p>
            <h3>${esc(b.name)}</h3>
            ${b.sister ? `<p><span class="badge">Sister brand</span> Ecoshakti has its own website.</p>` : ''}
            <p class="muted">Made from ${esc(b.waste.toLowerCase())}.</p>
            ${waterMeter(b.waterLevel, b.water)}
            <div class="btns">
              <a class="btn btn--sm" href="${b.href}">${b.sister ? 'View Ecoshakti Boards' : 'Learn more'} ${ic.arrow}</a>
              ${b.sister ? `<a class="btn btn--sm btn--ghost" href="${site.ecoshaktiUrl}" target="_blank" rel="noopener">Visit ecoshakti.in ${ic.ext}</a>` : ''}
            </div>
          </div>
        </div>`
        )
        .join('')}
    </div>
    ${sheetDiagram()}
  </div>
</section>`;

export const sheetDiagram = () => `<div class="sheetdia">
  <div class="sheetdia-fig rv" role="img" aria-label="Standard sheet: 8 feet by 4 feet">
    <div class="sheetdia-board"></div>
    <span class="dim dim--w"><span>8 FT · 2440 MM</span></span>
    <span class="dim dim--h"><span>4 FT · 1220 MM</span></span>
  </div>
  <div class="thick rv" style="--d:150ms">
    ${kicker(null, 'Standard sheet')}
    <p class="d3">${esc(sheet.size)}.<br><span class="lime" style="color:var(--moss)">${esc(sheet.thickness)} thick.</span></p>
    <div class="thick-row" aria-hidden="true">
      ${[4, 12, 25, 50].map((t) => `<div><i style="height:${Math.max(3, t * 2)}px"></i>${t} mm</div>`).join('')}
    </div>
    <p class="thick-note"><strong>Need a different size?</strong> We’ll make it. ${esc(sheet.custom)}</p>
  </div>
</div>`;

const becomes = () => `<section class="sec paper-2">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('04', 'What it becomes')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(H.becomes.title)}</h2></div>
      <div class="rv" style="display:grid;gap:20px;justify-items:start"><p class="muted">${esc(H.becomes.text)}</p><a class="link" href="${routes.products}">Browse products ${ic.arrow}</a></div>
    </div>
    <div class="uses">
      ${endUses
        .slice(0, 7)
        .map(
          (u, i) => `<article class="use rv" style="--d:${(i % 4) * 70}ms">
          ${img(u.img, u.title)}
          <div class="use-body"><span class="use-n">${pad(i + 1)}</span><h3>${esc(u.title)}</h3><p>${esc(u.body)}</p></div>
        </article>`
        )
        .join('')}
      <a class="use rv" href="${routes.products}" style="background:var(--lime);color:var(--ink)">
        <div class="use-body"><span class="use-n" style="color:var(--ink)">+</span><h3>Stationery, gifts and exhibition stands</h3><p style="color:var(--ink)">Smaller jobs, same board. ${ic.arrow.replace('<svg', '<svg width="16" height="16" style="display:inline;vertical-align:-3px"')}</p></div>
      </a>
    </div>
  </div>
</section>`;

const zeros = () => `<section class="sec dark zeros-sec">
  <div class="bg" aria-hidden="true">${img('assets/img/b/plant-render.jpg', '')}</div>
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('05', 'Three zeros')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(H.zeros.title)}</h2></div>
      <div class="rv" style="display:grid;gap:20px;justify-items:start"><p class="muted">${esc(H.zeros.text)}</p><a class="link" href="${routes.environment}">See how we do it ${ic.arrow}</a></div>
    </div>
    <div class="zeros">
      ${threeZeros
        .map(
          (z, i) => `<div class="zero rv" style="--d:${i * 120}ms"><span class="zero-0" aria-hidden="true">0</span><h3><small>ZERO</small>${esc(z.title)}</h3><p>${esc(z.body)}</p></div>`
        )
        .join('')}
    </div>
  </div>
</section>`;

export const comparison = (c = H.comparison) => {
  const mark = (v) => (v === 'None' ? ' class="us yes"' : ' class="us"');
  return `<div class="cmp-wrap rv">
    <table class="cmp">
      <thead><tr>${c.head.map((h, i) => `<th scope="col"${i === 1 ? ' class="us"' : ''}>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${c.rows
        .map(
          (r) => `<tr><th scope="row">${esc(r[0])}</th><td${mark(r[1])}>${esc(r[1])}</td>${r
            .slice(2)
            .map((v) => `<td${v === 'Yes' || /Often|Swell/.test(v) ? ' class="no"' : ''}>${esc(v)}</td>`)
            .join('')}</tr>`
        )
        .join('')}</tbody>
    </table>
  </div>`;
};

const compare = () => `<section class="sec">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('06', 'Comparison')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(H.comparison.title)}</h2></div>
      <p class="muted rv">${esc(H.comparison.text)}</p>
    </div>
    ${comparison()}
  </div>
</section>`;

const teaser = () => `<section class="sec--tight" style="padding-top:0">
  <div class="wrap">
    <div class="teaser rv">
      <div class="teaser-media">${img('assets/img/b/plant-render.jpg', 'Layout of a Deluxe Recycling turnkey board plant')}</div>
      <div class="teaser-body">
        ${kicker('07', 'Recycling plants')}
        <h2 class="d2">${esc(H.solutions.title)}</h2>
        <p class="muted">${esc(H.solutions.text)}</p>
        <div class="teaser-nums">
          <div><strong>1.5–10</strong><span>Tonnes a day</span></div>
          <div><strong>7</strong><span>Countries</span></div>
          <div><strong>0</strong><span>Washing needed</span></div>
        </div>
        <a class="btn btn--lime" href="${routes.solutions}" style="justify-self:start">See our recycling plants ${ic.arrow}</a>
      </div>
    </div>
  </div>
</section>`;

const trusted = () => `<section class="sec paper-2">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('08', 'Trusted by')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Who builds with us')}</h2></div>
      <p class="muted rv">Some of the companies and organisations we’ve worked with.</p>
    </div>
    ${clientGrid()}
  </div>
</section>`;

export const home = () =>
  page({
    title: H.seoTitle,
    description: H.seoDesc,
    current: routes.home,
    darkTop: true,
    body: [hero(), numbers(), whatWeDo(), process(), picker(), becomes(), zeros(), compare(), teaser(), trusted(), ctaBand({ title: H.cta.title, text: H.cta.text, secondary: { label: 'Browse products', href: routes.products } })].join('\n')
  });
