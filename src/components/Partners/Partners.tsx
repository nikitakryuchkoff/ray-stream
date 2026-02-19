import type { Translations } from '@/i18n/types';
import { partners } from '@/data/partners';
import Reveal from '@/components/ui/Reveal';
import s from './Partners.module.css';

export default function Partners({ t }: { t: Translations }) {
  const items = [...partners, ...partners, ...partners, ...partners];
  return (
    <section className={s.section}>
      <div className={s.label}><Reveal><h2 className={s.heading}>{t.part_label}</h2></Reveal></div>
      <div className={s.marqueeWrap}>
        <div className={s.track}>
          <div className={s.marquee}>
            {items.map((p, i) => <span key={i} className={s.item}>{p}</span>)}
          </div>
          <div className={s.marquee} aria-hidden>
            {items.map((p, i) => <span key={i} className={s.item}>{p}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
