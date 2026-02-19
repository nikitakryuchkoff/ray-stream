"use client";
import { useInView } from "@/hooks/useInView";
import s from "./Separator.module.css";
import classNames from "classnames";

export default function Separator({ className = "" }: { className?: string }) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={classNames(s.sep, isVisible && s.visible, className)}
    />
  );
}
