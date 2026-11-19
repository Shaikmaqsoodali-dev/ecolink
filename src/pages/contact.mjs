import { page } from '../layout.mjs';
import { contact as contactCopy, contactDetails, routes, formEndpoint } from '../data.mjs';
import { pageHero, sectionHead, enquiryForm, icon, arrowRight, img } from '../ui.mjs';
import { esc } from '../ui.mjs';

export const contact = () => {
  const body = `
${pageHero({
  eyebrow: contactCopy.eyebrow,
  title: contactCopy.title,
  text: contactCopy.lead,
  current: routes.contact,
  label: 'Contact'
})}

<section class="section" id="enquiry">
  <div class="container contact-grid">
    <div class="contact-info">
      <h2 class="reveal">Reach us directly.</h2>
      <ul class="contact-list">
        ${contactDetails
          .map(
            (d, i) => `<li class="reveal" style="--d:${i * 60}ms">
            <span class="contact-label">${esc(d.label)}</span>
            <span class="contact-value">${
              d.href ? `<a href="${d.href}">${esc(d.value)}</a>` : esc(d.value)
            }${d.pending ? ' <span class="pending">[to confirm]</span>' : ''}</span>
          </li>`
          )
          .join('')}
      </ul>
      <div class="contact-note reveal">
        <p><strong>Factory visits</strong> are welcome by appointment.</p>
        <p class="pending">Full factory address pending: client to confirm.</p>
      </div>
      <div class="contact-media reveal">
        ${img('assets/img/hero-yard.jpg', 'Aerial view of the Ecolink India facility and material yard')}
      </div>
    </div>
    <div class="contact-form reveal">
      <h2>Send an enquiry.</h2>
      ${enquiryForm(formEndpoint)}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ eyebrow: 'What happens next', title: 'How we handle enquiries.' })}
    <ol class="process-rail">
      <li class="process-step reveal"><span class="process-no">01</span><h3>You send</h3><p>Application, volumes, sizes, timeline — whatever you have.</p></li>
      <li class="process-step reveal" style="--d:90ms"><span class="process-no">02</span><h3>We review</h3><p>Our team checks feasibility and stock within one working day.</p></li>
      <li class="process-step reveal" style="--d:180ms"><span class="process-no">03</span><h3>We respond</h3><p>Specifications, pricing and lead times — or a plant proposal.</p></li>
      <li class="process-step reveal" style="--d:270ms"><span class="process-no">04</span><h3>We deliver</h3><p>Samples, dispatch or project kickoff, as agreed.</p></li>
    </ol>
  </div>
</section>
`;

  return page({
    title: 'Contact',
    description:
      'Contact Ecolink India for recycled board enquiries, pricing, waste supply and recycling plant projects. We respond within one working day.',
    current: routes.contact,
    path: '/contact',
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Ecolink India'
    }
  });
};
