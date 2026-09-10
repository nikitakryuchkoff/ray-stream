import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from '@phosphor-icons/react';

const slides = [
  { solution: 'indoor', name: 'Indoor Solution', image: 'hero', lines: ['Light shapes', 'everything.'], subtitle: 'Architectural lighting by RayStream', alt: 'Warm architectural lighting in a contemporary stone lobby' },
  { solution: 'flex', name: 'Flex Solution', image: 'flex', lines: ['Freedom', 'in every line.'], subtitle: 'Flexible light. Endless possibilities.', alt: 'A glowing flexible neon line on a charcoal surface' },
  { solution: 'outdoor', name: 'Outdoor Solution', image: 'outdoor', lines: ['Make the night', 'extraordinary.'], subtitle: 'Bring architecture and landscapes to life.', alt: 'Warm exterior lighting revealing the texture of a stone wall' },
];
const DURATION = 7000;

export function HeroSlider({ onExplore, suspended }: { onExplore: (id: string) => void; suspended: boolean }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [progress, setProgress] = useState(0);
  const elapsed = useRef(0);
  const root = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const running = playing && !hovered && visible && !reduced && !suspended;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    const visibility = () => setVisible(!document.hidden && !!root.current && root.current.getBoundingClientRect().bottom > innerHeight * .25);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', change); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { elapsed.current = 0; setProgress(0); }, [active]);
  useEffect(() => {
    if (!running) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now(); elapsed.current += now - previous; previous = now;
      if (elapsed.current >= DURATION) { elapsed.current = 0; setActive(value => (value + 1) % slides.length); }
      setProgress(Math.min(1, elapsed.current / DURATION));
    }, 80);
    return () => window.clearInterval(timer);
  }, [running]);
  const select = (index: number) => { setActive((index + slides.length) % slides.length); elapsed.current = 0; setProgress(0); };
  const slide = slides[active];
  return <section ref={root} className={`hero hero-slider ${running ? 'is-playing' : ''}`} id="home" aria-roledescription="carousel" aria-label="Architectural lighting solutions"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPlaying(false)}
    onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); setPlaying(false); select(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}
    onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
    onTouchEnd={event => { if (!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) { setPlaying(false); select(active + (dx < 0 ? 1 : -1)); } touch.current = null; }}>
    <div className="slide-images" aria-hidden="true">{slides.map((s, i) => <img key={s.image} className={`slide-image slide-${s.solution} ${active === i ? 'active' : ''}`} src={`/images/${s.image}.png`} alt="" />)}</div>
    <div className="hero-content" key={slide.solution} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slides.length}: ${slide.name}`}>
      <span className="slide-eyebrow">RayStream / {slide.name}</span>
      <h1>{slide.lines.map(line => <span className="headline-line" key={line}><span>{line}</span></span>)}</h1>
      <p>{slide.subtitle}</p>
      <button className="pill light" onClick={() => onExplore(slide.solution)}>Explore {slide.solution === 'indoor' ? 'indoor' : slide.solution} <ArrowRight size={22} weight="light" /></button>
    </div>
    <div className="slider-bottom">
      <div className="slider-pagination">
        <span className="slide-count" aria-hidden="true"><span key={active} className="current-count">0{active + 1}</span><span className="count-divider">/</span><span className="total-count">03</span></span>
        <div className="slide-selectors" aria-label="Choose a slide">{slides.map((s, i) => <button key={s.solution} className={`slide-selector ${active === i ? 'active' : ''}`} aria-label={`Show ${s.name}`} aria-current={active === i ? 'true' : undefined} onClick={() => select(i)}><span className="slide-track"><span style={{ transform: `scaleX(${active === i ? (playing && !reduced ? progress : 1) : 0})` }} /></span><span className="selector-tooltip">{s.name}</span></button>)}</div>
        {!reduced && <button className="slider-playback" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}</button>}
      </div>
      <div className="slider-actions"><button aria-label="Previous slide" onClick={() => select(active - 1)}><ArrowLeft size={24} weight="light" /></button><button aria-label="Next slide" onClick={() => select(active + 1)}><ArrowRight size={24} weight="light" /></button></div>
    </div>
    <span className="sr-only" aria-live={playing ? 'off' : 'polite'}>{slide.name}: {slide.lines.join(' ')}</span>
  </section>;
}
