import { page } from '../layout.mjs';
import { products, routes } from '../data.mjs';
import { pageHero, sectionHead, productCard, ctaBanner, img, arrowRight } from '../ui.mjs';

export const productsIndex = () => {
  const body = `
${pageHero({
  eyebrow: 'Products',
  title: 'Recycled boards, sheets and more.',
  text: 'Six product lines manufactured from recycled waste — water resistant boards, 100% waterproof boards, roofing sheets, doors and pallets.',
  current: routes.products,
  label: 'Products'
})}

<section class="section">
  <div class="container">
    <div class="product-grid product-grid-all">
      ${products.map((p, i) => productCard(p, i)).join('')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container split">
    <div class="split-media reveal img-reveal">
      ${img('assets/img/board-properties.png', 'Recycled board properties compared with plywood')}
    </div>
    <div class="split-copy">
      <p class="eyebrow reveal">Why recycled</p>
      <h2 class="reveal" data-split>Built to replace plywood.</h2>
      <p class="reveal">Ecolink boards cut, drill and screw like plywood — but resist moisture, rot and termites, and are made from waste instead of timber. Water resistant or 100% waterproof, there is a specification for every application.</p>
      <a class="btn btn-primary reveal" href="${routes.contact}#enquiry">Request specifications${arrowRight()}</a>
    </div>
  </div>
</section>

${ctaBanner({
  title: 'Not sure which board you need?',
  text: 'Tell us the application and we will recommend the right product, size and thickness.',
  primary: 'Talk to us',
  primaryHref: routes.contact,
  secondary: 'See applications',
  secondaryHref: routes.home + '#applications'
})}
`;

  return page({
    title: 'Products',
    description:
      'Ecolink Boards, Ecoshakti Boards, ESS Boards, roofing sheets, doors and pallets — six recycled product lines from Ecolink India.',
    current: routes.products,
    path: '/products',
    body
  });
};
