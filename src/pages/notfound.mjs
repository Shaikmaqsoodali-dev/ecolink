import { page } from '../layout.mjs';
import { routes } from '../data.mjs';
import { arrowRight } from '../ui.mjs';

export const notFound = () => {
  const body = `
<section class="section notfound">
  <div class="container narrow">
    <p class="eyebrow">404</p>
    <h1 class="display reveal" data-split>This page went to landfill.</h1>
    <p class="lead">The page you are looking for does not exist or has been moved.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="${routes.home}">Back to home${arrowRight()}</a>
      <a class="btn btn-ghost" href="${routes.products}">View products</a>
    </div>
  </div>
</section>
`;

  return page({
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
    current: '/404',
    path: '/404',
    body,
    bodyClass: 'is-404'
  });
};
