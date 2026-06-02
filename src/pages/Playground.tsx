import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Trophy, 
  Search, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Building, 
  ArrowUpRight, 
  ShieldCheck, 
  Bookmark, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  Download
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

interface Certificate {
  id: string;
  titleEn: string;
  titleFa: string;
  titleAr: string;
  descEn: string;
  descFa: string;
  descAr: string;
  institutionEn: string;
  institutionFa: string;
  institutionAr: string;
  grade: string;
  percentage: number; // For visualization progress bars
  issuer: 'michigan' | 'sharif' | 'london' | 'toronto' | 'upenn' | 'meta' | 'jhu' | 'rice' | 'kados';
  badgeTypeEn: 'Capstone' | 'Specialization' | 'Foundation' | 'Professional Certificate' | 'Honorary Roll' | 'Top Student';
  badgeTypeFa: 'پروژه نهایی' | 'دوره تخصصی' | 'پایه‌گذاری' | 'مدرک حرفه‌ای' | 'رتبه افتخاری' | 'رتبه ممتاز';
  badgeTypeAr: 'مشروع التخرج' | 'دورة تخصصية' | 'أساسيات' | 'شهادة احترافية' | 'لوحة الشرف' | 'طالب متميز';
  isTrophy?: boolean;
  pdfFile?: string;
  pdfFiles?: { title: Record<'en' | 'fa' | 'ar', string>; url: string }[];
}

const playHoverSound = () => {
  // Sshhh... silence
};

const playRadarLockSound = () => {
  // Sshhh... silence
};

