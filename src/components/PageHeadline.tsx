import { useSiteText } from '../lib/useSiteText';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { useReveal } from '../lib/useReveal';
import '../styles/page-headline.css';

type Effect = 'inscription' | 'folio' | 'signal' | 'discovery';

/** Whole words preserve RTL shaping; Latin letters move inside unbroken word groups. */
export default function PageHeadline({ text, effect, rtl = false }: { text: string; effect: Effect; rtl?: boolean }) {
  const l = useSiteText();
  text = l(text);
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  const reduced = useReducedMotion();
  let ordinal = 0;
  return <span ref={ref} className={`page-headline headline-${effect}`} data-effect={effect} data-revealed={revealed && !reduced}>
    <span className="headline-readable">{l(text)}</span>
    <span className="headline-visual" aria-hidden="true">{l(text.split(/\s+/).map((word, index) => <span className="headline-word-wrap" key={index}>{l(index > 0 && <span className="headline-space"> </span>)}<span className="headline-word">{l((rtl ? [word] : [...word]).map((glyph,i) => {const n=ordinal++;return <span className="headline-unit" key={i} data-glyph={glyph} style={{'--glyph-delay':`${n*.035}s`,'--glyph-order':n,'--glyph-wave':Math.sin(n*1.4),'--glyph-parity':n%2 ? -1 : 1} as CSSProperties}><span className="headline-ink">{glyph}</span>{l(effect === 'inscription' && <span className="headline-outline">{glyph}</span>)}</span>;}))}</span></span>))}</span>
  </span>;
}
