import { useSiteText } from '../lib/useSiteText';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Measure the new content while the outgoing panel exits outside document flow. */
export default function AutoHeight({ children, className = '', id, live = false }: { children: ReactNode; className?: string; id?: string; live?: boolean }) {
  const l = useSiteText();
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const element = content.current;
    if (!element) return;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <motion.div className={`auto-height ${className}`} id={id} aria-live={live ? 'polite' : undefined} initial={false} animate={{ height: height ?? 'auto' }} transition={{ duration: reduced ? 0 : .48, ease: [.22, 1, .36, 1] }} style={{ overflow: 'hidden' }}><div ref={content} className="auto-height-content" style={{ position: 'relative', display: 'flow-root' }}>{l(children)}</div></motion.div>;
}
