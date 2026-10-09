import { getProjectNote } from '../lib/project_notes';
import { useSiteText } from '../lib/useSiteText';
import { useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getTranslatedProjects, portfolioCatalogStats } from '../lib/project_translations';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { usePointerSurface } from '../lib/usePointerSurface';
import { getProjectScreenshot } from '../lib/project_visuals';
import '../styles/home-showcase.css';

const exhibits = ['github-pimx-agent', 'github-pimxsats', 'github-pimx-swap'];
const accents = ['#b6a1ff', '#73d7ff', '#93e7bc'];
const names = ['PIMX Agent', 'PIMXSATS', 'PIMX Swap'];


export default function HomeShowcase() {
  const l = useSiteText();
  const { lang, theme } = useLanguageTheme();
  const reduced = useReducedMotion();
  const pointer = usePointerSurface<HTMLDivElement>();
  const inView = useInView(pointer.ref);
  const [active, setActive] = useState(0);
  const catalog = useMemo(() => getTranslatedProjects(lang), [lang]);
  const projects = exhibits.map(id => catalog.find(p => p.id === id)).filter(p => p !== undefined);
  const selected = projects[active];
  if (!selected) return null;
  const url = selected.link || selected.githubUrl;
  return <div {...pointer} className="home-showcase" data-active={inView && !reduced} style={{ '--showcase-accent': accents[active] } as CSSProperties}>
    <div className="showcase-topline micro-label" dir="ltr"><span><i/> {l('Selected work')}</span><span>0{active + 1} / 03</span></div>
    <div className="showcase-observatory" dir="ltr">
      <AnimatePresence mode="wait" initial={false}>
        <motion.a key={selected.id} className="showcase-aperture" href={url} target="_blank" rel="noopener noreferrer" aria-label={l(`Explore ${names[active]}`)} initial={reduced ? false : { opacity: 0, scale: .94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.04, y: -12 }} transition={{ duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }}>
          <div className="showcase-image-shell"><img src={getProjectScreenshot(selected.id, theme)} alt={selected.title} width={1280} height={720} fetchPriority="high"/><span className="showcase-image-light" aria-hidden="true"/></div>
          <span className="showcase-aperture-corner" aria-hidden="true"><ArrowUpRight size={25}/></span>
          <span className="showcase-domain micro-label">{selected.link ? new URL(selected.link).hostname : selected.repoName}</span>
        </motion.a>
      </AnimatePresence>
      <div className="showcase-selector" aria-label={l('Featured project selection')}>
        {projects.map((project, i) => <button type="button" key={project.id} aria-pressed={active === i} aria-label={names[i]} onClick={() => setActive(i)} style={{ '--tab-accent': accents[i] } as CSSProperties}><span className="showcase-selector-index micro-label">0{i + 1}</span><img src={getProjectScreenshot(project.id, theme)} alt="" width={128} height={72}/><span className="showcase-selector-name">{names[i]}</span><ArrowRight size={14}/></button>)}
      </div>
    </div>
    <div className="showcase-details"><div><p className="micro-label">{l(selected.badge)}</p><h2 dir="ltr">{names[active]}<span>.</span></h2><p className="showcase-description">{getProjectNote(lang, selected.id, selected.description)}</p></div><a href={url} target="_blank" rel="noopener noreferrer" className="showcase-open" aria-label={l(`Open ${names[active]}`)}><ArrowUpRight size={26}/></a></div>
    <a className="showcase-bottomline micro-label" href="/project"><span>{String(portfolioCatalogStats.liveWebsites).padStart(2, '0')} {l('LIVE WEBSITES')}</span><span>{l('EXPLORE THE COLLECTION')} <ArrowUpRight size={13}/></span></a>
  </div>;
}
