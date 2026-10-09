import { humanHomeCopy } from './human_copy';
import type { LanguageType } from './translations';

export interface HomeCopy {
  hello: string;
  first: string;
  second: string;
  role: string;
  bio: string;
  explore: string;
  about: string;
  available: string;
  work: string;
  workSub: string;
  all: string;
  workDesc: string;
  expertise: string;
  expertiseItalic: string;
  aboutTitle: string;
  aboutItalic: string;
  aboutBody: string;
  more: string;
  scroll: string;
  location: string;
  since: string;
  live: string;
  tag: string;
  tools: string;
  services: [string, string, string];
  serviceDescs: [string, string, string];
}

export const portfolioHomeCopy: Record<LanguageType, HomeCopy> = {
  en: {
    ...humanHomeCopy.en,
    "hello": "HEY, I'M MOHAMMADREZA",
    "explore": "Explore my work",
    "about": "A little about me",
    "available": "Open to collaboration",
    "work": "Selected work",
    "all": "All projects",
    "expertise": "Different tools.",
    "expertiseItalic": "One mindset.",
    "more": "Meet the person behind the code",
    "scroll": "SCROLL TO DISCOVER",
    "location": "RASHT, IRAN",
    "since": "BUILDING SINCE 2021",
    "live": "Explore project",
    "tag": "DEVELOPMENT × CREATIVITY",
    "tools": "MY EVERYDAY TOOLKIT",
    "services": [
        "Web development",
        "AI & prompt engineering",
        "Bots & automation"
    ],
    "serviceDescs": [
        "Thoughtful interfaces. Solid backends. From the first sketch to the final deployment, I build for the people who use it.",
        "Turning language models into useful experiences with structured prompts, thoughtful integrations, and a focus on clarity.",
        "Python-powered tools and Telegram bots that connect services and take repetitive work off your hands."
    ]
  },
  fa: {
    ...humanHomeCopy.fa,
    "hello": "سلام، من محمدرضام",
    "explore": "کشف پروژه‌ها",
    "about": "کمی دربارهٔ من",
    "available": "آمادهٔ همکاری",
    "work": "پروژه‌های منتخب",
    "all": "همهٔ پروژه‌ها",
    "expertise": "ابزارهای متفاوت.",
    "expertiseItalic": "یک نگاه مشترک.",
    "more": "با آدم پشت این کدها آشنا شو",
    "scroll": "اسکرول کن و کشف کن",
    "location": "رشت، ایران",
    "since": "در حال ساختن از ۲۰۲۱",
    "live": "مشاهدهٔ پروژه",
    "tag": "توسعه × خلاقیت",
    "tools": "ابزارهای هر روز من",
    "services": [
        "توسعهٔ وب",
        "هوش مصنوعی و مهندسی پرامپت",
        "ربات‌ها و اتوماسیون"
    ],
    "serviceDescs": [
        "رابط‌های فکرشده و بک‌اندهای قابل‌اعتماد. از اولین طرح تا انتشار نهایی، برای آدم‌هایی که از آن استفاده می‌کنند می‌سازم.",
        "تبدیل مدل‌های زبانی به تجربه‌های کاربردی با پرامپت‌های ساختاریافته، اتصال هوشمند ابزارها و تمرکز بر شفافیت.",
        "ابزارهای پایتونی و ربات‌های تلگرام که سرویس‌ها را به هم وصل می‌کنند و کارهای تکراری را از دوشت برمی‌دارند."
    ]
  },
  ar: {
    ...humanHomeCopy.ar,
    "hello": "مرحباً، أنا محمد رضا",
    "explore": "اكتشف أعمالي",
    "about": "قليل عني",
    "available": "متاح للتعاون",
    "work": "أعمال مختارة",
    "all": "كل المشاريع",
    "expertise": "الأشياء التي",
    "expertiseItalic": "أجيد صنعها.",
    "more": "تعرّف على الشخص وراء الكود",
    "scroll": "مرّر لتكتشف",
    "location": "رشت، إيران",
    "since": "أصنع منذ 2021",
    "live": "استكشف المشروع",
    "tag": "التطوير × الإبداع",
    "tools": "أدواتي اليومية",
    "services": [
        "تطوير الويب",
        "الذكاء الاصطناعي وهندسة الأوامر",
        "البوتات والأتمتة"
    ],
    "serviceDescs": [
        "واجهات مدروسة، وأنظمة خلفية متينة. من أول رسم إلى النشر النهائي، أصنع من أجل الأشخاص الذين يستخدمون المنتج.",
        "أحوّل النماذج اللغوية إلى تجارب مفيدة بأوامر منظمة، وتكاملات مدروسة، وتركيز على الوضوح.",
        "أدوات بلغة Python وبوتات Telegram تصل بين الخدمات وتتولى عنك الأعمال المتكررة."
    ]
  },
  de: {
    ...humanHomeCopy.de,
    "hello": "HI, ICH BIN MOHAMMADREZA",
    "explore": "Meine Arbeit entdecken",
    "about": "Ein wenig über mich",
    "available": "Offen für Zusammenarbeit",
    "work": "Ausgewählte Arbeiten",
    "all": "Alle Projekte",
    "expertise": "Was ich",
    "expertiseItalic": "am besten kann.",
    "more": "Der Mensch hinter dem Code",
    "scroll": "SCROLLEN UND ENTDECKEN",
    "location": "RASCHT, IRAN",
    "since": "AM BAUEN SEIT 2021",
    "live": "Projekt entdecken",
    "tag": "ENTWICKLUNG × KREATIVITÄT",
    "tools": "MEINE TÄGLICHEN WERKZEUGE",
    "services": [
        "Webentwicklung",
        "KI & Prompt Engineering",
        "Bots & Automatisierung"
    ],
    "serviceDescs": [
        "Durchdachte Oberflächen. Solide Backends. Von der ersten Skizze bis zur Veröffentlichung entwickle ich für die Menschen, die das Produkt nutzen.",
        "Ich mache Sprachmodelle mit strukturierten Prompts, durchdachten Integrationen und klaren Abläufen zu nützlichen Anwendungen.",
        "Python-Tools und Telegram-Bots, die Dienste verbinden und dir wiederkehrende Aufgaben abnehmen."
    ]
  },
  fr: {
    ...humanHomeCopy.fr,
    "hello": "SALUT, MOI C’EST MOHAMMADREZA",
    "explore": "Découvrir mes projets",
    "about": "Un peu de moi",
    "available": "Ouvert aux collaborations",
    "work": "Projets choisis",
    "all": "Tous les projets",
    "expertise": "Ce que",
    "expertiseItalic": "je fais le mieux.",
    "more": "La personne derrière le code",
    "scroll": "DÉFILER POUR DÉCOUVRIR",
    "location": "RASHT, IRAN",
    "since": "JE CRÉE DEPUIS 2021",
    "live": "Découvrir le projet",
    "tag": "DÉVELOPPEMENT × CRÉATIVITÉ",
    "tools": "MES OUTILS AU QUOTIDIEN",
    "services": [
        "Développement web",
        "IA & conception de prompts",
        "Bots & automatisation"
    ],
    "serviceDescs": [
        "Des interfaces réfléchies. Des backends solides. De la première esquisse au déploiement, je conçois pour les personnes qui utilisent le produit.",
        "Je transforme les modèles de langage en expériences utiles grâce à des prompts structurés, des intégrations réfléchies et des échanges clairs.",
        "Des outils Python et des bots Telegram qui relient les services et vous libèrent des tâches répétitives."
    ]
  },
  it: {
    ...humanHomeCopy.it,
    "hello": "CIAO, SONO MOHAMMADREZA",
    "explore": "Scopri i miei progetti",
    "about": "Qualcosa su di me",
    "available": "Aperto a collaborazioni",
    "work": "Progetti scelti",
    "all": "Tutti i progetti",
    "expertise": "Quello che",
    "expertiseItalic": "so fare meglio.",
    "more": "La persona dietro il codice",
    "scroll": "SCORRI E SCOPRI",
    "location": "RASHT, IRAN",
    "since": "CREO DAL 2021",
    "live": "Scopri il progetto",
    "tag": "SVILUPPO × CREATIVITÀ",
    "tools": "I MIEI STRUMENTI QUOTIDIANI",
    "services": [
        "Sviluppo web",
        "IA & progettazione dei prompt",
        "Bot & automazione"
    ],
    "serviceDescs": [
        "Interfacce curate. Backend solidi. Dal primo schizzo al rilascio, sviluppo pensando alle persone che useranno il prodotto.",
        "Trasformo i modelli linguistici in esperienze utili con prompt strutturati, integrazioni curate e attenzione alla chiarezza.",
        "Strumenti Python e bot Telegram che collegano servizi e ti liberano dai compiti ripetitivi."
    ]
  },
  zh: {
    ...humanHomeCopy.zh,
    "hello": "你好，我是穆罕默德礼萨",
    "explore": "探索我的作品",
    "about": "了解一下我",
    "available": "欢迎合作",
    "work": "精选作品",
    "all": "全部项目",
    "expertise": "我擅长",
    "expertiseItalic": "做这些。",
    "more": "认识代码背后的我",
    "scroll": "向下滚动，继续探索",
    "location": "伊朗，拉什特",
    "since": "从 2021 年开始创造",
    "live": "探索项目",
    "tag": "开发 × 创意",
    "tools": "我的日常工具",
    "services": [
        "网页开发",
        "人工智能与提示词设计",
        "机器人与自动化"
    ],
    "serviceDescs": [
        "用心设计的界面，扎实的后端。从第一张草图到最终部署，我始终为使用它的人而开发。",
        "通过结构化提示词、精心设计的集成和清晰的交互，让语言模型成为实用的体验。",
        "用 Python 工具和 Telegram 机器人连接服务，让你从重复工作中解放出来。"
    ]
  },
  ru: {
    ...humanHomeCopy.ru,
    "hello": "ПРИВЕТ, Я МОХАММАДРЕЗА",
    "explore": "Посмотреть работы",
    "about": "Немного обо мне",
    "available": "Открыт к сотрудничеству",
    "work": "Избранные работы",
    "all": "Все проекты",
    "expertise": "То, что",
    "expertiseItalic": "я умею лучше всего.",
    "more": "Человек за этим кодом",
    "scroll": "ЛИСТАЙТЕ И ОТКРЫВАЙТЕ",
    "location": "РЕШТ, ИРАН",
    "since": "СОЗДАЮ С 2021 ГОДА",
    "live": "Посмотреть проект",
    "tag": "РАЗРАБОТКА × ТВОРЧЕСТВО",
    "tools": "МОИ ПОВСЕДНЕВНЫЕ ИНСТРУМЕНТЫ",
    "services": [
        "Веб-разработка",
        "ИИ и проектирование промптов",
        "Боты и автоматизация"
    ],
    "serviceDescs": [
        "Продуманные интерфейсы. Надёжные бэкенды. От первого эскиза до публикации я создаю для тех, кто будет пользоваться продуктом.",
        "Превращаю языковые модели в полезные решения с помощью структурированных промптов, продуманных интеграций и ясного взаимодействия.",
        "Инструменты на Python и боты Telegram, которые связывают сервисы и берут на себя повторяющиеся задачи."
    ]
  },
  el: {
    ...humanHomeCopy.el,
    "hello": "ΓΕΙΑ, ΕΙΜΑΙ Ο MOHAMMADREZA",
    "explore": "Δείτε τη δουλειά μου",
    "about": "Λίγα για μένα",
    "available": "Ανοιχτός σε συνεργασίες",
    "work": "Επιλεγμένα έργα",
    "all": "Όλα τα έργα",
    "expertise": "Αυτά που",
    "expertiseItalic": "κάνω καλύτερα.",
    "more": "Ο άνθρωπος πίσω από τον κώδικα",
    "scroll": "ΚΥΛΗΣΤΕ ΚΑΙ ΑΝΑΚΑΛΥΨΤΕ",
    "location": "ΡΑΣΤ, ΙΡΑΝ",
    "since": "ΔΗΜΙΟΥΡΓΩ ΑΠΟ ΤΟ 2021",
    "live": "Δείτε το έργο",
    "tag": "ΑΝΑΠΤΥΞΗ × ΔΗΜΙΟΥΡΓΙΚΟΤΗΤΑ",
    "tools": "ΤΑ ΚΑΘΗΜΕΡΙΝΑ ΜΟΥ ΕΡΓΑΛΕΙΑ",
    "services": [
        "Ανάπτυξη web",
        "AI & σχεδιασμός prompts",
        "Bots & αυτοματισμοί"
    ],
    "serviceDescs": [
        "Προσεγμένες διεπαφές. Στιβαρά backends. Από το πρώτο σκίτσο μέχρι τη δημοσίευση, δημιουργώ για όσους χρησιμοποιούν το προϊόν.",
        "Μετατρέπω τα γλωσσικά μοντέλα σε χρήσιμες εμπειρίες με δομημένα prompts, προσεγμένες διασυνδέσεις και σαφή επικοινωνία.",
        "Εργαλεία Python και bots Telegram που συνδέουν υπηρεσίες και αναλαμβάνουν τις επαναλαμβανόμενες εργασίες."
    ]
  },
  la: {
    ...humanHomeCopy.la,
    "hello": "SALVE, MOHAMMADREZA SUM",
    "explore": "Opera mea explora",
    "about": "Pauca de me",
    "available": "Ad cooperandum paratus",
    "work": "Opera selecta",
    "all": "Omnia opera",
    "expertise": "Quae",
    "expertiseItalic": "optime facio.",
    "more": "Hominem post codicem cognosce",
    "scroll": "VOLVE ET EXPLORA",
    "location": "RASHT, IRANIA",
    "since": "CREO AB ANNO 2021",
    "live": "Opus explora",
    "tag": "PROGRAMMATIO × CREATIVITAS",
    "tools": "INSTRUMENTA MEA COTIDIANA",
    "services": [
        "Progressio interretialis",
        "AI et mandata",
        "Bots et automata"
    ],
    "serviceDescs": [
        "Interfacies diligenter excogitatae. Systemata firma. A prima forma ad editionem finalem, pro hominibus qui opere utuntur creo.",
        "Exemplaria linguistica in usum utilem converto, mandatis ordinatis, coniunctionibus diligenter excogitatis et studio claritatis.",
        "Instrumenta Python et bots Telegram quae ministeria coniungunt et labores repetitos pro te suscipiunt."
    ]
  }
};
