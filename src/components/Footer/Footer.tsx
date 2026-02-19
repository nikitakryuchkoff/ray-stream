"use client";
import type { Translations } from "@/i18n/types";
import s from "./Footer.module.css";

export default function Footer({ t }: { t: Translations }) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <a
          href="#"
          style={{
            fontWeight: 500,
            fontSize: "0.82rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          RAYSTREAM
          <span style={{ fontWeight: 300, opacity: 0.35, marginLeft: 3 }}>
            INT&apos;L
          </span>
        </a>
        <div className={s.links}>
          <button onClick={() => scrollTo("#about")}>{t.nav_about}</button>
          <button onClick={() => scrollTo("#svcs")}>{t.nav_services}</button>
          <button onClick={() => scrollTo("#geo")}>{t.nav_geo}</button>
          <button onClick={() => scrollTo("#ct")}>{t.nav_contact}</button>
        </div>
        <div className={s.copy}>© 2026 RayStream International Limited</div>
      </div>
    </footer>
  );
}
