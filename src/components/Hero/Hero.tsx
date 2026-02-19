'use client';
import { useEffect, useRef } from 'react';
import type { Translations } from '@/content/types';
import Reveal from '@/components/ui/Reveal';
import ClipReveal from '@/components/ui/ClipReveal';
import s from './Hero.module.css';

export default function Hero({ t }: { t: Translations }) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const p = window.scrollY / window.innerHeight;
        if (p < 1 && topRef.current) {
          topRef.current.style.opacity = String(1 - p * 0.7);
          topRef.current.style.transform = `translateY(${p * 40}px)`;
        }
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={s.hero} id="hero">
      <div className={s.glow} />
      <div className={s.rays}>
        <div className={s.ray} /><div className={s.ray} /><div className={s.ray} />
      </div>
      <div className={s.top} ref={topRef}>
        <div className={s.text}>
          <Reveal delay={0}>
            <p className="label label-l" style={{ marginBottom: 14 }}>{t.hero_label}</p>
          </Reveal>
          <h1>
            <ClipReveal>{t.hero_line1}</ClipReveal>
            <ClipReveal delay={1}>
              {t.hero_line2} <em>lighting</em>
            </ClipReveal>
          </h1>
          <Reveal delay={2}>
            <p className={s.sub}>{t.hero_sub}</p>
          </Reveal>
          <Reveal delay={3}>
            <button className={s.btn} onClick={() => scrollTo('#ct')}>
              <span>{t.hero_cta}</span>
              <span className={s.arrow}>→</span>
            </button>
          </Reveal>
        </div>
      </div>
      <div className={s.videoWrap}>
        <Reveal variant="scale" delay={4}>
          <div className={s.vc}>
            <div className={s.beams}>
              <div className={s.beam} />
              <div className={s.beam} />
              <div className={s.beam} />
            </div>
            <div className={s.vp}>
              <div className={s.playBtn}>
                <svg viewBox="0 0 16 16"><polygon points="4,2 14,8 4,14" /></svg>
              </div>
              <span className={s.videoLabel}>{t.video_label}</span>
            </div>
          </div>
        </Reveal>
      </div>
      <div className={s.scrollInd}>
        <span>Scroll</span>
        <div className={s.scrollMouse} />
      </div>
    </section>
  );
}
