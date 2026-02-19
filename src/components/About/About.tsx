import { Counter, Reveal, Separator } from "@/components/ui";
import type { Translations } from "@/content";
import { aboutMetrics } from "@/data";
import styles from "./About.module.css";

const About = ({ t }: { t: Translations }) => {
  return (
    <section className={styles.section} id="about">
      <div className="wrap">
        <Separator />
        <div className={styles.grid}>
          <div className={styles.textCol}>
            <Reveal>
              <p className="label">{t.about_label}</p>
            </Reveal>
            <Reveal variant="left" delay={1}>
              <blockquote>{t.about_quote}</blockquote>
            </Reveal>
            <Reveal delay={2}>
              <p>{t.about_text}</p>
            </Reveal>
            <Reveal delay={3}>
              <p className={styles.secondaryParagraph}>{t.about_text2}</p>
            </Reveal>
          </div>
          <div className={styles.metrics}>
            {aboutMetrics.map((metric, index) => (
              <Reveal key={metric.labelKey} delay={index}>
                <div className={styles.metric}>
                  <div className={styles.value}>
                    <Counter target={metric.target} suffix={metric.suffix} />
                  </div>
                  <div className={styles.metLabel}>{t[metric.labelKey]}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };
