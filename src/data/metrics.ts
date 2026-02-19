import type { TranslationKey } from "@/content";

export interface Metric {
  target: number;
  suffix: string;
  labelKey: TranslationKey;
}

export const aboutMetrics: Metric[] = [
  { target: 20, suffix: "+", labelKey: "m_years" },
  { target: 100, suffix: "+", labelKey: "m_projects" },
  { target: 50, suffix: "+", labelKey: "m_factories" },
  { target: 5, suffix: "", labelKey: "m_regions" },
];

export const geoMetrics: Metric[] = [
  { target: 20, suffix: "+", labelKey: "gs_years" },
  { target: 50, suffix: "+", labelKey: "gs_factories" },
  { target: 5, suffix: "", labelKey: "gs_regions" },
];
