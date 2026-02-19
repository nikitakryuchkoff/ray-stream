import type { Translations } from '@/content/types';
import { aboutMetrics } from '@/data/metrics';
import Reveal from '@/components/ui/Reveal';
import Separator from '@/components/ui/Separator';
import Counter from '@/components/ui/Counter';
import s from './About.module.css';

export default function About({ t }: { t: Translations }) {
  return (
    <section className={s.section} id="about">
      <div className="wrap">
        <Separator className="" />
        <div className={s.grid} style={{ marginTop: 'clamp(36px,5vh,56px)' }}>
          <div className={s.textCol}>
            <Reveal><p className="label">{t.about_label}</p></Reveal>
            <Reveal variant="left" delay={1}><blockquote>{t.about_quote}</blockquote></Reveal>
            <Reveal delay={2}><p>{t.about_text}</p></Reveal>
            <Reveal delay={3}><p style={{ marginTop: 12 }}>{t.about_text2}</p></Reveal>
          </div>
          <div className={s.metrics}>
            {aboutMetrics.map((m, i) => (
              <Reveal key={m.labelKey} delay={i}>
                <div className={s.metric}>
                  <div className={s.value}>
                    <Counter target={m.target} suffix={m.suffix} />
                  </div>
                  <div className={s.metLabel}>{(t as any)[m.labelKey]}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
