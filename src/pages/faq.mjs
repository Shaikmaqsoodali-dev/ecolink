import { page } from '../layout.mjs';
import { faqPage as F, faqs, routes, site } from '../data.mjs';
import { esc, ic, kicker, pageHero, accordion } from '../ui.mjs';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const linkify = (a) =>
  esc(a)
    .replace('Contact page', `<a href="${routes.contact}">Contact page</a>`)
    .replace('Products page', `<a href="${routes.products}">Products page</a>`)
    .replace('Solutions page', `<a href="${routes.solutions}">Solutions page</a>`)
    .replace(site.email, `<a href="mailto:${site.email}">${site.email}</a>`)
    .replace('ecoshakti.in', `<a href="${site.ecoshaktiUrl}" target="_blank" rel="noopener">ecoshakti.in</a>`);

export const faq = () => {
  const groups = [...new Set(faqs.map((f) => f.group))];
  const body = `
${pageHero({ k: 'FAQ', title: F.hero.headline, sub: F.hero.sub, trail: [{ label: 'FAQ' }] })}
<section class="sec" style="padding-top:clamp(24px,3vw,40px)">
  <div class="wrap faq-grid">
    <aside class="faq-side">
      <nav aria-label="FAQ sections">
        ${groups.map((g) => `<a href="#${slug(g)}">${esc(g)} <span>${faqs.filter((f) => f.group === g).length}</span></a>`).join('')}
      </nav>
      <div class="ask">
        <p class="h4" style="color:#fff">Still wondering?</p>
        <p>If yours isn’t here, just ask. We’ll answer plainly.</p>
        <a class="btn btn--lime btn--sm" href="${routes.contact}#enquiry" style="justify-self:start">Ask us ${ic.arrow}</a>
      </div>
    </aside>
    <div>
      ${groups
        .map(
          (g, gi) => `<div class="faq-group" id="${slug(g)}">
          <h2>${esc(g)}</h2>
          ${accordion(faqs.filter((f) => f.group === g).map((f) => ({ q: f.q, html: linkify(f.a) })), 'q' + gi)}
        </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;
  return page({
    title: F.seoTitle,
    description: F.seoDesc,
    current: routes.faq,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    body
  });
};
