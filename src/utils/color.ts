export type RgbColor = [number, number, number];
type RgbaColor = [number, number, number, number];

export function parseRgbaColor(color: string): RgbaColor | null {
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;

  const parts = match[1]
    .split(",")
    .map((part) => Number.parseFloat(part.trim()));

  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;

  const [red, green, blue, alpha = 1] = parts;
  return [red, green, blue, alpha];
}

export function getEffectiveBackgroundColor(
  startElement: Element | null,
): RgbColor | null {
  let currentElement: Element | null = startElement;

  while (currentElement) {
    const parsedColor = parseRgbaColor(
      window.getComputedStyle(currentElement).backgroundColor,
    );
    if (parsedColor && parsedColor[3] > 0) {
      return [parsedColor[0], parsedColor[1], parsedColor[2]];
    }
    currentElement = currentElement.parentElement;
  }

  const bodyColor = parseRgbaColor(
    window.getComputedStyle(document.body).backgroundColor,
  );
  if (!bodyColor) return null;
  return [bodyColor[0], bodyColor[1], bodyColor[2]];
}

export function isDarkColor([red, green, blue]: RgbColor): boolean {
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
  return yiq < 140;
}
