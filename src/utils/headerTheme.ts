import { getEffectiveBackgroundColor, isDarkColor } from "./color";

export const getSectionThemeAtY = (sampleY: number): boolean | null => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section[id], [data-header-theme]"),
  );
  if (!sections.length) return null;

  const activeSection =
    sections.find((section) => {
      const { top, bottom } = section.getBoundingClientRect();
      return top <= sampleY && bottom > sampleY;
    }) ??
    sections.reduce(
      (closestSection, section) => {
        const distanceToSample = Math.abs(
          section.getBoundingClientRect().top - sampleY,
        );

        if (!closestSection || distanceToSample < closestSection.distance) {
          return { section, distance: distanceToSample };
        }
        return closestSection;
      },
      null as { section: HTMLElement; distance: number } | null,
    )?.section;

  if (!activeSection) return null;

  const explicitTheme = activeSection.dataset.headerTheme;
  if (explicitTheme === "dark") return true;
  if (explicitTheme === "light") return false;

  const sectionBackground = getEffectiveBackgroundColor(activeSection);
  if (!sectionBackground) return null;

  return isDarkColor(sectionBackground);
};
