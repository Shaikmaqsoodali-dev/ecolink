import { writeFileSync, mkdirSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { home } from './src/pages/home.mjs';
import { about } from './src/pages/about.mjs';
import { productsIndex } from './src/pages/products.mjs';
import { productPages } from './src/pages/product-detail.mjs';
import { solutions } from './src/pages/solutions.mjs';
import { environmentPage } from './src/pages/environment.mjs';
import { faq } from './src/pages/faq.mjs';
import { contact } from './src/pages/contact.mjs';
import { privacy } from './src/pages/privacy.mjs';
import { notFound } from './src/pages/notfound.mjs';
import { siteUrl, routes } from './src/data.mjs';

const root = dirname(fileURLToPath(import.meta.url));

/** route → generator */
const pages = [
  { route: routes.home, render: home },
  { route: routes.about, render: about },
  { route: routes.products, render: productsIndex },
  ...Object.entries(productPages).map(([slug, render]) => ({ route: '/products/' + slug, render })),
  { route: routes.solutions, render: solutions },
  { route: routes.environment, render: environmentPage },
  { route: routes.faq, render: faq },
  { route: routes.contact, render: contact },
  { route: routes.privacy, render: privacy },
  { route: routes.notFound, render: notFound, noindex: true }
];

/** route → output file (directory routes with index.html) */
function outFile(route) {
  if (route === '/') return 'index.html';
  if (route === '/404') return '404.html'; // conventional server 404 file
  return route.replace(/^\//, '') + '/index.html';
}

/* clean stale flat artefacts from earlier builds */
const stale = [
  'about.html', 'products.html', 'solutions.html', 'sustainability.html',
  'industries.html', 'process.html', 'projects.html', 'privacy.html',
  'faq.html', 'contact.html',
  ...['ecolink-boards', 'ecoshakti-boards', 'ess-boards', 'roofing-sheets', 'doors', 'pallets'].map(
    (s) => `product-${s}.html`
  )
];
for (const f of stale) {
  const p = join(root, f);
  if (existsSync(p)) rmSync(p);
}
if (existsSync(join(root, '404'))) rmSync(join(root, '404'), { recursive: true });

let count = 0;
const built = [];
for (const p of pages) {
  const html = p.render();
  const rel = outFile(p.route);
  const dest = join(root, rel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html, 'utf8');
  if (!p.noindex) built.push(p.route === '/' ? '/' : p.route + '/');
  count += 1;
  console.log('built', rel, `${(html.length / 1024).toFixed(1)}kB`);
}

/* favicon: ink tile + client-supplied logo */
const logoPng = readFileSync(join(root, 'assets', 'img', 'logo-deluxe.png'));
const logoB64 = logoPng.toString('base64');
const fw = 50;
const fh = Math.round((fw * 127) / 180);
writeFileSync(
  join(root, 'assets', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#171A18"/>
  <image href="data:image/png;base64,${logoB64}" x="${(64 - fw) / 2}" y="${(64 - fh) / 2}" width="${fw}" height="${fh}"/>
</svg>
`,
  'utf8'
);

/* sitemap.xml */
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${built
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log('built sitemap.xml', `${(sitemap.length / 1024).toFixed(1)}kB`);

/* robots.txt */
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
writeFileSync(join(root, 'robots.txt'), robots, 'utf8');
console.log('built robots.txt');

console.log(`\n${count} pages built.`);
