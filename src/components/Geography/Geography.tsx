import { Counter, Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { geoMetrics } from "@/data";
import { useGeographyDescription } from "@/hooks";
import { WorldMap } from "./WorldMap";
import s from "./Geography.module.css";

const Geography = ({ t }: { t: Translations }) => {
  const { leadText, tailText } = useGeographyDescription(t.geo_desc);

  return (
    <section className={s.section} id="geo" data-header-theme="dark">
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
          <p className={s.desc}>
            <span className={s.descLead}>{leadText}</span>
            {tailText ? <> {tailText}</> : null}
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className={s.mapWrap}>
            <WorldMap />
          </div>
        </Reveal>
        <div className={s.stats}>
          {geoMetrics.map((metric, index) => (
            <Reveal key={metric.labelKey} delay={index}>
              <div className={s.stat}>
                <div className={s.statVal}>
                  <Counter target={metric.target} suffix={metric.suffix} />
                </div>
                <div className={s.statLabel}>{t[metric.labelKey]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Geography };
