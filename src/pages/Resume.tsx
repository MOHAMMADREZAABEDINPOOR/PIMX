import { loadSiteText, translateSiteText } from '../lib/site_text';
import { useSiteText } from '../lib/useSiteText';
import LanguageSelect from '../components/LanguageSelect';
import PageHeadline from '../components/PageHeadline';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Printer,
  Send,
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { LanguageType, languagesInfo } from '../lib/translations';
import {
  cvTranslations,
  cvProjects,
  cvCertificates,
  cvArduinoProjects,
  cvSkills,
  cvSoftSkills,
} from '../lib/cv_data';
import '../styles/resume.css';

type ResumeCopy = {
  eyebrow: string;
  first: string;
  second: string;
  description: string;
  download: string;
  language: string;
  all: string;
  personal: string;
  school: string;
  open: string;
  certificate: string;
  hardware: string;
};

const pageCopy: Record<LanguageType, ResumeCopy> = {
  en: {
    eyebrow: 'A living résumé',
    first: 'The story',
    second: 'so far.',
    description:
      'A closer look at the work, learning, and curiosity that shape what I build.',
    download: 'Download CV',
    language: 'CV language',
    all: 'All projects',
    personal: 'Personal',
    school: 'Academic',
    open: 'View certificate',
    certificate: 'Download',
    hardware: 'Hardware project',
  },
  fa: {
    eyebrow: 'رزومه و مسیر من',
    first: 'داستان من',
    second: 'تا امروز.',
    description:
      'نگاهی به تجربه‌ها، یادگیری و کنجکاوی‌هایی که به کارهایم شکل می‌دهند.',
    download: 'دانلود رزومه',
    language: 'زبان رزومه',
    all: 'همه پروژه‌ها',
    personal: 'شخصی',
    school: 'آموزشی',
    open: 'مشاهده گواهینامه',
    certificate: 'دانلود',
    hardware: 'پروژه سخت‌افزاری',
  },
  ar: {
    eyebrow: 'سيرتي الذاتية',
    first: 'رحلتي',
    second: 'حتى الآن.',
    description: 'نظرة أقرب على العمل والتعلّم والفضول الذي يشكّل ما أبنيه.',
    download: 'تحميل السيرة',
    language: 'لغة السيرة',
    all: 'جميع المشاريع',
    personal: 'شخصية',
    school: 'أكاديمية',
    open: 'عرض الشهادة',
    certificate: 'تحميل',
    hardware: 'مشروع أجهزة',
  },
  de: {
    eyebrow: 'Mein Lebenslauf',
    first: 'Mein Weg',
    second: 'bis heute.',
    description:
      'Ein Blick auf die Arbeit, das Lernen und die Neugier hinter meinen Projekten.',
    download: 'Lebenslauf laden',
    language: 'Sprache',
    all: 'Alle Projekte',
    personal: 'Persönlich',
    school: 'Akademisch',
    open: 'Zertifikat ansehen',
    certificate: 'Herunterladen',
    hardware: 'Hardware-Projekt',
  },
  fr: {
    eyebrow: 'Mon parcours',
    first: 'L’histoire',
    second: 'jusqu’ici.',
    description:
      'Le travail, les apprentissages et la curiosité qui façonnent mes créations.',
    download: 'Télécharger le CV',
    language: 'Langue du CV',
    all: 'Tous les projets',
    personal: 'Personnels',
    school: 'Académiques',
    open: 'Voir le certificat',
    certificate: 'Télécharger',
    hardware: 'Projet matériel',
  },
  it: {
    eyebrow: 'Il mio curriculum',
    first: 'La storia',
    second: 'finora.',
    description:
      'Il lavoro, lo studio e la curiosità che danno forma ai miei progetti.',
    download: 'Scarica il CV',
    language: 'Lingua del CV',
    all: 'Tutti i progetti',
    personal: 'Personali',
    school: 'Accademici',
    open: 'Vedi certificato',
    certificate: 'Scarica',
    hardware: 'Progetto hardware',
  },
  zh: {
    eyebrow: '我的履历',
    first: '我的故事',
    second: '到此刻。',
    description: '了解我的工作、学习，以及塑造每个项目的好奇心。',
    download: '下载简历',
    language: '简历语言',
    all: '全部项目',
    personal: '个人项目',
    school: '学术项目',
    open: '查看证书',
    certificate: '下载',
    hardware: '硬件项目',
  },
  ru: {
    eyebrow: 'Моё резюме',
    first: 'Мой путь',
    second: 'до сегодня.',
    description:
      'Работа, учёба и любознательность, которые стоят за моими проектами.',
    download: 'Скачать резюме',
    language: 'Язык резюме',
    all: 'Все проекты',
    personal: 'Личные',
    school: 'Учебные',
    open: 'Открыть сертификат',
    certificate: 'Скачать',
    hardware: 'Аппаратный проект',
  },
  el: {
    eyebrow: 'Το βιογραφικό μου',
    first: 'Η ιστορία',
    second: 'ως τώρα.',
    description: 'Η δουλειά, η μάθηση και η περιέργεια πίσω από όσα δημιουργώ.',
    download: 'Λήψη βιογραφικού',
    language: 'Γλώσσα',
    all: 'Όλα τα έργα',
    personal: 'Προσωπικά',
    school: 'Ακαδημαϊκά',
    open: 'Προβολή πιστοποιητικού',
    certificate: 'Λήψη',
    hardware: 'Έργο υλικού',
  },
  la: {
    eyebrow: 'Curriculum vitae',
    first: 'Iter meum',
    second: 'hucusque.',
    description: 'Opera, studia et curiositas quae mea incepta informant.',
    download: 'Depromere CV',
    language: 'Lingua CV',
    all: 'Omnia incepta',
    personal: 'Personalia',
    school: 'Academica',
    open: 'Spectare testimonium',
    certificate: 'Depromere',
    hardware: 'Inceptum ferramentorum',
  },
};

