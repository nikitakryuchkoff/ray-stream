"use client";
import { useState, useCallback } from "react";
import classNames from "classnames";
import type { Translations } from "@/content/types";
import { HEADER_NAV_ITEMS } from "@/constants/header";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useHeaderAppearance } from "@/hooks/useHeaderAppearance";
import { scrollToSection } from "@/utils/dom";
import s from "./Header.module.css";

export default function Header({ t }: { t: Translations }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { headerRef, isScrolled, isDarkTheme } = useHeaderAppearance({
    isMenuOpen,
  });

  useBodyScrollLock(isMenuOpen);

  const handleSectionNavigation = useCallback((selector: string) => {
    setIsMenuOpen(false);
    scrollToSection(selector);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const headerClassName = classNames(
    s.header,
    isScrolled && s.scrolled,
    isDarkTheme && s.dark,
  );

  const mobileOverlayClassName = classNames(
    s.mobileNav,
    isDarkTheme ? s.mobileNavDark : s.mobileNavLight,
    isMenuOpen && s.mobileNavOpen,
  );

  return (
    <>
      <header ref={headerRef} className={headerClassName}>
        <a href="#" className={s.logo}>
          RAYSTREAM<span className={s.logoSub}>INT&apos;L</span>
        </a>

        <nav className={s.nav}>
          {HEADER_NAV_ITEMS.map(({ href, key }) => (
            <button
              key={key}
              className={s.navLink}
              onClick={() => handleSectionNavigation(href)}
            >
              {t[key]}
            </button>
          ))}
          <button
            className={classNames(s.navLink, s.contactBtn)}
            onClick={() => handleSectionNavigation("#ct")}
          >
            {t.nav_contact}
          </button>
        </nav>

        <button
          className={classNames(s.burger, isMenuOpen && s.burgerOpen)}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <div className={mobileOverlayClassName}>
        {HEADER_NAV_ITEMS.map(({ href, key }) => (
          <button
            key={key}
            className={s.mobileNavLink}
            onClick={() => handleSectionNavigation(href)}
          >
            {t[key]}
          </button>
        ))}
        <button
          className={s.mobileNavLink}
          onClick={() => handleSectionNavigation("#ct")}
        >
          {t.nav_contact}
        </button>
      </div>
    </>
  );
}
