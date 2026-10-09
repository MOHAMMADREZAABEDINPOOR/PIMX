import { useEffect, useRef, type PointerEvent } from 'react';
import { useReducedMotion } from 'motion/react';

/** One frame per pointer update; no listeners or animation loop while idle. */
export function usePointerSurface<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const reset = () => {
    cancelAnimationFrame(frame.current);
    bounds.current = null;
    const node = ref.current;
    if (!node) return;
    node.dataset.pointer = 'false';
    node.style.setProperty('--pointer-dx', '0');
    node.style.setProperty('--pointer-dy', '0');
  };
  const move = (event: PointerEvent<T>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const node = event.currentTarget;
    const box = bounds.current || (bounds.current = node.getBoundingClientRect());
    const x = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
    const y = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.dataset.pointer = 'true';
      node.style.setProperty('--pointer-x', `${x * 100}%`);
      node.style.setProperty('--pointer-y', `${y * 100}%`);
      node.style.setProperty('--pointer-dx', String(x - .5));
      node.style.setProperty('--pointer-dy', String(y - .5));
    });
  };
  return { ref, onPointerEnter: move, onPointerMove: move, onPointerLeave: reset, onPointerCancel: reset };
}
