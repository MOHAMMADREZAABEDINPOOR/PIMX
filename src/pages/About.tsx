import { humanHomeCopy } from '../lib/human_copy';
import { useSiteText } from '../lib/useSiteText';
import PageHeadline from '../components/PageHeadline';
import { useState, type CSSProperties } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Pause,
  Play,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { aboutPageTranslations } from '../lib/about_translations';
import { cvTranslations, cvCertificates, cvSoftSkills } from '../lib/cv_data';
import { LanguageType } from '../lib/translations';
import DeveloperStory from '../components/DeveloperStory';
import SectionMotion, { ChapterDivider } from '../components/SectionMotion';
import '../styles/pages.css';
import SkillWorkbench from '../components/SkillWorkbench';
import { ApproachIllustration } from '../components/AboutIllustrations';
import '../styles/about-redesign.css';

const groups: Record<LanguageType, string[]> = {
  en: ['All skills', 'Engineering', 'AI & automation', 'Design & tools'],
  fa: ['همه مهارت‌ها', 'توسعه نرم‌افزار', 'هوش مصنوعی', 'طراحی و ابزارها'],
  ar: ['كل المهارات', 'البرمجة', 'الذكاء الاصطناعي', 'التصميم والأدوات'],
  de: ['Alle Fähigkeiten', 'Entwicklung', 'KI & Automation', 'Design & Tools'],
  fr: [
    'Compétences',
    'Développement',
    'IA & automatisation',
    'Design & outils',
  ],
  it: ['Competenze', 'Sviluppo', 'IA & automazione', 'Design & strumenti'],
  zh: ['全部技能', '软件开发', 'AI 与自动化', '设计与工具'],
  ru: [
    'Все навыки',
    'Разработка',
    'ИИ и автоматизация',
    'Дизайн и инструменты',
  ],
  el: ['Δεξιότητες', 'Ανάπτυξη', 'AI & αυτοματισμοί', 'Design & εργαλεία'],
  la: ['Omnes artes', 'Programmatio', 'AI & automata', 'Ars & instrumenta'],
};
function IdentityWorkbench({ fa }: { fa: boolean }) {
  const l = useSiteText();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 24 });
  return <SectionMotion className="about-monogram" kind="iris"><div className={`identity-workbench ${paused ? 'is-paused' : ''}`} onPointerMove={event => { if (reduced || event.pointerType !== 'mouse') return; const rect = event.currentTarget.getBoundingClientRect(); x.set((.5 - (event.clientY - rect.top) / rect.height) * 18); y.set(((event.clientX - rect.left) / rect.width - .5) * 22); }} onPointerLeave={() => { x.set(0); y.set(0); }}><span className="monogram-label">{l(fa ? 'کسی که پشت PIMX ایستاده' : 'THE PERSON BEHIND PIMX')}</span><div className="identity-grid" aria-hidden="true" /><motion.div className="identity-machine" style={reduced ? undefined : { rotateX, rotateY }} aria-hidden="true" dir="ltr"><div className="identity-rail rail-one" /><div className="identity-rail rail-two" /><div className="identity-cast"><span>m</span><span>r.</span><i /><i /><i /></div><div className="identity-asterisk">✳</div><div className="identity-code"><span>curiosity.init()</span><span>{l("idea → experiment")}</span><span>{l("experiment → build")}</span><span>{l("always.learning = true")}</span></div><div className="identity-tokens">{l(['PY', 'JS', 'TS', 'RS'].map((token, i) => <span key={token} style={{ '--token': i } as CSSProperties}>{l(token)}</span>))}</div></motion.div><div className="monogram-footer"><span dir="ltr">{l("RASHT, IRAN / SINCE 2021")}</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={l(paused ? (fa ? 'ادامهٔ حرکت' : 'Resume sculpture motion') : (fa ? 'توقف حرکت' : 'Pause sculpture motion'))}>{l(paused ? <Play size={13} /> : <Pause size={13} />)}</button></div></div></SectionMotion>;
}

