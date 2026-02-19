"use client";
import type { Translations } from "@/content";
import { HEADER_NAV_ITEMS } from "@/constants";
import { scrollToSection } from "@/utils";
import styles from "./Footer.module.css";

const Footer = ({ t }: { t: Translations }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          RAYSTREAM
          <span className={styles.logoSub}>INT&apos;L</span>
        </a>
        <div className={styles.links}>
          {HEADER_NAV_ITEMS.map(({ href, key }) => (
            <button key={key} onClick={() => scrollToSection(href)}>
              {t[key]}
            </button>
          ))}
          <button onClick={() => scrollToSection("#ct")}>{t.nav_contact}</button>
        </div>
        <div className={styles.copy}>© 2026 RayStream International Limited</div>
      </div>
    </footer>
  );
};

export { Footer };
