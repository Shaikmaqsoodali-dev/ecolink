import { page } from '../layout.mjs';
import { solutionsPage as S, wasteStreams, plants, mapView, routes, media, TOPIC_TECH } from '../data.mjs';
import { esc, img, ic, lines, kicker, pageHero, ctaBand, specs, filmPlayer, contactHref, asset, formatIN } from '../ui.mjs';

const proj = (lat, lon) => ({
  x: ((lon - mapView.lon0) / (mapView.lon1 - mapView.lon0)) * 100,
  y: ((mapView.lat1 - lat) / (mapView.lat1 - mapView.lat0)) * 100
});
const MAP_H = Math.round((1000 * (mapView.lat1 - mapView.lat0)) / (mapView.lon1 - mapView.lon0));

const idea = () => `<section class="sec">
  <div class="wrap split split--top">
    <div class="split-copy">
      ${kicker('01', 'The idea')}
      <h2 class="d2 rv-line">${lines('You bring the waste and the land.')}</h2>
      <div class="prose rv" style="font-size:clamp(18px,1.5vw,21px)">${S.idea.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
    <div class="rv" style="--d:150ms">
      <div class="nowash">
        <div class="nowash-ic" aria-hidden="true">${ic.drop}</div>
        <div style="display:grid;gap:14px">${kicker('02', 'Eco-friendly technology')}<h3 class="d3">${esc(S.noWash.title)}</h3><p class="muted">${esc(S.noWash.text)}</p></div>
      </div>
    </div>
  </div>
</section>`;

const flow = () => `<section class="sec dark" id="waste">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('03', 'What goes in, what comes out')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Six kinds of waste. Three kinds of board.')}</h2></div>
      <p class="muted rv">And from the boards: ${S.outUses.join(', ')} and more.</p>
    </div>
    <div class="flow">
      <div class="flow-col rv">
        <p class="flow-h">Goes in</p>
        ${wasteStreams.map((w) => `<div class="raw">${img(w.img, '')}<span>${esc(w.name)}</span></div>`).join('')}
      </div>
      <div class="flow-plant rv" style="--d:150ms">
        <div class="frame">${img('assets/img/b/plant-render.jpg', 'Turnkey recycling plant layout: shredder, conveyors and press line')}<span class="frame-cap">Turnkey plant · zero water effluent, solid waste, gas emissions</span></div>
        <div class="flow-arrows" aria-hidden="true"><span>${ic.arrow}</span><span>${ic.arrow}</span></div>
      </div>
      <div class="flow-col rv" style="--d:300ms">
        <p class="flow-h">Comes out</p>
        ${S.out.map((o, i) => `<div class="out"><strong>${esc(o)}</strong><span>${['Made from packaging waste materials', 'Made from multi-layer packaging waste', 'Made from flexible packaging and collapsible tubes'][i]}</span></div>`).join('')}
        <div class="out-uses">${S.outUses.map((u) => `<span>${esc(u)}</span>`).join('')}</div>
      </div>
    </div>
  </div>
</section>`;

const sizes = () => {
  const maxA = Math.max(...S.sizes.map((s) => s.area));
  const box = (s, i) => {
    const side = Math.sqrt(s.area / maxA) * 100;
    return `<i${i === 0 ? ' class="on"' : ''} style="width:${side.toFixed(1)}%;height:${side.toFixed(1)}%"></i>`;
  };
  return `<section class="sec" id="sizes">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('04', 'Pick your size')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Four plant sizes.')}</h2></div>
      <p class="muted rv">TPD means tonnes per day. Pick one to see the floor area, heating and power it needs.</p>
    </div>
    <div class="sizes rv" data-tabs data-sizes>
      <div>
        <div class="sizes-tabs" role="tablist" aria-label="Plant capacity">
          ${S.sizes
            .map(
              (s, i) => `<button class="sizes-tab" role="tab" type="button" id="sz-t${i}" aria-controls="sz-p${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}"><strong>${s.tpd.toFixed(1)}</strong><span>TPD</span></button>`
            )
            .join('')}
        </div>
        ${S.sizes
          .map(
            (s, i) => `<div class="sizes-data" role="tabpanel" id="sz-p${i}" aria-labelledby="sz-t${i}"${i ? ' hidden' : ''}>
            <p class="big" style="margin-bottom:18px">${s.tpd.toFixed(1)} tonnes a day</p>
            ${specs([
              { label: 'Area needed', value: `${formatIN(s.area)} sq. m` },
              { label: 'Heating', value: s.heating },
              { label: 'Power', value: `${s.power} kW` }
            ])}
          </div>`
          )
          .join('')}
        <div class="sizes-data" style="padding-top:0">
          <details class="sizes-table">
            <summary>Compare all four</summary>
            <div class="cmp-wrap"><table class="cmp">
              <thead><tr><th></th>${S.sizes.map((s) => `<th scope="col">${s.tpd.toFixed(1)} TPD</th>`).join('')}</tr></thead>
              <tbody>
                <tr><th scope="row">Area needed</th>${S.sizes.map((s) => `<td>${formatIN(s.area)} sq. m</td>`).join('')}</tr>
                <tr><th scope="row">Heating</th>${S.sizes.map((s) => `<td>${s.heating}</td>`).join('')}</tr>
                <tr><th scope="row">Power</th>${S.sizes.map((s) => `<td>${s.power} kW</td>`).join('')}</tr>
              </tbody>
            </table></div>
          </details>
        </div>
      </div>
      <div class="sizes-vis" aria-hidden="true">
        <div class="sizes-plot">${S.sizes.map(box).join('')}<b>Floor area to scale · ${formatIN(maxA)} sq. m</b></div>
        <p class="sizes-cap">Each outline is one plant size, drawn to scale.</p>
      </div>
    </div>
  </div>
</section>`;
};

