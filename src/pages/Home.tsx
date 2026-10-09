import { getProjectNote, expertiseIntro } from '../lib/project_notes';
import { useSiteText } from '../lib/useSiteText';
import React, { Suspense, lazy } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Asterisk,
  Code2,
  BrainCircuit,
  Workflow,
  Plus,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { getTranslatedProjects, portfolioCatalogStats } from '../lib/project_translations';
import { cvTranslations } from '../lib/cv_data';
import { portfolioHomeCopy } from '../lib/portfolio_home_copy';
import { githubCatalogStats } from '../lib/github_projects';
import { cvCertificates } from '../lib/cv_data';
import ProjectSculpture, { ProjectSculptureProvider, getProjectSculptureProfile } from '../components/ProjectSculpture';
import ProjectHoverCard from '../components/ProjectHoverCard';
import { KineticText } from '../components/KineticText';
import '../styles/home.css';
import '../styles/home-motion.css';
import '../styles/home-redesign.css';

const HomeShowcase = lazy(() => import('../components/HomeShowcase'));
const featuredProjectIds = ['github-pimx-agent','github-pimx-morph','pimx-veil','pimx-node','pimx-moji','github-pimxsats'];
const ease = [0.22, 1, 0.36, 1] as const;
function navigate(event: React.MouseEvent<HTMLAnchorElement>) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  window.history.pushState({}, '', event.currentTarget.getAttribute('href')!);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
export default function Home() {
  const l = useSiteText();
  const { lang } = useLanguageTheme();
  const c = portfolioHomeCopy[lang];
  const reduced = useReducedMotion();
  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const sculptureY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : 110]
  );
  const sculptureRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : 8]
  );
  const [activeService, setActiveService] = React.useState<number | null>(0);
  const selected = React.useMemo(() => getTranslatedProjects(lang).filter(project => featuredProjectIds.includes(project.id) && project.link && project.liveStatus === 'verified' && project.linkKind !== 'bot'), [lang]);
  const headline = [c.first, c.second];
  const contact = cvTranslations.en.contactValues;
  const catalogLabels = {
    en: ['Public repositories', 'Verified websites', 'Learning credentials'],
    fa: ['مخزن عمومی گیت‌هاب', 'سایت با لینک بررسی‌شده', 'گواهینامهٔ آموزشی'],
    ar: ['مستودعات عامة', 'مواقع تم التحقق منها', 'شهادات تعليمية'],
    de: ['Öffentliche Repositories', 'Geprüfte Websites', 'Lernzertifikate'],
    fr: ['Dépôts publics', 'Sites vérifiés', 'Certificats de formation'],
    it: ['Repository pubblici', 'Siti verificati', 'Certificati di studio'],
    zh: ['公开代码仓库', '已验证的网站', '学习证书'],
    ru: ['Открытые репозитории', 'Проверенные сайты', 'Сертификаты обучения'],
    el: ['Δημόσια αποθετήρια', 'Επαληθευμένοι ιστότοποι', 'Πιστοποιητικά μάθησης'],
    la: ['Repositoria publica', 'Situs verificati', 'Testimonia studii'],
  }[lang];
  const reveal = {
    initial: false as const,
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: reduced ? 0 : 0.8, ease },
  };
  return (
    <ProjectSculptureProvider><div className="home-page">
      <section
        className="hero container-wide"
        ref={heroRef}
        aria-labelledby="hero-title"
      >
        <div className="hero-topline micro-label">
          <span>
            <span className="status-dot" />
            {l(c.available)}
          </span>

        </div>
        <div className="hero-composition">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, ease, delay: 0.12 }}
          >
            <p className="hero-intro micro-label">
              <span className="tiny-rule" />
              {l(c.hello)}
            </p>
            <h1 id="hero-title" aria-label={l(headline.join(' '))}>
              <span className="hero-line" aria-hidden="true">{l(headline[0].split(' ').map((word, i) => <motion.span className="hero-word" key={i} initial={reduced ? false : { y: '110%', rotateX: -75, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} transition={{ duration: .85, delay: .12 + i * .09, ease }}>{l(word)}{l('\u00a0')}</motion.span>))}</span>
              <span className="serif-word hero-line" aria-hidden="true">
                {l(headline[1].split(' ').map((word, i) => <motion.span className="hero-word" key={i} initial={reduced ? false : { y: '110%', rotateX: -75, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} transition={{ duration: .95, delay: .3 + i * .09, ease }}>{l(word)}{l(i < headline[1].split(' ').length - 1 ? '\u00a0' : '')}</motion.span>))}

              </span>
            </h1>
            <p className="hero-role">{l(c.role)}</p>
            <p className="hero-bio">{l(c.bio)}</p>
            <div className="hero-actions">
              <a
                className="button button-accent"
                href="/project"
                onClick={navigate}
              >
                {l(c.explore)}
                <ArrowDownRight size={20} />
              </a>
              <a
                className="hero-about-link text-link"
                href="/about"
                onClick={navigate}
              >
                {l(c.about)}
                <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-socials">
              <a href={contact.github} target="_blank" rel="noreferrer">
                <Github size={17} />
                GitHub
                <ArrowUpRight size={12} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} />
                LinkedIn
                <ArrowUpRight size={12} />
              </a>
              <span className="hero-social-rule" />
              <span className="micro-label">{l(c.location)}</span>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            style={{ y: sculptureY, rotate: sculptureRotate }}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 1.3, ease, delay: 0.18 }}
          >
            <Suspense
              fallback={
                <div
                  className="sculpture-loading"
                  aria-label={l("Loading interactive sculpture")}
                >
                  <span />
                </div>
              }
            >
              <HomeShowcase />
            </Suspense>
          </motion.div>
        </div>
        <div className="hero-bottomline micro-label">
          <a href="#selected-work">
            <span className="scroll-circle">
              <ArrowDown size={15} />
            </span>
            {l(c.scroll)}
          </a>
          <span>
            {l(c.tag)}
            <Asterisk size={17} />
          </span>
          <span>{l(c.since)}</span>
        </div>
      </section>
      <section className="home-process container-wide" aria-label={l(lang === 'fa' ? 'از ایده تا تجربه' : 'From idea to experience')}>
        <div className="home-process-top micro-label"><span>{l(lang === 'fa' ? 'از اولین فکر، تا محصولی که کار می‌کند.' : 'FROM A FIRST THOUGHT. TO SOMETHING THAT WORKS.')}</span><span>{l("THINK → BUILD → REFINE")}</span></div>
        <div className="process-intro"><h2>{l(lang === 'fa' ? 'از «چی می‌شه اگه…»' : 'From “what if”')}<br/><span className="serif-word">{l(lang === 'fa' ? 'تا «خودشه!»' : 'to “that’s it.”')}</span></h2><p>{l(lang === 'fa' ? 'ایده، نقطه‌ی شروع است. من مسئله را روشن می‌کنم، راه‌حل را می‌سازم و آن‌قدر روی جزئیات کار می‌کنم تا تجربه درست از آب دربیاید.' : 'An idea is the beginning. I find the right problem, build a working answer, and refine the details until the experience clicks.')}</p></div>
        <div className="process-cards">{l((lang === 'fa' ? ['کشف.','ساخت.','صیقل.'] : ['DISCOVER.','BUILD.','REFINE.']).map((word,i)=><article className={`process-card process-card-${i}`} key={word}><div className="process-card-top micro-label" dir="ltr"><span>0{l(i+1)} / {l(['THE QUESTION','THE SYSTEM','THE EXPERIENCE'][i])}</span><ArrowUpRight size={16}/></div><div className={`process-art process-art-${i}`} aria-hidden="true">{l(i===0 ? <><i/><i/><i/><span>?</span></> : i===1 ? <><i/><i/><i/><span>↗</span></> : <><i/><i/><i/><span>✳</span></>)}</div><h3><KineticText text={l(word)} variant={(['blur','fold','shutter'] as const)[i]}/></h3><p>{l((lang === 'fa' ? ['قبل از نوشتن اولین خط کد، مسئله، آدم‌ها و هدف را می‌شناسم.','رابطی دقیق و سیستمی قابل‌اتکا؛ هر قطعه با هدفی مشخص.','جزئیات، حرکت و بازخورد؛ تا استفاده از محصول حس خوبی داشته باشد.'] : ['Before the first line of code: understand the people, the problem and the purpose.','Thoughtful interfaces meet dependable systems. Every part has a reason to be there.','Test the flow. Tune the details. Make the whole thing feel effortless.'])[i])}</p><span className="process-card-foot micro-label" dir="ltr">{l(['CLARITY BEFORE CODE','FORM MEETS FUNCTION','DETAILS MAKE THE DIFFERENCE'][i])}</span></article>))}</div>
      </section>
      <section
        className="selected-work container-wide section-space"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <motion.div {...reveal} className="section-heading">
          <div>
            <p className="section-kicker micro-label">
              <span>01 /</span>
              {l(c.work)}
            </p>
            <h2 id="work-title"><KineticText text={l(c.workSub)} variant="fold" /></h2>
          </div>
          <div className="section-heading-aside">
            <p>{l(c.workDesc)}</p>
            <a className="text-link" href="/project" onClick={navigate}>
              {l(c.all)}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
        <div className="selected-grid">
          {l(selected.map(
            (project, index) =>
              project && (
                <ProjectHoverCard
                  accent={getProjectSculptureProfile(project.id).accent}
                  className={`selected-project selected-project-${index % 3 + 1}`}
                  key={project.id}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                >
                  <a
                    className="project-preview-link"
                    href={project.link || '/project'}
                    onClick={project.link ? undefined : navigate}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noreferrer' : undefined}
                    aria-label={l(`${c.live}: ${project.title}`)}
                  >
                    <div className={`home-project-stage home-project-${project.id}`} style={{ '--project-tone': getProjectSculptureProfile(project.id).accent, '--project-backdrop': getProjectSculptureProfile(project.id).backdrop } as React.CSSProperties}>
                      <ProjectSculpture id={project.id} />
                    </div>
                    <span className="project-hover-ticket" aria-hidden="true"><span className="micro-label">{l(project.badge)}</span><span>{l('Enter this world')} <ArrowUpRight size={16}/></span><i/></span>
                    <span className="project-open-arrow">
                      <ArrowUpRight size={25} />
                    </span>
                    <span
                      className="project-preview-label micro-label"
                      dir="ltr"
                    >
                      {l("PIMX /")}{l(String(index + 1).padStart(2, '0'))}
                    </span>
                  </a>
                  <div className="selected-project-info">
                    <div>
                      <p className="micro-label project-category">
                        {l(project.badge)}
                      </p>
                      <h3>
                        <a
                          href={project.link || '/project'}
                          onClick={project.link ? undefined : navigate}
                          target={project.link ? '_blank' : undefined}
                          rel={project.link ? 'noreferrer' : undefined}
                        >
                          {l(project.repoName || project.titleEn)}
                        </a>
                      </h3>
                      <p className="selected-project-description">
                        {getProjectNote(lang, project.id, project.description)}
                      </p>
                    </div>
                    <span className="project-index micro-label" dir="ltr">
                      {l(String(index + 1).padStart(2, '0'))} <ArrowUpRight size={15} />
                    </span>
                  </div>
                </ProjectHoverCard>
              )
          ))}
        </div>
      </section>
      <section
        className="expertise-section container-wide section-space"
        aria-labelledby="expertise-title"
      >
        <motion.div {...reveal} className="expertise-layout">
          <div className="expertise-heading">
            <p className="section-kicker micro-label">
              <span>02 /</span>
              {l(c.tag)}
            </p>
            <h2 id="expertise-title">
              <KineticText text={l(c.expertise)} variant="fold"/>
              <br />
              <span className="serif-word"><KineticText text={l(c.expertiseItalic)} variant="fan"/></span>
            </h2>
            <p className="expertise-intro">{expertiseIntro[lang]}</p>
            <div className="craft-console" dir="ltr" data-service={activeService ?? 0}>
              <div className="craft-console-bar micro-label"><span><i/> {l("PIMX / THE WORKBENCH")}</span><span>0{l((activeService ?? 0)+1)}</span></div>
              <div key={activeService ?? 0} className="craft-diagram" aria-hidden="true"><span className="craft-node">{l(['UI','ASK','EVENT'][activeService ?? 0])}</span><i/><span className="craft-core">{l(React.createElement([Code2, BrainCircuit, Workflow][activeService ?? 0],{size:45,strokeWidth:1}))}</span><i/><span className="craft-node">{l(['API','ANSWER','ACTION'][activeService ?? 0])}</span></div>
              <div className="craft-console-bottom"><span>{l(['INTERFACE → SYSTEM','CONTEXT → INTELLIGENCE','TRIGGER → AUTOMATION'][activeService ?? 0])}</span><span>{l("BUILT WITH INTENT ↗")}</span></div>
            </div>
          </div>
          <div className="service-list">
            {l(c.services.map((service, index) => {
              const Icon = [Code2, BrainCircuit, Workflow][index];
              const active = activeService === index;
              return (
                <div
                  className={`service-row ${active ? 'is-active' : ''}`}
                  key={service}
                >
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls={`service-details-${index}`}
                    onClick={() => setActiveService(active ? null : index)}
                  >
                    <span className="micro-label service-number">
                      0{l(index + 1)}
                    </span>
                    <Icon className="service-icon" size={22} />
                    <span>{l(service)}</span>
                    <Plus className="service-expand" size={23} />
                  </button>
                  <div
                    className="service-description"
                    id={`service-details-${index}`}
                    aria-hidden={!active}
                    inert={!active}
                  >
                    <p>{l(c.serviceDescs[index])}</p>
                    <div className="service-tags">
                      {l([
                        ['React', 'TypeScript', 'Django'],
                        ['Prompt design', 'LLM integration', 'Python'],
                        ['Telegram', 'Python', 'Webhooks'],
                      ][index].map((tag) => (
                        <span key={tag}>{l(tag)}</span>
                      )))}
                    </div>
                    <a className="service-project-link text-link" href="/project" onClick={navigate}>{l(lang === 'fa' ? 'کارهای مرتبط را ببین' : 'Explore the work')}<ArrowUpRight size={16}/></a>
                  </div>
                </div>
              );
            }))}
            <div className="toolkit">
              <p className="micro-label">{l(c.tools)}</p>
              <div>
                {l([
                  'Python',
                  'Django',
                  'React',
                  'TypeScript',
                  'Git',
                  'PostgreSQL',
                ].map((tool) => (
                  <span key={tool}>{l(tool)}</span>
                )))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section
        className="home-about container-wide section-space"
        aria-labelledby="home-about-title"
      >
        <motion.div {...reveal} className="home-about-art" dir="ltr">
          <div className="identity-top micro-label"><span>{l("FIELD NOTES / 001")}</span><span>{l("RASHT, IRAN ↗")}</span></div>
          <div className="identity-monogram" aria-hidden="true">m<span>✳</span></div>
          <div className="identity-orbits" aria-hidden="true"><i/><i/><i/></div>
          <div className="identity-name">{l("Mohammadreza")}<br/><span>{l("Abedinpoor.")}</span></div>
          <div className="identity-caption"><span>{l("DEVELOPER BY PRACTICE.")}<br/>{l("CURIOUS BY NATURE.")}</span><span>{l("37.28° N")}<br/>{l("49.58° E")}</span></div>
        </motion.div>
        <motion.div {...reveal} className="home-about-copy">
          <p className="section-kicker micro-label">
            <span>03 /</span>
            {l(c.about)}
          </p>
          <h2 id="home-about-title">
            {l(c.aboutTitle)}
            <br />
            <span className="serif-word">{l(c.aboutItalic)}</span>
          </h2>
          <p>{l(c.aboutBody)}</p>

          <a className="text-link" href="/about" onClick={navigate}>
            {l(c.more)}
            <ArrowUpRight size={19} />
          </a>
          <div className="about-signature" dir="ltr">
            {l("Mohammadreza")}<span>✳</span>
          </div>
        </motion.div>
      </section>
    </div></ProjectSculptureProvider>
  );
}
