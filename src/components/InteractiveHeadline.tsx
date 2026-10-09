import { useSiteText } from '../lib/useSiteText';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { useReveal } from '../lib/useReveal';
import '../styles/interactive-type.css';

export function OrbitType({ text, rtl = false }: { text: string; rtl?: boolean }) {
  const l = useSiteText();
  text = l(text);
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const units = rtl ? text.split(/\s+/) : [...text];
  return <span ref={ref} className={`orbit-type ${rtl ? 'orbit-type-rtl' : ''}`} data-revealed={revealed && !reduced}>
    <span className="type-readable">{l(text)}</span>
    <span className="orbit-type-visual" aria-hidden="true">{l(units.map((unit,i)=><span className="orbit-unit" key={i} style={{ '--type-delay': `${i*.035}s`, '--type-lift': `${Math.sin(i*1.7)*9}px`, '--type-turn': `${Math.cos(i*1.3)*7}deg` } as CSSProperties}>{l(unit===' ' ? '\u00a0' : unit)}</span>))}</span>
  </span>;
}

export function FragmentType({ text }: { text: string }) {
  const l = useSiteText();
  text = l(text);
  return <span className="fragment-type"><span className="type-readable">{l(text)}</span><span aria-hidden="true">{l(text.split(/\s+/).map((word,i)=><span className="fragment-word" key={i} style={{ '--fragment-shift': `${i%2 ? -1 : 1}`, '--fragment-delay': `${i*.035}s` } as CSSProperties}><span className="fragment-base">{l(word)}</span>{l([0,1,2].map(slice=><span className={`fragment-slice fragment-slice-${slice}`} key={slice}>{l(word)}</span>))}</span>))}</span></span>;
}
