import { Counter, Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { geoMetrics } from "@/data";
import { useGeographyDescription } from "@/hooks";
import { WorldMap } from "./WorldMap";
import styles from "./Geography.module.css";

const Geography = ({ t }: { t: Translations }) => {
  const { leadText, tailText } = useGeographyDescription(t.geo_desc);

  return (
    <section className={styles.section} id="geo" data-header-theme="dark">
      <div className="wrap">
        <div className={styles.header}>
          <Reveal>
            <p className="label label-l">{t.geo_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.geo_h2}</h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <p className={styles.desc}>
            <span className={styles.descLead}>{leadText}</span>
            {tailText ? <> {tailText}</> : null}
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className={styles.mapWrap}>
            <WorldMap />
          </div>
        </Reveal>
        <div className={styles.stats}>
          {geoMetrics.map((metric, index) => (
            <Reveal key={metric.labelKey} delay={index}>
              <div className={styles.stat}>
                <div className={styles.statVal}>
                  <Counter target={metric.target} suffix={metric.suffix} />
                </div>
                <div className={styles.statLabel}>{t[metric.labelKey]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Geography };
