/**
 * Build-time prerendering.
 *
 * Renders every public route to a real HTML file so that crawlers which do not
 * execute JavaScript (GPTBot, PerplexityBot, ClaudeBot, and Google's first pass)
 * receive full content and a correct <head>. The client then hydrates over it,
 * so behaviour in the browser is unchanged.
 *
 * Also emits sitemap.xml and llms.txt from the same data source, so they can
 * never drift out of sync with the actual routes and prices.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const { render, getSeo, INDEXABLE_ROUTES, NOINDEX_ROUTES, SITE_URL, PRODUCTS } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildHead(seo) {
  const tags = [
    `<title>${escapeAttr(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(seo.image)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(seo.image)}" />`,
  ];

  if (seo.noindex) tags.push(`<meta name="robots" content="noindex, follow" />`);

  if (seo.jsonLd?.length) {
    const graph = JSON.stringify({ '@context': 'https://schema.org', '@graph': seo.jsonLd });
    // Escape "<" so the JSON can never terminate the surrounding <script> element.
    tags.push(
      `<script type="application/ld+json" data-seo-jsonld>${graph.replace(/</g, '\\u003c')}</script>`
    );
  }

  return tags.join('\n    ');
}

function outputPathFor(route) {
  return route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

const routes = [...INDEXABLE_ROUTES, ...NOINDEX_ROUTES];
const rendered = [];

for (const route of routes) {
  let appHtml;
  try {
    appHtml = render(route);
  } catch (err) {
    console.error(`\n[prerender] FAILED to render ${route}:\n`, err);
    process.exit(1);
  }

  const seo = getSeo(route);
  const html = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, buildHead(seo))
    .replace('<!--app-html-->', appHtml);

  const outFile = outputPathFor(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  rendered.push({ route, bytes: Buffer.byteLength(html) });
}

// --- 404.html ---
// Vercel serves this automatically (with a real 404 status) for unmatched paths
// once the catch-all rewrite in vercel.json is removed.
{
  const seo = getSeo('/404');
  const html = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, buildHead(seo))
    .replace('<!--app-html-->', render('/404'));
  fs.writeFileSync(path.join(DIST, '404.html'), html);
}

// --- sitemap.xml (indexable routes only) ---
const today = new Date().toISOString().slice(0, 10);

const urls = INDEXABLE_ROUTES.map((route) => {
  const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
  const priority = route === '/' ? '1.0' : route.startsWith('/product/') || route === '/shop' ? '0.9' : '0.5';
  const changefreq = route.startsWith('/product/') || route === '/' || route === '/shop' ? 'weekly' : 'yearly';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

// --- llms.txt (structured summary for AI answer engines) ---
const buyable = PRODUCTS.filter((p) => !p.comingSoon);
const upcoming = PRODUCTS.filter((p) => p.comingSoon);
const price = (p) => p.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

const llms = `# Architekt & Meister

> Möbelmanufaktur in Dresden. Massivholzmöbel, entworfen von einem Architekten und
> gebaut von einem Tischlermeister. Jedes Stück wird auf Bestellung gefertigt –
> es gibt keine Lagerware.

## Eckdaten

- Standort: Buchenstraße 20, 01097 Dresden, Deutschland
- Inhaber: Lukas Westphalen (Einzelunternehmen, Kleinunternehmer nach § 19 UStG – es wird keine Umsatzsteuer ausgewiesen)
- Kontakt: architektundmeister@gmail.com, +49 151 22807682
- Fertigungszeit: ca. 4–6 Wochen nach Zahlungseingang
- Lieferung: Deutschland, EU und Schweiz
- Material: deutsche Fichte (Standard), Eiche gegen Aufpreis, FSC-zertifiziert, geölt
- Bauweise: klassische Holzverbindungen statt Metall
- Widerruf: 14 Tage gesetzliches Widerrufsrecht für Standardprodukte; für Sonderanfertigungen
  nach individuellen Kundenvorgaben ausgeschlossen (§ 312g Abs. 2 Nr. 1 BGB). Kostenfreie
  Stornierung bei allen Bestellungen bis zum Beginn der Fertigung.

## Produkte

${buyable
  .map(
    (p) =>
      `- [${p.name}](${SITE_URL}/product/${p.id}): ${p.tagline} ${price(p)} zzgl. Versand. ${p.material} Maße: ${p.dimensions}`
  )
  .join('\n')}
${upcoming.length ? `\n### In Vorbereitung (noch nicht bestellbar)\n\n${upcoming.map((p) => `- ${p.name}: ${p.tagline} Geplant ab ${price(p)}.`).join('\n')}\n` : ''}
## Seiten

- [Startseite](${SITE_URL}/): Konzept, Philosophie und Kollektion
- [Kollektion](${SITE_URL}/shop): alle Möbelstücke
- [Beratung](${SITE_URL}/beratung): Sonderanfertigungen und individuelle Maße
- [Kontakt](${SITE_URL}/kontakt): Atelier in Dresden
- [AGB](${SITE_URL}/agb)
- [Widerrufsbelehrung](${SITE_URL}/widerruf)
- [Versand & Retouren](${SITE_URL}/versand)
- [Datenschutz](${SITE_URL}/datenschutz)
- [Impressum](${SITE_URL}/impressum)
`;

fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);

console.log(`\n[prerender] ${rendered.length} Routen als statisches HTML erzeugt:`);
for (const r of rendered) {
  console.log(`  ${r.route.padEnd(28)} ${(r.bytes / 1024).toFixed(1)} kB`);
}
console.log(`[prerender] sitemap.xml (${INDEXABLE_ROUTES.length} URLs) und llms.txt geschrieben.\n`);
