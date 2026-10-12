import { useEffect, useState } from 'react';

const readLocation = () => ({ pathname: window.location.pathname, search: window.location.search, hash: window.location.hash });

/** Native links retain new-tab/modifier behavior; ordinary internal links use History API. */
export function useBrowserRoute() {
  const [location, setLocation] = useState(readLocation);
  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    let frame = 0;
    const rememberScroll = () => history.replaceState({ ...history.state, scrollY: window.scrollY }, '');
    const restore = (pop = false) => {
      setLocation(readLocation());
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.location.hash) {
          try { document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView(); } catch { /* Invalid URL fragment. */ }
        } else window.scrollTo(0, pop ? history.state?.scrollY || 0 : 0);
        document.getElementById('main')?.focus({ preventScroll: true });
      });
    };
    const onPop = () => restore(true);
    if (window.location.hash) restore(true);
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const next = new URL(anchor.href, window.location.href);
      if (next.origin !== window.location.origin || !/^https?:$/.test(next.protocol)) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search && next.hash) return;
      event.preventDefault();
      rememberScroll();
      if (next.href !== window.location.href) history.pushState({ scrollY: 0 }, '', next.href);
      restore();
    };
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    window.addEventListener('pagehide', rememberScroll);
    return () => {
      cancelAnimationFrame(frame);
      history.scrollRestoration = previousRestoration;
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pagehide', rememberScroll);
    };
  }, []);
  return location;
}
