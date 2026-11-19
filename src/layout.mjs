import { site, siteUrl } from './data.mjs';
import { header, drawer, footer, toTop, cookieBar, filmModal, esc, asset } from './ui.mjs';

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.legalName,
  url: siteUrl,
  logo: siteUrl + '/assets/img/deluxe-logo-600.png',
  foundingDate: String(site.since),
  email: site.email,
  telephone: site.phones[0]?.value,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'A-Wing, 2nd Floor, Kakad House, Opp Bombay Hospital, New Marine Lines',
    addressLocality: 'Mumbai',
    postalCode: '400020',
    addressCountry: 'IN'
  }
};

/**
 * @param {object} o
 * @param {string} o.title   full <title> (from the copy deck's "Search title")
 * @param {string} o.description
 * @param {string} o.current route
 * @param {string} o.body
 * @param {boolean} [o.darkTop]  page opens on a dark hero → light header text
 * @param {object} [o.jsonLd]
 * @param {string} [o.ogImage]
 */
export const page = ({ title, description, current, body, darkTop = false, jsonLd = null, ogImage, noindex = false }) => {
  const canonical = current === '/' ? siteUrl + '/' : siteUrl + current + '/';
  const og = siteUrl + '/' + (ogImage || 'assets/img/hero-poster.jpg');
  const ld = [current === '/' ? org : null, jsonLd].filter(Boolean);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#121412">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${asset('assets/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${asset('assets/favicon.png')}" type="image/png">
<link rel="preload" as="font" type="font/woff2" href="${asset('assets/fonts/archivo-latin.woff2')}" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${asset('assets/fonts/geist-latin.woff2')}" crossorigin>
<link rel="stylesheet" href="${asset('assets/css/fonts.css')}">
<link rel="stylesheet" href="${asset('assets/css/style.css')}">
<script>document.documentElement.classList.add('js')</script>
${ld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body class="${darkTop ? 'has-dark-top' : ''}">
<a class="skip-link" href="#main">Skip to content</a>
${header(current)}
${drawer(current)}
<main id="main">
${body}
</main>
${footer()}
${toTop()}
${cookieBar()}
${filmModal()}
<script src="${asset('assets/js/main.js')}" defer></script>
</body>
</html>
`;
};
