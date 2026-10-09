import { getProjectNote } from '../lib/project_notes';
import { useSiteText } from '../lib/useSiteText';
import AutoHeight from '../components/AutoHeight';
import ProjectLanguageSelect from '../components/ProjectLanguageSelect';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Boxes, ChevronDown, Code2, ExternalLink, Github, Globe2, Search, Send, X } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { getTranslatedProjects, TranslatedProjectItem } from '../lib/project_translations';
import { cvTranslations } from '../lib/cv_data';
import { LanguageType } from '../lib/translations';
import ProjectSculpture, { ProjectSculptureProvider, getProjectSculptureProfile } from '../components/ProjectSculpture';
import '../styles/pages.css';
import '../styles/projects.css';
import { OrbitType } from '../components/InteractiveHeadline';

type CatalogProject = TranslatedProjectItem & {
  language?: string;
  technologies?: string[];
  topics?: string[];
  updatedAt?: string;
  readmeExcerpt?: string;
  repoName?: string;
  isFork?: boolean;
  isArchived?: boolean;
  liveStatus?: 'verified' | 'unavailable' | 'unknown';
  verifiedAt?: string;
  forkSourceUrl?: string;
  readmeUrl?: string;
  linkKind?: 'website' | 'bot';
  activitySource?: 'http' | 'owner';
};
type Filter = 'all' | 'live' | 'featured' | 'ai' | 'web' | 'automation';
const filters: Filter[] = ['all', 'live', 'featured', 'ai', 'web', 'automation'];
const exhibitionExcludedIds = new Set(['github-import-export-company', 'github-pimx']);
const filterCopy: Record<LanguageType, string[]> = {
  en: ['All projects', 'Live projects', 'Featured', 'AI & agents', 'Web', 'Automation'],
  fa: ['تمام پروژه‌ها', 'پروژه‌های فعال', 'منتخب', 'هوش مصنوعی', 'وب', 'اتوماسیون'],
  ar: ['كل المشاريع', 'المشاريع النشطة', 'مميزة', 'الذكاء الاصطناعي', 'الويب', 'الأتمتة'],
  de: ['Alle Projekte', 'Aktive Projekte', 'Highlights', 'KI & Agenten', 'Web', 'Automation'],
  fr: ['Tous les projets', 'Projets actifs', 'À la une', 'IA & agents', 'Web', 'Automatisation'],
  it: ['Tutti i progetti', 'Progetti attivi', 'In evidenza', 'IA & agenti', 'Web', 'Automazione'],
  zh: ['全部项目', '在线项目', '精选', '人工智能', '网页', '自动化'],
  ru: ['Все проекты', 'Активные проекты', 'Избранное', 'ИИ и агенты', 'Веб', 'Автоматизация'],
  el: ['Όλα τα έργα', 'Ενεργά έργα', 'Επιλεγμένα', 'AI & πράκτορες', 'Web', 'Αυτοματοποίηση'],
  la: ['Omnia opera', 'Opera activa', 'Selecta', 'AI & agentes', 'Tela', 'Automata'],
};
const shortTitles: Record<string, string> = {
  'pimx-veil': 'PIMX_VEIL', 'pimx-moji': 'PIMX_MOJI', 'pimx-pass': 'PIMX_PASS DNS',
  'pimx-wide': 'PIMX_WIDE', 'pimx-node': 'PIMX_NODE', 'mml-wallet-bot': 'MML_WALLET',
  'pimx-pass-bot': 'PIMX_PASS BOT', 'pimx-play-bot': 'PIMX_PLAY BOT', 'pimx-sonic-bot': 'PIMX_SONIC',
};
const projectName = (project: CatalogProject) => shortTitles[project.id] || project.repoName || project.titleEn || project.title;
const technologies = (project: CatalogProject) => [...new Set([project.language, ...(project.technologies || [])].filter(Boolean))] as string[];
const matches = (project: CatalogProject, filter: Filter) => filter === 'all' || (filter === 'live' ? project.liveStatus === 'verified' && !!project.link : project.category === filter);
function hostname(url?: string) { try { return url ? new URL(url).hostname : ''; } catch { return ''; } }
const destinationAvailable = (project: CatalogProject) => !!project.link && project.liveStatus !== 'unavailable';
const isBot = (project: CatalogProject) => project.linkKind === 'bot';
function destinationAddress(project: CatalogProject) {
  try { const url = new URL(project.link || ''); return isBot(project) ? `${url.hostname}${url.pathname}` : url.hostname; } catch { return ''; }
}
function projectDate(value: string, isFa: boolean) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(isFa ? 'fa-IR' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Tehran' }).format(date);
}

