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
