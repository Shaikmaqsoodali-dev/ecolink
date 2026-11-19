import { page } from '../layout.mjs';
import { products, productApplications, routes } from '../data.mjs';
import { img, arrowRight, sectionHead, specList, productCard, ctaBanner, breadcrumb, icon } from '../ui.mjs';
import { esc } from '../ui.mjs';

const detail = (p) => {
  const others = products.filter((o) => o.slug !== p.slug);
  const apps = productApplications[p.slug] || [];

  const body = `
<section class="page-hero product-hero">
  <div class="container">
    <p class="eyebrow reveal">${esc(p.tag)}</p>
    <h1 class="display reveal" data-split>${esc(p.name)}</h1>
    <p class="lead reveal">${esc(p.long)}</p>
  </div>
  ${breadcrumb(p.href, p.name)}
</section>

<section class="section">
  <div class="container product-detail">
    <div class="product-detail-media reveal img-reveal">
      ${img(p.img, p.alt)}
    </div>
    <div class="product-detail-info">
      <h2 class="reveal">Specifications</h2>
      ${specList(p.specs)}
      <div class="product-detail-actions reveal">
        <a class="btn btn-primary" href="${routes.contact}#enquiry" data-topic="${esc(p.name)}">Request a quote${arrowRight()}</a>
        <a class="btn btn-ghost" href="${routes.contact}#enquiry">Ask a question</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'Features', title: `Why ${p.name}.` })}
    <ul class="feature-list">
      ${p.features.map((f, i) => `<li class="reveal" style="--d:${i * 70}ms"><span class="feature-tick" aria-hidden="true">${icon('leaf')}</span>${esc(f)}</li>`).join('')}
    </ul>
  </div>
</section>

${
  apps.length
    ? `<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Applications', title: `Where ${p.name} is used.` })}
    <ul class="chip-list">
      ${apps.map((a, i) => `<li class="chip reveal" style="--d:${i * 50}ms">${esc(a)}</li>`).join('')}
    </ul>
  </div>
</section>`
    : ''
}

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'Gallery', title: 'Product in focus.' })}
    <div class="gallery">
      ${p.gallery.map((g, i) => `<figure class="gallery-item reveal" style="--d:${i * 70}ms">${img(g.src, g.alt)}</figure>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'More products', title: 'Other products from Ecolink.' })}
    <div class="product-grid">${others.slice(0, 3).map((o, i) => productCard(o, i)).join('')}</div>
  </div>
</section>

${ctaBanner({
  title: `Enquire about ${p.name}.`,
  text: 'Specifications, sizes, pricing and lead times — send us the details of your requirement.',
  primary: 'Get a Quote',
  primaryHref: routes.contact,
  secondary: 'All products',
  secondaryHref: routes.products,
  topic: p.name
})}
`;

  return page({
    title: p.name,
    description: `${p.name} from Ecolink India — ${p.blurb} Manufactured from recycled waste.`,
    current: p.href,
    path: p.href,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.blurb,
      brand: { '@type': 'Brand', name: 'Ecolink India' }
    }
  });
};

export const productPages = Object.fromEntries(products.map((p) => [p.slug, () => detail(p)]));
