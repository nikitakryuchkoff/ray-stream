"use client";
import { useInView } from "@/hooks";
import { classNames } from "@/utils";
import s from "./Separator.module.css";

const Separator = ({ className = "" }: { className?: string }) => {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={classNames(s.sep, isVisible && s.visible, className)}
    />
  );
};

export { Separator };
