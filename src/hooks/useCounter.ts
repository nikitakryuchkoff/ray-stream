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
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}
