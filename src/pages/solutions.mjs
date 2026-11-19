import { page } from '../layout.mjs';
import {
  solutionsIntro, plantCountries, plantSteps, plantSizes, epr,
  wasteTaken, comesOut, routes
} from '../data.mjs';
import { pageHero, sectionHead, img, arrowRight, ctaBanner } from '../ui.mjs';
import { esc } from '../ui.mjs';

/** Equirectangular projection matching tools/worldmap.mjs output. */
const pin = (c) => {
  const x = ((c.lon + 180) / 360) * 100;
  const y = ((85 - c.lat) / (85 + 85)) * 100;
  return `left:${x.toFixed(2)}%;top:${y.toFixed(2)}%`;
};

export const solutions = () => {
  const body = `
${pageHero({
  eyebrow: solutionsIntro.eyebrow,
  title: solutionsIntro.title,
  text: solutionsIntro.text,
  current: routes.solutions,
  label: 'Solutions'
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Where our plants run',
      title: 'Installed across Asia, Africa and beyond.',
      text: 'Ecolink recycling plants are commissioned for buyers in the following countries.'
    })}
    <div class="world-map reveal" role="img" aria-label="Map showing Ecolink plant countries: ${plantCountries
      .map((c) => c.name)
      .join(', ')}">
      ${img('assets/img/world.svg', '', { className: 'world-svg' })}
      ${plantCountries
        .map(
          (c, i) => `<span class="pin" style="${pin(c)};--d:${i * 80}ms" data-pin>
          <span class="pin-dot"></span>
          <span class="pin-label">${esc(c.name)}</span>
        </span>`
        )
        .join('')}
    </div>
    <ul class="country-chips">
      ${plantCountries.map((c) => `<li class="chip reveal">${esc(c.name)}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section-alt">
  <div class="container split">
    <div class="split-copy">
      <p class="eyebrow reveal">The plant</p>
      <h2 class="reveal" data-split>See the technology at work.</h2>
      <p class="reveal">Shredding, extrusion and pressing lines built by our own engineers — the same equipment we run in our factory in India.</p>
      <a class="btn btn-primary reveal" href="${routes.contact}#enquiry" data-topic="Technology & Turnkey Solutions">Book a demonstration${arrowRight()}</a>
    </div>
    <div class="split-media reveal">
      <div class="video-frame" data-video>
        <video
          class="video-el"
          src="https://res.cloudinary.com/qxjpbgh6/video/upload/v1794483928/Mutli-Layer_Plastic_Recycling_Line-_Deluxe_Recycling.mp4"
          poster="/assets/img/plant-line.jpg"
          preload="none" playsinline controls
          aria-label="Plant walkthrough video: multi-layer plastic recycling line"></video>
        <button class="video-badge" type="button" data-video-play aria-label="Play plant walkthrough video">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Plant configurations', title: 'Small, medium or large.' })}
    <div class="plant-grid">
      ${plantSizes
        .map(
          (s, i) => `<article class="plant-card reveal" style="--d:${i * 80}ms">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.body)}</p>
        </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section-alt" id="waste">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Feedstock',
      title: 'What goes in. What comes out.',
      text: 'A recycling plant converts these waste streams into value-added products.'
    })}
    <div class="io-grid">
      <div class="io-col reveal">
        <h3>Goes in</h3>
        <ul class="chip-list">${wasteTaken.map((w) => `<li class="chip">${esc(w)}</li>`).join('')}</ul>
      </div>
      <div class="io-arrow reveal" aria-hidden="true">${arrowRight()}</div>
      <div class="io-col io-col-out reveal">
        <h3>Comes out</h3>
        <ul class="chip-list">${comesOut.map((w) => `<li class="chip chip-out">${esc(w)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

<section class="section" id="process">
  <div class="container">
    ${sectionHead({ eyebrow: 'Turnkey process', title: 'From first call to running plant.' })}
    <ol class="process-rail process-rail-6">
      ${plantSteps
        .map(
          (s, i) => `<li class="process-step reveal" style="--d:${i * 60}ms">
          <span class="process-no">${s.no}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
        </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section-alt" id="epr">
  <div class="container split">
    <div class="split-media reveal img-reveal">
      ${img('assets/img/waste-bales.jpg', 'Baled waste ready for recycling')}
    </div>
    <div class="split-copy">
      <p class="eyebrow reveal">Compliance</p>
      <h2 class="reveal" data-split>${esc(epr.title)}</h2>
      <p class="reveal">${esc(epr.body)}</p>
      <a class="btn btn-primary reveal" href="${routes.contact}#enquiry" data-topic="Technology & Turnkey Solutions">Discuss EPR obligations${arrowRight()}</a>
    </div>
  </div>
</section>

${ctaBanner({
  title: 'Ready to start?',
  text: 'Tell us your feedstock, target throughput and market — we will come back with a plant proposal.',
  primary: 'Get a Quote',
  primaryHref: routes.contact,
  secondary: 'View products',
  secondaryHref: routes.products,
  topic: 'Technology & Turnkey Solutions'
})}
`;

  return page({
    title: 'Solutions — Recycling plants',
    description:
      'Complete recycling plants designed, built and commissioned by Ecolink India — small, medium and large configurations shipped to Asia, Africa and beyond.',
    current: routes.solutions,
    path: '/solutions',
    body
  });
};
