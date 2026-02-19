"use client";
import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import s from "./ClipReveal.module.css";

interface Props {
  children: ReactNode;
  delay?: number;
  forceVisible?: boolean;
}

export default function ClipReveal({
  children,
  delay = 0,
  forceVisible = false,
}: Props) {
  const { ref, isVisible } = useInView<HTMLSpanElement>();
  const vis = forceVisible || isVisible;
  const cls = [
    s.clip,
    delay === 1 ? s.d1 : delay === 2 ? s.d2 : "",
    vis ? s.visible : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span ref={ref} className={cls}>
      <span>{children}</span>
    </span>
  );
}
