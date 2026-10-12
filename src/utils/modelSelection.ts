/** Keep the server's 160 UTF-16-unit limit without splitting a Unicode character. */
export function sanitizeModelSelection(value?: string | null): string | undefined {
  const normalized = (value || '').trim().replace(/[\r\n]/g, '');
  let selected = '';
  for (const character of normalized) {
    const code = character.charCodeAt(0);
    const safe = character.length === 1 && code >= 0xd800 && code <= 0xdfff ? '\ufffd' : character;
    if (selected.length + safe.length > 160) break;
    selected += safe;
  }
  return selected || undefined;
}
