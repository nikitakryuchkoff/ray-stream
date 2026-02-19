import type { TranslationKey } from "@/content/types";

export interface Advantage {
  num: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
}

export const advantages: Advantage[] = [
  { num: "01", titleKey: "a1_h", textKey: "a1_p" },
  { num: "02", titleKey: "a2_h", textKey: "a2_p" },
  { num: "03", titleKey: "a3_h", textKey: "a3_p" },
  { num: "04", titleKey: "a4_h", textKey: "a4_p" },
];
