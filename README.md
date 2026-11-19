# Ecolink India — Website

Static multi-page site for **Ecolink India** (a brand of Deluxe Recycling (India) Pvt. Ltd.).
Plain Node (ESM) generator, no dependencies, no npm install.

```bash
node build.mjs            # regenerate all pages + sitemap.xml + robots.txt
node tools/serve.mjs      # preview at http://localhost:4173
node tools/linkcheck.mjs  # every href/src resolves
node tools/dotmap.mjs     # rebuild assets/img/world-dots.svg (Solutions map)
node tools/fonts.mjs      # re-download self-hosted fonts (rarely needed)
```

`FORM_ENDPOINT=https://… node build.mjs` bakes the enquiry endpoint into the contact form (JSON POST).
Without it the form says plainly that it is not connected and never fakes success.

## Content

- **Source of truth:** `../Ecolink_India_Website_Copy_Deck.docx.md` plus the client's questionnaire answers.
  All copy lives in `src/data.mjs`; page modules only arrange it.
- Nothing is invented. Items still awaiting the client stay empty, and their sections hide themselves:
  testimonials, certifications, leader photo/role/bio, social links, client logos (names are shown as type until logos arrive).
- Client asks/assets are tracked in `../CLIENT-ASSETS-AND-OPEN-ITEMS.md`.

## Structure

```
build.mjs              generator entry
src/data.mjs           all copy + facts (single source of truth)
src/layout.mjs         <head>, SEO/OG, JSON-LD, shell
src/ui.mjs             components: header + mega menu, drawer, footer, hero, figures,
                       CTA, specs, water meter, film player, YouTube facade, form…
src/pages/*.mjs        one module per page
assets/css/style.css   design system (tokens at the top)
assets/js/main.js      interactions (no libraries)
assets/img/film/       stills from the corporate film (client footage)
assets/img/b/          crops from the plant brochure (client imagery)
assets/video/          hero loop cut from the corporate film (19.6 s, muted, 2.5 MB / 1 MB)
assets/docs/           test results PDF, plant brochure PDF
_source-images/        full-size masters + unused stock — NOT deployed
```

## Design

- Palette: ink `#121412`, charcoal `#1A1D1A`, paper `#F1EFE8`, Deluxe lime `#8DC63F`, moss `#2F5A2C`, water blue `#3D8FB8`.
- Type: **Archivo** (variable width, used condensed for display), **Geist** (body), **Geist Mono** (labels, specs).
- Motifs: crop-mark frames, spec-sheet tables, hairline grids, speckled board texture.

## Interactive pieces

Hero film loop (pause button, paused under reduced motion, off-screen pause) · full film modal (Cloudinary) ·
waste → board before/after slider · waste-stream board picker (tabs, arrow keys) · sheet-size diagram ·
plant size selector with floor-area plot · dot-matrix map with arcs · YouTube click-to-load (youtube-nocookie) ·
counters with Indian digit grouping · FAQ accordion · enquiry form with `?topic=` pre-select.

Content is visible without JavaScript; reveal animations only apply once JS has loaded.

## Media

- Hero loop: cut from `Mutli-Layer_Plastic_Recycling_Line-_Deluxe_Recycling.mp4` (Cloudinary), subtitle band cropped,
  avoiding the "45,000 tons" and "7,200 MT" frames, which differ from the site's 37,000 t/yr.
- Full film streams from Cloudinary with `q_auto,w_1600`.
