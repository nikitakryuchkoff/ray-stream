import type { Translations } from '@/i18n/types';
import { advantages } from '@/data/advantages';
import Reveal from '@/components/ui/Reveal';
import s from './Advantages.module.css';

export default function Advantages({ t }: { t: Translations }) {
  return (
    <section className={s.section} id="advs">
      <div className="wrap">
        <div className={s.header}>
          <Reveal><p className="label">{t.adv_label}</p></Reveal>
          <Reveal delay={1}><h2>{t.adv_h2}</h2></Reveal>
        </div>
        <div className={s.grid}>
          {advantages.map((a, i) => (
            <Reveal key={a.num} delay={i}>
              <div className={s.card}>
                <div className={s.num}>{a.num}</div>
                <h4>{(t as any)[a.titleKey]}</h4>
                <p>{(t as any)[a.textKey]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
