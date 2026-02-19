"use client";
import { useScrollProgress } from "@/hooks";
import s from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const progress = useScrollProgress();
  return <div className={s.bar} style={{ transform: `scaleX(${progress})` }} />;
};

export { ScrollProgress };
