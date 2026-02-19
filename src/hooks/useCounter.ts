"use client";
import { useEffect, useState } from "react";

export function useCounter(
  target: number,
  isVisible: boolean,
  duration = 1800,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const animationStart = performance.now();
    const animateCount = (currentTime: number) => {
      const animationProgress = Math.min(
        (currentTime - animationStart) / duration,
        1,
      );
      const easedProgress = 1 - Math.pow(1 - animationProgress, 4);
      setCount(Math.round(easedProgress * target));
      if (animationProgress < 1) requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
  }, [isVisible, target, duration]);

  return count;
}
