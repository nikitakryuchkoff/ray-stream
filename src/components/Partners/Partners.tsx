import type { Translations } from "@/content/types";
import { PARTNER_MARQUEE_REPEAT_COUNT } from "@/constants/partners";
import { partners } from "@/data/partners";
import Reveal from "@/components/ui/Reveal";
import { repeatItems } from "@/utils/array";
import s from "./Partners.module.css";

export default function Partners({ t }: { t: Translations }) {
  const repeatedPartners = repeatItems(partners, PARTNER_MARQUEE_REPEAT_COUNT);

  return (
    <section className={s.section}>
      <div className={s.label}>
        <Reveal>
          <h2 className={s.heading}>{t.part_label}</h2>
        </Reveal>
      </div>
      <div className={s.marqueeWrap}>
        <div className={s.track}>
          <div className={s.marquee}>
            {repeatedPartners.map((partnerName, index) => (
              <span key={index} className={s.item}>
                {partnerName}
              </span>
            ))}
          </div>
          <div className={s.marquee} aria-hidden>
            {repeatedPartners.map((partnerName, index) => (
              <span key={index} className={s.item}>
                {partnerName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
