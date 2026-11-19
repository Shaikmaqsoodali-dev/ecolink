import { page } from '../layout.mjs';
import { routes, site, formEndpoint } from '../data.mjs';
import { pageHero, arrowRight } from '../ui.mjs';
import { esc } from '../ui.mjs';

export const privacy = () => {
  const updated = 'Last updated: January 2026';
  const body = `
${pageHero({
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  text: updated,
  current: routes.privacy,
  label: 'Privacy Policy'
})}

<section class="section">
  <div class="container narrow prose">
    <h2>1. Who we are</h2>
    <p>This website is operated by ${esc(site.legalName)} ("Ecolink India", "we", "us"). Questions about this policy can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p>

    <h2>2. What we collect</h2>
    <p>When you submit an enquiry form we collect the details you provide: name, email address, phone number (optional), enquiry type and message content. We do not ask for payment details through this website.</p>

    <h2>3. Why we collect it</h2>
    <p>To respond to your enquiry, prepare quotations, fulfil contractual obligations and maintain records required by law. The lawful basis is your consent (given when you submit the form) and our legitimate interest in answering business enquiries.</p>

    <h2>4. Cookies and analytics</h2>
    <p>We use essential cookies to make the site work. Non-essential analytics cookies are only set if you accept them via the cookie banner; if you decline, no analytics are loaded. You can change your choice at any time by clearing this site's data in your browser.</p>

    <h2>5. Who we share it with</h2>
    <p>We do not sell your data. We share it only with service providers who help us operate this website and respond to enquiries, and where required by law.</p>

    <h2>6. How long we keep it</h2>
    <p>Enquiry records are kept for as long as needed to handle your request and for statutory retention periods, then deleted.</p>

    <h2>7. Your rights</h2>
    <p>You may request access to the personal data we hold about you, ask for corrections, or request deletion, by writing to <a href="mailto:${site.email}">${site.email}</a>. You may also lodge a complaint with your local data protection authority.</p>

    <h2>8. Data security</h2>
    <p>We take reasonable technical and organisational measures to protect the data submitted through this website. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

    <h2>9. Third-party links</h2>
    <p>This site may link to external websites. We are not responsible for their content or privacy practices.</p>

    <h2>10. Changes to this policy</h2>
    <p>We may update this policy from time to time. The "last updated" date at the top of this page reflects the latest revision.</p>

    <p class="notice">Contact details above are pending final confirmation by ${esc(site.legalName)}. <span class="pending">[Pending: client]</span></p>
  </div>
</section>
`;

  return page({
    title: 'Privacy Policy',
    description:
      'How Ecolink India collects, uses and protects personal data submitted through this website, including cookie and analytics consent.',
    current: routes.privacy,
    path: '/privacy-policy',
    body
  });
};
