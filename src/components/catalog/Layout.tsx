import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Envelope, Menu, Close } from './Icons';
import { categories, enquiryUrl } from '../../data/catalog';
import { SITE_EMAIL } from '../../constants/site';
import { Button, type ButtonProps } from '../ui/button';

export function Arrow() { return <ArrowUpRight className="icon" aria-hidden="true" />; }
export function ButtonLink({ href, children, variant = 'default', wrap = false }: { href: string; children: ReactNode; variant?: ButtonProps['variant']; wrap?: boolean }) {
  return <Button asChild variant={variant} className={wrap ? 'button-wrap' : undefined}><a href={href}>{children}</a></Button>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="text-link" href={href}>{children}<Arrow /></a>;
}
export function Header({ path, search }: { path: string; search: string }) {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(path === '/');
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const catalogActive = path.startsWith('/catalog') || path.startsWith('/products');
  const dark = path === '/' && overHero;
  useEffect(() => {
    if (path !== '/') { setOverHero(true); return; }
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const update = () => setOverHero(hero.getBoundingClientRect().bottom > 100);
    update();
    const observer = new IntersectionObserver(update, { rootMargin: '-100px 0px 0px 0px' });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => setOpen(false), [path, search]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [open]);
  useEffect(() => {
    const breakpoint = matchMedia('(max-width: 760px)');
    const close = () => setOpen(false);
    breakpoint.addEventListener('change', close);
    return () => breakpoint.removeEventListener('change', close);
  }, []);
  return <header ref={header} className={`site-header ${dark ? 'dark' : ''} ${path === '/' ? 'over-home' : ''}`}>
    <a className="header-brand" href="/" aria-label="Raystream home"><span className="brand">RAYSTREAM</span></a>
    <nav className="nav" aria-label="Main navigation">
      <a className="nav-link" href="/catalog" aria-current={catalogActive ? 'page' : undefined}>Catalog</a>
      <a className="nav-link" href="/applications" aria-current={path === '/applications' ? 'page' : undefined}>Applications</a>
      <a className="header-contact" href="/contact" aria-label="Contact" title="Contact" aria-current={path === '/contact' ? 'page' : undefined}><Envelope className="icon" aria-hidden="true" /></a>
    </nav>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}>{open ? 'Close' : 'Menu'}{open ? <Close className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}</button>
    <nav id="mobile-menu" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation" onClick={() => setOpen(false)}>
      <a href="/catalog" aria-current={catalogActive ? 'page' : undefined}>Catalog <Arrow /></a><a href="/applications" aria-current={path === '/applications' ? 'page' : undefined}>Applications <Arrow /></a><a href="/contact" aria-current={path === '/contact' ? 'page' : undefined}>Contact <Arrow /></a>
      <div className="menu-categories">{categories.map(category => <a key={category.id} href={`/catalog/${category.id}`} aria-current={path === `/catalog/${category.id}` ? 'page' : undefined}>{category.name}</a>)}</div>
      <a className="menu-email" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
    </nav>
  </header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><a className="brand" href="/">RAYSTREAM</a><nav className="footer-nav" aria-label="Footer navigation"><a href="/catalog">Catalog</a><a href="/applications">Applications</a><a href="/contact">Contact</a></nav><a className="footer-email" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Raystream. All rights reserved.</span><span>Architectural lighting. Considered from every angle.</span></div></footer>;
}
export function ProjectCTA({ model }: { model?: string }) {
  return <section className="project-cta"><div><h2>Start with an idea.<br />We'll help shape the light.</h2></div><ButtonLink href={enquiryUrl(model)} variant="secondary" wrap={Boolean(model)}>{model ? `Enquire about ${model}` : 'Discuss your project'}</ButtonLink></section>;
}
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>{items.map((item, index) => <span className="breadcrumb-item" key={`${index}-${item.label}`}><span aria-hidden="true">/</span>{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}
