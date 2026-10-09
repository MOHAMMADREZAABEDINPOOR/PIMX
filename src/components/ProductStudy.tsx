import { useSiteText } from '../lib/useSiteText';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Move, Pause, Play, RotateCcw } from 'lucide-react';
import { getProjectSculptureProfile as getProfile } from '../lib/project_sculpture_profiles';
import { getTranslatedProjects, type TranslatedProjectItem } from '../lib/project_translations';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import '../styles/product-study.css';
import DedicatedProjectArt from './DedicatedProjectArt';
import { projectScreenshots, getProjectScreenshot } from '../lib/project_visuals';

const Catalog = createContext<Map<string, TranslatedProjectItem> | null>(null);
export function ProjectSculptureProvider({ children }: { children: ReactNode }) {
  const l = useSiteText();
  const { lang } = useLanguageTheme();
  const projects = useMemo(() => new Map(getTranslatedProjects(lang).map(p => [p.id, p])), [lang]);
  return <Catalog.Provider value={projects}>{l(children)}</Catalog.Provider>;
}
export function getProjectSculptureProfile(id: string) {
  const profile = getProfile(id);
  return { ...profile, label: profile.title, background: profile.backdrop };
}
const directions: Record<string, string> = {
  'github-pimx-agent': 'neural', 'github-pimx-morph': 'conversion', 'pimx-veil': 'security',
  'pimx-node': 'network', 'pimx-moji': 'creative', 'github-pimxsats': 'orbit',
  'pimx-wide': 'security', 'github-pimx-weather': 'weather', 'pimx-pass': 'network',
  'github-pimx-eltex': 'media', 'github-pimx-save-bot': 'media', 'pimx-sonic-bot': 'media',
  'github-pimx-portal': 'portal', 'soheil-portal': 'portal', 'github-pimx-fail': 'architecture',
  'github-pimxdash': 'interface', 'github-pimx-swap': 'conversion', 'github-bot': 'neural',
};
const hash = (text: string) => [...text].reduce((n, c) => ((n * 31) + c.charCodeAt(0)) >>> 0, 7);
const ownerScreenshots = new Set(['github-pimxsats', 'pimx-wide', 'github-pimx-weather', 'github-pimx-swap', 'github-shop']);
function visualFamily(signature: string, category?: string) {
  if (/clock|ticking|deadline|hourglass|timer|countdown|temperature/i.test(signature)) return 'chronology';
  if (/database|records|matrix|file stream|persisted|integer/i.test(signature)) return 'database';
  if (/shopping|storefront|retail|warehouse|parcels|cargo|orders/i.test(signature)) return 'commerce';
  if (/conversation|assistant|AI |neural|chat |agent/i.test(signature) || category === 'ai') return 'neural';
  if (/keyboard|character|layout/i.test(signature)) return 'conversion';
  if (/vinyl|media|waveform|audio/i.test(signature)) return 'media';
  if (/network|resolver|signal|server|telemetry/i.test(signature)) return 'network';
  return 'architecture';
}

