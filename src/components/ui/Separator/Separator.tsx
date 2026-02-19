'use client';
import { useInView } from '@/hooks/useInView';
import s from './Separator.module.css';

export default function Separator({ className = '' }: { className?: string }) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  return <div ref={ref} className={`${s.sep} ${isVisible ? s.visible : ''} ${className}`} />;
}
