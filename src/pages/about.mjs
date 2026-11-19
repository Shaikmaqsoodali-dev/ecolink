import { page } from '../layout.mjs';
import { about as A, stats, routes, media, certifications } from '../data.mjs';
import { esc, img, ic, lines, kicker, pageHero, figures, ctaBand, ytFacade, pad, formatIN } from '../ui.mjs';

const story = () => `<section class="sec">
  <div class="wrap story">
    <div>
      ${kicker('01', 'Our story')}
      <p class="story-q rv-line" style="margin-top:20px">${lines('What happens to a used juice carton?')}</p>
      <div class="story-imgs rv">
        <div class="frame">${img('assets/img/b/raw-carton.jpg', 'Bales of used beverage cartons')}</div>
        <div class="frame">${img('assets/img/film/board-edges.jpg', 'Finished Ecolink boards')}</div>
      </div>
    </div>
    <div class="prose rv" style="align-self:end">${A.story.paras.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
</section>`;

const numbers = () => `<section class="sec--tight dark dark--ink"><div class="wrap">${figures(stats)}</div></section>`;

const believe = () => `<section class="sec dark">
  <div class="wrap rrr-grid">
    <div>
      ${kicker('02', 'What we believe')}
      <div class="rrr" style="margin-top:28px" aria-label="${esc(A.believe.title)}">
        <span class="rrr-w rv">Reduce.</span><span class="rrr-w rv" style="--d:120ms">Reuse.</span><span class="rrr-w rv" style="--d:240ms">Recycle.</span>
      </div>
    </div>
    <div class="rrr-side rv" style="--d:300ms"><p>${esc(A.believe.text)}</p></div>
  </div>
</section>`;

const values = () => `<section class="sec">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('03', 'How we work')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Four things we hold ourselves to.')}</h2></div>
    </div>
    <div class="values">
      ${A.values.map((v, i) => `<div class="val rv" style="--d:${i * 90}ms"><span class="val-n">${pad(i + 1)}</span><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p></div>`).join('')}
    </div>
  </div>
</section>`;

const headed = () => `<section class="sec paper-2">
  <div class="wrap headed">
    <div class="head head--split" style="margin-bottom:24px">
      <div>${kicker('04', 'Where we’re headed')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(A.headed.title)}</h2></div>
      <p class="muted rv">${esc(A.headed.text)}</p>
    </div>
    <div class="progress" role="img" aria-label="37,000 of a 1,00,000 tonne yearly target">
      <div class="progress-track"><span class="progress-now">${formatIN(37000)} t / yr today</span><div class="progress-fill"></div></div>
      <div class="progress-lab"><span>0</span><span>25,000</span><span>50,000</span><span>75,000</span><span><b>1,00,000 t</b> target</span></div>
    </div>
  </div>
</section>`;

const leader = () => {
  const L = A.leader;
  return `<section class="sec dark">
  <div class="wrap leader">
    <div class="leader-photo frame rv">${L.img ? img(L.img, L.name) : `<span class="leader-mono" aria-hidden="true">JS</span>`}</div>
    <div class="rv" style="--d:150ms">
      ${kicker('05', 'Leadership')}
      <h2 class="leader-name" style="margin-top:22px">${esc(L.name)}</h2>
      ${L.role ? `<p class="leader-role">${esc(L.role)}</p>` : ''}
      ${L.bio ? `<p class="lead muted" style="margin-top:24px">${esc(L.bio)}</p>` : ''}
    </div>
  </div>
</section>`;
};

const certs = () =>
  certifications.length
    ? `<section class="sec--tight"><div class="wrap">${kicker('06', 'Certifications')}<div class="clients" style="margin-top:28px">${certifications
        .map((c) => `<div class="client">${img(c.img, c.name)}</div>`)
        .join('')}</div></div></section>`
    : '';

const press = () => !media.showPress ? '' : `<section class="sec dark dark--ink">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('In the media', 'Seen on')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Cartons into benches, on camera.')}</h2></div>
      <div class="rv" style="display:grid;gap:20px;justify-items:start"><p class="muted">Our own film shows the plant end to end. The clips beside it are TV and web features on carton recycling.</p>
      <button class="icon-btn" type="button" data-film-open><span class="ic">${ic.play}</span>Watch our film · ${media.film.duration}</button></div>
    </div>
    <div class="press">${media.press.map(ytFacade).join('')}</div>
    <p class="press-note">Videos load from YouTube only when you press play.</p>
  </div>
</section>`;

export const about = () =>
  page({
    title: A.seoTitle,
    description: A.seoDesc,
    current: routes.about,
    darkTop: true,
    body: [
      pageHero({ k: `Since 1999 · ${27} years`, title: A.hero.headline, sub: A.hero.sub, trail: [{ label: 'About' }], bg: 'assets/img/film/forklift-bales.jpg' }),
      story(),
      numbers(),
      believe(),
      values(),
      headed(),
      leader(),
      certs(),
      press(),
      ctaBand({ title: A.cta.title, text: A.cta.text, btn: 'Talk to us' })
    ].join('\n')
  });
