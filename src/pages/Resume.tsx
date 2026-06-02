import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Briefcase, GraduationCap, Trophy, Award, Cpu, 
  Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, 
  Send, ExternalLink, Download, Printer, CircleCheck, Sparkles, 
  BookOpen, Star, RefreshCw, Layers, CheckCircle2, ChevronRight,
  Globe2
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { LanguageType } from '../lib/translations';
import { 
  cvTranslations, cvProjects, cvCertificates, 
  cvArduinoProjects, cvSkills, cvSoftSkills, CVProject 
} from '../lib/cv_data';

// Custom synthesizer buzz for cyber sound scheme
const playHoverSound = () => {
  // Silence on hover
};

const playClickSound = () => {
  // Silence on click
};

export default function Resume() {
  const { lang, theme, dir, t } = useLanguageTheme();
  
  // Set default CV language display based on website selected language
  const [cvLang, setCvLang] = React.useState<LanguageType>(lang);
  const [projectFilter, setProjectFilter] = React.useState<'all' | 'personal' | 'school'>('all');
  
  // Sync CV language if website language changes
  React.useEffect(() => {
    setCvLang(lang);
  }, [lang]);

  const activeTrans = cvTranslations[cvLang] || cvTranslations['en'];
  const cvDir = cvLang === 'fa' || cvLang === 'ar' ? 'rtl' : 'ltr';

  // Helper translations for page headers in resume page layout
  const pageLocal: Record<string, Record<LanguageType, string>> = {
    pageHeading: {
      en: "Interactive Resume",
      fa: "رزومه تعاملی و برخط",
      ar: "سيرة ذاتية تفاعلية ونشطة",
      de: "Interaktiver Lebenslauf",
      fr: "Résumé Interactif",
      it: "Curriculum Interattivo",
      zh: "交互式个人简历",
      ru: "Интерактивное резюме",
      el: "Διαδραστικό Βιογραφικό",
      la: "Curriculum Vitae Cooperativum"
    },
    pageSubText: {
      en: "Explore Mohammadreza's professional achievements, certified academic tracks, and software products. Supports live translation and PDF compilation.",
      fa: "بررسی دستاوردهای حرفه‌ای، دوره‌های علمی تایید شده و محصولات توسعه‌یافته محمدرضا. همراه با قابلیت ترجمه و چاپ آنی.",
      ar: "اكتشف الإنجازات المهنية لـ محمد رضا، والمسارات الأكاديمية المعتمدة، والمشاريع البرمجية. تدعم الترجمة الفورية والطباعة.",
      de: "Entdecken Sie Mohammadrezas berufliche Erfolge, zertifizierte akademische Wege und Softwareprodukte. Unterstützt Live-Übersetzung und PDF-Erstellung.",
      fr: "Découvrez les réussites professionnelles de Mohammadreza, ses parcours académiques certifiés et ses créations logicielles. Supporte la traduction en direct et l'export PDF.",
      it: "Esplora i successi professionali di Mohammadreza, i percorsi accademici certificati e i prodotti software. Supporta la traduzione in tempo reale e la stampa PDF.",
      zh: "了解 Mohammadreza 的专业成就、官方学术认证和软件开发成果。支持实时语言翻译与 PDF 简历导出功能。",
      ru: "Изучите профессиональные успехи Мохаммадрезы, сертифицированные академические программы и программные разработки. Поддержка перевода и печати PDF.",
      el: "Εξερευνήστε τα επαγγελματικά επιτεύγματα, τα πιστοποιημένα ακαδημαϊκά μονοπάτια και τα προϊόντα λογισμικού του Mohammadreza. Υποστηρίζει ζωντανή μετάφραση και εξαγωγή σε PDF.",
      la: "Inspice res gestas Mohammadrezae, cursus academicos, et programmata. Cum conversione viva et facultate PDF imprimendi."
    },
    filterAll: {
      en: "All Projects", fa: "همه پروژه‌ها", ar: "جميع المشاريع", de: "Alle Projekte", fr: "Tous les projets",
      it: "Tutti i progetti", zh: "全部项目", ru: "Все проекты", el: "Όλα τα έργα", la: "Omnia incepta"
    },
    filterPersonal: {
      en: "Personal Work", fa: "پروژه‌های شخصی", ar: "الأعمال الشخصية", de: "Persönliche Arbeiten", fr: "Travail personnel",
      it: "Lavoro personale", zh: "个人项目", ru: "Личные проекты", el: "Προσωπικά έργα", la: "Incepta personalia"
    },
    filterSchool: {
      en: "Academic & School", fa: "پروژه‌های مدرسی و علمی", ar: "الأكاديمية والمدرسية", de: "Akademisch & Schule", fr: "Académique & Scolaire",
      it: "Accademico & Scolastico", zh: "学术与学校", ru: "Школьные и учебные", el: "Ακαδημαϊκά & Σχολικά", la: "Scholastica et Academica"
    }
  };

  const certLabels: Record<string, Record<LanguageType, string>> = {
    downloadBtn: {
      en: "Download",
      fa: "دانلود فایل",
      ar: "تحميل الملف",
      de: "Herunterladen",
      fr: "Télécharger",
      it: "Scarica",
      zh: "下载文件",
      ru: "Скачать",
      el: "Λήψη",
      la: "Depromere"
    },
    viewOnlineBtn: {
      en: "View Online",
      fa: "نمایش آنلاین",
      ar: "عرض على الإنترنت",
      de: "Online ansehen",
      fr: "Voir en ligne",
      it: "Visualizza online",
      zh: "在线预览",
      ru: "Просмотр آنلاین",
      el: "Προβολή",
      la: "Spectare in Interreti"
    }
  };

  const cvFileLabels: Record<LanguageType, string> = {
    en: "Download CV PDF",
    fa: "دانلود فایل CV",
    ar: "تحميل ملف السيرة الذاتية",
    de: "CV als PDF herunterladen",
    fr: "Télécharger le CV PDF",
    it: "Scarica il CV in PDF",
    zh: "下载 CV PDF",
    ru: "Скачать резюме PDF",
    el: "Λήψη CV σε PDF",
    la: "Depromere CV PDF"
  };

  const handlePrint = () => {
    playClickSound();
    // Use the native print dialog triggering our CSS media queries
    window.print();
  };

  const filteredProjects = cvProjects.filter(p => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'personal') return p.category === 'personal';
    if (projectFilter === 'school') return p.category === 'school' || p.category === 'special';
    return true;
  });

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative`}>
      {/* Dynamic Embed Print Media Layout Rules */}
      <style>{`
        @media print {
          /* Force page margins */
          @page {
            size: A4 portrait;
            margin: 1.2cm 1cm 1.2cm 1cm;
          }
          /* Reset color settings and override background animations */
          body, html, #mra-portfolio-app, main, .print-container {
            background: #ffffff !important;
            color: #0b1329 !important;
            box-shadow: none !important;
            overflow: visible !important;
            height: auto !important;
          }
          /* Force solid layout grid styling */
          .no-print, header, footer, #loader-root, .bg-decor {
            display: none !important;
          }
          .print-card {
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            color: #0b1329 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
          }
          /* Print font changes */
          h1, h2, h3, h4, h5, h6, p, span, li, a {
            color: #0d1222 !important;
            text-shadow: none !important;
          }
          /* Multi-column paper grid layout adjustment */
          .print-split-grid {
            display: grid !important;
            grid-template-columns: 280px 1fr !important;
            gap: 1.5rem !important;
            width: 100% !important;
            background: #ffffff !important;
          }
          .print-full-width {
            width: 100% !important;
            display: block !important;
          }
        }
      `}</style>

      {/* Hero Header Unit - Hidden during printing */}
      <div className="mb-10 text-center relative no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-teal/30 bg-teal-950/25 text-xs text-cyber-teal mb-4 font-mono animate-pulse">
          <FileText className="h-3.5 w-3.5" />
          <span>CYBER_CV_PIPELINE // PORT 3000 // ACTIVE</span>
        </div>
        
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-100'}`}>
          {pageLocal.pageHeading[lang] || pageLocal.pageHeading['en']}
        </h1>
        <p className={`mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>
          {pageLocal.pageSubText[lang] || pageLocal.pageSubText['en']}
        </p>

        {/* Dynamic Controls Bar */}
        <div className={`mt-8 flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl border border-dashed transition-all ${
          theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-dark-card/60 border-dark-border'
        }`}>
          {/* Resume Language Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-mono text-gray-500 uppercase flex items-center gap-1.5 whitespace-nowrap">
              <Globe2 className="h-3.5 w-3.5 text-cyber-teal" /> {cvLang === 'fa' ? 'زبان رزومه:' : cvLang === 'ar' ? 'لغة السيرة الذاتية:' : 'CV Language:'}
            </span>
            <div className="flex flex-wrap gap-1 p-1 rounded-xl border bg-slate-900 border-dark-border max-w-full">
              {(['en', 'fa', 'ar', 'de', 'fr', 'it', 'zh', 'ru', 'el', 'la'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    playClickSound();
                    setCvLang(l);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`px-2.5 py-1 text-[10px] rounded-md font-bold uppercase transition-all cursor-pointer ${
                    cvLang === l 
                      ? 'bg-cyber-teal text-slate-950 shadow-md font-black'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {l === 'en' ? 'EN' : 
                   l === 'fa' ? 'FA' : 
                   l === 'ar' ? 'AR' : 
                   l === 'de' ? 'DE' : 
                   l === 'fr' ? 'FR' : 
                   l === 'it' ? 'IT' : 
                   l === 'zh' ? 'ZH' : 
                   l === 'ru' ? 'RU' : 
                   l === 'el' ? 'EL' : 'LA'}
                </button>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex gap-2">
            {/* View Original raw file upload fallback if they want to view the literal screenshot */}
            <button
              onClick={handlePrint}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-sans bg-cyber-teal hover:bg-teals-400 text-slate-950 border border-cyber-cyan/20 transition-all hover:scale-[1.03] cursor-pointer shadow-md shadow-cyber-teal/10"
            >
              <Printer className="h-4 w-4" />
              <span>{activeTrans.downloadPdf}</span>
            </button>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => playClickSound()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-sans bg-slate-900 hover:bg-slate-800 text-cyber-cyan border border-cyber-cyan/20 transition-all hover:scale-[1.03] cursor-pointer shadow-md shadow-cyber-teal/10"
            >
              <Download className="h-4 w-4" />
              <span>{cvFileLabels[cvLang] || cvFileLabels.en}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Core CV Canvas - Styles modified for Print Screen suitability */}
      <div 
        dir={cvDir}
        className={`print-container rounded-2xl border p-6 md:p-10 transition-colors duration-300 relative ${
          theme === 'light' 
            ? 'bg-white border-slate-200 shadow-xl shadow-slate-200' 
            : 'bg-[#0f1422] border-dark-border/80 shadow-2xl shadow-black/40'
        }`}
      >
        {/* Paper visual guidelines - Hidden in Print */}
        <div className="no-print absolute top-3 right-6 flex items-center gap-1 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
          <CircleCheck className="h-3.5 w-3.5 text-cyber-teal" /> Verified CV Copy
        </div>

        {/* Split Grid Section */}
        <div className="print-split-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Bio Info, Philosophy, Contact channels, Skills & Languages */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. Header Detail Block */}
            <div className="text-center lg:text-start border-b border-dark-border/40 pb-6 print-card p-4 rounded-xl">
              {/* Virtual HighTech Avatar */}
              <div className="relative mx-auto lg:mx-0 w-24 h-24 rounded-full border-2 border-dashed border-cyber-teal flex items-center justify-center p-1.5 mb-4 group bg-slate-950/20">
                <div className="absolute inset-0 rounded-full border border-cyber-cyan/30 animate-spin duration-1500" />
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-teal-500/10 to-cyan-500/10 flex items-center justify-center border border-cyber-teal/30 relative overflow-hidden">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyber-cyan to-cyber-teal font-mono">
                    MA
                  </span>
                </div>
              </div>

              <h2 className={`text-xl md:text-2xl font-black font-sans leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
                {activeTrans.name}
              </h2>
              <p className="text-xs font-mono text-cyber-teal font-black uppercase mt-1">
                {activeTrans.role}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 mt-2 font-sans font-medium">
                <MapPin className="h-3.5 w-3.5 text-cyber-teal animate-bounce" />
                {activeTrans.location}
              </span>
            </div>

            {/* 2. Philosophy Block */}
            <div className={`p-4 rounded-xl border print-card ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19]/40 border-dark-border/50'
            }`}>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyber-cyan" />
                {activeTrans.philosophyTitle}
              </h3>
              <p className={`text-xs italic font-medium leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                {activeTrans.philosophyQuote}
              </p>
            </div>

            {/* 3. Contact Badge links */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider pb-1 border-b border-dark-border/40">
                {activeTrans.contactTitle}
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                {/* Telephone */}
                <a 
                  href={`tel:${activeTrans.contactValues.phone}`}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                    theme === 'light' ? 'hover:bg-slate-50 border-slate-200 text-slate-700' : 'hover:bg-dark-bg border-dark-border/50 text-gray-300'
                  }`}
                >
                  <Phone className="h-3.5 w-3.5 text-cyber-teal text-cyan-400 shrink-0" />
                  <span>{activeTrans.contactValues.phone}</span>
                </a>
                
                {/* Email Address */}
                <a 
                  href={`mailto:${activeTrans.contactValues.email}`}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all overflow-hidden text-ellipsis ${
                    theme === 'light' ? 'hover:bg-slate-50 border-slate-200 text-slate-700' : 'hover:bg-dark-bg border-dark-border/50 text-gray-300'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{activeTrans.contactValues.email}</span>
                </a>

                {/* Github Link */}
                <a 
                  href={activeTrans.contactValues.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                    theme === 'light' ? 'hover:bg-slate-50 border-slate-200 text-slate-700' : 'hover:bg-dark-bg border-dark-border/50 text-gray-300'
                  }`}
                >
                  <Github className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{activeTrans.contactValues.github.replace('https://', '')}</span>
                </a>

                {/* LinkedIn Link */}
                <a 
                  href={activeTrans.contactValues.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                    theme === 'light' ? 'hover:bg-slate-50 border-slate-200 text-slate-700' : 'hover:bg-dark-bg border-dark-border/50 text-gray-300'
                  }`}
                >
                  <Linkedin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{activeTrans.contactValues.linkedin.replace('https://', '')}</span>
                </a>

                {/* Telegram Link */}
                <a 
                  href={`https://t.me/${activeTrans.contactValues.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                    theme === 'light' ? 'hover:bg-slate-50 border-slate-200 text-slate-700' : 'hover:bg-dark-bg border-dark-border/50 text-gray-300'
                  }`}
                >
                  <Send className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>{activeTrans.contactValues.telegram}</span>
                </a>
              </div>
            </div>

            {/* 4. Skills Section */}
            <div>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider pb-1 border-b border-dark-border/40 mb-3Column">
                {activeTrans.skillsTitle}
              </h3>
              
              {/* Core Skill Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3 mt-2">
                {cvSkills.map((sk) => (
                  <span 
                    key={sk}
                    className={`text-[10px] font-bold font-sans px-2.5 py-1 rounded-md border ${
                      theme === 'light' 
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-850' 
                        : 'bg-dark-bg/60 border-dark-border/45 text-cyan-400 hover:border-cyber-cyan'
                    } transition-colors`}
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Soft Skills Section */}
              <div className="space-y-1 mt-3.5">
                {cvSoftSkills[cvLang].map((skItem, k) => (
                  <div key={k} className="flex items-center gap-2 text-xs font-sans text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal shrink-0" />
                    <span className={theme === 'light' ? 'text-slate-700 font-medium' : 'text-gray-300'}>{skItem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Languages section */}
            <div>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider pb-1 border-b border-dark-border/40 mb-3">
                {activeTrans.languagesTitle}
              </h3>
              <div className="space-y-2 mt-2">
                {/* Persian */}
                <div className="p-2.5 border border-dark-border/40 rounded-xl print-card">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="font-sans">{activeTrans.langPersianText}</span>
                    <span className="text-cyber-teal font-mono">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 overflow-hidden rounded-full">
                    <div className="h-full bg-cyber-teal w-full rounded-full" />
                  </div>
                </div>

                {/* English */}
                <div className="p-2.5 border border-dark-border/40 rounded-xl print-card">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="font-sans">{activeTrans.langEnglishText}</span>
                    <span className="text-cyber-cyan font-mono">50%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 overflow-hidden rounded-full">
                    <div className="h-full bg-cyber-cyan w-1/2 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Education, Projects, and Certificates */}
          <div className="lg:col-span-8 space-y-8 print-full-width">
            
            {/* 1. Academic Education block */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-1.5 border-b border-dark-border/40 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-cyber-teal" />
                <span>{activeTrans.educationTitle}</span>
              </h3>
              
              <div className={`p-5 rounded-2xl border print-card relative overflow-hidden transition-all ${
                theme === 'light' 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-dark-card/30 border-dark-border/50'
              }`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className={`text-base font-black font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
                      {activeTrans.eduTitle}
                    </h4>
                    <p className="text-xs font-mono text-cyber-cyan font-black mt-0.5">
                      {activeTrans.eduSchool}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 font-bold tracking-tight bg-slate-950/40 border border-dark-border px-2 py-0.5 rounded">
                    {activeTrans.eduTimeline}
                  </span>
                </div>
                <p className={`text-xs mt-3 leading-relaxed text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-300'}`}>
                  {activeTrans.eduDesc}
                </p>
              </div>
            </div>

            {/* 2. Interactive Projects section with filters */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-1.5 border-b border-dark-border/40">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-cyber-cyan" />
                  <span>{activeTrans.projectsTitle}</span>
                </h3>
                
                {/* Visual filter tabs - Hidden during PDF print */}
                <div className="flex flex-wrap gap-1 p-0.5 rounded-lg bg-slate-950 border border-dark-border/60 text-[10.5px] font-sans no-print">
                  {(['all', 'personal', 'school'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setProjectFilter(f)}
                      className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                        projectFilter === f 
                          ? 'bg-cyber-cyan text-slate-950 font-bold' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {f === 'all' ? (pageLocal.filterAll[lang] || pageLocal.filterAll['en']) : 
                       f === 'personal' ? (pageLocal.filterPersonal[lang] || pageLocal.filterPersonal['en']) : 
                       (pageLocal.filterSchool[lang] || pageLocal.filterSchool['en'])}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((p) => {
                  const isSpecial = p.category === 'special';
                  const isSchool = p.category === 'school';
                  return (
                    <div 
                      key={p.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between print-card relative group hover:border-cyber-cyan transition-all duration-300 ${
                        theme === 'light' 
                          ? 'bg-slate-50 border-slate-200' 
                          : 'bg-dark-card/25 border-dark-border/50'
                      }`}
                    >
                      <div>
                        {/* Upper tag bar */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-black uppercase tracking-tight border ${
                            isSpecial 
                              ? 'bg-purple-950/30 text-purple-400 border-purple-500/20' 
                              : isSchool 
                              ? 'bg-amber-950/30 text-amber-500 border-amber-500/20' 
                              : 'bg-cyan-950/30 text-cyber-cyan border-cyber-cyan/20'
                          }`}>
                            {isSpecial 
                              ? activeTrans.roleSpecial 
                              : isSchool 
                              ? activeTrans.schoolProj 
                              : activeTrans.personalProj}
                          </span>
                          <span className="text-[9.5px] font-mono text-gray-500 font-bold">{p.date[cvLang]}</span>
                        </div>

                        {/* Title of project */}
                        <h4 className={`text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'} group-hover:text-cyber-cyan transition-colors`}>
                          {p.title[cvLang]}
                        </h4>
                        
                        {/* Text explanation */}
                        <p className={`text-[11px] leading-relaxed mt-2 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>
                          {p.desc[cvLang]}
                        </p>
                      </div>

                      {/* Footer specs */}
                      <div className="mt-3.5 pt-2 border-t border-dark-border/30 flex items-center justify-between text-[9px] font-mono text-gray-500">
                        <span>{activeTrans.locationText}: {p.location[cvLang]}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyber-cyan rtl:rotate-180" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Arduino Projects section */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-1.5 border-b border-dark-border/40 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-amber-500" />
                <span>{activeTrans.arduinoProjectsTitle}</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvArduinoProjects.map((a) => (
                  <div 
                    key={a.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between print-card relative hover:border-amber-500 transition-all duration-300 ${
                      theme === 'light' 
                        ? 'bg-slate-50 border-slate-200 shadow-sm' 
                        : 'bg-dark-card/25 border-dark-border/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded font-black uppercase tracking-tight bg-amber-950/30 text-amber-500 border border-amber-500/20">
                          Hardware Project
                        </span>
                        <span className="text-[9.5px] font-mono text-gray-400 font-bold">{a.date[cvLang]}</span>
                      </div>
                      <h4 className={`text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                        {a.title[cvLang]}
                      </h4>
                      <p className={`text-[11px] leading-relaxed mt-2 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>
                        {a.desc[cvLang]}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-dark-border/30 text-[9px] font-mono text-gray-500">
                      <span>{activeTrans.locationText}: {a.location[cvLang]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Credentials & Achievements Certificate timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pb-1.5 border-b border-dark-border/40 flex items-center gap-2">
                <Award className="h-5 w-5 text-cyber-teal" />
                <span>{activeTrans.certificatesTitle}</span>
              </h3>

              <div className="space-y-3">
                {cvCertificates.map((c) => (
                  <div 
                    key={c.id}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 print-card relative transition-all duration-200 ${
                      theme === 'light' 
                        ? 'bg-slate-50 border-slate-200 shadow-sm' 
                        : 'bg-[#0f1422]/60 border-dark-border/50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="p-2 h-9 w-9 bg-teal-950/30 border border-cyber-teal/30 rounded-lg flex items-center justify-center text-cyber-teal shrink-0 mt-0.5">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs sm:text-sm font-black font-sans leading-tight ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                          {c.title[cvLang]}
                        </h4>
                        <p className={`text-[10px] sm:text-[11px] leading-relaxed mt-1 text-gray-400 ${cvDir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {c.desc[cvLang]}
                        </p>
                      </div>
                    </div>

                    {/* Grade score & Access Actions display */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0 md:justify-end">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[9px] font-mono text-gray-500 uppercase font-semibold font-mono">
                          {activeTrans.gradeText}:
                        </span>
                        <span className="text-xs font-mono text-cyber-cyan bg-cyan-950/20 border border-cyber-cyan/30 px-2 py-0.5 rounded font-black uppercase">
                          {c.grade}
                        </span>
                      </div>

                      {c.pdfFile && (
                        <div className="flex items-center gap-1.5 no-print shrink-0">
                          <a
                            href={`/${encodeURIComponent(c.pdfFile)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playClickSound()}
                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded border bg-slate-900 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-slate-950 transition-all cursor-pointer whitespace-nowrap"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>{certLabels.viewOnlineBtn[cvLang] || certLabels.viewOnlineBtn['en']}</span>
                          </a>
                          <a
                            href={`/${encodeURIComponent(c.pdfFile)}`}
                            download
                            onClick={() => playClickSound()}
                            className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded border bg-cyber-teal border-cyber-teal text-slate-950 hover:bg-teal-400 transition-all cursor-pointer shadow-sm whitespace-nowrap"
                          >
                            <Download className="h-3 w-3" />
                            <span>{certLabels.downloadBtn[cvLang] || certLabels.downloadBtn['en']}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Diagnostic Telemetry Logs footer - Hidden during printing */}
        <div className="no-print mt-10 pt-6 border-t border-dark-border/40 flex flex-wrap items-center justify-between text-[9px] font-mono text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MRA_CORE_PORTFOLIO // RESUME_DATA // SYNC: 2026-05-24</span>
          </div>
          <div>
            <span>PROPrompt-v4 // SHARED_NODE_LIVE // SECTOR 12</span>
          </div>
        </div>

      </div>

    </div>
  );
}
