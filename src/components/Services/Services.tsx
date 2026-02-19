import type { Translations } from '@/i18n/types';
import Reveal from '@/components/ui/Reveal';
import { IndustrialIcon, ArchitecturalIcon, InteriorIcon, SmartIcon } from './ServiceIcon';
import s from './Services.module.css';

const CARDS = [
  { num: '01', titleKey: 's1_h', textKey: 's1_p', Icon: IndustrialIcon },
  { num: '02', titleKey: 's2_h', textKey: 's2_p', Icon: ArchitecturalIcon },
  { num: '03', titleKey: 's3_h', textKey: 's3_p', Icon: InteriorIcon },
  { num: '04', titleKey: 's4_h', textKey: 's4_p', Icon: SmartIcon },
] as const;

export default function Services({ t }: { t: Translations }) {
  return (
    <section className={s.section} id="svcs">
      <div className="wrap">
        <div className={s.header}>
          <Reveal><p className="label">{t.serv_label}</p></Reveal>
          <Reveal delay={1}><h2>{t.serv_h2}</h2></Reveal>
        </div>
        <div className={s.grid}>
          {CARDS.map((c, i) => (
            <Reveal key={c.num} delay={i}>
              <div className={s.card}>
                <div className={s.num}>{c.num}</div>
                <div className={s.icon}><c.Icon /></div>
                <h3>{(t as any)[c.titleKey]}</h3>
                <p>{(t as any)[c.textKey]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
