import { useEffect } from 'react';
import { Header, Footer } from './components/catalog/Layout';
import { HomePage, ApplicationsPage, NotFoundPage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { ContactPage } from './pages/ContactPage';
import { useBrowserRoute } from './hooks/useBrowserRoute';
import { getCategory, getProduct } from './data/catalog';
import { updatePageMetadata } from './utils/pageMetadata';
import { sanitizeModelSelection } from './utils/modelSelection';

export default function App() {
  const location = useBrowserRoute();
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  const category = parts[0] === 'catalog' && parts.length === 2 ? getCategory(parts[1]) : undefined;
  const product = parts[0] === 'products' && parts.length === 2 ? getProduct(parts[1]) : undefined;
  const collection = path === '/catalog/new' ? 'new' : undefined;
  const model = sanitizeModelSelection(new URLSearchParams(location.search).get('model'));
  let page;
  let found = true;
  if (path === '/') page = <HomePage />;
  else if (path === '/catalog' || category || collection) page = <CatalogPage key={path} category={category} collection={collection} />;
  else if (product) page = <ProductPage key={product.id} product={product} />;
  else if (path === '/contact') page = <ContactPage key={model || 'general'} model={model} />;
  else if (path === '/applications') page = <ApplicationsPage />;
  else { found = false; page = <NotFoundPage />; }

  useEffect(() => updatePageMetadata(path, { category, product, found }), [path, category, product, found]);

  return <><a className="skip" href="#main">Skip to content</a><Header path={path} search={location.search} /><main id="main" tabIndex={-1}>{page}</main><Footer /></>;
}
