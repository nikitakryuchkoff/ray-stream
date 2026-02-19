"use client";

import { useCounter, useInView } from "@/hooks";

interface Props {
  target: number;
  suffix?: string;
}

const Counter = ({ target, suffix = "" }: Props) => {
  const { ref, isVisible } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const count = useCounter(target, isVisible);

  return (
    <>
      <span ref={ref}>{count}</span>
      {suffix}
    </>
  );
};

export { Counter };
