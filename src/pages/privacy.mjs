import { page } from '../layout.mjs';
import { routes, site } from '../data.mjs';
import { esc, pageHero } from '../ui.mjs';

export const privacy = () => {
  const mail = `<a href="mailto:${site.email}">${site.email}</a>`;
  const body = `
${pageHero({ k: 'Legal', title: 'Privacy Policy', trail: [{ label: 'Privacy Policy' }] })}
<section class="sec" style="padding-top:clamp(24px,3vw,40px)">
  <div class="wrap legal">
    <p class="short">The short version: we collect what you tell us through the enquiry form, plus basic visit data to see how the site is used. We use it to reply to you and to improve the site.</p>

    <h2>Who we are</h2>
    <p>This website is run by ${esc(site.legalName)} (“Ecolink India”, “we”, “us”), ${site.office.map(esc).join(', ')}. Questions about this policy can be sent to ${mail}.</p>

    <h2>What we collect</h2>
    <ul>
      <li>What you type into the enquiry form: your name, company, phone, email, the enquiry type and your message.</li>
      <li>Basic visit data (pages viewed, rough location, device type), only if you accept analytics cookies.</li>
    </ul>

    <h2>Why we use it</h2>
    <p>To reply to your enquiry, prepare quotations and keep the records the law asks us to keep. Visit data helps us see which pages are useful and fix the ones that aren’t.</p>

    <h2>Cookies</h2>
    <p>Analytics cookies are set only if you press “Accept” on the cookie banner. If you choose “No thanks”, none are loaded. Videos from YouTube load only when you press play, using YouTube’s privacy-enhanced mode. You can change your mind at any time by clearing this site’s data in your browser.</p>

    <h2>Who we share it with</h2>
    <p>We don’t sell your data. We share it only with the service providers that help us run this website and answer enquiries, and where the law requires it.</p>

    <h2>How long we keep it</h2>
    <p>For as long as we need to handle your enquiry, plus any period the law requires. Then we delete it.</p>

    <h2>Your rights</h2>
    <p>You can ask to see the personal data we hold about you, correct it or have it deleted by writing to ${mail}.</p>

    <h2>Changes</h2>
    <p>If this policy changes, we’ll update this page.</p>
  </div>
</section>`;
  return page({
    title: 'Privacy Policy | Ecolink India',
    description: 'How Ecolink India collects, uses and protects the information you share with us.',
    current: routes.privacy,
    body
  });
};
