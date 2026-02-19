"use client";
import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import s from "./ClipReveal.module.css";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  delay?: number;
  forceVisible?: boolean;
}

const delayMap: Record<number, string> = {
  1: s.d1,
  2: s.d2,
  3: s.d3,
  4: s.d4,
  5: s.d5,
};

export default function ClipReveal({
  children,
  delay = 0,
  forceVisible = false,
}: Props) {
  const { ref, isVisible } = useInView<HTMLSpanElement>();

  const vis = forceVisible || isVisible;

  const cls = classNames(s.clip, delayMap[delay], vis && s.visible);
  return (
    <span ref={ref} className={cls}>
      <span>{children}</span>
    </span>
  );
}
