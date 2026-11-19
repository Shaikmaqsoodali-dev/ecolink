import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Downloads the latin subsets of the site fonts from Google Fonts and
   writes assets/css/fonts.css + assets/fonts/*.woff2 (self-hosted, OFL).
   Headings: Mona Sans · Body: Geist  (Manufact design system)          */

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const families = [
  { file: 'monasans', name: 'Mona Sans', css: 'family=Mona+Sans:wght@400..800' },
  { file: 'geist', name: 'Geist', css: 'family=Geist:wght@400..700' },
];

mkdirSync(join(dir, 'assets', 'fonts'), { recursive: true });
const out = [];

for (const fam of families) {
  const url = `https://fonts.googleapis.com/css2?${fam.css}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`css fetch failed ${url}`);
  const css = await res.text();
  // keep only the latin + latin-ext blocks (Indian site, latin script)
  const blocks = css.split('/*').slice(1).map((b) => '/*' + b);
  const keep = blocks.filter((b) => /^\/\*\s*latin(-ext)?\s*\*\//.test(b));
  if (!keep.length) throw new Error(`no latin blocks for ${fam.file}`);
  for (const block of keep) {
    const subset = /^\/\*\s*(latin(?:-ext)?)\s*\*\//.exec(block)[1];
    const wRange = /font-weight:\s*([\d ]+);/.exec(block)[1].trim();
    const src = /url\((https:[^)]+)\)/.exec(block)[1];
    const name = `${fam.file}-${subset.replace('-', '')}.woff2`;
    const r = await fetch(src, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error(`font fetch failed ${src}`);
    writeFileSync(join(dir, 'assets', 'fonts', name), Buffer.from(await r.arrayBuffer()));
    out.push(
      `@font-face{font-family:'${fam.name}';font-style:normal;font-weight:${wRange};font-display:swap;src:url('../fonts/${name}') format('woff2');unicode-range:${
        /unicode-range:\s*([^;]+);/.exec(block)[1]
      };}`
    );
    console.log('saved', name, 'weight', wRange);
  }
}

writeFileSync(join(dir, 'assets', 'css', 'fonts.css'), out.join('\n') + '\n', 'utf8');
console.log('fonts.css written');
