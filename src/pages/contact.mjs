import { page } from '../layout.mjs';
import { contactPage as C, routes, site, formEndpoint } from '../data.mjs';
import { esc, ic, kicker, pageHero, enquiryForm } from '../ui.mjs';

export const contact = () => {
  const body = `
${pageHero({ k: 'Contact', title: C.hero.headline, sub: C.hero.sub, trail: [{ label: 'Contact' }] })}
<section class="sec" style="padding-top:clamp(24px,3vw,40px)">
  <div class="wrap contact-grid">
    ${enquiryForm(formEndpoint)}
    <div style="display:grid;gap:24px">
      ${kicker(null, 'Find us')}
      <div class="cinfo">
        <div><span class="ci">${ic.pin}</span><div><h3>Head office</h3><p>${site.office.map(esc).join('<br>')}</p><a class="link" href="${site.officeMap}" target="_blank" rel="noopener">Open in Maps ${ic.ext}</a></div></div>
        <div><span class="ci">${ic.factory}</span><div><h3>Factory</h3><p>${esc(site.factory)}</p></div></div>
        <div><span class="ci">${ic.mail}</span><div><h3>Email</h3><a href="mailto:${site.email}">${site.email}</a></div></div>
        ${site.phones.map((p) => `<div><span class="ci">${ic.phone}</span><div><h3>${esc(p.label)}</h3><a href="${p.href}">${esc(p.value)}</a></div></div>`).join('')}
      </div>
    </div>
  </div>
</section>`;
  return page({ title: C.seoTitle, description: C.seoDesc, current: routes.contact, body });
};
