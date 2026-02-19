"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Translations } from "@/content/types";
import s from "./Header.module.css";
import classNames from "classnames";

const NAV_ITEMS = [
  { href: "#about", key: "nav_about" },
  { href: "#svcs", key: "nav_services" },
  { href: "#geo", key: "nav_geo" },
] as const;

type Rgb = [number, number, number];

function parseRgb(color: string): [number, number, number, number] | null {
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;

  const parts = match[1]
    .split(",")
    .map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;

  const [r, g, b, a = 1] = parts;
  return [r, g, b, a];
}

function getEffectiveBackground(start: Element | null): Rgb | null {
  let node: Element | null = start;

  while (node) {
    const parsed = parseRgb(window.getComputedStyle(node).backgroundColor);
    if (parsed && parsed[3] > 0) {
      return [parsed[0], parsed[1], parsed[2]];
    }
    node = node.parentElement;
  }

  const bodyColor = parseRgb(
    window.getComputedStyle(document.body).backgroundColor,
  );
  if (!bodyColor) return null;
  return [bodyColor[0], bodyColor[1], bodyColor[2]];
}

function isDarkBackground([r, g, b]: Rgb): boolean {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq < 140;
}

function getSectionThemeAtY(y: number): boolean | null {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section[id], [data-header-theme]"),
  );
  if (!sections.length) return null;

  const activeSection =
    sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= y && rect.bottom > y;
    }) ??
    sections.reduce(
      (closest, section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - y);
        if (!closest || distance < closest.distance) {
          return { section, distance };
        }
        return closest;
      },
      null as { section: HTMLElement; distance: number } | null,
    )?.section;

  if (!activeSection) return null;

  const explicitTheme = activeSection.dataset.headerTheme;
  if (explicitTheme === "dark") return true;
  if (explicitTheme === "light") return false;

  const bg = getEffectiveBackground(activeSection);
  if (!bg) return null;
  return isDarkBackground(bg);
}

export default function Header({ t }: { t: Translations }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateHeaderTheme = () => {
      setScrolled(window.scrollY > 30);
      if (menuOpen) return;

      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 60;
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.round(headerBottom + 8),
      );
      const sectionIsDark = getSectionThemeAtY(sampleY);
      if (sectionIsDark === null) return;
      setDark(sectionIsDark);
    };

    const onViewportChange = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        updateHeaderTheme();
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("scroll", onViewportChange);
    onViewportChange();

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("scroll", onViewportChange);
    };
  }, [menuOpen]);

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

  const cls = classNames(s.header, scrolled && s.scrolled, dark && s.dark);

  return (
    <>
      <header ref={headerRef} className={cls}>
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
          <button
            className={classNames(s.navLink, s.contactBtn)}
            onClick={() => scrollTo("#ct")}
          >
            {t.nav_contact}
          </button>
        </nav>

        <button
          className={classNames(s.burger, menuOpen && s.burgerOpen)}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <div
        className={classNames(
          s.mobileNav,
          dark ? s.mobileNavDark : s.mobileNavLight,
          menuOpen && s.mobileNavOpen,
        )}
      >
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
      </div>
    </>
  );
}
