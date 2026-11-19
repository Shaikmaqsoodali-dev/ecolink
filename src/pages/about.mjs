import { page } from '../layout.mjs';
import { aboutStory, aboutValues, aboutStats, routes, site } from '../data.mjs';
import { pageHero, sectionHead, statsStrip, img, arrowRight, circleArrow } from '../ui.mjs';

export const about = () => {
  const body = `
${pageHero({
  eyebrow: 'About us',
  title: 'We turn waste into products people buy.',
  text: aboutStory.title,
  current: routes.about,
  label: 'About'
})}

<section class="section">
  <div class="container split">
    <div class="split-copy">
      <p class="eyebrow reveal">${aboutStory.eyebrow}</p>
      <h2 class="reveal" data-split>${aboutStory.title}</h2>
      ${aboutStory.paras.map((p) => `<p class="reveal">${p}</p>`).join('')}
    </div>
    <div class="split-media reveal img-reveal">
      ${img('assets/img/about-plant.jpg', 'Ecolink India recycling plant floor')}
    </div>
  </div>
</section>

${statsStrip(aboutStats, 'section-alt-wrap')}

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'How we work', title: 'Four things we hold to.' })}
    <div class="values-grid">
      ${aboutValues
        .map(
          (v, i) => `<article class="value-card reveal" style="--d:${i * 70}ms">
          <span class="what-no">${v.no}</span>
          <h3>${v.title}</h3>
          <p>${v.body}</p>
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split split-reverse">
    <div class="split-media reveal img-reveal">
      ${img('assets/img/workers-sorting.jpg', 'Workers sorting waste material')}
    </div>
    <div class="split-copy">
      <p class="eyebrow reveal">The loop</p>
      <h2 class="reveal" data-split>Waste goes in. Boards come out.</h2>
      <p class="reveal">We buy hard-to-recycle waste — plastic, wood, paper, tyres, cotton — shred and press it into boards, and the offcuts go straight back in as feedstock. Nothing is wasted twice.</p>
      <a class="btn btn-primary reveal" href="${routes.products}">See our products${arrowRight()}</a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Deluxe Recycling (India) Pvt. Ltd.',
      title: 'The company behind Ecolink.',
      text: `${site.legalName} has operated in recycling since 2005. Ecolink India is its manufacturing and technology brand.`
    })}
    <div class="what-grid">
      <article class="what-card reveal"><div class="what-card-img">${img('assets/img/about-worker.jpg', 'Worker at a production workstation assembling products')}</div><span class="what-no">01</span><h3>Manufacturing</h3><p>Recycled composite boards, sheets, roofing, doors and pallets.</p>${circleArrow()}</article>
      <article class="what-card reveal" style="--d:80ms"><div class="what-card-img">${img('assets/img/cardboard-bales.jpg', 'Baled paper and plastic waste collected for recycling')}</div><span class="what-no">02</span><h3>Recycling</h3><p>Buying and processing waste streams others cannot handle.</p>${circleArrow()}</article>
      <article class="what-card reveal" style="--d:160ms"><div class="what-card-img">${img('assets/img/engineer.jpg', 'Engineer inspecting recycling plant machinery built in-house')}</div><span class="what-no">03</span><h3>Technology</h3><p>Complete recycling plants designed and built in-house.</p>${circleArrow()}</article>
    </div>
  </div>
</section>

<section class="section cta-section">
  <div class="container">
    <div class="cta reveal">
      <div class="cta-copy">
        <h2 data-split>Work with us.</h2>
        <p>Product enquiries, waste supply or a plant of your own — start the conversation.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-light" href="${routes.contact}#enquiry">Get a Quote${arrowRight()}</a>
        <a class="btn btn-outline-light" href="${routes.solutions}">Plant solutions</a>
      </div>
    </div>
  </div>
</section>
`;

  return page({
    title: 'About',
    description:
      'Ecolink India is the manufacturing brand of Deluxe Recycling (India) Pvt. Ltd., recycling since 2005 — recycled boards, waste processing and turnkey recycling plants.',
    current: routes.about,
    path: '/about',
    body
  });
};
