export interface Certificate {
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
  issuer:
    | 'michigan'
    | 'sharif'
    | 'london'
    | 'toronto'
    | 'upenn'
    | 'meta'
    | 'jhu'
    | 'rice'
    | 'kados';
  badgeTypeEn:
    | 'Capstone'
    | 'Specialization'
    | 'Foundation'
    | 'Professional Certificate'
    | 'Honorary Roll'
    | 'Top Student';
  badgeTypeFa:
    | 'پروژه نهایی'
    | 'دوره تخصصی'
    | 'پایه‌گذاری'
    | 'مدرک حرفه‌ای'
    | 'رتبه افتخاری'
    | 'رتبه ممتاز';
  badgeTypeAr:
    | 'مشروع التخرج'
    | 'دورة تخصصية'
    | 'أساسيات'
    | 'شهادة احترافية'
    | 'لوحة الشرف'
    | 'طالب متميز';
  isTrophy?: boolean;
  pdfFile?: string;
  pdfFiles?: { title: Record<'en' | 'fa' | 'ar', string>; url: string }[];
}

export const certificates: Certificate[] = [
    {
      id: 'cert-1',
      titleEn: 'Web Design for Everybody Capstone',
      titleFa: 'پروژه نهایی و طراحی بهینه وب برای همه (Capstone)',
      titleAr: 'مشروع التخرج في تصميم الويب للجميع (Capstone)',
      descEn:
        'Design for Everybody Capstone framework from the University of Michigan on Coursera.',
      descFa:
        'طراحی، تست، پیاده‌سازی و ارزیابی نهایی قالب‌های وب‌سایت با دسترسی‌پذیری بالا.',
      descAr:
        'تصميم واختبار ونشر قوالب مواقع الويب الكاملة ذات الإتاحة العالية وحلول الويب المتجاوبة.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '100% / 100',
      percentage: 100,
      issuer: 'michigan',
      badgeTypeEn: 'Capstone',
      badgeTypeFa: 'پروژه نهایی',
      badgeTypeAr: 'مشروع التخرج',
      pdfFile: 'WebDesignforEverybodyCapstone.pdf',
    },
    {
      id: 'cert-2',
      titleEn: 'Web Application Technologies and Django',
      titleFa:
        'فناوری‌های توسعه وب‌اپلیکیشن با جنگو (\u062c\u0646\u06af\u0648)',
      titleAr: 'تقنيات تطبيقات الويب وإطار عمل جانغو',
      descEn:
        'Structured back-end database architecture, RESTful routing parameters, and Python integrations with Django.',
      descFa:
        'معماری دیتابیس برای جنگو، مدل‌سازی اطلاعات، سیستم هدرگذاری امنیتی HTTP، و ارتباطات سرویس بک‌اند.',
      descAr:
        'بنية قواعد البيانات المنظمة لجانغو، ونمذجة هياكل الجداول، وتوجيه البيانات والروابط الأمنية.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '100% / 100',
      percentage: 100,
      issuer: 'michigan',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية',
      pdfFile: 'WebApplicationTechnologiesandDjango.pdf',
    },
    {
      id: 'cert-3',
      titleEn: 'Programming for Everybody (Getting Started with Python)',
      titleFa: 'برنامه‌نویسی برای همه (شروع اصولی و عملی پایتون)',
      titleAr: 'البرمجة للجميع (البداية مع لغة بايثون)',
      descEn:
        'Fundamental programming constructs, variables, complex loops, and modular data flow using Python core logic.',
      descFa:
        'مبانی پایه‌ای متغیرها، منطق شرطی، حلقه‌ها، متدها و مفاهیم شی‌گرایی مقدماتی با پایتون.',
      descAr:
        'المفاهيم الأساسية للمتغيرات، الحلقات التكرارية والشروط البرمجية، وهياكل البيانات بلغة بايثون.',
      institutionEn: 'University of Michigan',
      institutionFa: 'دانشگاه میشیگان | University of Michigan',
      institutionAr: 'جامعة ميشيغان | University of Michigan',
      grade: '93.21% / 100',
      percentage: 93.21,
      issuer: 'michigan',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'Programming forEverybody(GettingStartedwithPython).pdf',
    },
    {
      id: 'cert-4',
      titleEn: 'Responsive Website Basics',
      titleFa: 'مبانی طراحی وب‌سایت‌های واکنش‌گرا و استاندارد',
      titleAr: 'أساسيات تصمیم مواقع الويب المتجاوبة',
      descEn:
        'Multi-screen styling layouts, CSS media queries, structural HTML5 grid setups, and adaptive interfaces.',
      descFa:
        'طراحی واکنش‌گرا با گریدبندی CSS، کوئری‌های رسانه متناسب با موبایل و تبلت، و ارائه‌ اصول طراحی مدرن.',
      descAr:
        'تصميم الواجهات المتجاوبة مع كافة الشاشات، صياغة CSS المتقدم، وإدارة التنسيقات المتطورة.',
      institutionEn: 'University of London',
      institutionFa: 'دانشگاه لندن | University of London',
      institutionAr: 'جامعة لندن | University of London',
      grade: '90.40% / 100',
      percentage: 90.4,
      issuer: 'london',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'ResponsiveWebsiteBasicsCodewithHTML,CSS,andJavaScript.pdf',
    },
    {
      id: 'cert-5',
      titleEn: 'Learn to Program',
      titleFa: 'یادگیری برنامه‌نویسی و حل مسئله فنی',
      titleAr: 'تعلم البرمجة وحل المشكلات الهندسية',
      descEn:
        'Comprehensive scientific logic training, debugging methodologies, parameters testing, and modular functions.',
      descFa:
        'اصول تفکر الگوریتمی، روش‌های بهینه‌سازی رفع خطا (Debugging)، کار با آرایه داده‌ها، و الگوریتم‌های تکرار.',
      descAr:
        'المبادئ الأساسية للتفكير الخوارزمي، ومنهجيات تتبع الأخطاء واختبار الوظائف البرمجية بدقة.',
      institutionEn: 'University of Toronto',
      institutionFa: 'دانشگاه تورنتو | University of Toronto',
      institutionAr: 'جامعة تورنتو | University of Toronto',
      grade: '92.71% / 100',
      percentage: 92.71,
      issuer: 'toronto',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'LearntoProgramTheFundamentals.pdf',
    },
    {
      id: 'cert-6',
      titleEn: 'Introduction to Python',
      titleFa: 'مقدمه‌ای بر توابع پیشرفته و ساختارهای پایتون',
      titleAr: 'مقدمة في توابع وبياينات لغة بايثون',
      descEn:
        'Object methods, lists comprehension, file handling systems, and advanced syntax configurations.',
      descFa:
        'اصول عمیق‌تر متدهای سیستمی، کارکرد فایل‌ها، ساختارهای پویا و کتابخانه‌های درونی پایتون.',
      descAr:
        'أساليب الكائنات البرمجية، معالجة الملفات والتحكم بها، والمكتبات الداخلية في لغة بايثون.',
      institutionEn: 'University of Pennsylvania',
      institutionFa: 'دانشگاه پنسیلوانیا | University of Pennsylvania',
      institutionAr: 'جامعة بنسلفانيا | University of Pennsylvania',
      grade: '90.07% / 100',
      percentage: 90.07,
      issuer: 'upenn',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'IntroductiontoPythonProgramming.pdf',
    },
    {
      id: 'cert-7',
      titleEn: 'Introduction to Front-End Development',
      titleFa: 'مقدمه‌ای بر برنامه‌نویسی و توسعه فرانت‌اند',
      titleAr: 'مقدمة احترافية في تطوير الواجهات الأمامية',
      descEn:
        'Modern layout rules, DOM operations structure, component architectures, and responsive framework paradigms.',
      descFa:
        'شناخت معماری پیج‌ها، اصول تگ‌های معنایی وب، بهینه‌سازی المان‌ها، و چرخه رندرینگ کلاینت.',
      descAr:
        'قواعد تصميم الواجهات الحديثة، ومصفوفة الـ DOM التفاعلية، وتنظيم الهياكل والعناصر التفاعلية.',
      institutionEn: 'Meta (Company)',
      institutionFa: 'شرکت بین‌المللی متا (مؤسس اینستاگرام و فیسبوک)',
      institutionAr: 'شركة ميتا العالمية (Meta)',
      grade: '92.00% / 100',
      percentage: 92,
      issuer: 'meta',
      badgeTypeEn: 'Professional Certificate',
      badgeTypeFa: 'مدرک حرفه‌ای',
      badgeTypeAr: 'شهادة احترافية',
      pdfFile: 'IntroductiontoFrontEndDevelopment.pdf',
    },
    {
      id: 'cert-8',
      titleEn: 'HTML, CSS, and Javascript',
      titleFa: 'آموزش جامع و بهینه وب‌دیزاین (HTML, CSS, JS)',
      titleAr: 'الشهادة الشاملة لتطوير الويب التفاعلي',
      descEn:
        'Dynamic Client-Side coding script, functional DOM actions, arrays maps, styling animations.',
      descFa:
        'کدنویسی جاوااسکریپت، هندلینگ ایونت‌ها، تغییرات زنده استایل‌ها، و منطق فرانت‌اند سمت کاربر.',
      descAr:
        'صياغة نصوص جافا سكريبت التفاعلية، ومعالجة أحداث المتصفح، وتحريك العناصر البرمجية.',
      institutionEn: 'Johns Hopkins University',
      institutionFa: 'دانشگاه معتبر جانز هاپکینز | Johns Hopkins University',
      institutionAr: 'جامعة جونز هوبكنز | Johns Hopkins University',
      grade: '93.00% / 100',
      percentage: 93,
      issuer: 'jhu',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية',
      pdfFile: 'HTML,CSS,andJavascriptforWebDevelopers.pdf',
    },
    {
      id: 'cert-9',
      titleEn: 'Programming With Python (Part 1)',
      titleFa: 'کدنویسی تعاملی و الگوریتم‌های بازی در پایتون (بخش اول)',
      titleAr: 'مقدمة في البرمجة التفاعلية في بايثون - الجزء الأول',
      descEn:
        'Building event-driven graphical models, math formulas transformation, vector arrays, and live canvas renderings.',
      descFa:
        'توسعه برنامه‌های مبتنی بر رویداد، فرمولاسیون فیزیک و هندسه به سورس‌کد، و رندرهای زنده شبیه‌سازی.',
      descAr:
        'بناء البرمجيات المعتمدة على الأحداث، وتصميم الرسوم المتجهية وتطبيقات الفضاء الثنائي.',
      institutionEn: 'Rice University',
      institutionFa: 'دانشگاه رایس آمریکا | Rice University',
      institutionAr: 'جامعة رايس الأمريكية | Rice University',
      grade: '87.84% / 100',
      percentage: 87.84,
      issuer: 'rice',
      badgeTypeEn: 'Foundation',
      badgeTypeFa: 'پایه‌گذاری',
      badgeTypeAr: 'أساسيات',
      pdfFile: 'AnIntroductiontoInteractiveProgramminginPythonPart1.pdf',
    },
    {
      id: 'cert-10',
      titleEn: 'Familiarity with Emerging Technologies and Future Jobs',
      titleFa:
        'آشنایی کاربردی با فناوری‌های نوظهور و بازارکار آینده وب و هوش نو',
      titleAr: 'التعرف على التقنيات الناشئة المتقدمة ووظائف المستقبل وبنيتها',
      descEn:
        'Analysis of cloud server systems, modern automation mechanisms, Web3 distributed metrics, and next-gen AI roles.',
      descFa:
        'بررسی اکوسیستم محاسبات ابری، اینترنت چیزها، سیستم‌های خودگردان تلگرام و وب‌اپلیکیشن‌ها، و اشتغال هوشمند.',
      descAr:
        'دراسة أنظمة الحوسبة السحابية وأتمتة العمليات وبنية الويب الموزع ومختلف وكلاء الذكاء الاصطناعي.',
      institutionEn: 'Sharif University of Technology',
      institutionFa: 'دانشگاه صنعتی شریف (Sharif UT)',
      institutionAr: 'جامعة شريف للتكنولوجيا (Sharif UT)',
      grade: '90.00% / 100',
      percentage: 90,
      issuer: 'sharif',
      badgeTypeEn: 'Honorary Roll',
      badgeTypeFa: 'رتبه افتخاری',
      badgeTypeAr: 'لوحة الشرف',
      pdfFile: 'FamiliaritywithEmergingTechnologiesandFuture Jobs.pdf',
    },
    {
      id: 'cert-11',
      titleEn: 'Programming With C++',
      titleFa: 'برنامه‌نویسی ساخت‌یافته شی‌ءگرا با زبان ++C',
      titleAr: 'تطوير الخوارزميات وصياغة كتل البيانات بلغة ++C',
      descEn:
        'Memory management, pointers declarations, structures classes, compile optimization, and high-performance algorithms.',
      descFa:
        'مدیریت آدرس‌دهی حافظه و اشاره‌گرها، کلاس‌های انتزاعی شیءگری، تخصیص داینامیک حافظه، و کتابخانه الگوهای استاندارد.',
      descAr:
        'إدارة الذاكرة والمؤشرات البرمجية، وصياغة الكائنات الموروثة ومكتبات القوالب القياسية المتقدمة.',
      institutionEn: 'Kados Institute',
      institutionFa: 'انستیتو کادوس | Kados Institute',
      institutionAr: 'معهد كادوس | Kados Institute',
      grade: '16.00 / 20.00 (80%)',
      percentage: 80,
      issuer: 'kados',
      badgeTypeEn: 'Specialization',
      badgeTypeFa: 'دوره تخصصی',
      badgeTypeAr: 'دورة تخصصية',
    },
  ];
