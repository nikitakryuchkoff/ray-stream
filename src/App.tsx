import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, CaretDown, X, List } from '@phosphor-icons/react';
import { HeroSlider } from './components/HeroSlider';
import { useContactForm } from './hooks/useContactForm';
import { ORGANIZATION_JSON_LD } from './constants/site';

const solutions = [
  { id: 'flex', title: 'Flex Solution', label: 'Light without limits.', description: 'Continuous lines of light that follow the architecture. Explore flexible lighting for coves, contours and integrated details.', categories: ['LED strips', 'Flexible neon', 'Profiles & accessories', 'Drivers & controls'] },
  { id: 'indoor', title: 'Indoor Solution', label: 'Designed for the way we live.', description: 'Precise, comfortable light for interiors. Find the right approach for hospitality, workspaces, retail and residential spaces.', categories: ['Track lighting', 'Downlights', 'Pendant lighting', 'Linear lighting'] },
  { id: 'outdoor', title: 'Outdoor Solution', label: 'Architecture after dark.', description: 'Bring facades, pathways and landscapes into focus with lighting selected for the outdoor environment.', categories: ['Facade lighting', 'Wall washers', 'Landscape lighting', 'In-ground lighting'] },
];

export default function App() {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<typeof solutions[number] | null>(null);
  const [category, setCategory] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  const form = useContactForm();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(null); setMobile(false); } };
    const onPointer = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) setMenu(null); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onPointer);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile || selected ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobile, selected]);
  const openSolution = (s: typeof solutions[number], c = s.categories[0]) => { setSelected(s); setCategory(c); setMenu(null); setMobile(false); };
  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  useEffect(() => {
    const breakpoint = window.matchMedia('(max-width: 960px)');
    const resetNavigation = () => { setMobile(false); setMenu(null); };
    breakpoint.addEventListener('change', resetNavigation);
    return () => breakpoint.removeEventListener('change', resetNavigation);
  }, []);
  useEffect(() => {
    const elements = document.querySelectorAll('.solutions > h2, .solution-card, .support, .contact-intro, .contact form');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    elements.forEach(element => { element.classList.add('reveal-motion'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  const close = () => { dialog.current?.close(); setSelected(null); };
  const request = () => { if (selected) form.updateField('message', `I am interested in ${selected.title}: ${category}. Please help me select equipment for my project.`); close(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); document.getElementById('name')?.focus({ preventScroll: true }); };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
    <a className="skip" href="#main">Skip to content</a>
    <header ref={header} className={`site-header ${scrolled || menu || mobile ? 'solid' : ''}`} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMenu(null); }}>
      <a className="brand" href="#home" onClick={() => { setMenu(null); setMobile(false); }}>RAYSTREAM</a>
      <nav aria-label="Main navigation" className={mobile ? 'nav mobile-open' : 'nav'}>
        {solutions.map(s => <div className="nav-group" key={s.id}>
          <button className="nav-link" aria-expanded={menu === s.id} aria-controls={`menu-${s.id}`} onClick={() => setMenu(menu === s.id ? null : s.id)}>{s.title}<CaretDown size={13} /></button>
          {menu === s.id && <div className="mega-menu" id={`menu-${s.id}`}>
            <div><span className="eyebrow">Explore our solutions</span><h2>{s.title}</h2><p>{s.description}</p><button className="text-link" onClick={() => openSolution(s)}>Explore direction <ArrowRight /></button></div>
            <div className="category-links">{s.categories.map(c => <button key={c} onClick={() => openSolution(s, c)}>{c}<ArrowRight size={22} /></button>)}</div>
            <img src={`/images/${s.id}.png`} alt={s.title + ' equipment'} />
          </div>}
        </div>)}
        <a className="nav-link" href="#contact" onClick={() => { setMobile(false); setMenu(null); }}>Contact</a>
      </nav>
      <button className="mobile-toggle" aria-label={mobile ? 'Close menu' : 'Open menu'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>{mobile ? <X size={25} /> : <List size={25} />}</button>
    </header>
    <main id="main">
      <HeroSlider suspended={!!menu || mobile || !!selected} onExplore={id => { const solution = solutions.find(s => s.id === id); if (solution) openSolution(solution); }} />
      <section id="solutions" className="solutions">
        <h2>One vision.<br />Three solutions.</h2>
        <div className="solution-grid">{solutions.map(s => <button key={s.id} className="solution-card" onClick={() => openSolution(s)}><div className="image-frame"><img loading="lazy" src={`/images/${s.id}.png`} alt={s.title === 'Flex Solution' ? 'Warm flexible neon lighting' : s.title === 'Indoor Solution' ? 'Black precision track spotlight' : 'Exterior linear wall washer'} /></div><h3>{s.title}</h3><ArrowRight size={30} weight="light" /></button>)}</div>
      </section>
      <section className="support"><span className="eyebrow">From idea to specification</span><div><h2>The right light.<br />For your vision.</h2><p>We help you select equipment, coordinate specifications and bring your lighting concept to life. From flexible lines to interior and exterior luminaires, every selection starts with your space.</p></div></section>
      <section className="contact" id="contact"><div className="contact-intro"><span className="eyebrow">Let’s work together</span><h2>Let’s find<br />your light.</h2><p>Tell us about your space.<br />We’ll help you find the right solution.</p></div>
        <form onSubmit={form.submitForm} noValidate><div className="form-row">{(['name', 'email'] as const).map(f => <label key={f} htmlFor={f}>{f === 'name' ? 'Your name' : 'Email address'}<input id={f} name={f} autoComplete={f} type={f === 'email' ? 'email' : 'text'} value={form.formValues[f]} onChange={e => form.updateField(f, e.target.value)} onBlur={() => form.touchField(f)} aria-invalid={!!form.fieldErrors[f]} aria-describedby={form.fieldErrors[f] ? `${f}-error` : undefined} />{form.fieldErrors[f] && <small id={`${f}-error`} className="error">{form.fieldErrors[f]}</small>}</label>)}</div>
        <label htmlFor="message">Your project<textarea id="message" maxLength={400} rows={4} placeholder="A space, an idea, a lighting requirement…" value={form.formValues.message} onChange={e => form.updateField('message', e.target.value)} onBlur={() => form.touchField('message')} aria-invalid={!!form.fieldErrors.message} aria-describedby={form.fieldErrors.message ? 'message-error' : undefined} /></label>{form.fieldErrors.message && <small id="message-error" className="error">{form.fieldErrors.message}</small>}
        <div className="form-bottom"><button className="pill dark" disabled={form.isSubmitting}>{form.isSubmitting ? 'Sending…' : 'Send enquiry'}<ArrowRight size={22} /></button><span>{form.formValues.message.length}/400</span></div>
        {form.status === 'success' && <p role="status">Thank you. Your enquiry has been sent.</p>}{form.status === 'error' && <p className="error" role="alert">Your enquiry could not be sent. Please try again.</p>}
        </form>
      </section>
    </main>
    <footer><div className="footer-top"><a className="brand" href="#home">RAYSTREAM</a><nav aria-label="Footer navigation">{solutions.map(s => <button key={s.id} onClick={() => openSolution(s)}>{s.title}</button>)}<a href="#contact">Contact</a></nav><a href="#home" aria-label="Back to top"><ArrowUp size={26} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RayStream International Limited</span><span>Architectural lighting. Considered.</span></div></footer>
    <dialog ref={dialog} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="solution-title">
      {selected && <div className="detail"><button className="close" onClick={close} aria-label="Close solution"><X size={25} /></button><img src={`/images/${selected.id}.png`} alt={selected.title} /><div className="detail-copy"><span className="eyebrow">Explore equipment</span><h2 id="solution-title">{selected.title}</h2><p>{selected.description}</p><label htmlFor="category">Equipment category</label><select id="category" value={category} onChange={e => setCategory(e.target.value)}>{selected.categories.map(c => <option key={c}>{c}</option>)}</select><h3>{category}</h3><p>Share your application and project requirements. Our team will help select suitable equipment and confirm specifications and availability.</p><button className="pill dark" onClick={request}>Request a selection <ArrowRight size={22} /></button></div></div>}
    </dialog>
  </>;
}

