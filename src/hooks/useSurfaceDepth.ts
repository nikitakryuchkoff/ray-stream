import { useCallback, useEffect, useRef, type PointerEvent } from 'react';

/** A small physical response for pointer users; no React renders on pointer movement. */
export function useSurfaceDepth() {
  const frame = useRef(0);
  const onPointerMove = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
    const element = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (clientX - bounds.left) / bounds.width - .5));
      const y = Math.max(-.5, Math.min(.5, (clientY - bounds.top) / bounds.height - .5));
      element.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
      element.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
    });
  }, []);
  const onPointerLeave = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.removeProperty('--tilt-x');
    event.currentTarget.style.removeProperty('--tilt-y');
  }, []);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return { onPointerMove, onPointerLeave, onPointerCancel: onPointerLeave };
}
