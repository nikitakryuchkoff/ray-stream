/** Asset delivery may use the public production alias; navigation and API calls stay on the site origin. */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return path.startsWith('/') && base.startsWith('https://')
    ? `${base.replace(/\/$/, '')}${path}`
    : path;
}
