export const scrollToSection = (
  selector: string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
): void => {
  document.querySelector(selector)?.scrollIntoView(options);
};