/** Actual product captures inside dimensional frames, with vector studies and scroll-driven depth. */
function ProductStudy({ id, className = '', interactive = false }: { id: string; className?: string; interactive?: boolean }) {
  const l = useSiteText();
  const project = useContext(Catalog)?.get(id);
  const { lang, theme } = useLanguageTheme(); const fa = lang === 'fa'; const reduced = useReducedMotion();
  const profile = getProjectSculptureProfile(id); const seed = hash(id); const family = directions[id] || visualFamily(profile.signature, project?.category);
  const host = useRef<HTMLDivElement>(null);
  const visible = useInView(host, { margin: '80px' });
  const [paused, setPaused] = useState(false), [imageFailed, setImageFailed] = useState(false);
  const screenshot = getProjectScreenshot(id, theme, project?.previewImage);
  useEffect(() => setImageFailed(false), [id, screenshot]);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const angles = useRef({ x:0, y:0 });
  const pointerFrame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(pointerFrame.current), []);
  const paintAngles = () => {
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      host.current?.style.setProperty('--study-pointer-x', `${angles.current.x}deg`);
      host.current?.style.setProperty('--study-pointer-y', `${angles.current.y}deg`);
    });
  };
  const x = { get:()=>angles.current.x, set:(value:number)=>{angles.current.x=value;paintAngles();} };
  const y = { get:()=>angles.current.y, set:(value:number)=>{angles.current.y=value;paintAngles();} };
  const preview = (!!projectScreenshots[id] || !!project?.previewImage || ownerScreenshots.has(id) || (!!project?.link && project.liveStatus === 'verified' && project.linkKind !== 'bot')) && !imageFailed;
  const technology = [...new Set([project?.language, ...(project?.technologies || [])].filter(Boolean))].slice(0, 3);
  const reset = () => { x.set(0); y.set(0); };
  return <div ref={host} className={`project-sculpture product-study study-${family} ${preview ? 'has-product-preview' : 'is-vector-study'} ${paused ? 'is-paused' : ''} ${interactive ? 'sculpture-interactive' : ''} ${className}`} style={{ '--sculpture-accent': profile.accent, '--sculpture-secondary': profile.secondary, '--study-backdrop': profile.backdrop, '--study-phase': `${-(seed % 17)}s` } as CSSProperties} data-sculpture-id={id} data-sculpture-signature={`${profile.signature} / product study`} data-render-mode={preview ? "screenshot" : "dedicated-vector"} data-artwork-id={id} data-active={visible && !reduced} role={interactive ? 'group' : undefined} aria-label={l(interactive ? `${fa ? 'نمایش تعاملی پروژه' : 'Interactive product study'}: ${profile.title}` : undefined)} aria-hidden={!interactive} tabIndex={interactive ? 0 : undefined}
    onPointerMove={event => { if (!interactive || reduced || paused || (event.target as Element).closest('button')) return; const bounds = event.currentTarget.getBoundingClientRect(); if (drag.current) { y.set(Math.max(-28, Math.min(28, y.get() + (event.clientX - drag.current.x) * .15))); x.set(Math.max(-18, Math.min(18, x.get() - (event.clientY - drag.current.y) * .1))); drag.current = { x: event.clientX, y: event.clientY }; } else if (event.pointerType === 'mouse') { y.set(((event.clientX - bounds.left) / bounds.width - .5) * 14); x.set((.5 - (event.clientY - bounds.top) / bounds.height) * 10); } }}
    onPointerDown={event => { if (!interactive || (event.target as Element).closest('button')) return; drag.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onPointerLeave={() => { if (!drag.current && !paused) reset(); }}
    onKeyDown={event => { if (!interactive || event.target !== event.currentTarget) return; if (event.key.startsWith('Arrow')) { event.preventDefault(); if (event.key === 'ArrowLeft') y.set(y.get() - 6); if (event.key === 'ArrowRight') y.set(y.get() + 6); if (event.key === 'ArrowUp') x.set(x.get() - 5); if (event.key === 'ArrowDown') x.set(x.get() + 5); } else if (event.key === ' ') { event.preventDefault(); setPaused(p => !p); } else if (event.key === 'Home') reset(); }}>
    <div className="study-aura" /><div className="study-coordinate" dir="ltr"><span>{l("PRODUCT STUDY /")}{l(String(seed % 97).padStart(2, '0'))}</span><span>{l(preview ? 'PRODUCT PREVIEW' : 'DEDICATED COMPOSITION')}</span></div>
    <div className="study-dimensional-stage">
      {l(!preview && <svg className="study-blueprint dedicated-blueprint" viewBox="0 0 960 640" fill="none" aria-hidden="true"><DedicatedProjectArt id={id}/></svg>)}

      {l(preview && <div className="study-browser-window"><div className="study-browser-toolbar"><i /><i /><i /><span dir="ltr">{l(project?.link ? new URL(project.link).hostname : project?.repoName || profile.title)}</span><span>↗</span></div><img key={screenshot} src={screenshot || `/project-previews/${id}.jpg?v=owner-20261008`} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} /></div>)}
      <div className="study-floating-spec" dir="ltr"><span>{l(preview ? 'ACTUAL PRODUCT' : 'SYSTEM CONCEPT')}</span><strong>{l(profile.title)}</strong><div>{l(technology.map(t=><span key={t}>{l(t)}</span>))}</div></div>

    </div>
    <div className="study-footer" dir="ltr"><span>{l(preview ? 'ACTUAL PRODUCT / OPEN TO EXPLORE' : profile.signature)}</span><span>↗</span></div>
    <div className="study-scroll-meter" aria-hidden="true"><i /></div>
    {l(interactive && <div className="sculpture-controls"><span><Move size={13} />{l(fa ? 'کشف کن / با اسکرول و حرکت' : 'SCROLL / DRAG TO EXPLORE')}</span><button type="button" onClick={reset} aria-label={l(fa ? 'بازنشانی نما' : 'Reset sculpture')}><RotateCcw size={14} /></button><button type="button" onClick={() => setPaused(p=>!p)} aria-pressed={paused} aria-label={l(fa ? (paused ? 'ادامهٔ حرکت' : 'توقف حرکت') : (paused ? 'Resume sculpture' : 'Pause sculpture'))}>{l(paused ? <Play size={14} /> : <Pause size={14} />)}</button></div>)}
  </div>;
}
export default function ProjectSculpture(props: { id: string; className?: string; interactive?: boolean }) {
  return useContext(Catalog) ? <ProductStudy {...props} /> : <ProjectSculptureProvider><ProductStudy {...props} /></ProjectSculptureProvider>;
}
