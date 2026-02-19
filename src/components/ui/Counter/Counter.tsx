'use client';
import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';

interface Props { target: number; suffix?: string; }

export default function Counter({ target, suffix = '' }: Props) {
  const { ref, isVisible } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const count = useCounter(target, isVisible);
  return <><span ref={ref}>{count}</span>{suffix}</>;
}
