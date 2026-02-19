import type { TranslationKey } from "@/content";

export type ServiceIconType =
  | "industrial"
  | "architectural"
  | "interior"
  | "smart";

export interface ServiceCardConfig {
  numberLabel: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  iconType: ServiceIconType;
}

export const SERVICE_CARDS: ServiceCardConfig[] = [
  {
    numberLabel: "01",
    titleKey: "s1_h",
    textKey: "s1_p",
    iconType: "industrial",
  },
  {
    numberLabel: "02",
    titleKey: "s2_h",
    textKey: "s2_p",
    iconType: "architectural",
  },
  {
    numberLabel: "03",
    titleKey: "s3_h",
    textKey: "s3_p",
    iconType: "interior",
  },
  {
    numberLabel: "04",
    titleKey: "s4_h",
    textKey: "s4_p",
    iconType: "smart",
  },
];