export default function Playground() {
  const { theme, dir, lang } = useLanguageTheme();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'michigan' | 'sharif' | 'coursera'>('all');

  const certificates: Certificate[] = [
    {
      id: 'cert-1',
      titleEn: 'Web Design for Everybody Capstone',
      titleFa: 'پروژه نهایی و طراحی بهینه وب برای همه (Capstone)',
      titleAr: 'مشروع التخرج في تصميم الويب للجميع (Capstone)',
      descEn: 'Design for Everybody Capstone framework from the University of Michigan on Coursera.',
      descFa: 'طراحی، تست، پیاده‌سازی و ارزیابی نهایی قالب‌های وب‌سایت با دسترسی‌پذیری بالا.',
      descAr: 'تصميم واختبار ونشر قوالب مواقع الويب الكاملة ذات الإتاحة العالية وحلول الويب المتجاوبة.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '100% / 100',
      percentage: 100,
      issuer: 'michigan',
      badgeTypeEn: 'Capstone',
      badgeTypeFa: 'پروژه نهایی',
      badgeTypeAr: 'مشروع التخرج',
      pdfFile: 'WebDesignforEverybodyCapstone.pdf'
    },
    {
      id: 'cert-2',
      titleEn: 'Web Application Technologies and Django',
      titleFa: 'فناوری‌های توسعه وب‌اپلیکیشن با جنگو (\u062c\u0646\u06af\u0648)',
      titleAr: 'تقنيات تطبيقات الويب وإطار عمل جانغو',
      descEn: 'Structured back-end database architecture, RESTful routing parameters, and Python integrations with Django.',
      descFa: 'معماری دیتابیس برای جنگو، مدل‌سازی اطلاعات، سیستم هدرگذاری امنیتی HTTP، و ارتباطات سرویس بک‌اند.',
      descAr: 'بنية قواعد البيانات المنظمة لجانغو، ونمذجة هياكل الجداول، وتوجيه البيانات والروابط الأمنية.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '100% / 100',
      percentage: 100,
      issuer: 'michigan',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية',
      pdfFile: 'WebApplicationTechnologiesandDjango.pdf'
    },
    {
      id: 'cert-3',
      titleEn: 'Programming for Everybody (Getting Started with Python)',
      titleFa: 'برنامه‌نویسی برای همه (شروع اصولی و عملی پایتون)',
      titleAr: 'البرمجة للجميع (البداية مع لغة بايثون)',
      descEn: 'Fundamental programming constructs, variables, complex loops, and modular data flow using Python core logic.',
      descFa: 'مبانی پایه‌ای متغیرها، منطق شرطی، حلقه‌ها، متدها و مفاهیم شی‌گرایی مقدماتی با پایتون.',
      descAr: 'المفاهيم الأساسية للمتغيرات، الحلقات التكرارية والشروط البرمجية، وهياكل البيانات بلغة بايثون.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '93.21% / 100',
      percentage: 93.21,
      issuer: 'michigan',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'Programming for Everybody(GettingStartedwithPython).pdf'
    },
    {
      id: 'cert-4',
      titleEn: 'Responsive Website Basics',
      titleFa: 'مبانی طراحی وب‌سایت‌های واکنش‌گرا و استاندارد',
      titleAr: 'أساسيات تصمیم مواقع الويب المتجاوبة',
      descEn: 'Multi-screen styling layouts, CSS media queries, structural HTML5 grid setups, and adaptive interfaces.',
      descFa: 'طراحی واکنش‌گرا با گریدبندی CSS، کوئری‌های رسانه متناسب با موبایل و تبلت، و ارائه‌ اصول طراحی مدرن.',
      descAr: 'تصميم الواجهات المتجاوبة مع كافة الشاشات، صياغة CSS المتقدم، وإدارة التنسيقات المتطورة.',
      institutionEn: 'University of London',
      institutionFa: 'دانشگاه لندن | University of London',
      institutionAr: 'جامعة لندن | University of London',
      grade: '90.40% / 100',
      percentage: 90.40,
      issuer: 'london',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'ResponsiveWebsiteBasicsCodewithHTML,CSS,andJavaScript.pdf'
    },
    {
      id: 'cert-5',
      titleEn: 'Learn to Program',
      titleFa: 'یادگیری برنامه‌نویسی و حل مسئله فنی',
      titleAr: 'تعلم البرمجة وحل المشكلات الهندسية',
      descEn: 'Comprehensive scientific logic training, debugging methodologies, parameters testing, and modular functions.',
      descFa: 'اصول تفکر الگوریتمی، روش‌های بهینه‌سازی رفع خطا (Debugging)، کار با آرایه داده‌ها، و الگوریتم‌های تکرار.',
      descAr: 'المبادئ الأساسية للتفكير الخوارزمي، ومنهجيات تتبع الأخطاء واختبار الوظائف البرمجية بدقة.',
      institutionEn: 'University of Toronto',
      institutionFa: 'دانشگاه تورنتو | University of Toronto',
      institutionAr: 'جامعة تورنتو | University of Toronto',
      grade: '92.71% / 100',
      percentage: 92.71,
      issuer: 'toronto',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'LearntoProgramTheFundamentals.pdf'
    },
    {
      id: 'cert-6',
      titleEn: 'Introduction to Python',
      titleFa: 'مقدمه‌ای بر توابع پیشرفته و ساختارهای پایتون',
      titleAr: 'مقدمة في توابع وبياينات لغة بايثون',
      descEn: 'Object methods, lists comprehension, file handling systems, and advanced syntax configurations.',
      descFa: 'اصول عمیق‌تر متدهای سیستمی، کارکرد فایل‌ها، ساختارهای پویا و کتابخانه‌های درونی پایتون.',
      descAr: 'أساليب الكائنات البرمجية، معالجة الملفات والتحكم بها، والمكتبات الداخلية في لغة بايثون.',
      institutionEn: 'University of Pennsylvania',
      institutionFa: 'دانشگاه پنسیلوانیا | University of Pennsylvania',
      institutionAr: 'جامعة بنسلفانيا | University of Pennsylvania',
      grade: '90.07% / 100',
      percentage: 90.07,
      issuer: 'upenn',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'IntroductiontoPythonProgramming.pdf'
    },
    {
      id: 'cert-7',
      titleEn: 'Introduction to Front-End Development',
      titleFa: 'مقدمه‌ای بر برنامه‌نویسی و توسعه فرانت‌اند',
      titleAr: 'مقدمة احترافية في تطوير الواجهات الأمامية',
      descEn: 'Modern layout rules, DOM operations structure, component architectures, and responsive framework paradigms.',
      descFa: 'شناخت معماری پیج‌ها، اصول تگ‌های معنایی وب، بهینه‌سازی المان‌ها، و چرخه رندرینگ کلاینت.',
      descAr: 'قواعد تصميم الواجهات الحديثة، ومصفوفة الـ DOM التفاعلية، وتنظيم الهياكل والعناصر التفاعلية.',
      institutionEn: 'Meta (Company)',
      institutionFa: 'شرکت بین‌المللی متا (مؤسس اینستاگرام و فیسبوک)',
      institutionAr: 'شركة ميتا العالمية (Meta)',
      grade: '92.00% / 100',
      percentage: 92,
      issuer: 'meta',
      badgeTypeEn: 'Professional Certificate',
      badgeTypeFa: 'مدرک حرفه‌ای',
      badgeTypeAr: 'شهادة احترافية',
      pdfFile: 'IntroductiontoFrontEndDevelopment.pdf'
    },
    {
      id: 'cert-8',
      titleEn: 'HTML, CSS, and Javascript',
      titleFa: 'آموزش جامع و بهینه وب‌دیزاین (HTML, CSS, JS)',
      titleAr: 'الشهادة الشاملة لتطوير الويب التفاعلي',
      descEn: 'Dynamic Client-Side coding script, functional DOM actions, arrays maps, styling animations.',
      descFa: 'کدنویسی جاوااسکریپت، هندلینگ ایونت‌ها، تغییرات زنده استایل‌ها، و منطق فرانت‌اند سمت کاربر.',
      descAr: 'صياغة نصوص جافا سكريبت التفاعلية، ومعالجة أحداث المتصفح، وتحريك العناصر البرمجية.',
      institutionEn: 'Johns Hopkins University',
      institutionFa: 'دانشگاه معتبر جانز هاپکینز | Johns Hopkins University',
      institutionAr: 'جامعة جونز هوبكنز | Johns Hopkins University',
      grade: '93.00% / 100',
      percentage: 93,
      issuer: 'jhu',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية',
      pdfFile: 'HTML,CSS,andJavascriptforWebDevelopers.pdf'
    },
    {
      id: 'cert-9',
      titleEn: 'Programming With Python (Part 1)',
      titleFa: 'کدنویسی تعاملی و الگوریتم‌های بازی در پایتون (بخش اول)',
      titleAr: 'مقدمة في البرمجة التفاعلية في بايثون - الجزء الأول',
      descEn: 'Building event-driven graphical models, math formulas transformation, vector arrays, and live canvas renderings.',
      descFa: 'توسعه برنامه‌های مبتنی بر رویداد، فرمولاسیون فیزیک و هندسه به سورس‌کد، و رندرهای زنده شبیه‌سازی.',
      descAr: 'بناء البرمجيات المعتمدة على الأحداث، وتصميم الرسوم المتجهية وتطبيقات الفضاء الثنائي.',
      institutionEn: 'Rice University',
      institutionFa: 'دانشگاه رایس آمریکا | Rice University',
      institutionAr: 'جامعة رايس الأمريكية | Rice University',
      grade: '87.84% / 100',
      percentage: 87.84,
      issuer: 'rice',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'AnIntroductiontoInteractiveProgramminginPythonPart1.pdf'
    },
    {
      id: 'cert-10',
      titleEn: 'Familiarity with Emerging Technologies and Future Jobs',
      titleFa: 'آشنایی کاربردی با فناوری‌های نوظهور و بازارکار آینده وب و هوش نو',
      titleAr: 'التعرف على التقنيات الناشئة المتقدمة ووظائف المستقبل وبنيتها',
      descEn: 'Analysis of cloud server systems, modern automation mechanisms, Web3 distributed metrics, and next-gen AI roles.',
      descFa: 'بررسی اکوسیستم محاسبات ابری، اینترنت چیزها، سیستم‌های خودگردان تلگرام و وب‌اپلیکیشن‌ها، و اشتغال هوشمند.',
      descAr: 'دراسة أنظمة الحوسبة السحابية وأتمتة العمليات وبنية الويب الموزع ومختلف وكلاء الذكاء الاصطناعي.',
      institutionEn: 'Sharif University of Technology',
      institutionFa: 'دانشگاه صنعتی شریف (Sharif UT)',
      institutionAr: 'جامعة شريف للتكنولوجيا (Sharif UT)',
      grade: '90.00% / 100',
      percentage: 90,
      issuer: 'sharif',
      badgeTypeEn: 'Honorary Roll',
      badgeTypeFa: 'رتبه افتخاری',
      badgeTypeAr: 'لوحة الشرف',
      pdfFile: 'FamiliaritywithEmergingTechnologiesandFuture Jobs.pdf'
    },
    {
      id: 'cert-11',
      titleEn: 'Programming With C++',
      titleFa: 'برنامه‌نویسی ساخت‌یافته شی‌ءگرا با زبان ++C',
      titleAr: 'تطوير الخوارزميات وصياغة كتل البيانات بلغة ++C',
      descEn: 'Memory management, pointers declarations, structures classes, compile optimization, and high-performance algorithms.',
      descFa: 'مدیریت آدرس‌دهی حافظه و اشاره‌گرها، کلاس‌های انتزاعی شیءگری، تخصیص داینامیک حافظه، و کتابخانه الگوهای استاندارد.',
      descAr: 'إدارة الذاكرة والمؤشرات البرمجية، وصياغة الكائنات الموروثة ومكتبات القوالب القياسية المتقدمة.',
      institutionEn: 'Kados Institute',
      institutionFa: 'انستیتو کادوس | Kados Institute',
      institutionAr: 'معهد كادوس | Kados Institute',
      grade: '16.00 / 20.00 (80%)',
      percentage: 80,
      issuer: 'kados',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية'
    }
  ];

  // Filtering Logic
  const filteredCerts = certificates.filter(cert => {
    // Drop filters depending on navigation
    let passCategory = true;
    if (activeFilter === 'michigan') passCategory = cert.issuer === 'michigan';
    else if (activeFilter === 'sharif') passCategory = cert.issuer === 'sharif';
    else if (activeFilter === 'coursera') {
      passCategory = ['london', 'toronto', 'upenn', 'meta', 'jhu', 'rice'].includes(cert.issuer);
    }

    const titleStr = `${cert.titleEn} ${cert.titleFa} ${cert.titleAr} ${cert.institutionEn} ${cert.institutionFa} ${cert.institutionAr}`.toLowerCase();
    const passSearch = titleStr.includes(searchTerm.toLowerCase());

    return passCategory && passSearch;
  });

  // Calculate static metrics for UI highlight box
  const totalCerts = certificates.length;
  const michiganCerts = certificates.filter(c => c.issuer === 'michigan').length;
  const sharifHonor = "3 Courses";
  const averageAccuracy = "92.8%";

  // Translated Page Labels
  const pageT = {
    all: lang === 'fa' ? 'همه مدارج' : lang === 'ar' ? 'جميع الشهادات' : 'All Credentials',
    michigan: lang === 'fa' ? 'دانشگاه میشیگان' : lang === 'ar' ? 'جامعة ميشيغان' : 'U. of Michigan',
    sharif: lang === 'fa' ? 'دانشگاه شریف' : lang === 'ar' ? 'جامعة شريف' : 'Sharif Univ.',
    partners: lang === 'fa' ? 'شرکای کورسرا و دیگران' : lang === 'ar' ? 'شركاء كورسيرا وآخرون' : 'Global Partners',
    searchPlaceholder: lang === 'fa' ? 'جستجو در عناوین، دانشگاه‌ها، دوره‌ها...' : lang === 'ar' ? 'ابحث عن الشهادات والجامعات والدورات...' : 'Search credentials, institutions, skills...',
    metricTotal: lang === 'fa' ? 'تعداد کل مدارک' : lang === 'ar' ? 'إجمالي الشهادات' : 'Total Credentials',
    metricScore: lang === 'fa' ? 'میانگین علمی نمرات' : lang === 'ar' ? 'الترتيب العام المتميز' : 'Average Academic Score',
    metricPerfect: lang === 'fa' ? 'دوره‌های نمره ۱۰۰' : lang === 'ar' ? 'دورات بنسبة 100%' : 'Perfect 100% Hits',
    metricRank: lang === 'fa' ? 'برترین دوره‌ها در شریف' : lang === 'ar' ? 'تفوق علمي بجامعة شريف' : 'Top Sharif Courses',
    gradeLabel: lang === 'fa' ? 'معدل نهایی پذیرش:' : lang === 'ar' ? 'الدرجة والتقييم النهائي:' : 'Verified Grade Score:',
    badgeVerif: lang === 'fa' ? 'تاییدیه سیگنال امن' : lang === 'ar' ? 'معتمد ومؤمن بالكامل' : 'SECURE VERIFIED',
    noResults: lang === 'fa' ? 'نتیجه‌ای برای جستجوی شما یافت نشد.' : lang === 'ar' ? 'لم يتم العثور على أي نتائج.' : 'No credentials match your exact search criteria.',
    subTitle: lang === 'fa' ? 'اسناد، مدارج و پایان‌دوره‌های رسمی برنامه‌نویسی، طراحی وب، جنگو و خوارزمولوژی' : lang === 'ar' ? 'الوثائق والاعتمادات الرسمية لمسارات تطوير الويب وقواعد البيانات بلغة بايثون' : 'Official transcripts, academic honors, and specialization credentials verified by top international universities.',
    pageHeading: lang === 'fa' ? 'گواهی‌نامه‌ها و مدارج افتخار' : lang === 'ar' ? 'الشهادات والمؤهلات المهنية' : 'Certificates & Credentials'
  };

  return (
    <div 
      className={`py-12 md:py-16 min-h-[90vh] transition-colors duration-300 ${
        theme === 'light' ? 'text-slate-800' : 'text-gray-100'
      }`} 
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Header Section */}
        <div className={`border-b pb-6 mb-10 text-start ${
          theme === 'light' ? 'border-slate-200' : 'border-dark-border/40'
        }`}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-teal animate-ping" />
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest border px-2.5 py-0.5 rounded-md ${
              theme === 'light' ? 'bg-teal-50 border-cyber-teal/20 text-cyber-teal' : 'bg-teal-950/40 border-cyber-teal/20 text-cyan-400'
            }`}>
              {lang === 'fa' ? 'مدارج تصدیق شده' : lang === 'ar' ? 'الاعتمادات الموثقة' : 'ACADEMIC RECOGNITION'}
            </span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight font-sans flex items-center gap-2.5 ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            <Award className="h-8 w-8 text-cyber-teal" />
            <span>{pageT.pageHeading}</span>
          </h1>
          <p className={`mt-2 font-sans text-sm max-w-3xl leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-gray-400'
          }`}>
            {pageT.subTitle}
          </p>
        </div>

        {/* High-Fidelity Professional KPI Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <motion.div 
            whileHover={{ y: -3 }}
            onMouseEnter={playHoverSound}
            className={`p-4 rounded-2xl border flex flex-col justify-between text-start ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-dark-border/40'
            }`}
          >
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{pageT.metricTotal}</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl md:text-3xl font-black font-sans text-cyber-teal">{totalCerts}</span>
              <span className="text-[10px] font-mono text-gray-500">NODES</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            onMouseEnter={playHoverSound}
            className={`p-4 rounded-2xl border flex flex-col justify-between text-start ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-dark-border/40'
            }`}
          >
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{pageT.metricScore}</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl md:text-3xl font-black font-sans text-yellow-500">{averageAccuracy}</span>
              <span className="text-[10px] font-mono text-gray-500">AVG</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            onMouseEnter={playHoverSound}
            className={`p-4 rounded-2xl border flex flex-col justify-between text-start ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-dark-border/40'
            }`}
          >
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{pageT.metricPerfect}</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl md:text-3xl font-black font-sans text-cyan-400">2</span>
              <span className="text-[10px] font-mono text-gray-500">COURSERS</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            onMouseEnter={playHoverSound}
            className={`p-4 rounded-2xl border flex flex-col justify-between text-start ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-dark-border/40'
            }`}
          >
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{pageT.metricRank}</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl md:text-3xl font-black font-sans text-rose-500">{sharifHonor}</span>
              <span className="text-[10px] font-mono text-gray-500">RANKED</span>
            </div>
          </motion.div>
        </div>

        {/* Filters and Live Search Actions */}
        <div className={`p-4 rounded-2xl border mb-8 flex flex-col md:flex-row gap-4 justify-between items-center ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-dark-border/20'
        }`}>
          {/* Quick horizontal buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { key: 'all', label: pageT.all },
              { key: 'michigan', label: pageT.michigan },
              { key: 'sharif', label: pageT.sharif },
              { key: 'coursera', label: pageT.partners }
            ].map(btn => (
              <button
                key={btn.key}
                onClick={() => {
                  playRadarLockSound();
                  setActiveFilter(btn.key as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all duration-300 pointer-events-auto select-none cursor-pointer ${
                  activeFilter === btn.key 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-[0_4px_12px_rgba(20,184,166,0.15)]'
                    : theme === 'light'
                      ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                      : 'bg-slate-900/60 border border-dark-border/30 text-gray-300 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full md:w-72">
            <Search className="absolute top-2.5 right-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={pageT.searchPlaceholder}
              className={`w-full py-2 pl-4 pr-10 text-xs rounded-xl border font-sans pointer-events-auto outline-none focus:ring-1 focus:ring-cyber-teal transition-all ${
                theme === 'light' 
                  ? 'bg-white border-slate-200 text-slate-700' 
                  : 'bg-slate-900 border-dark-border/40 text-gray-100 focus:border-cyber-teal/60'
              }`}
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCerts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCerts.map((cert) => {
                const isMichigan = cert.issuer === 'michigan';
                const isSharif = cert.issuer === 'sharif';
                const hasPerfectGrade = cert.percentage === 100;

                // Accent classes
                let cardAccentBorder = theme === 'light' ? 'border-slate-200' : 'border-dark-border/40';
                let iconColor = 'text-cyber-teal';
                let cardGlow = '';

                if (hasPerfectGrade) {
                  cardAccentBorder = theme === 'light' ? 'border-amber-400 shadow-amber-500/10' : 'border-amber-500/40 shadow-amber-500/5';
                  iconColor = 'text-amber-500';
                  cardGlow = 'rgba(245,158,11,0.03)';
                } else if (isSharif) {
                  cardAccentBorder = theme === 'light' ? 'border-rose-300 shadow-rose-500/10' : 'border-rose-500/40 shadow-rose-500/5';
                  iconColor = 'text-rose-500';
                  cardGlow = 'rgba(244,63,94,0.03)';
                }

                // Render localized texts
                const localizedTitle = lang === 'fa' ? cert.titleFa : lang === 'ar' ? cert.titleAr : cert.titleEn;
                const localizedDesc = lang === 'fa' ? cert.descFa : lang === 'ar' ? cert.descAr : cert.descEn;
                const localizedInst = lang === 'fa' ? cert.institutionFa : lang === 'ar' ? cert.institutionAr : cert.institutionEn;
                const localizedBadge = lang === 'fa' ? cert.badgeTypeFa : lang === 'ar' ? cert.badgeTypeAr : cert.badgeTypeEn;

                return (
                  <motion.div
                    key={cert.id}
                    layoutId={cert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                    onMouseEnter={playHoverSound}
                    style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0d1117', backgroundImage: cardGlow ? `radial-gradient(circle at 50% 120%, ${cardGlow}, transparent)` : undefined }}
                    className={`relative p-6 rounded-2xl border text-start flex flex-col justify-between overflow-hidden group shadow-sm ${cardAccentBorder}`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] font-mono uppercase tracking-widest font-extrabold border px-2 py-0.5 rounded-md ${
                          hasPerfectGrade 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            : isSharif
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                              : theme === 'light' 
                                ? 'bg-slate-100 border-slate-200 text-slate-500' 
                                : 'bg-slate-900/60 border-dark-border/40 text-gray-400'
                        }`}>
                          {localizedBadge}
                        </span>

                        <div className="flex gap-1">
                          {cert.isTrophy ? (
                            <Trophy className="h-4 w-4 text-rose-500 animate-bounce" />
                          ) : hasPerfectGrade ? (
                            <Trophy className="h-4 w-4 text-amber-500" />
                          ) : (
                            <Award className={`h-4 w-4 ${iconColor}`} />
                          )}
                        </div>
                      </div>

                      {/* Header School title */}
                      <p className={`text-[10px] font-mono flex items-center gap-1 mb-1.5 uppercase tracking-wide ${
                        theme === 'light' ? 'text-slate-500' : 'text-gray-400'
                      }`}>
                        <Building className="h-3 w-3" />
                        {localizedInst}
                      </p>

                      {/* Core certificate Title */}
                      <h3 className={`text-base font-black font-sans leading-snug mb-2 group-hover:text-cyber-teal transition-colors duration-300 ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {localizedTitle}
                      </h3>

                      {/* Micro description */}
                      <p className={`text-xs leading-relaxed font-sans mb-5 line-clamp-3 text-justify ${
                        theme === 'light' ? 'text-slate-600' : 'text-gray-400'
                      }`}>
                        {localizedDesc}
                      </p>
                    </div>

                    {/* Bottom Status meters and ratings */}
                    <div className="mt-auto space-y-4">
                      {/* Interactive score progress meter (except for trophy honors which do not have a flat percentage grade) */}
                      {cert.id !== 'cert-12' && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className={theme === 'light' ? 'text-slate-500' : 'text-gray-400'}>{pageT.gradeLabel}</span>
                            <span className={`font-black ${hasPerfectGrade ? 'text-amber-500' : isSharif ? 'text-rose-500' : 'text-cyber-teal'}`}>
                              {cert.grade}
                            </span>
                          </div>
                          {(!cert.isTrophy) && (
                            <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                              theme === 'light' ? 'bg-slate-100' : 'bg-slate-900/80 border border-dark-border/20'
                            }`}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${cert.percentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-full rounded-full bg-gradient-to-r ${
                                  hasPerfectGrade 
                                    ? 'from-amber-500 to-amber-300' 
                                    : isSharif 
                                      ? 'from-rose-500 to-rose-400' 
                                      : 'from-teal-500 to-cyan-500'
                                }`} 
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Download & View Online Actions */}
                      {(cert.pdfFile || cert.pdfFiles) && (
                        <div className="flex flex-col gap-2 pt-1 no-print">
                          {cert.pdfFile ? (
                            <div className="flex items-center gap-2">
                              <a
                                href={`/${encodeURIComponent(cert.pdfFile)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => playRadarLockSound()}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer select-none ${
                                  theme === 'light'
                                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                                    : 'bg-slate-900 border-cyber-cyan/35 text-cyber-cyan hover:bg-cyber-cyan hover:text-slate-950 bg-slate-900/50'
                                }`}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>{lang === 'fa' ? 'نمایش آنلاین' : lang === 'ar' ? 'عرض أونلاين' : 'View Online'}</span>
                              </a>
                              <a
                                href={`/${encodeURIComponent(cert.pdfFile)}`}
                                download
                                onClick={() => playRadarLockSound()}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border bg-cyber-teal border-cyber-teal text-slate-950 hover:bg-teal-400 transition-all cursor-pointer select-none shadow-sm"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span>{lang === 'fa' ? 'دانلود فایل' : lang === 'ar' ? 'تحميل الملف' : 'Download File'}</span>
                              </a>
                            </div>
                          ) : (
                            // Multiple files list from pdfFiles
                            <div className="space-y-3">
                              {cert.pdfFiles?.map((file, idx) => (
                                <div key={idx} className={`w-full flex flex-col gap-2.5 p-3.5 rounded-xl border ${
                                  theme === 'light'
                                    ? 'border-slate-200 bg-slate-50 shadow-sm'
                                    : 'border-cyber-teal/20 bg-[#072421]/15'
                                }`}>
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal" />
                                    <span className={`text-[11px] font-sans font-bold leading-tight ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}>
                                      {file.title[lang === 'fa' ? 'fa' : lang === 'ar' ? 'ar' : 'en']}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={`/${encodeURIComponent(file.url)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => playRadarLockSound()}
                                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer select-none ${
                                        theme === 'light'
                                          ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                                          : 'bg-slate-900 border-cyber-cyan/35 text-cyber-cyan hover:bg-cyber-cyan hover:text-slate-950 bg-slate-900/50'
                                      }`}
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      <span>{lang === 'fa' ? 'نمایش آنلاین' : lang === 'ar' ? 'عرض أونلاين' : 'View Online'}</span>
                                    </a>
                                    <a
                                      href={`/${encodeURIComponent(file.url)}`}
                                      download
                                      onClick={() => playRadarLockSound()}
                                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border bg-cyber-teal border-cyber-teal text-slate-950 hover:bg-teal-400 transition-all cursor-pointer select-none shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                      <span>{lang === 'fa' ? 'دانلود فایل' : lang === 'ar' ? 'تحميل الملف' : 'Download File'}</span>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Verify link seal */}
                      <div className={`border-t pt-2.5 flex items-center justify-between text-[10px] font-mono ${
                        theme === 'light' ? 'border-slate-100' : 'border-dark-border/20'
                      }`}>
                        <div className="flex items-center gap-1 text-gray-500">
                          <ShieldCheck className="h-3.5 w-3.5 text-cyber-teal" />
                          <span>{pageT.badgeVerif}</span>
                        </div>
                        <span className="text-gray-400 lowercase group-hover:text-cyber-teal transition-colors flex items-center gap-0.5">
                          verify_host
                          <ArrowUpRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <p className="text-sm text-gray-500 mb-2">{pageT.noResults}</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="text-xs text-cyber-teal hover:underline cursor-pointer font-mono"
                >
                  reset_query_parameters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
