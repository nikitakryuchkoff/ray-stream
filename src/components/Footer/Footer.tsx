"use client";
import type { Translations } from "@/content/types";
import { HEADER_NAV_ITEMS } from "@/constants/header";
import { scrollToSection } from "@/utils/dom";
import s from "./Footer.module.css";

export default function Footer({ t }: { t: Translations }) {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <a href="#" className={s.logo}>
          RAYSTREAM
          <span className={s.logoSub}>INT&apos;L</span>
        </a>
        <div className={s.links}>
          {HEADER_NAV_ITEMS.map(({ href, key }) => (
            <button key={key} onClick={() => scrollToSection(href)}>
              {t[key]}
            </button>
          ))}
          <button onClick={() => scrollToSection("#ct")}>{t.nav_contact}</button>
        </div>
        <div className={s.copy}>© 2026 RayStream International Limited</div>
      </div>
    </footer>
  );
}
