import { Globe, Sparkles, GraduationCap, Server, ShieldCheck, Heart } from 'lucide-react';

export const homeTranslations: Record<string, any> = {
  fa: {
    academicTitle: "سفر توسعه مهارتی، گواهینامه‌ها و پروژه‌ها",
    academicSub: "مروری بر گواهینامه‌های بین‌المللی کورسرا، دوره‌های صنعتی دانشگاه شریف و دستاوردهای فنی محمدرضا در توسعه مستقل پروژه‌های پایتون",
    timeline: [
      {
        title: "توسعه مستقل و مهندسی اسکریپت‌های اتوماسیون",
        institution: "پورتفولیو پروژه‌های بک‌آند پایتون",
        period: "توسعه مستقل مخازن",
        desc: "طراحی، پیاده‌سازی و راه‌اندازی بیش از ۱۴ برنامه و بات خودکار پایتون جهت کرال ساختاریافته، پایش مداوم خطاها و ابزارهای ارتباطی تحت وب تلگرام بدون پیچیدگی و وقفه.",
        badge: "پروژه‌های عملی"
      },
      {
        title: "برنامه‌نویس برگزیده دوره توسعه دانش‌آموزی شریف",
        institution: "دانشگاه صنعتی شریف (رتبه ۳ کشور، ۵۴۸ جهان)",
        period: "شرکت‌کننده برتر دوره الگوریتم‌ها",
        desc: "برگزیده شده به عنوان استعداد برتر برنامه‌نویسی دانش‌آموزان در دوره‌های رقابتی مهندسی نرم‌افزار پایتون و طراحی معماری الگوریتم‌های خلاق دانشگاه صنعتی شریف.",
        badge: "نخبه برگزیده شریف"
      },
      {
        title: "توسعه وب جنگو و بهینه‌سازی پایگاه داده",
        institution: "تخصص رسمی دانشگاه میشیگان",
        period: "نمره نهایی: ۱۰۰٪ کامل",
        desc: "ساخت پایگاه‌های داده پیشرفته با بهره‌وری بسیار بالا، مدیریت روابط جداول پیشرفته PostgreSQL، ارزیابی امنیت مسیرهای دسترسی و پیاده‌سازی متدهای مدرن کنترل حافظه.",
        badge: "نمره: ۱۰۰/۱۰۰"
      },
      {
        title: "توسعه سیستم‌های چندسکویی و هوش مصنوعی",
        institution: "گواهی تخصص دانشگاه تورنتو، پن و متا",
        period: "مورد تایید و معتبر",
        desc: "کسب مجوزهای بین‌المللی در زمینه توسعه سرویسهای وب هوشمند، ادغام امن فریم‌ورک‌های یادگیری ماشین و طراحی سیستم‌های واگرا در تعامل کلاینت-سرور.",
        badge: "گواهی معتبر کورسرا"
      }
    ],
    automationTitle: "نمایش ملموس پروژه‌های فعال، آنلاین و اجرایی",
    automationSub: "مجموعه‌ای منتخب از پروژه‌ها و پلتفرم‌های کاربردی تحت وب محمدرضا عابدین‌پور که هم‌اکنون به صورت عمومی آنلاین و در حال کار هستند.",
    autos: [
      {
        title: "سامانه هوشمند بررسی سرعت و پایش دی‌ان‌اس (PIMX Pass DNS)",
        desc: "ابزاری کاربردی و مستقل جهت سنجش دقیق پینگ و تحلیل کیفیت برترین DNSهای جهانی متناسب با اپراتورها و اینترنت کاربر.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "سایت فعال"
      },
      {
        title: "مبدل الگو و ابزار هنری اسکی بر پایه ایموجی (PIMX Moji)",
        desc: "سرویس خلاقانه سمت کاربر برای جان‌بخشی به تصاویر شما و تبدیل کاراکترها و عکس‌های دریافتی به طرح‌های غنی ساخته شده از ایموجی.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "سایت فعال"
      }
    ],
    philosophyTitle: "فلسفه مهندسی و تعهدات اخلاق حرفه‌ای",
    philosophySub: "تعهدات کیفی، الگوهای برنامه‌نویسی و استانداردهایی که محمدرضا در اجرای هر سیستم نرم‌افزاری بر آنها پافشاری می‌کند.",
    philosophies: [
      {
        title: "یادگیری پروژه‌محور و مستقل",
        desc: "پیگیری مستمر تکنیک‌های روز بک‌آند، نوآوری در فرانت‌آند و ادغام متدهای کاربردی هوش مصنوعی با اشتیاق پایان‌ناپذیر.",
        icon: GraduationCap
      },
      {
        title: "راه‌حل‌های خلاق بر پایه اتوماسیون",
        desc: "اعتقاد عمیق به اینکه هرکاری که باید دو بار تکرار شود، باید یک بار فرموله اسکریپت‌نویسی گردد. حذف کارهای تکراری با قدرت ابزارها.",
        icon: Server
      },
      {
        title: "برنامه‌نویسی پاک، خوانا و شیءگرا",
        desc: "ساخت کلاس‌های مدولار، نام‌گذاری صریح متغیرها، تعهد جدی به مستندسازی اصولی سیستم برای برنامه‌نویسان همکار در آینده.",
        icon: ShieldCheck
      },
      {
        title: "تعهد جدی به زمان‌بندی و ددلاین",
        desc: "ارائه گزارش پیشرفت مداوم، سرعت بالا در اعمال بازخوردها، پایبندی بی‌چون‌وچرا به محدودیت زمان و امنیت اطلاعات.",
        icon: Heart
      }
    ],
    verifiedTag: "تایید شده رسمی"
  },
  en: {
    academicTitle: "Skill Milestones, Certificates & Projects Portfolio",
    academicSub: "A verified track of global professional certificates, top-tier coding credentials from Sharif University, and production-grade Python automation systems.",
    timeline: [
      {
        title: "Production Python Scripter & Core Automation",
        institution: "Independent Backend Project Portfolio",
        period: "Continuous Development",
        desc: "Designing and maintaining an active lineup of 14+ autonomous scripts and tools managing scheduled data fetching, error diagnostics, and relational databases.",
        badge: "Production Ready"
      },
      {
        title: "Sharif University Student Coding Course",
        institution: "Sharif University of Tech (Ranked #3 in Iran, #548 Globally)",
        period: "Distinguished Top Participant",
        desc: "Selected as one of the distinguished top high-school scholars in Sharif University's highly competitive student programming track and Python algorithms course.",
        badge: "Elite Student"
      },
      {
        title: "Django Web Engineering & Database Systems",
        institution: "University of Michigan Specialization",
        period: "Final Grade: 100% Perfect Score",
        desc: "Developing robust data-driven backends, optimizing relational query speeds via PostgreSQL, path protections, and responsive client layouts.",
        badge: "Grade: 100/100"
      },
      {
        title: "Modern Client Environments & AI Architectures",
        institution: "Meta, University of Toronto, London, and Penn",
        period: "Accredited Certifications",
        desc: "Certified expertise in responsive layout performance, AI generative patterns, multi-source API integrations, and intuitive interface animations.",
        badge: "Coursera Verified"
      }
    ],
    automationTitle: "Showcase of Active, Live & Production Projects",
    automationSub: "A hand-picked selection of Mohammadreza's active web platforms and automated Telegram services running live on the web.",
    autos: [
      {
        title: "PIMX Pass DNS (Speed Tester & Network Controller)",
        desc: "A highly practical independent web application for testing latency and analyzing top-performance DNS servers tailored to your local ISP.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Live Website"
      },
      {
        title: "PIMX Moji (ASCII & Emoji Art Generator)",
        desc: "An interactive, client-side web utility converting raw images and patterns into rich text-based ASCII masterpieces utilizing custom emotes.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Live Website"
      }
    ],
    philosophyTitle: "Engineering Philosophy & Core Professional Standards",
    philosophySub: "The commitments, code structures, and reliability standards Mohammadreza maintains in every work system",
    philosophies: [
      {
        title: "Continuous Independent Learning",
        desc: "Consistently researching progressive design layouts, modern backend techniques, and AI utilities to keep solutions cutting-edge.",
        icon: GraduationCap
      },
      {
        title: "Automation-Driven Problem Solving",
        desc: "Believing that anything done twice should be written once. Automating manual and repetitive routines with high-efficiency scripts.",
        icon: Server
      },
      {
        title: "Rigid Clean Code & Clean OOP",
        desc: "Strong proponent of modular classes, understandable variable names, strict architectural guidelines, and extensive documentation.",
        icon: ShieldCheck
      },
      {
        title: "Open Collaboration & Absolute Commitment",
        desc: "Transparent progress reports, prompt feedback, 100% deadline adherence, and a serious stance toward data privacy.",
        icon: Heart
      }
    ],
    verifiedTag: "Official Verified"
  },
  de: {
    academicTitle: "Kompetenz-Meilensteine, Zertifikate & Projektportfolio",
    academicSub: "Ein verifizierter Pfad globaler professioneller Zertifikate, erstklassiger Programmiernachweise der Sharif-Universität und Python-Automatisierungssysteme in Produktionsqualität.",
    timeline: [
      {
        title: "Python-Entwickler & Kern-Automatisierung",
        institution: "Unabhänges Backend-Projektportfolio",
        period: "Kontinuierliche Entwicklung",
        desc: "Konzeption und Wartung eines aktiven Portfolios von über 14 autonomen Skripten und Tools zur Steuerung von geplantem Datenabruf, Fehlerdiagnose und relationalen Datenbanken.",
        badge: "Produktionsbereit"
      },
      {
        title: "Studentischer Programmierkurs der Sharif-Universität",
        institution: "Sharif-Universität (Platz 3 im Iran, Platz 548 weltweit)",
        period: "Ausgezeichneter Spitzen-Teilnehmer",
        desc: "Ausgewählt als einer der herausragenden besten Schüler im hart umkämpften Programmierzweig und Python-Algorithmenkurs der Sharif-Universität.",
        badge: "Elite-Schüler"
      },
      {
        title: "Django-Web-Engineering & Datenbanksysteme",
        institution: "Spezialisierung der University of Michigan",
        period: "Abschlussnote: 100 % Höchstpunktzahl",
        desc: "Entwicklung robuster, datengesteuerter Backends, Optimierung relationaler Abfragegeschwindigkeiten mittels PostgreSQL, Pfadschutz und responsive Client-Layouts.",
        badge: "Note: 100/100"
      },
      {
        title: "Moderne Client-Umgebungen & KI-Zertifizierungen",
        institution: "Meta, University of Toronto, London und Penn",
        period: "Akkreditierte Zertifizierungen",
        desc: "Zertifizierte Expertise in responsiver Layout-Performance, generativen KI-Mustern, Multi-Source-API-Integrationen und intuitiven Benutzeroberflächen-Animationen.",
        badge: "Coursera Verifiziert"
      }
    ],
    automationTitle: "Schaufenster aktiver Live- & Produktionsprojekte",
    automationSub: "Eine sorgfältig ausgewählte Auswahl an aktiven Webplattformen und automatisierten Telegram-Diensten von Mohammadreza, die live im Web laufen.",
    autos: [
      {
        title: "PIMX Pass DNS (Geschwindigkeitstester & Netzwerkcontroller)",
        desc: "Eine äußerst praktische, unabhängige Webanwendung zum Testen der Latenz und Analyse leistungsstarker DNS-Server, die auf Ihren lokalen ISP zugeschnitten sind.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Live-Website"
      },
      {
        title: "PIMX Moji (ASCII- & Emoji-Kunstgenerator)",
        desc: "Ein interaktives, clientseitiges Web-Dienstprogramm, das Rohbilder und -muster in reichhaltige textbasierte ASCII-Meisterwerke unter Verwendung benutzerdefinierter Emotes umwandelt.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Live-Website"
      }
    ],
    philosophyTitle: "Engineering-Philosophie & Professionelle Kernstandards",
    philosophySub: "Die Verpflichtungen, Code-Strukturen und Zuverlässigkeitsstandards, die Mohammadreza in jedem Arbeitssystem aufrechterhält.",
    philosophies: [
      {
        title: "Kontinuierliches unabhängiges Lernen",
        desc: "Regelmäßige Erforschung fortschrittlicher Design-Layouts, moderner Backend-Techniken und KI-Dienstprogramme, um Lösungen auf dem neuesten Stand zu halten.",
        icon: GraduationCap
      },
      {
        title: "Automationsgesteuerte Problemlösung",
        desc: "Unter der Überzeugung, dass alles, was zweimal getan wird, einmal geschrieben werden sollte. Manuelle und sich wiederholende Routinen werden durch hocheffiziente Skripte automatisiert.",
        icon: Server
      },
      {
        title: "Strenger Clean Code & Sauberes OOP",
        desc: "Starker Befürworter von modularen Klassen, verständlichen Variablennamen, strengen Architekturrichtlinien und umfassender Dokumentation.",
        icon: ShieldCheck
      },
      {
        title: "Offene Zusammenarbeit & Absolutes Engagement",
        desc: "Transparente Fortschrittsberichte, schnelles Feedback, 100%ige Einhaltung von Fristen und ein verantwortungsvoller Umgang mit dem Datenschutz.",
        icon: Heart
      }
    ],
    verifiedTag: "Offiziell verifiziert"
  },
  ar: {
    academicTitle: "سجل الإنجازات المهنية والشهادات والمشاريع",
    academicSub: "مراجعة شاملة للشهادات الدولية من كورسيرا، والدورات البرمجية من جامعة شريف، وإنجازات محمد رضا الفنية في تطوير مشاريع بايثون المستقلة.",
    timeline: [
      {
        title: "التطوير المستقل لبرمجيات وأدوات الأتمتة",
        institution: "معرض مشاريع بايثون الخلفية المستقلة",
        period: "تطوير مستمر",
        desc: "تصميم وإدارة مجموعة نشطة تضم أكثر من ١٤ أداة برمجية وبوت تيليجرام مستقل لأتمتة سحب البيانات وجدولة المهام ومراقبة الأخطاء دون تدخل بشري.",
        badge: "جاهز للإنتاج"
      },
      {
        title: "المشاركة المتميزة في دورة جامعة شريف البرمجية",
        institution: "جامعة شريف للتكنولوجيا (المرتبة ٣ في إيران / ٥٤٨ عالمياً)",
        period: "مشارك متميز",
        desc: "تم اختياره كأحد الطلاب المتميزين الأوائل في مسار الأولمبياد البرمجي بجامعة شريف وخوارزميات بايثون المتقدمة للطلاب الموهوبين.",
        badge: "طالب نخبة"
      },
      {
        title: "هندسة الويب وقواعد بيانات دجانغو (Django)",
        institution: "تخصص من جامعة ميشيغان (University of Michigan)",
        period: "الدرجة النهائية: ١٠٠٪ درجة كاملة",
        desc: "تطوير تطبيقات ويب متكاملة وقوية، وتحسين سرعة الاستعلامات في قاعدة بيانات PostgreSQL، وتأمين المسارات وتصميم واجهات مستخدم متجاوبة.",
        badge: "درجة كاملة ١٠٠٪"
      },
      {
        title: "بيئات الويب الحديثة والتقنيات الناشئة",
        institution: "ميتا (Meta)، وجامعة لندن، وتورنتو، وبنسلفانيا",
        period: "شهادات تخصصية معتمدة",
        desc: "شهادات معتمدة في تصميم واجهات الويب المتجاوبة، ونماذج بناء وتدريب الذكاء الاصطناعي التوليدي، وتكامل واجهات البرمجة متعددة المصادر (APIs).",
        badge: "شهادات كورسيرا"
      }
    ],
    automationTitle: "معرض المشاريع النشطة والقائمة على الويب",
    automationSub: "مجموعة مختارة من أفضل مواقع الويب وبوتات تيليجرام النشطة التي طورها محمد رضا عابدين بور لتسهيل العمليات والاستخدام العام.",
    autos: [
      {
        title: "منصة فحص واختيار خوادم الدي ان اس (PIMX Pass DNS)",
        desc: "تطبيق ويب مستقل وعملي للغاية لاختيار أسرع خوادم DNS المتوافقة تماماً مع مزود خدمة الإنترنت الخاص بك لتحسين سرعة وجودة الاتصال.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "موقع ويب نشط"
      },
      {
        title: "منصة توليد الفنون المتن اسكي (PIMX Moji)",
        desc: "أداة ويب تفاعلية ومبتكرة لتحويل الصور والنصوص إلى لوحات فنية مميزة من رموز أسكي والـ Emoji مع سمات بصرية جذابة.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "موقع ويب نشط"
      }
    ],
    philosophyTitle: "فلسفة الهندسة والمهنية الأساسية",
    philosophySub: "الالتزامات، ومعايير تصميم البرمجيات، وقواعد العمل المهنية التي يلتزم بها محمد رضا",
    philosophies: [
      {
        title: "التعلم الذاتي المستمر",
        desc: "البحث المستمر عن أحدث تصاميم واجهات الويب، وتقنيات البرمجة الخلفية، وأدوات الذكاء الاصطناعي لتقديم حلول مبتكرة.",
        icon: GraduationCap
      },
      {
        title: "حل المشكلات عبر الأتمتة",
        desc: "الإيمان بأن أي مهمة تتكرر مرتين يجب برمجتها مرة واحدة. أتمتة الإجراءات اليدوية المملة باستخدام سكربتات بايثون عالية الكفاءة.",
        icon: Server
      },
      {
        title: "كتابة كود نظيف ومفهوم",
        desc: "الالتزام التام بالتصميم البرمجي المنظم والماجولار، وتسمية المتغيرات بوضوح، واتباع أفضل ممارسات البرمجة كائنية التوجه (OOP).",
        icon: ShieldCheck
      },
      {
        title: "اللتزام الكامل والتعاون المفتوح",
        desc: "تقديم تقارير تقدم واضحة، والاستجابة السريعة للملاحظات، والالتزام الصارم بالمواعيد النهائية مع حماية خصوصية البيانات.",
        icon: Heart
      }
    ],
    verifiedTag: "موثق رسمياً"
  },
  fr: {
    academicTitle: "Parcours Académique, Certificats & Projets Portfolio",
    academicSub: "Un suivi vérifié de certificats professionnels, de qualifications académiques de premier ordre de l'Université Sharif et de systèmes d'automatisation Python.",
    timeline: [
      {
        title: "Scripteur Python Professionnel & Automatisation",
        institution: "Portfolio de Projets Backend Indépendants",
        period: "Développement Continu",
        desc: "Conception et maintenance d'une série de plus de 14 scripts autonomes pour la collecte de données, le diagnostic d'erreurs et la gestion de bases de données.",
        badge: "Prêt pour la production"
      },
      {
        title: "Cours de Programmation de l'Université Sharif",
        institution: "Université de Technologie de Sharif (Top 3 en Iran, #548 Mondial)",
        period: "Participant de Premier Plan",
        desc: "Sélectionné parmi les meilleurs étudiants dans le domaine très compétitif de la programmation et des algorithmes Python de l'Université Sharif.",
        badge: "Élève Élite"
      },
      {
        title: "Ingénierie Web Django & Systèmes de Bases de Données",
        institution: "Spécialisation de l'Université du Michigan",
        period: "Note Finale : 100/100",
        desc: "Développement de backends robustes, optimisation des requêtes via PostgreSQL, protection des accès et interfaces fluides.",
        badge: "Note : 100/100"
      },
      {
        title: "Environnements Web Modernes & Architectures d'IA",
        institution: "Meta, Université de Toronto, Londres, et Penn",
        period: "Certifications Accréditées",
        desc: "Expertise certifiée en performance d'interface réactive, modèles génératifs d'IA et intégrations d'API.",
        badge: "Vérifié Coursera"
      }
    ],
    automationTitle: "Vitrine des Projets Actifs, Établis & en Production",
    automationSub: "Un choix de plateformes web actives et de services Telegram automatisés de Mohammadreza fonctionnant en direct.",
    autos: [
      {
        title: "PIMX Pass DNS (Contrôleur de Réseau)",
        desc: "Application web indépendante utile pour tester la latence et analyser les serveurs DNS de haute performance pour votre FAI.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Site Web Actif"
      },
      {
        title: "PIMX Moji (Générateur d'Art ASCII)",
        desc: "Utilitaire web convertissant des images et des motifs en chefs-d'œuvre ASCII à base d'émojis.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Site Web Actif"
      }
    ],
    philosophyTitle: "Philosophie de l'Ingénierie & Valeurs Professionnelles",
    philosophySub: "Les engagements, structures de code et normes de fiabilité de Mohammadreza.",
    philosophies: [
      {
        title: "Apprentissage Indépendant Continu",
        desc: "Recherche constante de modèles de conception modernes et d'outils d'IA pour garder des solutions à la pointe.",
        icon: GraduationCap
      },
      {
        title: "Résolution par l'Automatisation",
        desc: "L'idée que tout ce qui est fait deux fois doit être automatisé une fois. Routines manuelles gérées par des scripts de haute efficacité.",
        icon: Server
      },
      {
        title: "Code Propre & OOP Strict",
        desc: "Défenseur de classes modulaires, de noms de variables explicites et d'architecture propre.",
        icon: ShieldCheck
      },
      {
        title: "Collaboration Ouverte & Engagement",
        desc: "Rapports clairs, respect absolu des délais et strict respect de la confidentialité des données.",
        icon: Heart
      }
    ],
    verifiedTag: "Vérifié Officiel"
  },
  it: {
    academicTitle: "Traguardi Professionali, Certificati & Portfolio Progetti",
    academicSub: "Tracciamento verificato di certificati professionali, credenziali accademiche della Sharif University e automazioni Python.",
    timeline: [
      {
        title: "Sviluppatore Python & Automazione Core",
        institution: "Portfolio Progetti Backend Indipendente",
        period: "Sviluppo Continuo",
        desc: "Progettazione e manutenzione di oltre 14 script e strumenti autonomi per raccolta dati pianificata e diagnostica errori.",
        badge: "Pronto per l'Uso"
      },
      {
        title: "Corso di Programmazione Sharif University",
        institution: "Sharif University of Technology (Top 3 in Iran, #548 globalmente)",
        period: "Spicco Tra i Partecipanti",
        desc: "Selezionato come studente d'eccellenza nel percorso di programmazione competitiva e algoritmi Python.",
        badge: "Studente d'Élite"
      },
      {
        title: "Ingegneria Web Django & Database",
        institution: "Specializzazione University of Michigan",
        period: "Voto Finale: 100/100",
        desc: "Sviluppo backend robusto, ottimizzazione di query PostgreSQL, protezione percorsi e layout responsivi.",
        badge: "Voto: 100/100"
      },
      {
        title: "Ambienti Client Moderni e Architetture IA",
        institution: "Meta, University of Toronto, Londra, e Penn",
        period: "Certificazioni Accreditate",
        desc: "Competenza certificata in performance di layout, pattern generativi di intelligenza artificiale e integrazioni API.",
        badge: "Verificato Coursera"
      }
    ],
    automationTitle: "Progetti Attivi, Live & In Produzione",
    automationSub: "Selezione curata di piattaforme e servizi Telegram attivi gestiti direttamente sul web.",
    autos: [
      {
        title: "PIMX Pass DNS (Test Velocità)",
        desc: "Applicazione web indipendente e pratica per testare la latenza dei server DNS sul tuo ISP locale.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Sito Live"
      },
      {
        title: "PIMX Moji (Art Generator ASCII)",
        desc: "Servizio web interattivo per convertire immagini in capolavori ASCII composti da emoji.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Sito Live"
      }
    ],
    philosophyTitle: "Filosofia Progettuale & Standard Professionali",
    philosophySub: "L'impegno per l'affidabilità e la struttura pulita del codice mantenuti da Mohammadreza.",
    philosophies: [
      {
        title: "Apprentimento Indipendente Continuo",
        desc: "Ricerca costante di soluzioni di design d'avanguardia e utility IA avanzate.",
        icon: GraduationCap
      },
      {
        title: "Soluzioni Guidate dall'Automazione",
        desc: "Evitare compiti ripetitivi automatizzando le routine manuali con codice Python efficiente.",
        icon: Server
      },
      {
        title: "Codice Pulito & OOP Rigido",
        desc: "Forte sostenitore di classi modulari, nomi chiari e architetture ben documentate.",
        icon: ShieldCheck
      },
      {
        title: "Collaborazione Trasparente",
        desc: "Feedback rapido, rispetto assoluto delle scadenze e massima riservatezza dei dati.",
        icon: Heart
      }
    ],
    verifiedTag: "Verificato Ufficiale"
  },
  zh: {
    academicTitle: "技能里程碑、专业证书与项目库",
    academicSub: "经认证的全球专业证书、谢里夫理工大学顶级编程凭证及生产级 Python 自动化系统。",
    timeline: [
      {
        title: "生产级 Python 脚本编写与核心自动化",
        institution: "独立后端项目作品集",
        period: "持续迭代与开发",
        desc: "设计并维护超过 14 个自主运行脚本和工具，用于计划数据抓取、错误诊断及关系型数据库管理。",
        badge: "生产环境就绪"
      },
      {
        title: "谢里夫理工大学学生编程课程",
        institution: "谢里夫理工大学（伊朗排名第3，全球第548）",
        period: "特邀卓越参与者",
        desc: "入选谢里夫理工大学极具竞争力的学生编程班以及 Python 算法辅导，位居优秀学生之列。",
        badge: "精英学员"
      },
      {
        title: "Django Web 工程与关系型数据库系统",
        institution: "密歇根大学专业认证",
        period: "最终成绩：100% 满分",
        desc: "开发稳健的数据驱动后端，使用 PostgreSQL 优化关系查询速度、实施路径保护和响应式客户端布局。",
        badge: "成绩: 100/100"
      },
      {
        title: "现代客户端环境与 AI 架构",
        institution: "Meta、多伦多大学、伦敦大学及宾夕法尼亚大学",
        period: "权威专业认证",
        desc: "在响应式页面布局、生成式 AI 应用模式、多源 API 集成和交互动画方面拥有专业资质。",
        badge: "Coursera 认证"
      }
    ],
    automationTitle: "活跃、在线与生产级项目展示",
    automationSub: "精心挑选的 Mohammadreza 在线活跃平台和自动化 Telegram 服务系列。",
    autos: [
      {
        title: "PIMX Pass DNS（速度测试与网络控制器）",
        desc: "非常实用的独立网页应用，用于测试延迟并分析和选择最适合您本地 ISP 运营商的优质 DNS 服务器。",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "在线网页"
      },
      {
        title: "PIMX Moji（ASCII 和表情艺术生成器）",
        desc: "交互式客户端网页工具，利用自定义表情将原始图像和模式转换为丰富的纯文本 ASCII 艺术作品。",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "在线网页"
      }
    ],
    philosophyTitle: "工程开发哲学与核心职业标准",
    philosophySub: "Mohammadreza 在每一个工作系统中所坚持的职业承诺、代码规范与可靠性指标。",
    philosophies: [
      {
        title: "持续自主学习",
        desc: "不断研究前沿设计布局、现代后端方案和人工智能工具，确保系统方案始终保持先进性。",
        icon: GraduationCap
      },
      {
        title: "自动化驱动问题解决",
        desc: "坚信手工做两次的事情都应该自动化。用高效率脚本解决所有日常繁琐任务。",
        icon: Server
      },
      {
        title: "严谨整洁代码与面向对象",
        desc: "强力倡导模块化类设计、清晰见名的变量习惯、严谨的架构规范以及完备的各类文档。",
        icon: ShieldCheck
      },
      {
        title: "坦诚协作与绝对承诺",
        desc: "提交透明的进度报告，快速反馈，100% 恪守截止时间，并极其严格地保护用户数据隐私。",
        icon: Heart
      }
    ],
    verifiedTag: "官方认证"
  },
  ru: {
    academicTitle: "Профессиональные достижения, сертификаты и проекты",
    academicSub: "Подтвержденный список международных сертификатов, академических успехов Университета Шариф и систем автоматизации на Python.",
    timeline: [
      {
        title: "Профессиональный Python-разработчик и автоматизация",
        institution: "Портфолио независимых бэкенд-проектов",
        period: "Постоянное совершенствование",
        desc: "Разработка и обслуживание более 14 автономных скриптов для сбора данных по расписанию и анализа ошибок.",
        badge: "Готово к работе"
      },
      {
        title: "Программа программирования Университета Шариф",
        institution: "Технологический университет Шариф (Рейтинг #3 в Иране, #548 в мире)",
        period: "Выдающийся участник",
        desc: "Выбран среди лучших учеников в высококонкурентной программе олимпиадного программирования по Python.",
        badge: "Элитный студент"
      },
      {
        title: "Разработка на Django и системы баз данных",
        institution: "Специализация Университета Мичигана",
        period: "Итоговая оценка: 100/100",
        desc: "Создание надежного серверного кода, оптимизация SQL-запросов PostgreSQL и защита путей доступа.",
        badge: "Оценка: 100/100"
      },
      {
        title: "Современные клиентские среды и архитектуры ИИ",
        institution: "Meta, Университет Торонто, Лондон и Пенсильвания",
        period: "Аккредитованные сертификации",
        desc: "Сертифицированные навыки в отзывчивой верстке, генеративных паттернах ИИ и интеграции API сторонних сервисов.",
        badge: "Проверено Coursera"
      }
    ],
    automationTitle: "Витрина активных и рабочих веб-проектов",
    automationSub: "Специальный выбор активных веб-платформ и ботов Telegram от Mohammadreza.",
    autos: [
      {
        title: "PIMX Pass DNS (Анализ производительности сети)",
        desc: "Практичное независимое веб-приложение для тестирования задержки и выбора оптимального DNS под провайдера.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Рабочий веб-сайт"
      },
      {
        title: "PIMX Moji (ASCII & Emoji Арт Генератор)",
        desc: "Интерактивный инструмент для трансформации изображений и текста в знаки ASCII с помощью эмодзи.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Рабочий веб-сайт"
      }
    ],
    philosophyTitle: "Инженерная философия и этические стандарты",
    philosophySub: "Обязательства по качеству, чистоте исходных систем кода и надежности систем.",
    philosophies: [
      {
        title: "Постоянное независимое обучение",
        desc: "Изучение трендов веб-разработки и новых практик использования генеративного ИИ.",
        icon: GraduationCap
      },
      {
        title: "Ориентированность на автоматизацию",
        desc: "Автоматизация рутинных действий с помощью высокоэффективных скриптов Python.",
        icon: Server
      },
      {
        title: "Чистый ООП и модульная архитектура",
        desc: "Проектирование чистого понятного кода с именованием сущностей и архитектурных звеньев.",
        icon: ShieldCheck
      },
      {
        title: "Честное партнерство и надежность",
        desc: "Регулярный статус хода работ, строгое соблюдение дедлайнов и конфиденциальности.",
        icon: Heart
      }
    ],
    verifiedTag: "Проверено"
  },
  el: {
    academicTitle: "Ορόσημα Δεξιοτήτων, Πιστοποιητικά & Έργα Portfolio",
    academicSub: "Μια επαληθευμένη πορεία διεθνών επαγγελματικών πιστοποιήσεων, ακαδημαϊκών διακρίσεων από το Πανεπιστήμιο Sharif και συστημάτων Python.",
    timeline: [
      {
        title: "Python Developer & Αυτοματοποίηση Core",
        institution: "Χαρτοφυλάκιο Ανεξάρτητων Έργων Backend",
        period: "Συνεχής Ανάπτυξη",
        desc: "Σχεδιασμός και συντήρηση περισσότερων από 14 αυτόνομων σεναρίων Python για προγραμματισμένη λήψη δεδομένων.",
        badge: "Έτοιμο για Χρήση"
      },
      {
        title: "Επιλογή Προγράμματος Προγραμματισμού Sharif",
        institution: "Τεχνολογικό Πανεπιστήμιο Sharif (Ρανκ #3 στο Ιράν, #548 Παγκοσμίως)",
        period: "Διακεκριμένος Συμμετέχων",
        desc: "Επιλέχθηκε ανάμεσα στους κορυφαίους μαθητές στον άκρως ανταγωνιστικό τομέα προγραμματισμού Python.",
        badge: "Κορυφαίος Μαθητής"
      },
      {
        title: "Django Web Engineering & Βάσεις Δεδομένων",
        institution: "Εξειδίκευση Πανεπιστημίου Μίσιγκαν",
        period: "Τελικός Βαθμός: 100/100",
        desc: "Ανάπτυξη ισχυρού backend, βελτιστοποίηση ερωτημάτων PostgreSQL, προστασία διαδρομών και responsive layouts.",
        badge: "Βαθμός: 100/100"
      },
      {
        title: "Σύγχρονα Περιβάλλοντα Web & Αρχιτεκτονικές AI",
        institution: "Meta, Πανεπιστήμιο Τορόντο, Λονδίνο και Penn",
        period: "Διαπιστευμένες Πιστοποιήσεις",
        desc: "Πιστοποιημένη τεχνογνωσία σε responsive επιδόσεις, πρότυπα παραγωγικής τεχνητής νοημοσύνης και API.",
        badge: "Coursera Επαληθευμένο"
      }
    ],
    automationTitle: "Έκθεση Ενεργών & Ζωντανών Έργων",
    automationSub: "Επιλογή από τις καλύτερες ενεργές πλατφόρμες και αυτοματοποιημένα bots Telegram του Mohammadreza.",
    autos: [
      {
        title: "PIMX Pass DNS (Δοκιμή Ταχύτητας DNS)",
        desc: "Εξαιρετικά χρήσιμη ανεξάρτητη εφαρμογή για τη μέτρηση του ping και την επιλογή των βέλτιστων διακομιστών DNS.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Ζωντανός Ιστότοπος"
      },
      {
        title: "PIMX Moji (ASCII & Emoji Art Generator)",
        desc: "Διαδραστικό εργαλείο για τη μετατροπή εικόνων και κειμένων σε ψηφιακά έργα τέχνης ASCII.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Ζωντανός Ιστότοπος"
      }
    ],
    philosophyTitle: "Φιλοσοφία Μηχανικής & Επαγγελματικά Πρότυπα",
    philosophySub: "Οι δεσμεύσεις, η καθαρότητα του κώδικα και τα πρότυπα αξιοπιστίας που τηρεί ο Mohammadreza.",
    philosophies: [
      {
        title: "Συνεχής Ανεξάρτητη Μάθηση",
        desc: "Έρευνα σύγχρονων σχεδιαστικών μοντέλων και εργαλείων AI για την παροχή λύσεων αιχμής.",
        icon: GraduationCap
      },
      {
        title: "Επίλυση Προβλημάτων με Αυτοματισμό",
        desc: "Αντικατάσταση επαναλαμβανόμενων διαδικασιών με εξαιρετικά αποδοτικά σενάρια Python.",
        icon: Server
      },
      {
        title: "Καθαρός Κώδικας & Αυστηρό OOP",
        desc: "Υποστηρικτής των αρθρωτών κλάσεων, των σαφών ονομάτων μεταβλητών και της καθαρής αρχιτεκτονικής.",
        icon: ShieldCheck
      },
      {
        title: "Διαφανής Συνεργασία & Δέσμευση",
        desc: "Συχνές αναφορές προόδου, γρήγορες απαντήσεις, 100% τήρηση προθεσμιών και προστασία δεδομένων.",
        icon: Heart
      }
    ],
    verifiedTag: "Επαληθευμένο"
  },
  la: {
    academicTitle: "Curriculum Artium, Diplomata et Incepta",
    academicSub: "Index confirmatus diplomatum professionalium orbium terrarum, merita studii scholae Sharif et systemata Pythonis.",
    timeline: [
      {
        title: "Scriptor Pythonis et Automator Generalis",
        institution: "Ratio Inceptorum Backend Individualis",
        period: "Progressio Perpetua",
        desc: "Formans et sustinens plus ordines 14 scriptorum autonomis ad informationes petendas et errores probandos.",
        badge: "Productione Paratus"
      },
      {
        title: "Programmatio ex Universitate Sharif",
        institution: "Academica Universitas Sharif (Top 3 in Irania, #548 in Orbe)",
        period: "Discipulus Egregius",
        desc: "Electus ut insignis discipulus in cursibus programmandi et algorithmorum Pythonis scholae Sharif.",
        badge: "Discipulus Primus"
      },
      {
        title: "Django Web Engineering et Structura Datorum",
        institution: "Doctrina Universitatis Michiganensis",
        period: "Gradus Finalis: 100/100",
        desc: "Backend firmum creans, velocitas PostgreSQL quaerendi acuta, viae securae et interfacies fluxae.",
        badge: "Gradus: 100/100"
      },
      {
        title: "Systemata Web Moderna et AI Architecturae",
        institution: "Meta, Universitas Torontonensis, Londiniensis, et Penn",
        period: "Diplomata Approbata",
        desc: "Doctrina de responsivis paginis, integrationibus instrumentorum AI, et nexibus API secundariis.",
        badge: "Coursera Verificatus"
      }
    ],
    automationTitle: "Incepta Activa et Viventia Specimen",
    automationSub: "Dilectus optimorum inceptorum et scriptorum a Mohammadreza ad usum publicum.",
    autos: [
      {
        title: "PIMX Pass DNS (Metrum Velocitatis)",
        desc: "Palaestra utilis ad ping probandum et meliores DNS servidores pro ISP tuo eligendos.",
        icon: Globe,
        color: "text-cyber-teal",
        bg: "bg-teal-950/20",
        link: "https://pimxpassdns.pages.dev/",
        badge: "Pagina Activa"
      },
      {
        title: "PIMX Moji (Artificium ex ASCII et Emojis)",
        desc: "Instrumentum ad imagines vertendas in scripturas symbolorum cum coloribus cyber-punk.",
        icon: Sparkles,
        color: "text-rose-400",
        bg: "bg-rose-950/20",
        link: "https://pimxmoji.pages.dev",
        badge: "Pagina Activa"
      }
    ],
    philosophyTitle: "Philosophia Operis et Regulae Honestatis",
    philosophySub: "Promissa, diligentia scripturae et fidei rationes quas Mohammadreza custodit.",
    philosophies: [
      {
        title: "Assidua Doctrina Mea",
        desc: "Semper investigo novas formas technologiasque ut incepta mea recentissima sint.",
        icon: GraduationCap
      },
      {
        title: "Solutio per Automationem",
        desc: "Scripta Pythonis efficientia ad omnia pensa redundantia tollenda.",
        icon: Server
      },
      {
        title: "Scriptura Munda et OOP",
        desc: "Doctrina ordinata classium modularum et notationum clararum sine ambiguitate.",
        icon: ShieldCheck
      },
      {
        title: "Fidelitas et Operatio Aequa",
        desc: "Respondendi celeritas, silentii fides de datis, et temporum exactorum observantia.",
        icon: Heart
      }
    ],
    verifiedTag: "Verificatus"
  }
};
