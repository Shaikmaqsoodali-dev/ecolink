import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const htmlFiles = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) {
      if (!['node_modules', 'tools', 'src', 'assets'].includes(f)) walk(p);
    } else if (f.endsWith('.html')) htmlFiles.push(p);
  }
})(root);

const missingAssets = new Set();
const missingLinks = new Set();

for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(u)) continue;
    u = u.split('#')[0].split('?')[0];
    if (!u) continue;
    if (u.startsWith('/')) {
      // root-relative
      let target = join(root, u.replace(/^\//, ''));
      if (u.endsWith('/')) target = join(target, 'index.html');
      if (!existsSync(target)) {
        if (u.startsWith('/assets/')) missingAssets.add(u);
        else missingLinks.add(u + '  (from ' + f + ')');
      }
    } else {
      // relative
      const target = join(root, f, '..', u);
      if (!existsSync(target)) missingLinks.add(u + '  (from ' + f + ')');
    }
  }
}

console.log('HTML files:', htmlFiles.length);
console.log('Missing assets:', missingAssets.size ? [...missingAssets] : 'none');
console.log('Missing page links:', missingLinks.size ? [...missingLinks] : 'none');
