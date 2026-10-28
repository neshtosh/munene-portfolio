import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, pageForPath } from '../data/seo';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

const DocumentHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageForPath(pathname);
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const url = `${SITE_URL}${path}`;

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.notFound ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', page.image);
    setMeta('name', 'twitter:card', page.largeImage ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', page.image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [pathname]);

  return null;
};

export default DocumentHead;