function ProjectDialog({ project, isFa, lang, close }: { key?: string; project: CatalogProject; isFa: boolean; lang: LanguageType; close: () => void }) {
  const l = useSiteText();
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = dialog.current;
    const focused = document.activeElement as HTMLElement | null;
    if (!element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      focused?.focus();
    };
  }, []);
  const tech = technologies(project);
  const sculpture = getProjectSculptureProfile(project.id);
  return (
    <dialog ref={dialog} className="project-case-dialog" aria-labelledby="project-case-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} dir={isFa || lang === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div className="project-case-sheet" style={{ '--project-accent': sculpture.accent, '--project-background': sculpture.background } as CSSProperties} initial={reduced ? false : { opacity: 0, y: 35, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35 }}>
        <div className="project-case-visual"><ProjectSculpture id={project.id} interactive /><span className="case-visual-caption" dir="ltr">{l(sculpture.label)} / {l(project.badge)}</span></div>
        <button type="button" className="project-case-close" onClick={close} aria-label={l(isFa ? 'بستن جزئیات پروژه' : 'Close project details')}><X size={20} /></button>
        <div className="project-case-content">
          <span className="repo-eyebrow">{l(isFa ? 'از ایده تا اجرا' : 'BEHIND THE BUILD')}<span> / </span>{l(project.category.toUpperCase())}</span>
          <h2 id="project-case-title" dir="ltr">{l(projectName(project))}</h2>
          <p className="project-case-subtitle">{l(project.title)}</p>
          <p className="project-case-description">{l(project.description)}</p>
          {l(project.sourceNote && <p className="project-source-note">{l(project.sourceNote)}</p>)}
          {l(isBot(project) && <div className="project-bot-status"><Send size={18} /><div><strong>{l(isFa ? 'ربات تلگرام' : 'Telegram bot')}</strong>{project.liveStatus === 'verified' && <p>{l(isFa ? 'این پروژه در تلگرام اجرا می‌شود. وضعیت فعال بودن ربات طبق اعلام صاحب پروژه ثبت شده است.' : 'This project runs in Telegram. Its active status is reported by the project owner.')}</p>}<span dir="ltr">{l(destinationAddress(project))}</span></div></div>)}
          {l(project.isFork && <div className="project-fork-credit"><Github size={18} /><div><strong>{l(isFa ? 'مخزن فورک‌شده / پروژه آموزشی' : 'Forked repository / learning project')}</strong><p>{l(isFa ? 'این مخزن از پروژه‌ای دیگر منشعب شده است؛ کد پایه متعلق به نویسندگان مخزن اصلی است.' : 'This repository builds on an upstream project. The original authors retain credit for its base code.')}</p>{l(project.forkSourceUrl && <a href={project.forkSourceUrl} target="_blank" rel="noopener noreferrer">{l(isFa ? 'مخزن اصلی' : 'Original repository')}<ArrowUpRight size={14} /></a>)}</div></div>)}
          {l(project.liveStatus === 'unavailable' && <div className="project-deployment-unavailable"><Globe2 size={18} /><div><strong>{l(isFa ? 'پیش‌نمایش فعلاً در دسترس نیست' : 'The website is currently unavailable')}</strong><p>{l(isFa ? 'این آدرس در آخرین بررسی پاسخ معتبر نداد. کد پروژه در گیت‌هاب در دسترس است.' : 'The deployment did not return a working website during the latest check. Explore the project source on GitHub.')}</p><a href={project.link} target="_blank" rel="noopener noreferrer" dir="ltr">{l(hostname(project.link))}<ArrowUpRight size={14} /></a></div></div>)}
          {l(!!tech.length && <div className="repo-technologies" dir="ltr">{l(tech.map((item) => <span key={item}>{l(item)}</span>))}</div>)}
          {l(!!project.features?.length && <div className="project-case-features"><h3>{l(isFa ? 'داخل این پروژه' : 'INSIDE THE PROJECT')}</h3><ul>{l(project.features.map((feature, i) => <li key={i}><span>{l(String(i + 1).padStart(2, '0'))}</span><p>{l(feature.includes('123456789PIMX') ? feature.split(' (')[0] : feature)}</p></li>))}</ul></div>)}
          {l(project.readmeExcerpt && <details className="project-readme"><summary><Code2 size={16} />{l(isFa ? 'یادداشت‌های مخزن' : 'Repository notes')}<ChevronDown size={15} /></summary><p>{l(project.readmeExcerpt)}</p></details>)}
          {l((project.language || project.updatedAt || project.verifiedAt) && <dl className="project-case-facts">{l(project.language && <div><dt>{l(isFa ? 'زبان اصلی' : 'PRIMARY LANGUAGE')}</dt><dd dir="ltr">{l(project.language)}</dd></div>)}{l(project.updatedAt && <div><dt>{l(isFa ? 'آخرین تغییر مخزن' : 'REPOSITORY UPDATED')}</dt><dd>{l(projectDate(project.updatedAt, isFa))}</dd></div>)}{l(project.verifiedAt && <div><dt>{l(isBot(project) ? (isFa ? 'اعلام وضعیت فعالیت' : 'ACTIVITY REPORTED') : (isFa ? 'بررسی آدرس سایت' : 'DEPLOYMENT CHECKED'))}</dt><dd>{l(projectDate(project.verifiedAt, isFa))}</dd></div>)}</dl>)}
          <div className="project-case-links">
            {l(destinationAvailable(project) && <a className="repo-primary-link" href={project.link} target="_blank" rel="noopener noreferrer">{l(isBot(project) ? <Send size={17} /> : <Globe2 size={17} />)}{l(isBot(project) ? (isFa ? 'ورود به ربات' : 'Open bot') : (isFa ? 'باز کردن پروژه' : 'Open project'))}<ArrowUpRight size={17} /></a>)}
            {l(project.githubUrl && <a className={destinationAvailable(project) ? 'repo-secondary-link' : 'repo-primary-link'} href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={17} />{l(project.githubLinkKind === 'record' ? (isFa ? 'رکورد پروژه در گیت‌هاب' : 'Project record on GitHub') : (isFa ? 'کد در گیت‌هاب' : 'View source'))}<ArrowUpRight size={16} /></a>)}
            {l(project.readmeUrl && <a className="repo-secondary-link" href={project.readmeUrl} target="_blank" rel="noopener noreferrer"><Code2 size={16} />{l("README")}<ArrowUpRight size={15} /></a>)}
          </div>
          {l(project.link && <p className="project-case-url" dir="ltr">{l(destinationAddress(project))}{l(project.liveStatus === 'verified' && <span><i />{l(isBot(project) ? (isFa ? 'فعال / اعلام صاحب پروژه' : 'ACTIVE / OWNER-REPORTED') : (isFa ? 'لینک بررسی‌شده' : 'VERIFIED LINK'))}</span>)}</p>)}
        </div>
      </motion.div>
    </dialog>
  );
}

