import styles from "./Reveal.module.css";
import type { RevealVariant } from "./Reveal.typed";

export const revealVariantClassMap: Record<RevealVariant, string> = {
  up: styles.reveal,
  left: styles.slideL,
  scale: styles.scaleIn,
};

export const revealDelayClassMap: Record<number, string> = {
  1: styles.d1,
  2: styles.d2,
  3: styles.d3,
  4: styles.d4,
  5: styles.d5,
};
