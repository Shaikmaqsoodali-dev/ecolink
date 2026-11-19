import { page } from '../layout.mjs';
import { productsPage as P, boards, madeProducts, endUses, routes, site } from '../data.mjs';
import { esc, img, ic, lines, kicker, pageHero, ctaBand, waterMeter, pad } from '../ui.mjs';
import { sheetDiagram } from './home.mjs';

const boardCards = () => `<section class="sec">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('01', 'The boards')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(P.boards.title)}</h2></div>
      <p class="muted rv">${esc(P.boards.text)}</p>
    </div>
    <div class="bcards">
      ${boards
        .map(
          (b, i) => `<a class="bcard rv${b.sister ? ' bcard--sister' : ''}" href="${b.href}" style="--d:${i * 90}ms">
          <div class="bcard-img">${img(b.img, `${b.name} board`)}<span class="bcard-raw">${img(b.rawImg, `Made from ${b.wasteShort}`)}</span></div>
          <div class="bcard-body">
            <div class="prod-tags">${b.sister ? '<span class="badge">Sister brand · ecoshakti.in</span>' : ''}</div>
            <h3>${esc(b.name)}</h3>
            <p>${esc(b.water)}. Made from ${esc(b.waste.toLowerCase())}.</p>
            ${waterMeter(b.waterLevel, b.water)}
            <span class="link">View ${esc(b.name)} ${ic.arrow}</span>
          </div>
        </a>`
        )
        .join('')}
    </div>
    ${sheetDiagram()}
  </div>
</section>`;

const beyond = () => `<section class="sec dark">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('02', 'Beyond boards')}<h2 class="d2 rv-line" style="margin-top:20px">${lines('Then we make things with them.')}</h2></div>
    </div>
    <div class="pcards">
      ${madeProducts
        .map(
          (p, i) => `<a class="pcard rv" href="${p.href}" style="--d:${i * 90}ms">
          <div class="pcard-img">${img(p.img, p.name)}</div>
          <div class="pcard-body"><div><h3>${esc(p.name)}</h3><p>${esc(p.line)}</p></div><span class="arr">${ic.ext}</span></div>
        </a>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const where = () => `<section class="sec paper-2">
  <div class="wrap">
    <div class="head head--split">
      <div>${kicker('03', 'Where our boards end up')}<h2 class="d2 rv-line" style="margin-top:20px">${lines(P.endUses.title)}</h2></div>
    </div>
    <div class="uses">
      ${endUses
        .map(
          (u, i) => `<article class="use rv" style="--d:${(i % 4) * 70}ms">${img(u.img, u.title)}
          <div class="use-body"><span class="use-n">${pad(i + 1)}</span><h3>${esc(u.title)}</h3><p>${esc(u.body)}</p></div></article>`
        )
        .join('')}
    </div>
  </div>
</section>`;

export const productsIndex = () =>
  page({
    title: P.seoTitle,
    description: P.seoDesc,
    current: routes.products,
    darkTop: true,
    body: [
      pageHero({ k: 'Products', title: P.hero.headline, sub: P.hero.sub, trail: [{ label: 'Products' }], bg: 'assets/img/film/board-stacks.jpg' }),
      boardCards(),
      beyond(),
      where(),
      ctaBand({ title: P.cta.title, text: P.cta.text })
    ].join('\n')
  });
