"use client";

import { default as classNames } from "classnames";
import { useInView } from "@/hooks";
import styles from "./Separator.module.css";

const Separator = ({ className }: { className?: string }) => {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.sep, isVisible && styles.visible, className)}
    />
  );
};

export { Separator };
