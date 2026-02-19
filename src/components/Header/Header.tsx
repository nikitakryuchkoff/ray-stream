"use client";
import { default as classNames } from "classnames";
import { useState, useCallback } from "react";
import type { Translations } from "@/content";
import { HEADER_NAV_ITEMS } from "@/constants";
import { useBodyScrollLock, useHeaderAppearance } from "@/hooks";
import { scrollToSection } from "@/utils";
import styles from "./Header.module.css";

const Header = ({ t }: { t: Translations }) => {
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
    styles.header,
    isScrolled && styles.scrolled,
    isDarkTheme && styles.dark,
  );

  const mobileOverlayClassName = classNames(
    styles.mobileNav,
    isDarkTheme ? styles.mobileNavDark : styles.mobileNavLight,
    isMenuOpen && styles.mobileNavOpen,
  );

  return (
    <>
      <header ref={headerRef} className={headerClassName}>
        <a href="#" className={styles.logo}>
          RAYSTREAM<span className={styles.logoSub}>INT&apos;L</span>
        </a>

        <nav className={styles.nav}>
          {HEADER_NAV_ITEMS.map(({ href, key }) => (
            <button
              key={key}
              className={styles.navLink}
              onClick={() => handleSectionNavigation(href)}
            >
              {t[key]}
            </button>
          ))}
          <button
            className={classNames(styles.navLink, styles.contactBtn)}
            onClick={() => handleSectionNavigation("#ct")}
          >
            {t.nav_contact}
          </button>
        </nav>

        <button
          className={classNames(styles.burger, isMenuOpen && styles.burgerOpen)}
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
            className={styles.mobileNavLink}
            onClick={() => handleSectionNavigation(href)}
          >
            {t[key]}
          </button>
        ))}
        <button
          className={styles.mobileNavLink}
          onClick={() => handleSectionNavigation("#ct")}
        >
          {t.nav_contact}
        </button>
      </div>
    </>
  );
};

export { Header };
