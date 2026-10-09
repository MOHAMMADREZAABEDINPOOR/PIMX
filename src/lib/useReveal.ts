import { useEffect, useRef, useState } from 'react';

/** Observe stationary containers. Content stays readable before an effect starts. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let observer: IntersectionObserver | undefined;
    const reveal = () => { setRevealed(true); observer?.disconnect(); };
    const check = () => {
      const box = element.getBoundingClientRect();
      if (box.height > 0 && box.bottom > 0 && box.top < window.innerHeight) reveal();
    };
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) reveal();
      }, { threshold: 0.01 });
      observer.observe(element);
    } else reveal();
    const frame = requestAnimationFrame(check);
    const resize = 'ResizeObserver' in window ? new ResizeObserver(check) : undefined;
    resize?.observe(element);
    window.addEventListener('pageshow', check);
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect(); resize?.disconnect();
      window.removeEventListener('pageshow', check);
    };
  }, []);
  return { ref, revealed };
}
