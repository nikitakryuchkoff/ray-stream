import type { TranslationKey } from "@/content";

interface HeaderNavItem {
  href: string;
  key: TranslationKey;
}

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { href: "#about", key: "nav_about" },
  { href: "#svcs", key: "nav_services" },
  { href: "#geo", key: "nav_geo" },
];
