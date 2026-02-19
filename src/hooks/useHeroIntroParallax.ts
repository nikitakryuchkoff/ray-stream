"use client";

import { useEffect, useRef, useState } from "react";

export function useHeroIntroParallax() {
  const heroTopRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsHeroVisible(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const onScroll = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        const scrollProgress = window.scrollY / window.innerHeight;
        if (scrollProgress < 1 && heroTopRef.current) {
          heroTopRef.current.style.opacity = String(1 - scrollProgress * 0.7);
          heroTopRef.current.style.transform = `translateY(${scrollProgress * 40}px)`;
        }
        frameId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { heroTopRef, isHeroVisible };
}
