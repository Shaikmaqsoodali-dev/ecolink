import { page } from '../layout.mjs';
import { environmentPage as E, threeZeros, wasteStreams, routes, media } from '../data.mjs';
import { esc, img, ic, lines, kicker, pageHero, ctaBand, downloads } from '../ui.mjs';

const problem = () => `<section class="sec">
  <div class="wrap minutes">
    <div class="split-copy">
      ${kicker('01', 'The problem')}
      <h2 class="d2 rv-line">${lines('Made to be used once.')}</h2>
      <p class="lead rv">${esc(E.problem)}</p>
    </div>
    <div class="clock rv" style="--d:150ms" role="table" aria-label="Life of a beverage carton">
      <div role="cell">10 min</div><div role="cell">The time a juice carton is in use.</div>
      <div role="cell" class="bad">Dumped</div><div role="cell">Layers of paper, plastic and foil the usual recyclers can’t pull apart.</div>
      <div role="cell" class="bad">Burnt</div><div role="cell">Or left to pile up.</div>
      <div role="cell" class="good">Board</div><div role="cell">What we turn it into instead.</div>
    </div>
  </div>
</section>`;

const doing = () => `<section class="sec dark">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('02', 'What we do about it')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('We take it. All of it.')}</h2></div>
      <p class="muted rv">${esc(E.doing)}</p>
    </div>
    <div class="wall rv">${wasteStreams.map((w) => `<figure>${img(w.img, w.name)}<figcaption>${esc(w.short)}</figcaption></figure>`).join('')}</div>
    <div class="split" style="margin-top:48px;align-items:start">
      <div class="split-copy rv">${kicker(null, 'What we take in')}<ul class="intake">${E.intake.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>
      <div class="split-copy rv" style="--d:120ms">${kicker(null, 'What it adds up to')}
        <div class="figures" style="grid-template-columns:1fr 1fr">
          <div class="fig"><p class="fig-n"><span data-count="3000" data-group>3,000</span><small>t</small></p><p class="fig-l">a month</p></div>
          <div class="fig"><p class="fig-n"><span data-count="37000" data-group>37,000</span><small>t</small></p><p class="fig-l">a year</p></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

const zeros = () => `<section class="sec zeros-sec dark dark--ink">
  <div class="bg" aria-hidden="true">${img('assets/img/film/press-line.jpg', '')}</div>
  <div class="wrap">
    <div class="head">${kicker('03', 'Three zeros')}<h2 class="d2 rv-line">${lines('Nothing is left behind.')}</h2></div>
    <div class="zeros">
      ${threeZeros.map((z, i) => `<div class="zero rv" style="--d:${i * 120}ms"><span class="zero-0" aria-hidden="true">0</span><h3><small>ZERO</small>${esc(z.title)}</h3><p>${esc(z.body)}</p></div>`).join('')}
    </div>
  </div>
</section>`;

const safe = () => `<section class="sec">
  <div class="wrap split">
    <div class="split-copy">
      ${kicker('04', 'Safe to make. Safe to use.')}
      <h2 class="d2 rv-line">${lines(E.safe)}</h2>
      <div class="rv">${downloads(['testResults'])}</div>
    </div>
    <div class="frame rv" style="aspect-ratio:4/3">${img('assets/img/film/quality-check.jpg', 'A worker checks a freshly pressed board')}<span class="frame-cap">Quality check · from our film</span></div>
  </div>
</section>`;

const rrr = () => `<section class="sec dark">
  <div class="wrap rrr-grid">
    <div class="rrr" aria-label="Reduce. Reuse. Recycle.">
      <span class="rrr-w rv">Reduce.</span><span class="rrr-w rv" style="--d:120ms">Reuse.</span><span class="rrr-w rv" style="--d:240ms">Recycle.</span>
    </div>
    <div class="rrr-side rv"><p>${esc(E.rrr)}</p></div>
  </div>
</section>`;

export const environmentPage = () =>
  page({
    title: E.seoTitle,
    description: E.seoDesc,
    current: routes.environment,
    darkTop: true,
    body: [
      pageHero({ k: 'Environment & us', title: E.hero.headline, sub: E.hero.sub, trail: [{ label: 'Environment' }], bg: 'assets/img/b/raw-carton.jpg' }),
      problem(),
      doing(),
      zeros(),
      safe(),
      rrr(),
      ctaBand({ title: E.cta.title, text: E.cta.text, btn: 'Talk to us' })
    ].join('\n')
  });
