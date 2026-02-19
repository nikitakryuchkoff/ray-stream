"use client";
import { useEffect, useState } from "react";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isFrameRequested = false;

    const updateProgressOnScroll = () => {
      if (!isFrameRequested) {
        requestAnimationFrame(() => {
          const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          setProgress(
            scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0,
          );
          isFrameRequested = false;
        });
        isFrameRequested = true;
      }
    };

    window.addEventListener("scroll", updateProgressOnScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", updateProgressOnScroll);
  }, []);

  return progress;
};
