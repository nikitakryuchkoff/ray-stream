import type { ComponentType } from "react";
import type { Translations } from "@/content/types";
import { SERVICE_CARDS, type ServiceIconType } from "@/constants/services";
import Reveal from "@/components/ui/Reveal";
import {
  ArchitecturalIcon,
  IndustrialIcon,
  InteriorIcon,
  SmartIcon,
} from "./ServiceIcon";
import s from "./Services.module.css";

const serviceIconsByType: Record<ServiceIconType, ComponentType> = {
  industrial: IndustrialIcon,
  architectural: ArchitecturalIcon,
  interior: InteriorIcon,
  smart: SmartIcon,
};

export default function Services({ t }: { t: Translations }) {
  return (
    <section className={s.section} id="svcs">
      <div className="wrap">
        <div className={s.header}>
          <Reveal>
            <p className="label">{t.serv_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.serv_h2}</h2>
          </Reveal>
        </div>
        <div className={s.grid}>
          {SERVICE_CARDS.map((serviceCard, index) => {
            const ServiceIcon = serviceIconsByType[serviceCard.iconType];
            return (
              <Reveal key={serviceCard.numberLabel} delay={index}>
                <div className={s.card}>
                  <div className={s.num}>{serviceCard.numberLabel}</div>
                  <div className={s.icon}>
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
}
