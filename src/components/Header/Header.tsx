"use client";
import { useState, useEffect, useCallback } from "react";
import type { Lang, Translations } from "@/i18n/types";
import LangSwitcher from "@/components/ui/LangSwitcher";
import s from "./Header.module.css";

const NAV_ITEMS = [
  { href: "#about", key: "nav_about" },
  { href: "#svcs", key: "nav_services" },
  { href: "#geo", key: "nav_geo" },
] as const;

export default function Header({ lang, t }: { lang: Lang; t: Translations }) {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const hero = document.getElementById("hero");
      const geo = document.getElementById("geo");
      if (!hero || !geo) return;

      const hb = hero.offsetTop + hero.offsetHeight;
      const gt = geo.offsetTop - 70;
      const gb = geo.offsetTop + geo.offsetHeight;
      const sy = window.scrollY;

      setDark(sy < hb - 70 || (sy >= gt && sy < gb));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const cls = [s.header, scrolled ? s.scrolled : "", dark ? s.dark : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={cls}>
        <a href="#" className={s.logo}>
          RAYSTREAM<span className={s.logoSub}>INT&apos;L</span>
        </a>

        <nav className={s.nav}>
          {NAV_ITEMS.map(({ href, key }) => (
            <button
              key={key}
              className={s.navLink}
              onClick={() => scrollTo(href)}
            >
              {t[key]}
            </button>
          ))}
          <LangSwitcher lang={lang} />
          <button
            className={`${s.navLink} ${s.contactBtn}`}
            onClick={() => scrollTo("#ct")}
          >
            {t.nav_contact}
          </button>
        </nav>

        <button
          className={`${s.burger} ${menuOpen ? s.burgerOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <div className={`${s.mobileNav} ${menuOpen ? s.mobileNavOpen : ""}`}>
        {NAV_ITEMS.map(({ href, key }) => (
          <button
            key={key}
            className={s.mobileNavLink}
            onClick={() => scrollTo(href)}
          >
            {t[key]}
          </button>
        ))}
        <button className={s.mobileNavLink} onClick={() => scrollTo("#ct")}>
          {t.nav_contact}
        </button>
        <LangSwitcher lang={lang} />
      </div>
    </>
  );
}
