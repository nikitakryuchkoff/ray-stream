import { SITE_URL } from '../constants/site';
import type { Category, Product } from '../data/catalog';

export function updatePageMetadata(path: string, { category, product, found }: { category?: Category; product?: Product; found: boolean }) {
  let title = 'Raystream — Light, shaped around architecture.';
  let description = 'Architectural lighting, flexible linear systems, wall grazers and controls. Explore equipment and discuss your project with Raystream.';
  let image = '/catalog/architecture-0.webp';
  if (path === '/catalog') { title = 'Lighting catalogue | Raystream'; description = 'Explore silicone and PVC linear flex, flexible video lighting, wall grazers, connections, mounting and control systems.'; image = '/catalog/sf24-0.webp'; }
  if (path === '/catalog/new') { title = 'New products | Raystream'; description = 'Discover new flexible lighting and wall grazing equipment for your project.'; image = '/catalog/sfp16-0.webp'; }
  if (path === '/contact') { title = 'Contact & project enquiry | Raystream'; description = 'Discuss your selected lighting equipment with Raystream. Send your project enquiry to info@raystream.hk.'; }
  if (path === '/applications') { title = 'Lighting applications | Raystream'; description = 'Explore linear and wall grazing light for facades, interiors, landscapes and integrated details.'; }
  if (category) { title = `${category.name} | Raystream`; description = category.description; image = category.image; }
  if (product) { title = `${product.name.startsWith(product.model) ? product.name : `${product.model} — ${product.name}`} | Raystream`; description = product.summary; image = product.images[0]; }
  if (!found) { title = 'Page not found | Raystream'; description = 'Explore the Raystream lighting catalog or contact the team about your project.'; }
  const canonical = new URL(path, SITE_URL).href;
  document.title = title;
  const setMeta = (attribute: 'name' | 'property', name: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
    element.content = content;
  };
  setMeta('name', 'description', description);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'robots', found ? 'index, follow' : 'noindex, follow');
  [['site_name', 'Raystream'], ['type', product ? 'product' : 'website'], ['title', title], ['description', description], ['url', canonical], ['image', new URL(image, SITE_URL).href]].forEach(([name, content]) => setMeta('property', `og:${name}`, content));
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.append(link); }
  link.href = canonical;
  let schema = document.getElementById('page-schema') as HTMLScriptElement | null;
  if (!schema) { schema = document.createElement('script'); schema.type = 'application/ld+json'; schema.id = 'page-schema'; document.head.append(schema); }
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, description, isPartOf: { '@type': 'WebSite', name: 'Raystream', url: SITE_URL }, ...(product ? { mainEntity: { '@type': 'Product', name: product.name, model: product.model, description, image: new URL(image, SITE_URL).href, url: canonical } } : {}) });
}