const map = () => {
  const home = plants.find((p) => p.home);
  const h = proj(home.lat, home.lon);
  const arcs = plants
    .filter((p) => !p.home)
    .map((p) => {
      const a = { x: h.x * 10, y: (h.y / 100) * MAP_H };
      const b = proj(p.lat, p.lon);
      const bx = b.x * 10;
      const by = (b.y / 100) * MAP_H;
      const mx = (a.x + bx) / 2;
      const my = (a.y + by) / 2 - Math.hypot(bx - a.x, by - a.y) * 0.28;
      return `<path d="M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}"/>`;
    })
    .join('');
  const left = new Set(['India', 'Philippines', 'East Timor']);
  return `<section class="sec dark dark--ink" id="plants">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('05', 'Where we’ve built')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Plants in 7 countries.')}</h2></div>
      <p class="muted rv">Plants built on our technology, and the tonnes a day each one handles.</p>
    </div>
    <div class="map" role="img" aria-label="Map of plants: ${plants.map((p) => `${p.country} ${p.tpd.join(', ')} TPD`).join('; ')}">
      <img class="map-img" src="${asset('assets/img/world-dots.svg')}" alt="" width="1000" height="${MAP_H}" loading="lazy">
      <svg class="arcs" viewBox="0 0 1000 ${MAP_H}" preserveAspectRatio="none" aria-hidden="true">${arcs}</svg>
      ${plants
        .map((p) => {
          const c = proj(p.lat, p.lon);
          return `<span class="pin${p.home ? ' pin--home' : ''}${left.has(p.country) ? ' pin--left' : ''}" style="left:${c.x.toFixed(2)}%;top:${c.y.toFixed(2)}%" aria-hidden="true">
            <span class="pin-dot"></span>
            <span class="pin-lab"><strong>${esc(p.country)}</strong><span>${esc(p.tpd.join(' · '))} TPD</span></span>
          </span>`;
        })
        .join('')}
    </div>
    <ul class="map-list">
      ${plants.map((p) => `<li><strong>${esc(p.country)}</strong><span>${esc((p.detail || p.tpd).join(' · '))} TPD</span></li>`).join('')}
    </ul>
  </div>
</section>`;
};

const how = () => `<section class="sec" id="process">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('06', 'Turnkey, start to finish')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('How we work with you')}</h2></div>
    </div>
    <ol class="timeline">
      ${S.steps.map((s, i) => `<li class="tl rv" style="--d:${i * 80}ms"><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`).join('')}
    </ol>
  </div>
</section>`;

const epr = () => `<section class="sec--tight" id="epr" style="padding-top:0">
  <div class="wrap">
    <div class="epr rv">
      <p class="d2">EPR,<br>in plain words.</p>
      <p>${esc(S.epr)}</p>
    </div>
  </div>
</section>`;

const video = () => `<section class="sec dark">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('07', 'Video')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('See a line running.')}</h2></div>
      <div class="rv" style="display:grid;gap:20px;justify-items:start"><p class="muted">Our multi-layer plastic recycling line, from bale to finished board.</p>
      <a class="btn btn--ghost" href="${asset(media.docs.brochure.href)}" download>${ic.download} Download brochure</a></div>
    </div>
    <div class="rv">${filmPlayer(media.film)}</div>
  </div>
</section>`;

export const solutions = () =>
  page({
    title: S.seoTitle,
    description: S.seoDesc,
    current: routes.solutions,
    darkTop: true,
    ogImage: 'assets/img/b/plant-render.jpg',
    body: [
      pageHero({
        k: 'Technology & turnkey solutions',
        title: S.hero.headline,
        sub: S.hero.sub,
        trail: [{ label: 'Solutions' }],
        bg: 'assets/img/film/hsn-line.jpg',
        side: `<div class="btns on-dark"><a class="btn btn--lime" href="${contactHref(TOPIC_TECH)}">Talk to our technology team ${ic.arrow}</a><a class="btn btn--ghost" href="${asset(media.docs.brochure.href)}" download>Download brochure</a></div>`
      }),
      idea(),
      flow(),
      sizes(),
      map(),
      how(),
      epr(),
      video(),
      ctaBand({ title: S.cta.title, text: S.cta.text, btn: 'Talk to us', href: contactHref(TOPIC_TECH) })
    ].join('\n')
  });
