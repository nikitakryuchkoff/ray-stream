"use client";
import { default as classNames } from "classnames";
import type { ReactNode } from "react";
import { useInView } from "@/hooks";
import { clipRevealDelayClassMap } from "./ClipReveal.const";
import styles from "./ClipReveal.module.css";

interface Props {
  children: ReactNode;
  delay?: number;
  forceVisible?: boolean;
}

const ClipReveal = ({ children, delay = 0, forceVisible = false }: Props) => {
  const { ref, isVisible } = useInView<HTMLSpanElement>();

  const isElementVisible = forceVisible || isVisible;
  const revealClassName = classNames(
    styles.clip,
    clipRevealDelayClassMap[delay],
    isElementVisible && styles.visible,
  );

  return (
    <span ref={ref} className={revealClassName}>
      <span>{children}</span>
    </span>
  );
};

export { ClipReveal };
