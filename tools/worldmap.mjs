import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Builds assets/img/world.svg — a properly grounded equirectangular world
   map from Natural Earth country geometry, plus the exact pin projection
   used by the Solutions page (left/top % = equirectangular lat/lon).
   GeoJSON is cached next to this script after the first run.            */

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const cache = join(dirname(fileURLToPath(import.meta.url)), 'ne-110m.geojson');
const URL_ =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

let geo;
if (existsSync(cache)) {
  geo = JSON.parse(readFileSync(cache, 'utf8'));
} else {
  const res = await fetch(URL_);
  if (!res.ok) throw new Error(`geojson fetch failed ${res.status}`);
  const text = await res.text();
  writeFileSync(cache, text, 'utf8');
  geo = JSON.parse(text);
}

const W = 1000;
const H = 500;
const px = (lon) => ((lon + 180) / 360) * W;
const py = (lat) => ((90 - lat) / 180) * H;

function ringToPath(ring) {
  let d = '';
  let prev = null;
  for (let i = 0; i < ring.length; i += 1) {
    const [lon, lat] = ring[i];
    const x = px(lon);
    const y = py(lat);
    if (prev && Math.abs(x - prev[0]) < 0.6 && Math.abs(y - prev[1]) < 0.6) continue;
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
    prev = [x, y];
  }
  return d + 'Z';
}

let paths = '';
for (const f of geo.features) {
  const g = f.geometry;
  if (!g) continue;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  for (const poly of polys) {
    for (const ring of poly) {
      if (ring.length < 4) continue;
      paths += `<path d="${ringToPath(ring)}"/>`;
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="World map">
<g fill="#DCE0D8" stroke="#C9CFC2" stroke-width="0.8">${paths}</g>
</svg>
`;
writeFileSync(join(dir, 'assets', 'img', 'world.svg'), svg, 'utf8');
console.log('world.svg written,', (svg.length / 1024).toFixed(0) + 'kB');

/* pin projection helper (mirrored on the page) */
const pins = {
  Turkey: [39, 35],
  Kenya: [0, 37],
  Malaysia: [4, 102],
  India: [22, 79],
  Philippines: [12, 122],
  'East Timor': [-9, 125],
  'Sri Lanka': [7.9, 80.7],
};
for (const [k, [lat, lon]] of Object.entries(pins)) {
  console.log(k, `left:${(((lon + 180) / 360) * 100).toFixed(2)}%`, `top:${(((90 - lat) / 180) * 100).toFixed(2)}%`);
}
