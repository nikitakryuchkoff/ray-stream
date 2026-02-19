"use client";

import { useEffect } from "react";

export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = locked ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
};
