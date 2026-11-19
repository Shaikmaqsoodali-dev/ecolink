import { page } from '../layout.mjs';
import { routes } from '../data.mjs';
import { ic, kicker } from '../ui.mjs';

export const notFound = () =>
  page({
    title: 'Page not found | Ecolink India',
    description: 'This page got recycled.',
    current: routes.notFound,
    darkTop: true,
    noindex: true,
    body: `<section class="nf">
  <div class="nf-bg" aria-hidden="true"></div>
  <div class="wrap" style="display:grid;gap:24px">
    <p class="nf-code" aria-hidden="true">404</p>
    ${kicker(null, 'Error 404')}
    <h1 class="d2">This page got recycled.</h1>
    <p class="lead" style="color:rgba(255,255,255,.8)">Let’s get you back to something that exists.</p>
    <div class="btns on-dark"><a class="btn btn--lime" href="${routes.home}">Go to the home page ${ic.arrow}</a><a class="btn btn--ghost" href="${routes.products}">Products</a></div>
  </div>
</section>`
  });
