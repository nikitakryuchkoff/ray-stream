export function repeatItems<T>(items: readonly T[], repeatCount: number): T[] {
  return Array.from({ length: repeatCount }, () => items).flat();
}
