import type { Translations } from "@/i18n/types";
import { geoMetrics } from "@/data/metrics";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import WorldMap from "./WorldMap";
import s from "./Geography.module.css";

export default function Geography({ t }: { t: Translations }) {
  return (
    <section className={s.section} id="geo">
      <div className="wrap">
        <div className={s.header}>
          <Reveal>
            <p className="label label-l">{t.geo_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.geo_h2}</h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <p className={s.desc}>{t.geo_desc}</p>
        </Reveal>
        <Reveal delay={3}>
          <div className={s.mapWrap}>
            <WorldMap />
          </div>
        </Reveal>
        <div className={s.stats}>
          {geoMetrics.map((m, i) => (
            <Reveal key={m.labelKey} delay={i}>
              <div className={s.stat}>
                <div className={s.statVal}>
                  <Counter target={m.target} suffix={m.suffix} />
                </div>
                <div className={s.statLabel}>{(t as any)[m.labelKey]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
