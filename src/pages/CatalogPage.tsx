import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search, Close } from '../components/catalog/Icons';
import { categories, newProducts, products, type Category } from '../data/catalog';
import { Breadcrumb, ProjectCTA, TextLink } from '../components/catalog/Layout';
import { ProductCard } from '../components/catalog/ProductCard';
import { Button } from '../components/ui/button';
import { useCatalogReveal } from '../hooks/useCatalogReveal';

export function CatalogPage({ category, collection }: { category?: Category; collection?: 'new' }) {
  const [query, setQuery] = useState<string>(() => history.state?.catalog?.query || '');
  const [filterOpen, setFilterOpen] = useState(false);
  const [limit, setLimit] = useState<number>(() => history.state?.catalog?.limit || 36);
  const input = useRef<HTMLInputElement>(null);
  const collectionNav = useRef<HTMLElement>(null);
  useEffect(() => {
    history.replaceState({ ...history.state, catalog: { query, limit } }, '');
  }, [query, limit]);
  const source = useMemo(() => category ? products.filter(product => product.category === category.id) : collection === 'new' ? newProducts.flatMap(id => products.filter(product => product.id === id)) : products, [category, collection]);
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return source.filter(product => `${product.model} ${product.name} ${product.summary}`.toLowerCase().includes(text));
  }, [source, query]);
  const title = category?.name || (collection === 'new' ? 'New in the catalog.' : 'Light for every direction.');
  const description = category?.description || 'Explore lighting families, then find the connectors, mounting and controls to complete your system.';
  const clearSearch = () => { setQuery(''); setLimit(36); input.current?.focus(); };
  const currentCollection = category ? `/catalog/${category.id}` : collection ? '/catalog/new' : '/catalog';
  const resultsGrid = useCatalogReveal(`${currentCollection}:${query.trim().toLowerCase()}`);
  useEffect(() => {
    const nav = collectionNav.current;
    const selected = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && selected) {
      const left = selected.offsetLeft - nav.offsetLeft - (nav.clientWidth - selected.offsetWidth) / 2;
      nav.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
    }
  }, [currentCollection]);
  const collectionLinks = [
    { href: '/catalog', label: 'All equipment' },
    { href: '/catalog/new', label: 'New products' },
    { href: '/catalog/silicone', label: 'Flexible lighting' },
    { href: '/catalog/wall-grazer', label: 'Wall grazers' },
    { href: '/catalog/control', label: 'System components' },
  ];
  return <>
    <Breadcrumb items={category ? [{ label: 'Catalog', href: '/catalog' }, { label: category.name }] : collection ? [{ label: 'Catalog', href: '/catalog' }, { label: 'New products' }] : [{ label: 'Catalog' }]} />
    <section className="page-heading"><div><h1>{title}</h1></div><p>{description}</p></section>
    <nav ref={collectionNav} className="catalog-nav" aria-label="Catalog collections">{collectionLinks.map(link => <a key={link.href} className={currentCollection === link.href ? 'active' : ''} aria-current={currentCollection === link.href ? 'page' : undefined} href={link.href}>{link.label}</a>)}</nav>
    <div className="catalog-layout"><aside className={`catalog-aside ${filterOpen ? 'open' : ''}`} id="category-filter"><span className="eyebrow">EQUIPMENT</span><a className={`aside-link ${!category && !collection ? 'active' : ''}`} href="/catalog">All categories<span>{products.length}</span></a>{categories.map(item => <a key={item.id} className={`aside-link ${category?.id === item.id ? 'active' : ''}`} href={`/catalog/${item.id}`} aria-current={category?.id === item.id ? 'page' : undefined}>{item.name}<span>{item.count}</span></a>)}<div className="aside-note"><span className="eyebrow">NEED A HAND?</span><p>Tell us about your application and we'll help you find a starting point.</p><TextLink href="/contact">Contact Raystream</TextLink></div></aside>
    <section className="catalog-results" aria-label="Product results"><div className="catalog-toolbar"><span aria-live="polite">{filtered.length} product {filtered.length === 1 ? 'family' : 'families'}</span><button className="mobile-filter" aria-expanded={filterOpen} aria-controls="category-filter" onClick={() => setFilterOpen(value => !value)}>Categories <ChevronDown className={`icon ${filterOpen ? 'rotated' : ''}`} aria-hidden="true" /></button><label className="search"><Search className="icon search-icon" aria-hidden="true" /><input ref={input} type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(36); }} placeholder="Search a model or keyword" aria-label="Search products" />{query && <button type="button" onClick={clearSearch} aria-label="Clear search"><Close className="icon" aria-hidden="true" /></button>}</label></div>
    {filtered.length ? <><div ref={resultsGrid} className="product-grid">{filtered.slice(0, limit).map(product => <div className="catalog-item" key={product.id}><ProductCard product={product} /></div>)}</div>{filtered.length > limit && <div className="more-results"><p>Showing {Math.min(limit, filtered.length)} of {filtered.length} families</p><Button variant="outline" type="button" onClick={() => setLimit(value => value + 36)}>Show more equipment<ChevronDown className="icon" aria-hidden="true" /></Button></div>}</> : <div className="no-results"><h2>No matching equipment.</h2><p>Try another model name, or explore another category.</p><Button variant="outline" type="button" onClick={clearSearch}>Clear search<Close className="icon" aria-hidden="true" /></Button></div>}
    </section></div><ProjectCTA />
  </>;
}
