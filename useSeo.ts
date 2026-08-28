import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from './seo';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps <title>, meta tags, canonical and JSON-LD in sync during client-side
 * navigation. The initial values are baked into each prerendered HTML file at
 * build time (see scripts/prerender.mjs), so crawlers that do not run JS still
 * get the correct head for every route.
 */
export function useSeo() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeo(location.pathname);

    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', seo.image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    const robots = 'meta[name="robots"]';
    const existingRobots = document.head.querySelector(robots);
    if (seo.noindex) {
      setMeta(robots, 'name', 'robots', 'noindex, follow');
    } else if (existingRobots) {
      existingRobots.remove();
    }

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    if (seo.jsonLd?.length) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': seo.jsonLd,
      });
      document.head.appendChild(script);
    }
  }, [location.pathname]);
}
