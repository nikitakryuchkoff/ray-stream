import type { ComponentType } from "react";
import { Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { SERVICE_CARDS } from "@/constants";
import type { ServiceIconType } from "@/types";
import {
  ArchitecturalIcon,
  IndustrialIcon,
  InteriorIcon,
  SmartIcon,
} from "./ServiceIcon";
import styles from "./Services.module.css";

const serviceIconsByType: Record<ServiceIconType, ComponentType> = {
  industrial: IndustrialIcon,
  architectural: ArchitecturalIcon,
  interior: InteriorIcon,
  smart: SmartIcon,
};

const Services = ({ t }: { t: Translations }) => {
  return (
    <section className={styles.section} id="svcs">
      <div className="wrap">
        <div className={styles.header}>
          <Reveal>
            <p className="label">{t.serv_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.serv_h2}</h2>
          </Reveal>
        </div>
        <div className={styles.grid}>
          {SERVICE_CARDS.map((serviceCard, index) => {
            const ServiceIcon = serviceIconsByType[serviceCard.iconType];
            return (
              <Reveal key={serviceCard.numberLabel} delay={index}>
                <div className={styles.card}>
                  <div className={styles.num}>{serviceCard.numberLabel}</div>
                  <div className={styles.icon}>
                    <ServiceIcon />
                  </div>
                  <h3>{t[serviceCard.titleKey]}</h3>
                  <p>{t[serviceCard.textKey]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Services };
