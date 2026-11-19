import { page } from '../layout.mjs';
import { faqs, routes } from '../data.mjs';
import { pageHero, sectionHead, accordion, ctaBanner, arrowRight } from '../ui.mjs';

export const faq = () => {
  const general = faqs.filter((f) => !/plant|export/i.test(f.q));
  const plant = faqs.filter((f) => /plant|export/i.test(f.q));

  const body = `
${pageHero({
  eyebrow: 'FAQ',
  title: 'Questions, answered.',
  text: 'Everything buyers ask about Ecolink boards, delivery and recycling plants — with honest notes where a figure is still being confirmed.',
  current: routes.faq,
  label: 'FAQ'
})}

<section class="section">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Products & ordering', title: 'Boards, sizes and delivery.' })}
    ${accordion(general, 'faq-p')}
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Plants & technology', title: 'Recycling plant enquiries.' })}
    ${accordion(plant, 'faq-t')}
    <p class="notice">Do you have a question not covered here? <a href="${routes.contact}#enquiry">Send it to us${arrowRight('inline-arrow')}</a> and we will answer it personally.</p>
  </div>
</section>

${ctaBanner({
  title: 'Still deciding?',
  text: 'Send us your application, volume and timeline — we will come back with a recommendation and pricing.',
  primary: 'Get a Quote',
  primaryHref: routes.contact,
  secondary: 'View products',
  secondaryHref: routes.products
})}
`;

  return page({
    title: 'FAQ',
    description:
      'Answers to frequently asked questions about Ecolink recycled boards — waterproofing, sizes, formaldehyde, termite resistance, delivery and recycling plants.',
    current: routes.faq,
    path: '/faq',
    body
  });
};
