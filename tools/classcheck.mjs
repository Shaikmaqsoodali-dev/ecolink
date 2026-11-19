import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Reports class names used in generated HTML that have no rule in style.css. */

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'assets', 'css', 'style.css'), 'utf8');

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html') && !p.includes('Ecolink_India_Website_Copy_Deck.docx.html')) out.push(p);
  }
  return out;
}

const used = new Set();
for (const file of walk(root)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    m[1].split(/\s+/).forEach((c) => c && used.add(c));
  }
}

const missing = [];
for (const c of [...used].sort()) {
  const esc = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\.${esc}(?![\\w-])`);
  if (!re.test(css)) missing.push(c);
}

console.log(missing.length ? 'Classes without CSS rules:\n' + missing.map((c) => '  ' + c).join('\n') : 'all classes styled');
console.log(`(${used.size} classes checked)`);
