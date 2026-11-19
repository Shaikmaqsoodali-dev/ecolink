import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapView } from '../src/data.mjs';

/* Builds assets/img/world-dots.svg — a dot-matrix map of the region where
   Deluxe Recycling plants run (Africa → Asia-Pacific). Uses the Natural
   Earth GeoJSON cached by tools/worldmap.mjs. The page projects pins with
   the same `mapView` bounds (plain equirectangular, % of width/height).  */

const here = dirname(fileURLToPath(import.meta.url));
const geo = JSON.parse(readFileSync(join(here, 'ne-110m.geojson'), 'utf8'));
const { lon0, lon1, lat0, lat1, step } = mapView;

const W = 1000;
const H = Math.round((W * (lat1 - lat0)) / (lon1 - lon0));
const px = (lon) => ((lon - lon0) / (lon1 - lon0)) * W;
const py = (lat) => ((lat1 - lat) / (lat1 - lat0)) * H;

const polys = [];
for (const f of geo.features) {
  const g = f.geometry;
  if (!g) continue;
  const list = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  for (const p of list) polys.push(p);
}

function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const onLand = (lon, lat) =>
  polys.some((p) => inRing(lon, lat, p[0]) && !p.slice(1).some((h) => inRing(lon, lat, h)));

let dots = '';
let n = 0;
for (let lat = lat1 - step / 2; lat > lat0; lat -= step) {
  for (let lon = lon0 + step / 2; lon < lon1; lon += step) {
    if (onLand(lon, lat)) {
      dots += `<circle cx="${px(lon).toFixed(1)}" cy="${py(lat).toFixed(1)}" r="2.6"/>`;
      n += 1;
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true"><g fill="#47504A">${dots}</g></svg>\n`;
writeFileSync(join(here, '..', 'assets', 'img', 'world-dots.svg'), svg, 'utf8');
console.log(`world-dots.svg: ${n} dots, ${W}x${H}, ${(svg.length / 1024).toFixed(0)}kB`);