const cvLanguages: LanguageType[] = [
  'en',
  'fa',
  'ar',
  'de',
  'fr',
  'it',
  'zh',
  'ru',
  'el',
  'la',
];

export default function Resume() {
  const l = useSiteText();
  const { lang, dir } = useLanguageTheme();
  const reducedMotion = useReducedMotion();
  const [selectedCvLang, setCvLang] = React.useState<LanguageType | null>(null);
  const cvLang = selectedCvLang ?? lang;
  const cvLanguageRequest = React.useRef(0);
  const chooseCvLanguage = (language: LanguageType) => {
    const request=++cvLanguageRequest.current;
    void loadSiteText(language).then(()=>{
      if(request===cvLanguageRequest.current)setCvLang(language);
    }).catch(()=>{/* Keep the current resume readable if a locale asset fails. */});
  };
  const [projectFilter, setProjectFilter] = React.useState<
    'all' | 'personal' | 'school'
  >('all');

  const lc = <T,>(value:T):T => translateSiteText(cvLang,value);
  const activeTrans = cvTranslations[cvLang] || cvTranslations.en;
  const copy = pageCopy[lang];
  const cvCopy = pageCopy[cvLang];
  const cvDir = languagesInfo[cvLang].dir;
  const contacts = activeTrans.contactValues;
  const filteredProjects = cvProjects.filter(
    (project) =>
      projectFilter === 'all' ||
      (projectFilter === 'personal'
        ? project.category === 'personal'
        : project.category === 'school' || project.category === 'special')
  );
  const reveal = {
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  };

  return (
    <div className="resume-page container-wide" dir={dir}>
      <motion.div className="resume-hero resume-no-print" {...reveal}>
        <div className="resume-hero-copy">
          <p className="resume-eyebrow">
            <span aria-hidden="true">04 /</span> {l(copy.eyebrow)}
          </p>
          <h1>
            <PageHeadline text={l(copy.first)} effect="folio" rtl={dir === 'rtl'}/>
            <br />
            <span className="serif-word"><PageHeadline text={l(copy.second)} effect="folio" rtl={dir === 'rtl'}/></span>
          </h1>
        </div>
        <div className="resume-hero-aside">
          <p>{l(copy.description)}</p>
          <a
            className="button button-accent resume-download"
            href="/cv.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {l(copy.download)}
            <Download size={17} aria-hidden="true" />
          </a>
          <span className="resume-file-note">{l("PDF ·")}{l(activeTrans.name)}</span>
        </div>
      </motion.div>

      <div className="resume-toolbar resume-no-print">
        <div className="resume-language-control">
          <label htmlFor="resume-language">
            <Globe2 size={16} aria-hidden="true" />
            {l(copy.language)}
          </label>
          <LanguageSelect id="resume-language" value={cvLang} onChange={chooseCvLanguage} label={l(copy.language)}/>
        </div>
        <button
          type="button"
          className="resume-print-button"
          onClick={() => window.print()}
        >
          <Printer size={16} aria-hidden="true" />
          {l(cvTranslations[lang].downloadPdf)}
        </button>
      </div>

      <motion.article
        className={`resume-paper ${languagesInfo[cvLang].fontClass}`}
        dir={cvDir}
        lang={cvLang}
        aria-label={lc(activeTrans.name)}
        {...reveal}
      >
        <div className="resume-profile">
          <div className="resume-monogram" aria-hidden="true">
            MA<span>✳</span>
          </div>
          <div className="resume-profile-name">
            <h2>{lc(activeTrans.name)}</h2>
            <p>{lc(activeTrans.role)}</p>
          </div>
          <div className="resume-profile-location">
            <MapPin size={15} aria-hidden="true" />
            {lc(activeTrans.location)}
          </div>
        </div>

        <div className="resume-grid">
          <aside className="resume-sidebar">
            <section className="resume-side-section">
              <h3>{lc(activeTrans.contactTitle)}</h3>
              <div className="resume-contact-list">
                <a href={`mailto:${contacts.email}`}>
                  <Mail size={15} aria-hidden="true" />
                  <span dir="ltr">{lc(contacts.email)}</span>
                </a>
                <a href={`tel:${contacts.phone}`}>
                  <Phone size={15} aria-hidden="true" />
                  <span dir="ltr">{lc(contacts.phone)}</span>
                </a>
                <a
                  href={contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={15} aria-hidden="true" />
                  <span dir="ltr">
                    {lc(contacts.github.replace('https://', ''))}
                  </span>
                </a>
                <a
                  href={contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={15} aria-hidden="true" />
                  <span dir="ltr">
                    {lc(contacts.linkedin.replace('https://', ''))}
                  </span>
                </a>
                <a
                  href={`https://t.me/${contacts.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send size={15} aria-hidden="true" />
                  <span dir="ltr">{lc(contacts.telegram)}</span>
                </a>
              </div>
            </section>

            <section className="resume-side-section resume-philosophy">
              <h3>{lc(activeTrans.philosophyTitle)}</h3>
              <blockquote>{lc(activeTrans.philosophyQuote)}</blockquote>
            </section>

            <section className="resume-side-section">
              <h3>{lc(activeTrans.skillsTitle)}</h3>
              <div className="resume-skills" dir="ltr">
                {lc(cvSkills.map((skill) => (
                  <span key={skill}>{lc(skill)}</span>
                )))}
              </div>
              <ul className="resume-soft-skills">
                {lc(cvSoftSkills[cvLang].map((skill) => (
                  <li key={skill}>{lc(skill)}</li>
                )))}
              </ul>
            </section>

            <section className="resume-side-section">
              <h3>{lc(activeTrans.languagesTitle)}</h3>
              <div className="resume-language-level">
                <span>{lc(activeTrans.langPersianText)}</span>
                <span>100%</span>
              </div>
              <div className="resume-level-line" aria-hidden="true">
                <span style={{ width: '100%' }} />
              </div>
              <div className="resume-language-level">
                <span>{lc(activeTrans.langEnglishText)}</span>
                <span>50%</span>
              </div>
              <div className="resume-level-line" aria-hidden="true">
                <span style={{ width: '50%' }} />
              </div>
            </section>
          </aside>

          <div className="resume-main">
            <section className="resume-main-section">
              <div className="resume-section-heading">
                <span aria-hidden="true">01</span>
                <h3>{lc(activeTrans.educationTitle)}</h3>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-meta">
                  <span>{lc(activeTrans.eduSchool)}</span>
                  <span>{lc(activeTrans.eduTimeline)}</span>
                </div>
                <h4>{lc(activeTrans.eduTitle)}</h4>
                <p>{lc(activeTrans.eduDesc)}</p>
              </div>
            </section>

            <section className="resume-main-section">
              <div className="resume-section-heading">
                <span aria-hidden="true">02</span>
                <h3>{lc(activeTrans.projectsTitle)}</h3>
              </div>
              <div
                className="resume-project-filters resume-no-print"
                role="group"
                aria-label={lc(activeTrans.projectsTitle)}
              >
                {lc((['all', 'personal', 'school'] as const).map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={projectFilter === filter ? 'is-active' : ''}
                    aria-pressed={projectFilter === filter}
                    onClick={() => setProjectFilter(filter)}
                  >
                    {lc(cvCopy[filter])}
                  </button>
                )))}
              </div>
              <div className="resume-entry-list" aria-live="polite">
                {lc(filteredProjects.map((project) => (
                  <div className="resume-entry" key={project.id}>
                    <div className="resume-entry-meta">
                      <span>
                        {lc(project.category === 'special'
                          ? activeTrans.roleSpecial
                          : project.category === 'school'
                            ? activeTrans.schoolProj
                            : activeTrans.personalProj)}
                      </span>
                      <span>{lc(project.date[cvLang])}</span>
                    </div>
                    <h4>{lc(project.title[cvLang])}</h4>
                    <p>{lc(project.desc[cvLang])}</p>
                    <span className="resume-entry-location">
                      {lc(activeTrans.locationText)}: {lc(project.location[cvLang])}
                    </span>
                  </div>
                )))}
              </div>
            </section>

            <section className="resume-main-section">
              <div className="resume-section-heading">
                <span aria-hidden="true">03</span>
                <h3>{lc(activeTrans.arduinoProjectsTitle)}</h3>
              </div>
              <div className="resume-entry-list">
                {lc(cvArduinoProjects.map((project) => (
                  <div className="resume-entry" key={project.id}>
                    <div className="resume-entry-meta">
                      <span>{lc(cvCopy.hardware)}</span>
                      <span>{lc(project.date[cvLang])}</span>
                    </div>
                    <h4>{lc(project.title[cvLang])}</h4>
                    <p>{lc(project.desc[cvLang])}</p>
                    <span className="resume-entry-location">
                      {lc(activeTrans.locationText)}: {lc(project.location[cvLang])}
                    </span>
                  </div>
                )))}
              </div>
            </section>

            <section className="resume-main-section">
              <div className="resume-section-heading">
                <span aria-hidden="true">04</span>
                <h3>{lc(activeTrans.certificatesTitle)}</h3>
              </div>
              <div className="resume-entry-list">
                {lc(cvCertificates.map((certificate) => (
                  <div
                    className="resume-entry resume-certificate"
                    key={certificate.id}
                  >
                    <h4>{lc(certificate.title[cvLang])}</h4>
                    <p>{lc(certificate.desc[cvLang])}</p>
                    <div className="resume-certificate-footer">
                      <span className="resume-certificate-grade">
                        {lc(activeTrans.gradeText)}:{lc(' ')}
                        <strong>{lc(certificate.grade)}</strong>
                      </span>
                      {lc(certificate.pdfFile && (
                        <div className="resume-certificate-actions resume-no-print">
                          <a
                            href={`/${encodeURIComponent(certificate.pdfFile)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {lc(cvCopy.open)}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                          <a
                            href={`/${encodeURIComponent(certificate.pdfFile)}`}
                            download
                          >
                            {lc(cvCopy.certificate)}
                            <Download size={14} aria-hidden="true" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )))}
              </div>
            </section>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
