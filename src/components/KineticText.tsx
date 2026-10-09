import { useSiteText } from '../lib/useSiteText';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { useReveal } from '../lib/useReveal';
import type { PageType } from '../types';
import { cvTranslations } from '../lib/cv_data';
import '../styles/kinetic-text.css';

export type TextEffect = 'rise' | 'fold' | 'blur' | 'slide' | 'fan' | 'shutter';
/** Animate whole words to preserve connected Persian and Arabic letterforms. */
export function KineticText({ text, variant = 'rise', className = '' }: { text: string; variant?: TextEffect; className?: string }) {
  const l = useSiteText();
  text = l(text);
  const reduced = useReducedMotion();
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  return <span ref={ref} className={`kinetic-text kinetic-${variant} ${className}`} data-revealed={revealed && !reduced}>
    <span className="kinetic-readable">{l(text)}</span>
    {text.split(/\s+/).map((word, i) => <span className="kinetic-word-mask" key={`${word}-${i}`} aria-hidden="true"><span className="kinetic-word" style={{ '--word-index': i, '--word-delay': `${Math.min(i * .07, .42)}s` } as CSSProperties}>{word}</span></span>)}
  </span>;
}

const copy = {
  home: { en: ['GOOD IDEAS', 'deserve', 'GREAT EXECUTION.'], fa: ['ایده‌های خوب', 'لایقِ', 'اجرای فوق‌العاده‌اند.'], label: 'FROM WHAT IF TO WHAT’S NEXT', note: 'A considered interface. A dependable system. A reason to come back.', noteFa: 'رابطی فکرشده. سیستمی قابل‌اتکا. تجربه‌ای که ارزش برگشتن دارد.', variant: 'fold' },
  about: { en: ['A CURIOUS MIND.', 'a human touch.', 'ALWAYS BUILDING.'], fa: ['ذهنی کنجکاو.', 'نگاهی انسانی.', 'همیشه در حال ساخت.'], label: 'THE PERSON BEHIND THE PIXELS', note: 'The best part of building is discovering what I haven’t learned yet.', noteFa: 'بهترین قسمت ساختن، کشف چیزهایی است که هنوز یاد نگرفته‌ام.', variant: 'blur' },
  projects: { en: ['IDEA.', 'ITERATION.', 'IN THE WILD.'], fa: ['ایده.', 'بهتر، هر بار.', 'در دنیای واقعی.'], label: 'BUILT / TESTED / RELEASED', note: 'Open a project. Follow the details. See the thinking at work.', noteFa: 'یک پروژه را باز کن. جزئیات را ببین. فکر پشت ساخت را کشف کن.', variant: 'slide' },
  playground: { en: ['LEARN.', 'UNLEARN.', 'TRY AGAIN.'], fa: ['یاد بگیر.', 'دوباره فکر کن.', 'باز امتحان کن.'], label: 'CURIOSITY IS A PRACTICE', note: 'Every experiment is another way to see what’s possible.', noteFa: 'هر تجربه، راه تازه‌ای برای کشف ممکن‌هاست.', variant: 'fan' },
  resume: { en: ['THE FOUNDATION.', 'THE EXPERIENCE.', 'THE NEXT CHAPTER.'], fa: ['پایه‌های محکم.', 'تجربه‌های واقعی.', 'فصل بعدی.'], label: 'PROGRESS, ONE CHAPTER AT A TIME', note: 'A growing collection of skills, lessons and things shipped.', noteFa: 'مجموعه‌ای در حال رشد از مهارت‌ها، آموخته‌ها و ساخته‌ها.', variant: 'rise' },
  contact: { en: ['YOUR NEXT', 'big idea', 'STARTS HERE.'], fa: ['ایده‌ی بعدی تو', 'بزرگ فکر کن', 'از اینجا شروع می‌شود.'], label: 'LET’S MAKE SOMETHING WORTH MAKING', note: 'Tell me what you’re imagining. We’ll find the first step.', noteFa: 'بگو چه چیزی در ذهن داری. قدم اول را با هم پیدا می‌کنیم.', variant: 'shutter' },
} as const;

export default function RouteManifesto({ page }: { page: PageType }) {
  const l = useSiteText();
  const { lang } = useLanguageTheme();
  const fa = lang === 'fa';
  const value = copy[page];
  return <section className={`route-manifesto container-wide manifesto-${page}`} aria-label={l(fa ? 'نگاه من به ساختن' : 'My approach')}>
    <div className="manifesto-topline micro-label" dir="ltr"><span>✳ / {l(value.label)}</span><span>0{l(Object.keys(copy).indexOf(page) + 1)} {l("— PIMX")}</span></div>
    <div className="manifesto-stage">
      <span className="manifesto-symbol" aria-hidden="true">{l(page === 'about' ? '✳' : page === 'contact' ? '↗' : page === 'playground' ? '+' : '↘')}</span>
      <h2 key={`${page}-${lang}`}>{l((fa ? value.fa : value.en).map((line, i) => <span className={`manifesto-line manifesto-line-${i}`} key={line}><span className="manifesto-line-index micro-label" aria-hidden="true">0{l(i + 1)}</span><KineticText text={l(line)} variant={value.variant} /></span>))}</h2>
    </div>
    <div className="manifesto-bottom"><p>{l(fa ? value.noteFa : value.note)}</p><a href={page === 'contact' ? `mailto:${cvTranslations.en.contactValues.email}` : '/contact'}>{l(fa ? 'با هم شروع کنیم' : 'Let’s build something')} <ArrowUpRight size={22}/></a></div>
  </section>;
}
