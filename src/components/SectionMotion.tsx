import { useSiteText } from '../lib/useSiteText';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowUpRight, Radio } from 'lucide-react';
import '../styles/section-motion.css';
import { useReveal } from '../lib/useReveal';
import { KineticText } from './KineticText';

type Reveal = 'fold' | 'iris' | 'slide' | 'rise';

/** Pauses decorative CSS animation outside the viewport; content remains readable without motion. */
export default function SectionMotion({ children, className = '', kind = 'fold', delay = 0 }: {
  children: ReactNode; className?: string; kind?: Reveal; delay?: number;
}) {
  const l = useSiteText();
  const reduced = useReducedMotion();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`section-motion section-reveal-${kind} ${className}`} data-active={visible && !reduced} data-revealed={revealed && !reduced} style={{ '--section-delay': `${delay}s` } as CSSProperties}>{l(children)}</div>;
}

export function ChapterDivider({ number, label, words }: { number: string; label: string; words: string[] }) {
  const l = useSiteText();
  return <SectionMotion className="chapter-divider page-container" kind="slide"><span className="chapter-divider-index" dir="ltr">{l(number)}</span><div className="chapter-divider-copy"><span>{l(label)}</span><div dir="ltr">{l(words.map(word => <span key={word}><KineticText text={l(word)} variant="slide" /></span>))}</div></div><ArrowUpRight aria-hidden="true" strokeWidth={.8} /></SectionMotion>;
}

export function SignalSculpture({ fa, activity, composed }: { fa: boolean; activity: number; composed: boolean }) {
  const l = useSiteText();
  const reduced = useReducedMotion();
  const [pulse, setPulse] = useState(0);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 20 });
  const amount = Math.min(100, activity);
  const labels = ['HELLO', 'سلام', 'Ciao', '你好', 'Bonjour', 'Hola'];
  return <SectionMotion className={`contact-signal ${composed ? 'is-composed' : ''}`} kind="iris"><div className="signal-topline"><span><Radio size={14} aria-hidden="true" />{l(fa ? 'هر ایده، یک موج تازه' : 'EVERY IDEA MAKES A WAVE')}</span><span dir="ltr">{l("37.28° N / 49.58° E")}</span></div><div className="signal-stage" onPointerMove={event => { if (reduced || event.pointerType !== 'mouse') return; const rect = event.currentTarget.getBoundingClientRect(); x.set((.5 - (event.clientY - rect.top) / rect.height) * 22); y.set(((event.clientX - rect.left) / rect.width - .5) * 28); }} onPointerLeave={() => {x.set(0); y.set(0);}}><div className="signal-floor" aria-hidden="true" /><motion.div className="signal-universe" style={reduced ? undefined : { rotateX, rotateY }} aria-hidden="true" dir="ltr"><div className="signal-globe"><div className="signal-latitudes">{l([0, 1, 2, 3, 4].map(i => <i key={i} style={{ '--ring': i } as CSSProperties} />))}</div><div className="signal-longitudes">{l([0, 1, 2, 3, 4, 5].map(i => <i key={i} style={{ '--ring': i } as CSSProperties} />))}</div><span className="signal-core">{l(fa ? 'سلام' : 'hello.')}<small>{l("PIMX / MAKE CONTACT")}</small></span></div><div className="signal-orbit"><i /><i /><i /></div><div className="signal-greetings">{l(labels.map((label, i) => <span key={label} style={{ '--greeting': i } as CSSProperties}>{l(label)}</span>))}</div><div className="signal-pulse-burst" key={pulse} data-fired={pulse > 0 || activity > 0}>{l([0, 1, 2].map(i => <i key={i} style={{ '--wave': i } as CSSProperties} />))}</div></motion.div></div><div className="signal-bottomline"><div><span>{l(composed ? (fa ? 'پیش‌نویس آماده است' : 'YOUR DRAFT IS READY') : amount > 0 ? (fa ? 'ایده در حال شکل‌گیری است' : 'AN IDEA IS TAKING SHAPE') : (fa ? 'یک گفت‌وگو از اینجا شروع می‌شود' : 'A CONVERSATION STARTS HERE'))}</span><div className="signal-spectrum" aria-hidden="true">{l(Array.from({length: 25}, (_, i) => <i key={i} style={{ '--bar': i, '--strength': .3 + Math.sin(i * .7 + amount * .08) * .25 + amount * .006 } as CSSProperties} />))}</div></div><button type="button" className="signal-pulse-button" onClick={() => setPulse(value => value + 1)} aria-label={l(fa ? 'پخش موج بصری' : 'Send a visual pulse')}><Radio size={20} aria-hidden="true" /><span>{l(fa ? 'یک موج' : 'MAKE A WAVE')}</span></button></div></SectionMotion>;
}
