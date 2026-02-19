import { Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { advantages } from "@/data";
import styles from "./Advantages.module.css";

const Advantages = ({ t }: { t: Translations }) => {
  return (
    <section className={styles.section} id="advs">
      <div className="wrap">
        <div className={styles.header}>
          <Reveal>
            <p className="label">{t.adv_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.adv_h2}</h2>
          </Reveal>
        </div>
        <div className={styles.grid}>
          {advantages.map((advantage, index) => (
            <Reveal key={advantage.num} delay={index}>
              <div className={styles.card}>
                <div className={styles.num}>{advantage.num}</div>
                <h4>{t[advantage.titleKey]}</h4>
                <p>{t[advantage.textKey]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Advantages };
