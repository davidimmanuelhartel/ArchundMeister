import { PRODUCTS, FAQ } from './data';

export const SITE_URL = 'https://architektundmeister.de';
export const SITE_NAME = 'Architekt & Meister';
export const DEFAULT_IMAGE = `${SITE_URL}/images/echtholzbett_2.jpg`;

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  image: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

// --- Reusable JSON-LD nodes ---

const businessNode: Record<string, unknown> = {
  '@type': 'FurnitureStore',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    'Möbelmanufaktur aus Dresden. Handgefertigte Massivholzmöbel, entworfen von einem Architekten und gebaut von einem Tischlermeister.',
  url: SITE_URL,
  email: 'architektundmeister@gmail.com',
  telephone: '+4915122807682',
  image: DEFAULT_IMAGE,
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Buchenstraße 20',
    postalCode: '01097',
    addressLocality: 'Dresden',
    addressRegion: 'Sachsen',
    addressCountry: 'DE',
  },
  founder: {
    '@type': 'Person',
    name: 'Lukas Westphalen',
  },
  areaServed: [
    { '@type': 'Country', name: 'Deutschland' },
    { '@type': 'Country', name: 'Österreich' },
    { '@type': 'Country', name: 'Schweiz' },
  ],
  sameAs: [
    'https://www.instagram.com/architekt.meister/',
    'https://de.pinterest.com/architektundmeister/',
  ],
};

const websiteNode: Record<string, unknown> = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'de-DE',
  publisher: { '@id': `${SITE_URL}/#business` },
};

const returnPolicyNode: Record<string, unknown> = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: ['DE', 'AT', 'CH'],
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
};

function productNode(productId: string): Record<string, unknown>[] {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];

  return [
    {
      '@type': 'Product',
      '@id': `${SITE_URL}/product/${product.id}#product`,
      name: product.name,
      description: product.description.replace(/\n+/g, ' '),
      image: product.images
        .filter((img) => img.startsWith('/'))
        .map((img) => `${SITE_URL}${img}`),
      material: product.material,
      brand: { '@type': 'Brand', name: SITE_NAME },
      manufacturer: { '@id': `${SITE_URL}/#business` },
      countryOfOrigin: 'DE',
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/product/${product.id}`,
        priceCurrency: 'EUR',
        price: product.price.toFixed(2),
        // Auf Bestellung gefertigt – keine Lagerware.
        availability: 'https://schema.org/MadeToOrder',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@id': `${SITE_URL}/#business` },
        hasMerchantReturnPolicy: returnPolicyNode,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/product/${product.id}#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Kollektion', item: `${SITE_URL}/shop` },
        { '@type': 'ListItem', position: 3, name: product.name },
      ],
    },
  ];
}

// --- Static route metadata ---

const STATIC_SEO: Record<string, Omit<SeoData, 'canonical' | 'image'> & { image?: string }> = {
  '/': {
    title: 'Architekt & Meister – Handgefertigte Massivholzmöbel aus Dresden',
    description:
      'Massivholzmöbel aus Dresden, entworfen von einem Architekten und gebaut von einem Tischlermeister. Handgefertigt aus deutscher Fichte oder Eiche, mit klassischen Holzverbindungen statt Metall.',
    jsonLd: [businessNode, websiteNode],
  },
  '/shop': {
    title: 'Kollektion – Massivholzmöbel auf Bestellung | Architekt & Meister',
    description:
      'Unsere Kollektion handgefertigter Massivholzmöbel: Echtholz-Bett aus deutscher Fichte oder Eiche, gefertigt in Dresden. Jedes Stück entsteht auf Bestellung.',
    jsonLd: [
      {
        '@type': 'CollectionPage',
        name: 'Kollektion',
        url: `${SITE_URL}/shop`,
        about: { '@id': `${SITE_URL}/#business` },
      },
    ],
  },
  '/beratung': {
    title: 'Beratung & Sonderanfertigung | Architekt & Meister',
    description:
      'Sprechen Sie mit uns über Ihr Möbelstück: individuelle Maße, Holzart und Sonderanfertigungen. Beratung im Atelier in Dresden oder digital.',
    jsonLd: [{ '@type': 'ContactPage', url: `${SITE_URL}/beratung`, about: { '@id': `${SITE_URL}/#business` } }],
  },
  '/kontakt': {
    title: 'Kontakt – Atelier in Dresden | Architekt & Meister',
    description:
      'Kontakt zu Architekt & Meister: Buchenstraße 20, 01097 Dresden. Telefonisch unter +49 151 22807682 oder per E-Mail.',
    jsonLd: [{ '@type': 'ContactPage', url: `${SITE_URL}/kontakt`, about: { '@id': `${SITE_URL}/#business` } }],
  },
  '/impressum': {
    title: 'Impressum | Architekt & Meister',
    description: 'Impressum und Anbieterkennzeichnung von Architekt & Meister, Dresden.',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | Architekt & Meister',
    description:
      'Datenschutzerklärung von Architekt & Meister: welche Daten wir erheben, an welche Dienstleister sie übermittelt werden und welche Rechte Sie haben.',
  },
  '/agb': {
    title: 'AGB | Architekt & Meister',
    description:
      'Allgemeine Geschäftsbedingungen von Architekt & Meister: Vertragsschluss, Preise, Lieferbedingungen und Widerrufsrecht.',
  },
  '/widerruf': {
    title: 'Widerrufsbelehrung & Muster-Widerrufsformular | Architekt & Meister',
    description:
      'Widerrufsbelehrung von Architekt & Meister: 14 Tage Widerrufsrecht für Standardprodukte, inklusive Muster-Widerrufsformular.',
  },
  '/versand': {
    title: 'Versand & Retouren | Architekt & Meister',
    description:
      'Versand nach Deutschland, in die EU und in die Schweiz. Informationen zu Lieferzeiten, Rücksendung und Stornierung.',
  },
  '/checkout': {
    title: 'Checkout | Architekt & Meister',
    description: 'Bestellung abschließen bei Architekt & Meister.',
    noindex: true,
  },
  '/confirmation': {
    title: 'Bestellbestätigung | Architekt & Meister',
    description: 'Ihre Bestellung bei Architekt & Meister wurde übermittelt.',
    noindex: true,
  },
};

/** Routes that get a real prerendered HTML file and appear in the sitemap. */
export const INDEXABLE_ROUTES: string[] = [
  '/',
  '/shop',
  '/beratung',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/widerruf',
  '/versand',
  ...PRODUCTS.filter((p) => !p.comingSoon).map((p) => `/product/${p.id}`),
];

/** Additional routes to prerender but keep out of the sitemap (noindex). */
export const NOINDEX_ROUTES: string[] = ['/checkout', '/confirmation'];

export function getSeo(pathname: string): SeoData {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

  const productMatch = path.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    const product = PRODUCTS.find((p) => p.id === productMatch[1]);
    if (product) {
      const firstLocalImage = product.images.find((img) => img.startsWith('/'));
      return {
        title: `${product.name} – ${product.tagline} | Architekt & Meister`,
        description: `${product.description.split('\n')[0]} ${product.material} Handgefertigt in Dresden, Lieferzeit ca. 4–6 Wochen.`,
        canonical,
        image: firstLocalImage ? `${SITE_URL}${firstLocalImage}` : DEFAULT_IMAGE,
        noindex: product.comingSoon,
        jsonLd: productNode(product.id),
      };
    }
  }

  const entry = STATIC_SEO[path];
  if (entry) {
    return {
      title: entry.title,
      description: entry.description,
      canonical,
      image: entry.image ?? DEFAULT_IMAGE,
      noindex: entry.noindex,
      jsonLd: entry.jsonLd,
    };
  }

  return {
    title: `Seite nicht gefunden | ${SITE_NAME}`,
    description: 'Die aufgerufene Seite existiert nicht.',
    canonical,
    image: DEFAULT_IMAGE,
    noindex: true,
  };
}
