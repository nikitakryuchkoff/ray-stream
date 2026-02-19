"use client";

import { useEffect, useRef, useState } from "react";
import { getSectionThemeAtY } from "@/utils";

interface UseHeaderAppearanceOptions {
  isMenuOpen: boolean;
  scrollThreshold?: number;
  sampleOffset?: number;
}

export const useHeaderAppearance = ({
  isMenuOpen,
  scrollThreshold = 30,
  sampleOffset = 8,
}: UseHeaderAppearanceOptions) => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    let frameId: number | null = null;

    const updateHeaderAppearance = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
      if (isMenuOpen) return;

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 60;
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.round(headerBottom + sampleOffset),
      );

      const sectionIsDark = getSectionThemeAtY(sampleY);
      if (sectionIsDark !== null) {
        setIsDarkTheme(sectionIsDark);
      }
    };

    const onViewportChange = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        updateHeaderAppearance();
        frameId = null;
      });
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("scroll", onViewportChange);
    onViewportChange();

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("scroll", onViewportChange);
    };
  }, [isMenuOpen, scrollThreshold, sampleOffset]);

  return { headerRef, isScrolled, isDarkTheme };
};