export default function About() {
  const l = useSiteText();
  const { lang, dir, t } = useLanguageTheme();
  const reduced = useReducedMotion();
  const fa = lang === 'fa';
  const en = lang === 'en';
  const copy = { ...(aboutPageTranslations[lang] || aboutPageTranslations.en), aboutProfileDesc: humanHomeCopy[lang].role };
  const cv = cvTranslations[lang];
  const pillars = [
    { title: copy.aboutPillar1Title, desc: copy.aboutPillar1Desc },
    { title: copy.aboutPillar2Title, desc: copy.aboutPillar2Desc },
    { title: copy.aboutPillar3Title, desc: copy.aboutPillar3Desc },
    { title: copy.aboutPillar4Title, desc: copy.aboutPillar4Desc },
  ];
  return (
    <div className="portfolio-page about-page" dir={dir}>
      <header className="page-header page-container">
        <div className="page-kicker">
          <span>02 /</span>
          {l(t.navAbout)}
          <span className="kicker-line" />
        </div>
        <div className="page-heading-row">
          <motion.h1
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05, ease: [.22, 1, .36, 1] }}
          >
            <PageHeadline text={l(fa ? 'کنجکاوی،' : 'Curiosity,')} effect="discovery" rtl={dir==='rtl'}/><br/><em><PageHeadline text={l(fa ? 'با کد.' : 'in code.')} effect="discovery" rtl={dir==='rtl'}/></em>
          </motion.h1>
          <div className="page-intro">
            <p>{l(copy.aboutProfileDesc)}</p>
            <span className="small-label about-location">
              <MapPin size={14} />
              {l(cv.location)}
            </span>
          </div>
        </div>
      </header>
      <section
        className="page-container about-profile"
        aria-label={l(copy.aboutProfileTitle)}
      >
        <IdentityWorkbench fa={fa} />
        <SectionMotion className="about-story" kind="fold" delay={.1}>
          <span className="small-label">{l(copy.aboutProfileTitle)}</span>
          <h2>{humanHomeCopy[lang].aboutTitle}</h2>
          <p>{humanHomeCopy[lang].aboutBody}</p>
          <div className="about-story-links">
            <a className="page-pill" href="/resume">
              {l(t.navResume)}
              <ArrowUpRight size={18} />
            </a>
            <a
              className="page-text-link"
              href={cv.contactValues.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight size={18} />
            </a>
          </div>
          <blockquote>
            <span className="small-label">{l(cv.philosophyTitle)}</span>
            <p>{l(cv.philosophyQuote)}</p>
          </blockquote>
        </SectionMotion>
      </section>
      <ChapterDivider number="01" label={l(fa ? 'از اولین آزمایش تا پروژه‌های امروز' : 'THE EXPERIMENTS THAT BECAME A PRACTICE')} words={l(['IDEA.', 'ITERATE.', 'BUILD.'])} />
      <DeveloperStory />
      <ChapterDivider number="02" label={l(fa ? 'جعبه‌ابزار من، در حال گسترش' : 'A TOOLKIT THAT KEEPS EVOLVING')} words={l(['THINK.', 'MAKE.', 'REFINE.'])} />
      <SkillWorkbench labels={groups[lang]} title={l(cv.skillsTitle)} softSkills={cvSoftSkills[lang]}/>
      <section className="page-container about-approach">
        <div className="section-heading">
          <span className="small-label">02 / {l(copy.aboutEthicsTitle)}</span>
          <h2>
            {l(fa
              ? 'چطور کار می‌کنم؟'
              : en
                ? 'The way I work.'
                : copy.aboutEthicsTitle)}
          </h2>
        </div>
        <div className="approach-grid">
          {l(pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={reduced ? false : { opacity: 0, rotateY: index % 2 ? -15 : 15, y: 25, transformPerspective: 900 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <div className={`approach-art approach-art-${index}`}><ApproachIllustration index={index}/></div>
              <span className="small-label">0{l(index + 1)} /</span>
              <h3>{l(pillar.title)}</h3>
              <p>{l(pillar.desc)}</p>
            </motion.article>
          )))}
        </div>
      </section>
      <ChapterDivider number="03" label={l(fa ? 'مسیر یادگیری، همچنان باز است' : 'LEARNING IS AN OPEN-ENDED JOURNEY')} words={l(['STAY', 'CURIOUS.'])} />
      <section className="page-container about-education">
        <div className="section-heading">
          <span className="small-label">03 / {l(cv.educationTitle)}</span>
          <h2>
            {l(fa
              ? 'یادگیری، ادامه دارد.'
              : en
                ? 'Always a student.'
                : cv.educationTitle)}
          </h2>
        </div>
        <div className="education-layout">
          <div className="education-entry">
            <SectionMotion className="education-sculpture" kind="fold"><div aria-hidden="true" dir="ltr"><span>{l("LEARN")}</span><span>{l("BUILD")}</span><span>{l("REPEAT")}</span><i>↗</i></div></SectionMotion>
            <span className="small-label">{l(cv.eduTimeline)}</span>
            <h3>{l(cv.eduSchool)}</h3>
            <p>{l(cv.eduTitle)}</p>
            <p className="education-description">{l(cv.eduDesc)}</p>
          </div>
          <div className="certificate-summary">
            <span className="small-label">{l(cv.certificatesTitle)}</span>
            {l(cvCertificates.slice(0, 3).map((certificate) => (
              <a
                key={certificate.id}
                href={`/${encodeURIComponent(certificate.pdfFile?.replace('Programming for Everybody', 'Programming forEverybody') || '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{l(certificate.title[lang])}</span>
                <ArrowUpRight size={19} />
              </a>
            )))}
            <a className="page-text-link" href="/playground">
              {l(t.homeAwardBtn)}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <aside className="page-container page-cta">
        <span className="small-label">{l("NEXT / LET’S BUILD")}</span>
        <h2>
          {l(fa
            ? 'یک مسئله جالب دارید؟'
            : en
              ? 'Have an interesting challenge?'
              : t.navContact)}
        </h2>
        <a className="page-pill" href={`mailto:${cv.contactValues.email}`}>
          {l(fa
            ? 'بیایید درباره‌اش حرف بزنیم'
            : en
              ? 'Let’s talk about it'
              : t.contactTitle)}
          <ArrowUpRight size={20} />
        </a>
      </aside>
    </div>
  );
}
