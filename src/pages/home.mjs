import { page } from '../layout.mjs';
import {
  hero, stats, whatWeDo, processSteps, homeBoards, applications, threeZeros,
  comparison, products, trustedBy, routes, site, siteUrl
} from '../data.mjs';
import {
  img, circleArrow, arrowRight, sectionHead, statsStrip, logoStrip,
  testimonialSection, ctaBanner, productCard, appCard, comparisonTable, icon, marquee
} from '../ui.mjs';

/* Section photos — each image shows exactly what its section describes. */
const whatCardImages = [
  { src: 'assets/img/cta-worker.jpg', alt: 'Worker operating machinery on the Ecolink production floor' },
  { src: 'assets/img/waste-pile.jpg', alt: 'Mixed plastic waste collected for recycling' },
  { src: 'assets/img/plant-line.jpg', alt: 'Complete recycling plant line with conveyors and processing equipment' }
];

const processImages = [
  { src: 'assets/img/collect.jpg', alt: 'Collected wood and scrap waste bundled for recycling' },
  { src: 'assets/img/shred.jpg', alt: 'Workers sorting shredded material on the processing line' },
  { src: 'assets/img/press.jpg', alt: 'Industrial press line forming composite boards under heat' },
  { src: 'assets/img/make.jpg', alt: 'Operator finishing and checking a pressed board' }
];

export const home = () => {
  const body = `
<!-- 1. Hero -->
<section class="hero">
  <div class="container hero-inner">
    <p class="eyebrow hero-eyebrow reveal">Recycled composite boards · Since 2005</p>
    <h1 class="hero-title reveal" data-split>${hero.headline}</h1>
    <p class="hero-sub reveal">${hero.sub}</p>
    <div class="hero-actions reveal">
      <a class="btn btn-primary" href="${routes.contact}#enquiry">Get a Quote${arrowRight()}</a>
      <a class="btn btn-ghost" href="${routes.products}">Explore products${arrowRight()}</a>
    </div>
    <div class="hero-meta reveal">
      <div class="hero-meta-block">
        <span>Waste in</span>
        <strong>Plastic waste · Scrap · Discarded products</strong>
      </div>
      <div class="hero-scroll" aria-hidden="true"><span></span>Scroll down</div>
      <div class="hero-meta-right">Boards · Sheets · Roofing · Doors · Pallets</div>
    </div>
  </div>
</section>

<!-- 2. Dark media band -->
<section class="media-band" aria-label="Our factory">
  ${img('assets/img/hero-factory.jpg', 'Inside the recycling facility: plastic waste travelling up a conveyor line past baled recyclables', { eager: false })}
  <div class="container media-band-inner">
    <p class="eyebrow reveal">Inside the plant</p>
    <h2 class="reveal" data-split>Waste goes in. Boards come out.</h2>
    <p class="reveal">Shredding, washing, drying, pressing — one continuous line turning today's waste into tomorrow's boards.</p>
  </div>
</section>

<!-- 3. Marquee -->
${marquee(['Waste to value', 'Recycled boards', 'Made in India', 'Exported worldwide'])}

<!-- 4. Stats -->
${statsStrip(stats)}

<!-- 3. What we do -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: whatWeDo.eyebrow, title: whatWeDo.title, text: whatWeDo.text })}
    <div class="what-grid">
      ${whatWeDo.items
        .map(
          (it, i) => `<article class="what-card reveal" style="--d:${i * 80}ms">
          <div class="what-card-img">${img(whatCardImages[i].src, whatCardImages[i].alt)}</div>
          <span class="what-no">${it.no}</span>
          <h3>${it.title}</h3>
          <p>${it.body}</p>
          ${circleArrow('Learn more about ' + it.title)}
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<!-- 4. Process -->
<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our process', title: 'From waste to board, in four steps.' })}
    <ol class="process-rail">
      ${processSteps
        .map(
          (s, i) => `<li class="process-step reveal" style="--d:${i * 90}ms">
          <div class="step-img">${img(processImages[i].src, processImages[i].alt)}</div>
          <span class="process-no">${s.no}</span>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<!-- 5. Board range -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our boards', title: 'Three board ranges. One recycled core.', text: 'Water resistant or fully waterproof — choose the specification your application needs.' })}
    <div class="product-grid">
      ${homeBoards.map((p, i) => productCard(p, i)).join('')}
    </div>
  </div>
</section>

<!-- 6. Applications -->
<section class="section section-alt" id="applications">
  <div class="container">
    ${sectionHead({ eyebrow: 'Applications', title: 'Where our boards go.', text: 'From furniture to freight, recycled boards replace timber and plywood across industries.' })}
    <div class="app-grid">
      ${applications.map((a, i) => appCard(a, i)).join('')}
    </div>
  </div>
</section>

<!-- 7. Three zeros -->
<section class="section dark zeros">
  <div class="container">
    ${sectionHead({ eyebrow: 'Three zeros', title: 'Waste in. Value out.' })}
    <div class="zeros-grid">
      ${threeZeros
        .map(
          (z, i) => `<article class="zero-card reveal" style="--d:${i * 90}ms">
          <span class="zero-mark" aria-hidden="true">0</span>
          <h3>${z.title}</h3>
          <p>${z.body}</p>
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<!-- 8. Comparison -->
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Comparison', title: 'How Ecolink stacks up against plywood.', text: 'Like-for-like properties, stated plainly.' })}
    ${comparisonTable(comparison)}
  </div>
</section>

<!-- 9. Plant teaser -->
<section class="section section-alt">
  <div class="container split">
    <div class="split-media reveal">
      ${img('assets/img/engineer.jpg', 'Engineer inspecting recycling plant machinery built in-house')}
    </div>
    <div class="split-copy">
      <p class="eyebrow reveal">Plants</p>
      <h2 class="reveal" data-split>Own the technology, not just the product.</h2>
      <p class="reveal">We build complete recycling plants with in-house technology — the same machinery that runs our own factory. Small, medium and large configurations, shipped and commissioned worldwide.</p>
      <a class="btn btn-primary reveal" href="${routes.solutions}">Explore solutions${arrowRight()}</a>
    </div>
  </div>
</section>

<!-- 10. Trusted by -->
${logoStrip(trustedBy)}

<!-- 11. Testimonials (renders only when client quotes exist) -->
${testimonialSection([])}

<!-- 12. Closing CTA -->
${ctaBanner({
  title: 'Ready to start?',
  text: 'Tell us what you need — boards, pallets, or a complete plant — and we will come back with specifications and pricing.',
  primary: 'Get a Quote',
  primaryHref: routes.contact,
  secondary: 'View products',
  secondaryHref: routes.products
})}
`;

  return page({
    title: 'Recycled composite boards & recycling plants',
    description:
      'Ecolink India manufactures recycled composite boards, roofing sheets, doors and pallets, and exports complete recycling plants. Waste goes in, boards come out — since 2005.',
    current: routes.home,
    path: '/',
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      legalName: site.legalName,
      url: siteUrl + '/',
      description: 'Manufacturer of recycled composite boards and exporter of complete recycling plants.',
      foundingDate: '2005'
    }
  });
};
