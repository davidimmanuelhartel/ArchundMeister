import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

/**
 * Renders one route to static HTML at build time (see scripts/prerender.mjs).
 * The client hydrates over this markup, so the visible result is unchanged –
 * but crawlers that do not execute JavaScript now receive real content.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
}

export { getSeo, INDEXABLE_ROUTES, NOINDEX_ROUTES, SITE_URL } from './seo';
export { PRODUCTS } from './data';
