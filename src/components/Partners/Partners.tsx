import { Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { PARTNER_MARQUEE_REPEAT_COUNT } from "@/constants";
import { partners } from "@/data";
import { repeatItems } from "@/utils";
import styles from "./Partners.module.css";

const Partners = ({ t }: { t: Translations }) => {
  const repeatedPartners = repeatItems(partners, PARTNER_MARQUEE_REPEAT_COUNT);

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <Reveal>
          <h2 className={styles.heading}>{t.part_label}</h2>
        </Reveal>
      </div>
      <div className={styles.marqueeWrap}>
        <div className={styles.track}>
          <div className={styles.marquee}>
            {repeatedPartners.map((partnerName, index) => (
              <span key={index} className={styles.item}>
                {partnerName}
              </span>
            ))}
          </div>
          <div className={styles.marquee} aria-hidden>
            {repeatedPartners.map((partnerName, index) => (
              <span key={index} className={styles.item}>
                {partnerName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Partners };
