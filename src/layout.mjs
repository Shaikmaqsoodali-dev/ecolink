import { site, siteUrl } from './data.mjs';
import { header, drawer, footer, backToTop, cookieBar, esc, asset } from './ui.mjs';

export const page = ({ title, description, current, body, path, jsonLd = null, bodyClass = '' }) => {
  const fullTitle = current === '/' ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;
  const canonical = current === '/' ? siteUrl + '/' : siteUrl + current + '/';
  const ogImage = siteUrl + '/assets/img/logo-deluxe.png';
  const ld = jsonLd
    ? `\n<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#E9E9E6">
<meta name="robots" content="${current === '/404' ? 'noindex, follow' : 'index, follow'}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">

<link rel="icon" href="${asset('assets/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${asset('assets/favicon.svg')}">

<link rel="preload" as="font" type="font/woff2" href="${asset('assets/fonts/monasans-latin.woff2')}" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${asset('assets/fonts/geist-latin.woff2')}" crossorigin>
<link rel="stylesheet" href="${asset('assets/css/fonts.css')}">
<link rel="stylesheet" href="${asset('assets/css/style.css')}">
${ld}</head>
<body class="${bodyClass}" data-page="${esc(path)}">
<a class="skip-link" href="#main">Skip to content</a>
${header(current)}
${drawer(current)}
<main id="main">
${body}
</main>
${footer(current)}
${backToTop()}
${cookieBar()}
<script src="${asset('assets/js/main.js')}" defer></script>
</body>
</html>
`;
};
