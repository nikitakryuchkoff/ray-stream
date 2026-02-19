"use client";
import { useScrollProgress } from "@/hooks";
import styles from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const progress = useScrollProgress();
  return <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />;
};

export { ScrollProgress };
