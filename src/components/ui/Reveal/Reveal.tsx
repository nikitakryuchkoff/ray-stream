"use client";
import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import s from "./Reveal.module.css";

type Variant = "up" | "left" | "scale";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  forceVisible?: boolean;
}

const variantMap: Record<Variant, string> = {
  up: s.reveal,
  left: s.slideL,
  scale: s.scaleIn,
};

const delayMap: Record<number, string> = {
  1: s.d1,
  2: s.d2,
  3: s.d3,
  4: s.d4,
  5: s.d5,
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  forceVisible = false,
}: Props) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const vis = forceVisible || isVisible;
  const cls = [
    variantMap[variant],
    delayMap[delay] || "",
    vis ? s.visible : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
