"use client";
import { default as classNames } from "classnames";
import type { ReactNode } from "react";
import { useInView } from "@/hooks";
import {
  revealDelayClassMap,
  revealVariantClassMap,
} from "./Reveal.const";
import type { RevealVariant } from "./Reveal.typed";
import styles from "./Reveal.module.css";

interface Props {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  forceVisible?: boolean;
}

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className = "",
  forceVisible = false,
}: Props) => {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const isElementVisible = forceVisible || isVisible;

  const revealClassName = classNames(
    revealVariantClassMap[variant],
    revealDelayClassMap[delay],
    isElementVisible && styles.visible,
    className,
  );

  return (
    <div ref={ref} className={revealClassName}>
      {children}
    </div>
  );
};

export { Reveal };
