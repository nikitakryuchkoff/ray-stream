import { useLayoutEffect, useRef } from 'react';

/** Reveal the new result set while preserving card DOM, focus and pointer depth. */
export function useCatalogReveal(filterKey: string) {
  const grid = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const items = Array.from(grid.current?.children || []);
    const motion = matchMedia('(prefers-reduced-motion:reduce)');
    if (motion.matches || !items.length || typeof items[0].animate !== 'function') return;
    const animations = items.map((item, index) => item.animate([
      { opacity: 0, transform: 'translate3d(0, 12px, 0) scale(.99)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
    ], { duration: 380, delay: Math.min(index, 8) * 22, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
    const cancel = () => animations.forEach(animation => animation.cancel());
    const preferenceChanged = () => { if (motion.matches) cancel(); };
    motion.addEventListener('change', preferenceChanged);
    return () => { cancel(); motion.removeEventListener('change', preferenceChanged); };
  }, [filterKey]);
  return grid;
}
