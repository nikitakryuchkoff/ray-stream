export function scrollToSection(
  selector: string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" },
) {
  document.querySelector(selector)?.scrollIntoView(options);
}