export default function Projects() {
  const l = useSiteText();
  const { dir, t, lang } = useLanguageTheme();
  const reduced = useReducedMotion();
  const isFa = lang === 'fa';
  const projects = useMemo(() => getTranslatedProjects(lang) as CatalogProject[], [lang]);
  const featured = useMemo(() => projects.filter(project => project.liveStatus === 'verified' && project.link && !isBot(project) && !exhibitionExcludedIds.has(project.id)), [projects]);
  const [selectedId, setSelectedId] = useState(featured[0]?.id || '');
  const [direction, setDirection] = useState(1);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('all');
  const [limit, setLimit] = useState(12);
  const [detailId, setDetailId] = useState<string | null>(null);
  const archiveRef = useRef<HTMLElement>(null);
  const selected = featured.find((project) => project.id === selectedId) || featured[0];
  const selectedIndex = featured.findIndex((project) => project.id === selected?.id);
  const selectedSculpture = selected ? getProjectSculptureProfile(selected.id) : null;
  const detail = projects.find((project) => project.id === detailId);
  const websiteCount = projects.filter((project) => matches(project, 'live') && !isBot(project)).length;
  const activeBotCount = projects.filter((project) => matches(project, 'live') && isBot(project)).length;
  const repositoryCount = projects.filter((project) => !!project.githubUrl && project.githubLinkKind !== 'record').length;
  const languages = useMemo(() => [...new Set(projects.map((project) => project.language).filter(Boolean))].sort() as string[], [projects]);
  const visible = useMemo(() => projects.filter((project) => {
    const search = `${project.title} ${project.titleEn} ${project.description} ${getProjectNote(lang, project.id, project.description)} ${projectName(project)} ${project.language || ''} ${project.technologies?.join(' ') || ''} ${project.features?.join(' ') || ''} ${project.topics?.join(' ') || ''}`.toLocaleLowerCase();
    return matches(project, filter) && (language === 'all' || project.language === language) && search.includes(query.trim().toLocaleLowerCase());
  }), [projects, filter, language, query, lang]);
  const select = (id: string) => { setDirection(featured.findIndex((project) => project.id === id) >= selectedIndex ? 1 : -1); setSelectedId(id); };
  const step = (amount: number) => { setDirection(amount); setSelectedId(featured[(selectedIndex + amount + featured.length) % featured.length].id); };
  useEffect(() => { setLimit(12); }, [filter, language, query]);

  return (
    <ProjectSculptureProvider>
    <div className="portfolio-page projects-experience" dir={dir}>
      <header className="projects-editorial-header page-container">
        <div className="page-kicker"><span>01 /</span>{l(t.navProjects)}<span className="kicker-line" /><span className="projects-header-index" dir="ltr">{l("BUILD / BREAK / REPEAT")}</span></div>
        <div className="projects-title-row">
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {l(isFa ? <><OrbitType text="فقط ایده نیست." rtl/><em><OrbitType text="ساخته‌ام." rtl/></em></> : lang === 'en' ? <><OrbitType text={l("Code.")}/><em><OrbitType text={l("In orbit.")}/></em></> : <><OrbitType text={l(t.projectsTitle)}/><span className="projects-title-asterisk" aria-hidden="true">✳</span></>)}
          </motion.h1>
          <div className="projects-header-note"><p>{l(isFa ? 'من با کد، به ایده‌ها شکل می‌دهم؛ از ابزارهای مستقل وب و امنیت اطلاعات تا ربات‌ها و تجربه‌های تعاملی. اینجا می‌توانی وارد دنیای پروژه‌های من شوی، محصول را تجربه کنی و کدِ پشت آن را ببینی.' : lang === 'en' ? 'I turn questions into things you can use. Independent web tools, security experiments, bots and interactive experiences. Explore the projects, try the products, and see the code behind them.' : t.projectsSub)}<br /></p><a href="#project-archive" onClick={(event) => { event.preventDefault(); archiveRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }}>{l(isFa ? 'همه پروژه‌ها را ببین' : 'Explore the complete archive')}<ArrowDown size={16} /></a></div>
        </div>
        <div className="projects-real-counts" dir="ltr"><span><b>{l(String(projects.length).padStart(2, '0'))}</b>{l(isFa ? 'پروژه' : 'PROJECTS')}</span><span><b>{l(String(repositoryCount).padStart(2, '0'))}</b>{l(isFa ? 'مخزن گیت‌هاب' : 'REPOSITORIES')}</span><span><b>{l(String(websiteCount).padStart(2, '0'))}</b>{l(isFa ? 'سایت بررسی‌شده' : 'VERIFIED WEBSITES')}<i /></span>{l(activeBotCount > 0 && <span><b>{l(String(activeBotCount).padStart(2, '0'))}</b>{l(isFa ? 'ربات تلگرام فعال' : 'ACTIVE TELEGRAM BOT')}<i /></span>)}<span className="projects-count-caption">{l("PIMX / INDEPENDENT DEVELOPMENT")}</span></div>
      </header>

      {l(selected && selectedSculpture && <section className="project-observatory-shell page-container" style={{ '--project-accent': selectedSculpture.accent, '--project-background': selectedSculpture.background } as CSSProperties} aria-label={l(isFa ? 'نمایشگاه تعاملی سه‌بعدی پروژه‌های منتخب' : 'Interactive 3D project exhibition')}>
        <AutoHeight className="project-observatory-height"><div className="project-observatory">
        <div className="project-orbit-stage">
          <span className="project-stage-label" dir="ltr">{l("EXHIBIT")}{l(String(selectedIndex + 1).padStart(2, '0'))} / {l(selectedSculpture.label)}</span>
          <div className="project-orbit-word" aria-hidden="true">{l(projectName(selected).replace(/PIMX[_\s/-]*/i, '').split('_')[0])}</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected.id} className="project-stage-sculpture" initial={reduced ? false : { opacity: 0, scale: 0.88, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.08, rotate: 3 }} transition={{ duration: reduced ? 0 : 0.42 }}>
              <ProjectSculpture id={selected.id} interactive />
            </motion.div>
          </AnimatePresence>
          <div className="project-stage-caption"><span>{l(isFa ? 'پروژه را از نزدیک کشف کن.' : 'Explore the build. A closer look.')}</span><span dir="ltr">{l("PRODUCT / IN MOTION")}</span></div>
        </div>
        <div className="project-orbit-dossier">
          <div className="project-dossier-top"><span className="repo-eyebrow">{l(isFa ? 'در مدار پروژه‌ها' : 'IN THE PROJECT ORBIT')}</span><span className="dossier-coordinate" dir="ltr">{l(String(selectedIndex + 1).padStart(2, '0'))} / {l(String(featured.length).padStart(2, '0'))}</span></div>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div key={selected.id} className="project-dossier-content" custom={direction} initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 28, filter: 'none' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -20, filter: 'none' }} transition={{ duration: reduced ? 0.1 : 0.28 }}>
              <span className="dossier-category"><span />{l(selected.badge)}</span>
              <h2 dir="ltr">{l(projectName(selected).replace(/_/g, '_\u200b'))}</h2>
              <p className="dossier-subtitle">{l(selected.title)}</p>
              <p className="dossier-description">{getProjectNote(lang, selected.id, selected.description)}</p>
              {l(!!technologies(selected).length && <div className="repo-technologies" dir="ltr">{l(technologies(selected).slice(0, 4).map((item) => <span key={item}>{l(item)}</span>))}</div>)}
              <div className="dossier-links">{l(destinationAvailable(selected) && <a className="repo-primary-link" href={selected.link} target="_blank" rel="noopener noreferrer">{l(selected.liveStatus === 'verified' && <i className="repo-live-dot" />)}{l(isBot(selected) ? (isFa ? 'ورود به ربات' : 'Open bot') : (isFa ? 'تجربه پروژه' : 'Experience the project'))}<ArrowUpRight size={19} /></a>)}{l(selected.githubUrl && <a className="dossier-github" href={selected.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={l(`${t.projectsSource}: ${selected.title}`)}><Github size={21} /></a>)}</div>
              <button type="button" className="dossier-read-story" onClick={() => setDetailId(selected.id)}>{l(isFa ? 'داستان و جزئیات پروژه' : 'Go behind the build')}<ArrowUpRight size={16} /></button>
              {l(selected.link && <span className="dossier-domain" dir="ltr">{l(destinationAddress(selected))}{l(selected.liveStatus === 'verified' && <small>{l(isBot(selected) ? 'ACTIVE BOT ↗' : 'VERIFIED ↗')}</small>)}</span>)}
            </motion.div>
          </AnimatePresence>
          <div className="project-dossier-controls"><div className="dossier-progress" dir="ltr">{l(featured.map((project, i) => <button key={project.id} type="button" className={selected.id === project.id ? 'is-active' : ''} aria-label={l(`${isFa ? 'انتخاب' : 'Select'} ${projectName(project)}`)} aria-pressed={selected.id === project.id} onClick={() => select(project.id)}><span>{l(String(i + 1).padStart(2, '0'))}</span></button>))}</div><div className="dossier-next-prev" dir="ltr"><button type="button" onClick={() => step(-1)} aria-label={l(isFa ? 'پروژه قبلی' : 'Previous project')}><ArrowLeft size={18} /></button><button type="button" onClick={() => step(1)} aria-label={l(isFa ? 'پروژه بعدی' : 'Next project')}><ArrowRight size={18} /></button></div></div>
        </div>
      </div></AutoHeight></section>)}

      <section className="project-live-directory page-container" aria-labelledby="live-directory-title">
        <div className="live-directory-heading"><div><span className="repo-eyebrow">{l("LIVE /")}{l(String(featured.length).padStart(2, '0'))}</span><h2 id="live-directory-title">{l(isFa ? 'همهٔ سایت‌ها، در یک نگاه.' : 'Every website. In the wild.')}</h2></div><p>{l(isFa ? 'یک پروژه را انتخاب کن تا نمای آن را ببینی، یا مستقیم وارد سایت شو.' : 'Choose a product to explore its study, or open the live website.')}</p></div>
        <div className="live-directory-grid">{l(featured.map((project, i) => <motion.div key={project.id} className={`live-directory-item ${selectedId === project.id ? 'is-selected' : ''}`} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: (i % 4) * .06 }}><button type="button" onClick={() => { select(project.id); document.querySelector('.project-observatory')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }); }} aria-label={l(`${isFa ? 'نمایش' : 'Show'} ${projectName(project)}`)}><span dir="ltr">{l(String(i + 1).padStart(2, '0'))}</span><strong dir="ltr">{l(projectName(project))}</strong><small dir="ltr">{l(hostname(project.link))}</small></button><a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={l(`${isFa ? 'باز کردن سایت' : 'Open website'}: ${projectName(project)}`)}><ArrowUpRight size={18} /></a></motion.div>))}</div>
      </section>
      <div className="project-archive-divider page-container" aria-hidden="true"><span>✳</span><p>{l(isFa ? 'یک ذهن کنجکاو. مسیرهای متفاوت.' : 'ONE CURIOUS MIND. MANY DIRECTIONS.')}</p><span>↓</span></div>
      <section className="project-repository-archive page-container" id="project-archive" ref={archiveRef} aria-labelledby="archive-title">
        <div className="archive-title-row"><div><span className="repo-eyebrow">02 / {l(isFa ? 'آرشیو کامل' : 'THE COMPLETE ARCHIVE')}</span><h2 id="archive-title">{l(isFa ? 'هر پروژه، یک جهان.' : 'Every build. Its own world.')}<sup>{l(projects.length)}</sup></h2></div><p>{l(isFa ? 'نام، موضوع یا زبان برنامه‌نویسی را جست‌وجو کن. برای هر پروژه، توضیحات و لینک‌های موجود در دسترس‌اند.' : 'Search by name, idea or language. Open a project to explore its purpose, implementation, and available links.')}</p></div>
        <div className="archive-search-row"><label className="archive-search"><Search size={19} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={l(isFa ? 'دنبال کدام ایده می‌گردی؟' : 'Find a project, language or idea…')} aria-label={l(isFa ? 'جست‌وجوی پروژه‌ها' : 'Search projects')} />{l(query && <button type="button" onClick={() => setQuery('')} aria-label={l(isFa ? 'پاک کردن جست‌وجو' : 'Clear search')}><X size={16} /></button>)}</label>{l(!!languages.length && <ProjectLanguageSelect value={language} onChange={setLanguage} fa={isFa} label={l(isFa ? 'فیلتر زبان برنامه‌نویسی' : 'Filter programming language')} options={[{value:'all',label:isFa?'تمام زبان‌ها':'Every language',count:projects.length},...languages.map(item=>({value:item,label:item,count:projects.filter(project=>project.language===item).length}))]}/>)}</div>
        <div className="archive-filter-row"><div className="archive-filters" aria-label={l(isFa ? 'فیلتر پروژه‌ها' : 'Project filters')}>{l(filters.map((item, index) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{l(filterCopy[lang][index])}<span>{l(projects.filter((project) => matches(project, item)).length)}</span></button>))}</div><span className="archive-result-count" aria-live="polite">{l(isFa ? `${visible.length} پروژه` : `${visible.length} ${l(visible.length === 1 ? 'PROJECT' : 'PROJECTS')}`)}</span></div>
        <div className="repository-grid">
          <AnimatePresence mode="popLayout">
            {l(visible.slice(0, limit).map((project, index) => {
              const sculpture = getProjectSculptureProfile(project.id);
              const editorial = filter === 'all' && !query.trim() && language === 'all' && index < 6;
              const composition = editorial ? ['panorama', 'portrait', 'duo', 'duo', 'portrait', 'panorama'][index] : index % 7 === 4 ? 'offset' : 'compact';
              return <motion.article key={project.id} layout={!reduced} data-project-id={project.id} style={{ '--project-accent': sculpture.accent, '--project-background': sculpture.background } as CSSProperties} initial={reduced ? false : { opacity: 0, y: 45, rotateX: 6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: '60px' }} exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : (index % 3) * 0.045 }} className={`repository-card repository-card-${composition}`} onPointerMove={(event) => {
                if (reduced || event.pointerType !== 'mouse') return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width;
                const y = (event.clientY - bounds.top) / bounds.height;
                event.currentTarget.style.setProperty('--tilt-x', `${(y - 0.5) * -3}deg`);
                event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`);
                event.currentTarget.style.setProperty('--spot-x', `${x * 100}%`);
                event.currentTarget.style.setProperty('--spot-y', `${y * 100}%`);
              }} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); }}>
                <div className="repository-card-inner">
                  <button type="button" className="repository-card-visual" onClick={() => setDetailId(project.id)} aria-label={l(`${isFa ? 'جزئیات پروژه' : 'Project details'}: ${project.title}`)}>
                    <ProjectSculpture id={project.id} />
                    <span className="repository-visual-number" dir="ltr">{l("EXHIBIT /")}{l(String(projects.indexOf(project) + 1).padStart(2, '0'))}</span>
                    <span className="repository-art-name" dir="ltr">{l(sculpture.label)}</span>
                    <span className="repository-visual-open"><ArrowUpRight size={23} /></span>
                    {l(project.liveStatus === 'verified' && project.link && <span className={`repository-live-label ${isBot(project) ? 'repository-bot-label' : ''}`}><i />{l(isBot(project) ? (isFa ? 'ربات تلگرام' : 'TELEGRAM BOT') : (isFa ? 'سایت فعال' : 'LIVE WEBSITE'))}</span>)}
                    {l(project.liveStatus === 'unavailable' && <span className="repository-offline-label">{l(isFa ? 'پیش‌نمایش در دسترس نیست' : 'WEBSITE UNAVAILABLE')}</span>)}
                  </button>
                  <div className="repository-card-body">
                    <span className="repo-eyebrow">{l(project.badge)}{l(project.isArchived && <span className="repo-archived"> / {l(isFa ? 'آرشیو' : 'ARCHIVED')}</span>)}</span>
                    <h3 dir="ltr"><button type="button" onClick={() => setDetailId(project.id)}>{l(projectName(project).replace(/_/g, '_\u200b'))}</button></h3>
                    <p className="repository-description">{getProjectNote(lang, project.id, project.description)}</p>
                    <div className="repository-card-tech" dir="ltr">{l(technologies(project).slice(0, 3).map((item) => <span key={item}><i />{l(item)}</span>))}{l(project.isFork && <span>{l(isFa ? 'فورک / آموزشی' : 'FORK / LEARNING')}</span>)}</div>
                    {l(project.githubUrl && <a className="repository-source-action" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} />{l(project.githubLinkKind === 'record' ? (isFa ? 'رکورد پروژه در گیت‌هاب' : 'Project record on GitHub') : (isFa ? 'کد پروژه در گیت‌هاب' : 'Source on GitHub'))}<ArrowUpRight size={13} /></a>)}
                    <div className="repository-card-footer">
                      <button type="button" className="repository-story" onClick={() => setDetailId(project.id)}>{l(isFa ? 'وارد دنیای پروژه شو' : 'Enter this world')}<ArrowUpRight size={17} /></button>
                      <div>{l(project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={l(`${t.projectsSource}: ${project.title}`)}><Github size={18} /></a>)}{l(destinationAvailable(project) && <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={l(`${isBot(project) ? (isFa ? 'ورود به ربات' : 'Open bot') : t.projectsVisit}: ${project.title}`)}>{l(isBot(project) ? <Send size={18} /> : <ExternalLink size={18} />)}</a>)}</div>
                    </div>
                  </div>
                </div>
              </motion.article>;
            }))}
          </AnimatePresence>
        </div>
        {l(!visible.length && <div className="archive-empty"><Boxes size={38} strokeWidth={1} /><h3>{l(isFa ? 'هنوز در این مدار چیزی نیست.' : 'Nothing in this orbit yet.')}</h3><p>{l(isFa ? 'با یک واژه یا فیلتر دیگر دوباره جست‌وجو کن.' : 'Try a different search or filter.')}</p><button type="button" onClick={() => { setFilter('all'); setQuery(''); setLanguage('all'); }}>{l(isFa ? 'نمایش تمام پروژه‌ها' : 'Show every project')}<ArrowUpRight size={17} /></button></div>)}
        {l(limit < visible.length && <div className="archive-load-more"><span dir="ltr">{l(Math.min(limit, visible.length))} / {l(visible.length)}</span><button type="button" onClick={() => setLimit((current) => current + 12)}>{l(isFa ? 'پروژه‌های بیشتری ببین' : 'Keep exploring')}<ArrowDown size={17} /></button><span>{l(isFa ? `${visible.length - limit} پروژه دیگر` : `${visible.length - limit} ${l('MORE BUILDS')}`)}</span></div>)}
      </section>
      <aside className="project-next-idea page-container"><span className="repo-eyebrow">{l("NEXT / YOUR IDEA")}</span><div><h2>{l(isFa ? <>جهان بعدی را<br /><em>با هم بسازیم.</em></> : lang === 'en' ? <>{l("Let’s build")}<br /><em>{l("what’s next.")}</em></> : t.navContact)}</h2><a href={`mailto:${cvTranslations[lang].contactValues.email}`}><ArrowUpRight size={36} strokeWidth={1.3} /><span>{l(isFa ? 'شروع یک گفتگو' : lang === 'en' ? 'Start a conversation' : t.contactTitle)}</span></a></div></aside>
      <AnimatePresence>{l(detail && <ProjectDialog key={detail.id} project={detail} isFa={isFa} lang={lang} close={() => setDetailId(null)} />)}</AnimatePresence>
    </div>
    </ProjectSculptureProvider>
  );
}
