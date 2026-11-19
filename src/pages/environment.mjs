import { page } from '../layout.mjs';
import { environment, routes } from '../data.mjs';
import { pageHero, sectionHead, statsStrip, img, arrowRight } from '../ui.mjs';
import { esc } from '../ui.mjs';

export const environmentPage = () => {
  const e = environment;
  const body = `
${pageHero({
  eyebrow: e.eyebrow,
  title: e.title,
  text: e.lead,
  current: routes.environment,
  label: 'Environment'
})}

${statsStrip(e.stats)}

<section class="section">
  <div class="container io-split">
    <div class="io-block reveal">
      <h2>What goes in.</h2>
      <ul class="chip-list">
        ${e.wasteTaken.map((w) => `<li class="chip">${esc(w)}</li>`).join('')}
      </ul>
    </div>
    <div class="io-block io-block-out reveal">
      <h2>What comes out.</h2>
      <ul class="chip-list">
        ${e.comesOut.map((w) => `<li class="chip chip-out">${esc(w)}</li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section dark zeros">
  <div class="container">
    ${sectionHead({ eyebrow: 'Three zeros', title: 'The targets we run to.' })}
    <div class="zeros-grid">
      ${e.zeros
        .map(
          (z, i) => `<article class="zero-card reveal" style="--d:${i * 90}ms">
          <span class="zero-mark" aria-hidden="true">0</span>
          <h3>${esc(z.title)}</h3>
          <p>${esc(z.body)}</p>
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="split-media reveal img-reveal">
      ${img('assets/img/forest.jpg', 'Forest canopy')}
    </div>
    <div class="split-copy">
      <p class="eyebrow reveal">Why it matters</p>
      <h2 class="reveal" data-split>Every tonne counted twice.</h2>
      <p class="reveal">A tonne of waste diverted is a tonne not landfilled — and a tonne of board produced from that waste is a tonne of timber not felled. The maths is simple; the operation behind it is not.</p>
      <p class="notice reveal">Detailed environmental performance data (energy use, water use, emissions) is being compiled for publication. <span class="pending">[Pending: client data]</span></p>
      <a class="btn btn-primary reveal" href="${routes.contact}#enquiry">Request environmental data${arrowRight()}</a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Transparency',
      title: 'We publish what we can verify.',
      text: 'Where a figure has not yet been independently confirmed, we mark it as pending rather than round it up.'
    })}
    <div class="what-grid">
      <article class="what-card reveal"><span class="what-no">01</span><h3>Measured</h3><p>Weighbridge records for waste in and boards out, recorded at the factory gate.</p></article>
      <article class="what-card reveal" style="--d:80ms"><span class="what-no">02</span><h3>Third-party</h3><p>Independent verification of key claims is in progress. <span class="pending">[Pending: client]</span></p></article>
      <article class="what-card reveal" style="--d:160ms"><span class="what-no">03</span><h3>Published</h3><p>Confirmed figures will be published here as they are verified.</p></article>
    </div>
  </div>
</section>

${'' /* CTA */}
<section class="section cta-section">
  <div class="container">
    <div class="cta reveal">
      <div class="cta-copy">
        <h2 data-split>Turn your waste obligation into a product.</h2>
        <p>EPR rules are coming. A recycling plant is the answer — and we build them.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-light" href="${routes.contact}#enquiry" data-topic="Technology & Turnkey Solutions">Get a Quote${arrowRight()}</a>
        <a class="btn btn-outline-light" href="${routes.solutions}">Plant solutions</a>
      </div>
    </div>
  </div>
</section>
`;

  return page({
    title: 'Environment',
    description:
      'How Ecolink India turns waste into boards — zero landfill, zero formaldehyde, zero waste, with measured figures published as they are verified.',
    current: routes.environment,
    path: '/environment',
    body
  });
};
