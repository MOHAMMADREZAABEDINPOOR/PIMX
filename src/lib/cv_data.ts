import { LanguageType } from './translations';

export interface CVLanguageSet {
  name: string;
  role: string;
  location: string;
  philosophyTitle: string;
  philosophyQuote: string;
  contactTitle: string;
  projectsTitle: string;
  certificatesTitle: string;
  skillsTitle: string;
  languagesTitle: string;
  educationTitle: string;
  arduinoProjectsTitle: string;
  downloadPdf: string;
  viewOriginal: string;
  gradeText: string;
  durationText: string;
  locationText: string;
  personalProj: string;
  schoolProj: string;
  roleSpecial: string;
  eduTitle: string;
  eduSchool: string;
  eduTimeline: string;
  eduDesc: string;
  langPersianText: string;
  langEnglishText: string;
  contactValues: {
    github: string;
    linkedin: string;
    telegram: string;
    email: string;
    phone: string;
  };
}

export const cvTranslations: Record<LanguageType, CVLanguageSet> = {
  en: {
    name: "Mohammadreza Abedinpoor",
    role: "Student & Developer",
    location: "Iran, Rasht",
    philosophyTitle: "Life Philosophy",
    philosophyQuote: "“all people are equal and deserving of respect, whether rich or poor.”",
    contactTitle: "Contact Channels",
    projectsTitle: "Featured Projects",
    certificatesTitle: "Achievements & Certificates",
    skillsTitle: "Core & Soft Skills",
    languagesTitle: "Languages",
    educationTitle: "Education",
    arduinoProjectsTitle: "Arduino Engineering",
    downloadPdf: "Download PDF / Print",
    viewOriginal: "Original Preview",
    gradeText: "Grade",
    durationText: "Timeline",
    locationText: "Location",
    personalProj: "Personal Project",
    schoolProj: "School Project",
    roleSpecial: "School's Academic Vice Principal",
    eduTitle: "12th-grade Science & Math Student",
    eduSchool: "Dr. Ali Shariati High School",
    eduTimeline: "2021 - Present",
    eduDesc: "Currently studying in the 12th grade of Mathematics and Physics. Excellent analytical foundation and algorithmic problem solving.",
    langPersianText: "Persian (Native)",
    langEnglishText: "English (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  fa: {
    name: "محمدرضا عابدین‌پور",
    role: "دانش‌آموز و توسعه‌دهنده نرم‌افزار",
    location: "ایران، رشت",
    philosophyTitle: "فلسفه زندگی",
    philosophyQuote: "«همه انسان‌ها برابرند و شایسته احترام، چه ثروتمند و چه فقیر.»",
    contactTitle: "پل‌های ارتباطی",
    projectsTitle: "پروژه‌های شاخص",
    certificatesTitle: "افتخارات و گواهینامه‌های تخصصی",
    skillsTitle: "مهارت‌های فنی و نرم",
    languagesTitle: "زبان‌های خارجی",
    educationTitle: "تحصیلات",
    arduinoProjectsTitle: "مهندسی سخت‌افزار و آردوینو",
    downloadPdf: "دانلود نسخه PDF / چاپ رزومه",
    viewOriginal: "پیش‌نمایش نسخه اصلی",
    gradeText: "نمره",
    durationText: "خط زمانی",
    locationText: "محل اجرا",
    personalProj: "پروژه شخصی",
    schoolProj: "پروژه مدرسه‌ای",
    roleSpecial: "معاون آموزشی دبیرستان",
    eduTitle: "پایه دوازدهم ریاضی و فیزیک",
    eduSchool: "دبیرستان نمونه علی‌شریعتی",
    eduTimeline: "۱۴۰۰ - تا کنون",
    eduDesc: "مشغول به تحصیل در پایه دوازدهم ریاضی و فیزیک دبیرستان شریعتی. متمرکز بر منطق ریاضیات گسسته، فیزیک تجربی، روش‌های برنامه‌نویسی بهینه‌سازی محاسباتی و تحلیل مسایل الگوریتمی.",
    langPersianText: "فارسی (زبان مادری)",
    langEnglishText: "انگلیسی (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  ar: {
    name: "محمد رضا عابدين بور",
    role: "طالب ومطور برمجيات",
    location: "إيران، رشت",
    philosophyTitle: "فلسفة الحياة",
    philosophyQuote: "«جميع الناس متساوون ويستحقون الاحترام، سواء كانوا أغنياء أم فقراء.»",
    contactTitle: "قنوات الاتصال",
    projectsTitle: "المشاريع المميزة",
    certificatesTitle: "الإنجازات والشهادات الأكاديمية",
    skillsTitle: "المهارات التقنية والشخصية",
    languagesTitle: "اللغات اللغوية",
    educationTitle: "التعليم الدراسي",
    arduinoProjectsTitle: "هندسة الأجهزة وآردوينو",
    downloadPdf: "تحميل سيرتي الذاتية PDF / طباعة",
    viewOriginal: "معاينة الملف الأصلي",
    gradeText: "الدرجة",
    durationText: "الفترة الزمنية",
    locationText: "الموقع الجغرافي",
    personalProj: "مشروع شخصي",
    schoolProj: "مشروع مدرسي",
    roleSpecial: "الوكيل الأكاديمي للمدرسة",
    eduTitle: "طالب في الصف الثاني عشر (الفرع العلمي)",
    eduSchool: "مدرسة الدكتور علي شريعتي الثانوية",
    eduTimeline: "2021 - حتى الآن",
    eduDesc: "أدرس حالياً في الصف الثاني عشر تخصص الرياضيات والفيزياء في مدرسة شريعتي الثانوية المتميزة. أركز على تطبيق المنطق الرياضي والفيزياء في حل المشكلات البرمجية.",
    langPersianText: "الفارسية (الأم)",
    langEnglishText: "الإنجليزية (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  de: {
    name: "Mohammadreza Abedinpoor",
    role: "Schüler & Entwickler",
    location: "Iran, Rasht",
    philosophyTitle: "Lebensphilosophie",
    philosophyQuote: "„Alle Menschen sind gleich und verdienen Respekt, ob reich oder arm.“",
    contactTitle: "Kontaktkanäle",
    projectsTitle: "Ausgewählte Projekte",
    certificatesTitle: "Erfolge & Zertifikate",
    skillsTitle: "Kern- & Soft-Skills",
    languagesTitle: "Sprachen",
    educationTitle: "Ausbildung",
    arduinoProjectsTitle: "Arduino-Technik",
    downloadPdf: "PDF herunterladen / Drucken",
    viewOriginal: "Originalvorschau",
    gradeText: "Note",
    durationText: "Zeitlinie",
    locationText: "Ort",
    personalProj: "Persönliches Projekt",
    schoolProj: "Schulprojekt",
    roleSpecial: "Akademischer Prorektor der Schule",
    eduTitle: "Schüler der 12. Klasse (Naturwissenschaften & Mathematik)",
    eduSchool: "Dr. Ali Shariati Gymnasium",
    eduTimeline: "2021 - Heute",
    eduDesc: "Derzeit in der 12. Klasse im Bereich Mathematik und Physik. Hervorragende analytische Grundlagen und algorithmische Problemlösung.",
    langPersianText: "Persisch (Muttersprache)",
    langEnglishText: "Englisch (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  fr: {
    name: "Mohammadreza Abedinpoor",
    role: "Étudiant & Développeur",
    location: "Iran, Rasht",
    philosophyTitle: "Philosophie de vie",
    philosophyQuote: "« Tous les êtres humains sont égaux et méritent le respect, qu'ils soient riches ou pauvres. »",
    contactTitle: "Canaux de contact",
    projectsTitle: "Projets vedettes",
    certificatesTitle: "Réalisations & Certificats",
    skillsTitle: "Compétences clés & professionnelles",
    languagesTitle: "Langues",
    educationTitle: "Éducation",
    arduinoProjectsTitle: "Ingénierie Arduino",
    downloadPdf: "Télécharger PDF / Imprimer",
    viewOriginal: "Aperçu original",
    gradeText: "Note",
    durationText: "Chronologie",
    locationText: "Lieu",
    personalProj: "Projet Personnel",
    schoolProj: "Projet Scolaire",
    roleSpecial: "Directeur académique adjoint de l'école",
    eduTitle: "Élève de 12ème année (Sciences & Mathématiques)",
    eduSchool: "Lycée Dr Ali Shariati",
    eduTimeline: "2021 - Présent",
    eduDesc: "Actuellement en classe de terminale en mathématiques et physique. Excellente base analytique et résolution méthodique de problèmes algorithmiques.",
    langPersianText: "Persan (Langue maternelle)",
    langEnglishText: "Anglais (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  it: {
    name: "Mohammadreza Abedinpoor",
    role: "Studente & Sviluppatore",
    location: "Iran, Rasht",
    philosophyTitle: "Filosofia di Vita",
    philosophyQuote: "«Tutti gli esseri umani sono uguali e meritano rispetto, ricchi o poveri che siano.»",
    contactTitle: "Canali di Contatto",
    projectsTitle: "Progetti in Evidenza",
    certificatesTitle: "Traguardi & Certificati",
    skillsTitle: "Competenze Chiave & Soft Skills",
    languagesTitle: "Lingue",
    educationTitle: "Istruzione",
    arduinoProjectsTitle: "Ingegneria Arduino",
    downloadPdf: "Scarica PDF / Stampa",
    viewOriginal: "Anteprima Originale",
    gradeText: "Valutazione",
    durationText: "Timeline",
    locationText: "Posizione",
    personalProj: "Progetto Personale",
    schoolProj: "Progetto Scolastico",
    roleSpecial: "Vicepreside Accademico",
    eduTitle: "Studente del 12° anno (Scienze e Matematica)",
    eduSchool: "Liceo Scientifico Dr. Ali Shariati",
    eduTimeline: "2021 - Presente",
    eduDesc: "Attualmente frequenta l'ultimo anno (matematica e fisica). Solide basi analitiche e attitudine al problem solving algoritmico.",
    langPersianText: "Persiano (Madrelingua)",
    langEnglishText: "Inglese (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  zh: {
    name: "Mohammadreza Abedinpoor",
    role: "学生与开发人员",
    location: "伊朗，拉什特",
    philosophyTitle: "人生哲学",
    philosophyQuote: "“所有人都是平等的，无论贫富，都应该受到尊重。”",
    contactTitle: "联系渠道",
    projectsTitle: "精选项目",
    certificatesTitle: "成就与证书",
    skillsTitle: "核心与软实力",
    languagesTitle: "语言能力",
    educationTitle: "教育经历",
    arduinoProjectsTitle: "Arduino 工程",
    downloadPdf: "下载 PDF / 打印",
    viewOriginal: "原始预览",
    gradeText: "成绩",
    durationText: "时间线",
    locationText: "地点",
    personalProj: "个人项目",
    schoolProj: "学校项目",
    roleSpecial: "教学副校长",
    eduTitle: "高三理科学生（数学与物理方向）",
    eduSchool: "阿里·沙里亚蒂博士优秀高中",
    eduTimeline: "2021年 至今",
    eduDesc: "目前就读于高中三年级（数理方向）。拥有优异的数理逻辑基础和算法问题求解分析能力。",
    langPersianText: "波斯语（母语）",
    langEnglishText: "英语（B1）",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  ru: {
    name: "Мохаммадреза Абединпур",
    role: "Студент и разработчик",
    location: "Иран, Решт",
    philosophyTitle: "Жизненная философия",
    philosophyQuote: "«Все люди равны и заслуживают уважения, будь они богатыми или бедными».",
    contactTitle: "Каналы связи",
    projectsTitle: "Избранные проекты",
    certificatesTitle: "Достижения и сертификаты",
    skillsTitle: "Ключевые и гибкие навыки",
    languagesTitle: "Языки",
    educationTitle: "Образование",
    arduinoProjectsTitle: "Разработка на Arduino",
    downloadPdf: "Скачать PDF / Печать",
    viewOriginal: "Оригинальный просмотр",
    gradeText: "Оценка",
    durationText: "Хронология",
    locationText: "Местоположение",
    personalProj: "Личный проект",
    schoolProj: "Школьный проект",
    roleSpecial: "Завуч по учебной работе",
    eduTitle: "Ученик 12-го класса (физико-математический профиль)",
    eduSchool: "Старшая школа им. д-ра Али Шариати",
    eduTimeline: "2021 - настоящее время",
    eduDesc: "В настоящее время обучаюсь в 12-м классе физико-математического направления. Имею отличную аналитическую базу и навыки решения алгоритмических задач.",
    langPersianText: "Персидский (Родной)",
    langEnglishText: "Английский (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  el: {
    name: "Mohammadreza Abedinpoor",
    role: "Μαθητής & Προγραμματιστής",
    location: "Ιράν, Ραστ",
    philosophyTitle: "Φιλοσοφία Ζωής",
    philosophyQuote: "«Όλοι οι άνθρωποι είναι ίσοι και άξιοι σεβασμού, είτε πλούσιοι είτε φτωχοί.»",
    contactTitle: "Κανάλια Επικοινωνίας",
    projectsTitle: "Προβεβλημένα Έργα",
    certificatesTitle: "Επιτεύγματα & Πιστοποιητικά",
    skillsTitle: "Βασικές & Ήπιες Δεξιότητες",
    languagesTitle: "Γλώσσες",
    educationTitle: "Εκπαίδευση",
    arduinoProjectsTitle: "Μηχανική Arduino",
    downloadPdf: "Λήψη PDF / Εκτύπωση",
    viewOriginal: "Αρχική Προεπισκόπηση",
    gradeText: "Βαθμός",
    durationText: "Χρονοδιάγραμμα",
    locationText: "Τοποθεσία",
    personalProj: "Προσωπικό Έργο",
    schoolProj: "Σχολικό Έργο",
    roleSpecial: "Ακαδημαϊκός Υποδιευθυντής Σχολείου",
    eduTitle: "Μαθητής 12ης Τάξης (Θετικών & Μαθηματικών Σπουδών)",
    eduSchool: "Λύκειο Δρ Αλί Σαριατί",
    eduTimeline: "2021 - Σήμερα",
    eduDesc: "Φοιτά στην τελευταία τάξη (Μαθηματικά & Φυσική). Εξαιρετικό αναλυτικό υπόβαθρο και ικανότητες στην επίλυση αλγοριθμικών προβλημάτων.",
    langPersianText: "Περσικά (Μητρική)",
    langEnglishText: "Αγγλικά (Β1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  },
  la: {
    name: "Mohammadreza Abedinpoor",
    role: "Discipulus & Developer",
    location: "Irania, Rasht",
    philosophyTitle: "Philosophia Vitae",
    philosophyQuote: "«Omnes homines aequales sunt et reverentia digni, sive divites sive pauperes.»",
    contactTitle: "Via Communicationis",
    projectsTitle: "Incepta Praecipua",
    certificatesTitle: "Dona et Testimonia",
    skillsTitle: "Artes Core et Mollis",
    languagesTitle: "Linguae",
    educationTitle: "Eruditio",
    arduinoProjectsTitle: "Ingenaria Arduino",
    downloadPdf: "Prende PDF / Imprime",
    viewOriginal: "Praeostensio",
    gradeText: "Gradus",
    durationText: "Tempora",
    locationText: "Locus",
    personalProj: "Inceptum Personale",
    schoolProj: "Inceptum Scholae",
    roleSpecial: "Prorector Academicus Scholae",
    eduTitle: "Discipulus in Classe XII (Mathematica et Physica)",
    eduSchool: "Schola Superior Dr. Ali Shariati",
    eduTimeline: "MMXXI - Adhuc",
    eduDesc: "Nunc in classe duodecima mathematicae physicaeque studens. Fundamenta analytica egregia et solutio mathematica problematum.",
    langPersianText: "Persica (Patria lingua)",
    langEnglishText: "Anglica (B1)",
    contactValues: {
      github: "https://github.com/MOHAMMADREZAABEDINPOOR",
      linkedin: "https://linkedin.com/in/MohammadReza-Abedinpoor",
      telegram: "@Pleasechangetheworld",
      email: "mohammadrezaabedinpoor6@gmail.com",
      phone: "+98-996-347-6373"
    }
  }
};

export interface CVProject {
  id: string;
  title: Record<LanguageType, string>;
  category: 'personal' | 'school' | 'special';
  date: Record<LanguageType, string>;
  location: Record<LanguageType, string>;
  desc: Record<LanguageType, string>;
}

export const cvProjects: CVProject[] = [
  {
    id: "school-blog",
    title: {
      en: "School Blog Website",
      fa: "وب‌سایت وبلاگ مدرسه",
      ar: "موقع مدونة المدرسة",
      de: "Schul-Blog-Website",
      fr: "Site web du blog de l'école",
      it: "Sito Blog della Scuola",
      zh: "学校博客网站",
      ru: "Школьный блог-сайт",
      el: "Ιστότοπος Μπλογκ Σχολείου",
      la: "Situs Interretialis Ephemeridis Scholae"
    },
    category: "special",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Developed a blog website for the school’s academic vice principal with backend user auth (registration, login, password change/reset), email notifications, and multimedia blog creation (audio, images, text).",
      fa: "توسعه وب‌سایت وبلاگ مدرسه برای معاون آموزشی با احراز هویت بک‌اند (ثبت‌نام، ورود، بازنشانی کلمه‌عبور)، اعلان‌های ایمیلی و تولید وبلاگ‌های چندرسانه‌ای (صدا، تصویر، متن).",
      ar: "تطوير موقع مدونة للمدرسة لصالح الوكيل الأكاديمي مع نظام توثيق خلفي (تسجيل، دخول، تغيير كلمة المرور)، وإشعارات البريد الإلكتروني، وإنشاء مدونات وسائط متعددة (صوت، صور، نصوص).",
      de: "Entwicklung einer Blog-Website für den akademischen Prorektor mit Benutzerauthentifizierung (Registrierung, Login), E-Mail-Benachrichtigungen und multimedialen Beiträgen (Audio, Bild, Text).",
      fr: "Développement d’un blog pour le directeur académique adjoint avec authentification (inscription, connexion), alertes e-mail et publication multimédia (audio, illustrations, texte).",
      it: "Sviluppato un sito blog per il vicepreside con autenticazione utente backend (registrazione, login), notifiche email e pubblicazione di contenuti multimediali (audio, immagini, testo).",
      zh: "为教学副校长开发博客网站，包含后端身份验证（注册、登录、密码重置）、邮件提醒及音视频、图文等多媒体博客发布功能。",
      ru: "Разработан блог-сайт для завуча школы с бэкенд-авторизацией (регистрация, вход), email-уведомлениями и созданием мультимедийных записей (аудио, изображения, текст).",
      el: "Ανάπτυξη ιστοτόπου blog για τον υποδιευθυντή, με πιστοποίηση χρηστών, ειδοποιήσεις email και δημιουργία περιεχομένου πολυμέσων (ήχος, εικόνες, κείμενο).",
      la: "Situs ephemeridis pro prorectore scholae cum auctoritate usoris, nuntiis electronicis, et creatione multimediali constructus est."
    }
  },
  {
    id: "advanced-chatbot",
    title: {
      en: "Advanced Chatbot Platform",
      fa: "پلتفرم چت‌بات پیشرفته",
      ar: "منصة بوت چات متقدمة",
      de: "Fortgeschrittene Chatbot-Plattform",
      fr: "Plateforme de Chatbot Avancée",
      it: "Piattaforma Chatbot Avanzata",
      zh: "先进聊天机器人平台",
      ru: "Продвинутая платформа чат-ботов",
      el: "Προηγμένη Πλατφόρμα Chatbot",
      la: "Suggestus Dialogi Provectus"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Built a chatbot website (10+ pages) with user ops (reg, login), custom Gemini API prompts, and admin chat monitoring/banning for violations.",
      fa: "ساخت پلتفرم چت‌بات پیشرفته (بیش از ۱۰ صفحه) با قابلیت‌های کاربر (ثبت‌نام، ورود)، پرامپت‌های سفارشی Gemini API و سیستم مدیریت مانیتورینگ و مسدودسازی چت ادمین برای تخلفات.",
      ar: "بناء منصة بوت چات متقدمة (أكثر من 10 صفحات) مع سجلات المستخدمين، وأوامر Gemini API المخصصة، ونظام مراقبة وحظر المحادثات من قبل المشرفين عند المخالفات.",
      de: "Erstellung einer Chatbot-Website (10+ Seiten) mit Benutzerverwaltung (Registrierung, Login), individuellen Gemini-API-Prompts und Admin-Moderatoren-Tools zur Überwachung.",
      fr: "Conception d'un chatbot (10+ pages) incluant gestion utilisateur, requêtes Gemini API personnalisées et panneau d'administration pour la modération des dialogues.",
      it: "Creato un sito chatbot (10+ pagine) con gestione utenti (registrazione, login), prompt personalizzati Gemini API e monitoraggio/ban dei messaggi da parte dell'amministratore.",
      zh: "构建包含10个以上页面的聊天机器人平台，支持用户注册登录、Gemini API自定义提示词及管理员违规监控与封禁功能。",
      ru: "Полнофункциональный чат-бот (10+ страниц) с авторизацией, кастомными промптами Gemini API и панелью администрирования для модерации нарушений.",
      el: "Δημιουργία ιστοτόπου chatbot (10+ σελίδες) με εγγραφή/σύνδεση, προσαρμοσμένα prompts Gemini API και εργαλεία διαχειριστή για έλεγχο και αποκλεισμό χρηστών.",
      la: "Situs dialogi cum multis paginis creatus est, continens Gemini API et moderationem administratoris."
    }
  },
  {
    id: "multilingual-chatbot",
    title: {
      en: "Multilingual Chatbot Site",
      fa: "سایت چت‌بات چندزبانه",
      ar: "موقع بوت چات متعدد اللغات",
      de: "Mehrsprachige Chatbot-Website",
      fr: "Site de Chatbot Multilingue",
      it: "Sito Chatbot Multilingue",
      zh: "多语言聊天机器人网站",
      ru: "Мультиязычный чат-бот сайт",
      el: "Πολύγλωσσο Chatbot",
      la: "Situs Dialogi Multilinguis"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Built a multilingual (10 languages) frontend-only chatbot site (5+ pages), without user ops for simplicity and ease.",
      fa: "طراحی و توسعه سایت چت‌بات چندزبانه (۱۰ زبان) فقط به صورت فرانت‌اند (بیش از ۵ صفحه)، مستقل از فرآیندهای پیچیده کاربر به منظور سهولت در کاربری.",
      ar: "تصميم موقع بوت چات متعدد اللغات (10 لغات) واجهة أمامية فقط (أكثر من 5 صفحات)، بدون نظام مستخدمين لتبسيط وسهولة الاستخدام.",
      de: "Entwicklung einer mehrsprachigen (10 Sprachen), rein clientseitigen Chatbot-Website (5+ Seiten) ohne Nutzerdatenbank für maximale Einfachheit.",
      fr: "Création d'un chatbot multilingue (10 langues) uniquement en front-end (5+ pages), sans gestion d'utilisateurs pour une simplicité d'utilisation.",
      it: "Realizzato un sito chatbot multilingue (10 lingue) solo frontend (5+ pagine), escludendo la gestione utenti per una maggiore semplicità.",
      zh: "开发支持10种语言的多语言纯前端机器人网站（5页以上），无繁琐用户流程，极致简便易用。",
      ru: "Мультиязычный (10 языков) чат-бот интерфейс (5+ страниц) без авторизации для быстрого и простого взаимодействия.",
      el: "Ανάπτυξη πολύγλωσσου (10 γλώσσες) chatbot μόνο για frontend (5+ σελίδες), χωρίς ανάγκη σύνδεσης για ευκολία στη χρήση.",
      la: "Situs dialogi decem linguis instructus est sine auctoritatibus implicatis ad usum faciliorem."
    }
  },
  {
    id: "telegram-agent",
    title: {
      en: "Telegram Agent",
      fa: "عامل هوشمند تلگرام (Telegram Agent)",
      ar: "وكيل تليجرام الذكي",
      de: "Telegram-Agent",
      fr: "Agent Intelligent Telegram",
      it: "Agente Telegram",
      zh: "电报自动化代理",
      ru: "Умный агент Telegram",
      el: "Πράκτορας Telegram",
      la: "Procurator Telegram"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Engineered a Telegram agent for full account control with customized unique/varied responses to messages; built an accompanying admin panel website for management.",
      fa: "طراحی و مهندسی عامل تلگرام (Telegram Agent) برای کنترل کامل حساب کاربری با پاسخ‌های سفارشی و منحصربه‌فرد به پیام‌ها همراه با توسعه پنل وب مدیریت.",
      ar: "تطوير وكيل تليجرام للتحكم الكامل بالحساب مع ردود مخصصة ومتنوعة على الرسائل؛ وبناء موقع لوحة تحكم إدارية مرافقة لإدارة البوت.",
      de: "Entwicklung eines Telegram-Agenten zur vollständigen Kontokontrolle mit maßgeschneiderten, variierten Antworten. Inklusive Admin-Panel zur Steuerung.",
      fr: "Développement d’un agent Telegram autonome avec réponses adaptées et variées aux messages reçus, couplé à une interface d'administration externe.",
      it: "Progettato un agente Telegram per il controllo completo dell'account con risposte uniche e personalizzate; sviluppata una dashboard admin per la gestione.",
      zh: "设计并开发一个用于完全控制账户的电报代理，可根据消息自定义多样且独特的回复，并附带用于管理的管理网页面板。",
      ru: "Разработан Telegram-агент для полного контроля аккаунта с персонализированными и разнообразными автоответами; создан веб-интерфейс администратора.",
      el: "Κατασκευή πράκτορα Telegram για πλήρη έλεγχο λογαριασμού με μοναδικές απαντήσεις, συνοδευόμενο από ιστότοπο διαχείρισης.",
      la: "Procurator in Telegram constructus est ad responsa variata danda cum administratio ordinata."
    }
  },
  {
    id: "gemini-chatbot-email",
    title: {
      en: "Gemini-Integrated Chatbot with Email",
      fa: "چت‌بات تلفیقی Gemini با سرویس ایمیل",
      ar: "بوت چات متكامل مع Gemini والبريد الإلكتروني",
      de: "Gemini-Chatbot mit E-Mail-Integration",
      fr: "Chatbot Gemini avec Intégration E-mail",
      it: "Chatbot Gemini con Integrazione Email",
      zh: "集成双子星与邮件的聊天机器人",
      ru: "Чат-бот на Gemini с интеграцией почты",
      el: "Chatbot Gemini με Ενσωμάτωση Email",
      la: "Bot Gemini cum Epistulis"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Designed a chatbot connected to Gemini with internet access capabilities (limited by free API plan); integrated with my email to send messages to specified recipients, built using n8n for automation.",
      fa: "طراحی چت‌بات متصل به مدل Gemini با قابلیت دسترسی به اینترنت (محدود به پلن رایگان API) و ادغام با ایمیل شخصی برای ارسال پیام به مخاطبان خاص با استفاده از پلتفرم اتوماسیون n8n.",
      ar: "تصميم روبوت محادثة متصل بـ Gemini مع قدرات الوصول إلى الإنترنت؛ متكامل مع بريدي الإلكتروني لإرسال رسائل إلى مستلمين محددين، مبني باستخدام n8n للأتمتة.",
      de: "Entwicklung eines an Gemini angebundenen Chatbots mit Web-Suchfunktion (eingeschränkt durch Free-API) und n8n-Flüssen zum Versenden von E-Mails an Empfänger.",
      fr: "Conception d'un chatbot relié à Gemini capable de naviguer en ligne (limites de l'API gratuite) et configuré via n8n pour envoyer des courriels automatisés.",
      it: "Disegnato un chatbot connesso a Gemini con capacità di navigazione (limite API free), integrato con posta elettronica per invio messaggi tramite n8n.",
      zh: "设计对接Gemini API的对话机器人，支持联网查询，并通过n8n自动化工作流与个人信箱集成以发送消息给指定联系人。",
      ru: "Чат-бот на базе Gemini с подключением к сети и отправкой писем получателям через n8n-автоматизацию.",
      el: "Σχεδιασμός chatbot συνδεδεμένου με Gemini (με πρόσβαση στο διαδίκτυο) και ενσωμάτωση με email για αποστολή μηνυμάτων μέσω n8n.",
      la: "Bot ad Gemini conversus, capax interretis explorandi et epistulas per n8n mittendi."
    }
  },
  {
    id: "housing-ads-bot",
    title: {
      en: "Housing Ads Telegram Bot",
      fa: "ربات تلگرام آگهی‌های املاک و مسکن",
      ar: "بوت تليجرام لإعلانات السكن والاملاك",
      de: "Immobilienanzeigen Telegram-Bot",
      fr: "Bot Telegram d'Annonces Immobilières",
      it: "Bot Telegram Annunci Immobiliari",
      zh: "租房房产广告电报机器人",
      ru: "Telegram-бот объявлений недвижимости",
      el: "Telegram Bot Αγγελιών Ακινήτων",
      la: "Bot Telegram pro Re Familiari"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Created a Telegram bot that fetches housing ads from a specific site based on categories and city names, delivering complete details directly without needing to visit the site; supports over 10 housing ad categories.",
      fa: "ساخت ربات تلگرام دریافت آگهی‌های مسکن از یک وب‌سایت مرجع بر اساس دسته‌بندی‌ها و شهرهای انتخابی، با امکان ارسال اطلاعات کامل بدون نیاز به بازدید از سایت؛ پشتیبانی از ۱۰ دسته‌بندی مسکن.",
      ar: "إنشاء بوت تليجرام لجلب إعلانات السكن من موقع معين بناءً على التصنيفات وأسماء المدن، وتقديم تفاصيل كاملة مباشرة دون الحاجة لزيارة الموقع؛ يدعم أكثر من 10 تصنيفات إعلانية.",
      de: "Erstellung eines Telegram-Bots, der Immobilienanzeigen basierend auf Kategorien und Städten ausliest und die Details direkt sendet. Unterstützt 10+ Sparten.",
      fr: "Création d'un bot Telegram qui récupère les annonces de logement d'un site cible par filtres, affichant les détails complets sans redirection.",
      it: "Creato un bot Telegram che estrae annunci immobiliari in base a filtri e città, consegnando le informazioni complete direttamente sull'app.",
      zh: "创建电报机器人，基于选定的城市和分类从目标网站搜集房屋广告，直接将完整信息推送到客户端；支持10个以上的房屋类型分类。",
      ru: "Бот, собирающий объявления о недвижимости с целевого ресурса по категориям и городам, мгновенно присылающий данные в чат.",
      el: "Δημιουργία bot Telegram που συλλέγει αγγελίες κατοικιών από συγκεκριμένο ιστότοπο βάσει κατηγοριών και πόλεων, παρέχοντας όλες τις λεπτομέρειες.",
      la: "Bot in Telegram qui indices habitationum ex loco interretiali legit et nuntios praebet."
    }
  },
  {
    id: "personal-landing",
    title: {
      en: "Personal Landing Page",
      fa: "صفحه نمایش لندینگ شخصی",
      ar: "صفحة الهبوط التعريفية الشخصية",
      de: "Persönliche Landingpage",
      fr: "Page de Présentation Personnelle",
      it: "Landing Page Personale",
      zh: "个人引导展示页",
      ru: "Личная целевая страница",
      el: "Προσωπική Σελίδα Υποδοχής",
      la: "Pagina Prima Personalis"
    },
    category: "personal",
    date: {
      en: "2025 Spring",
      fa: "بهار ۱۴۰۴",
      ar: "ربيع 2025",
      de: "Frühling 2025",
      fr: "Printemps 2025",
      it: "Primavera 2025",
      zh: "2025年春季",
      ru: "Весна 2025",
      el: "Άνοιξη 2025",
      la: "Ver 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Developed a simple landing page website to introduce myself and showcase my resume.",
      fa: "توسعه وب‌سایت شخصی و صفحه فرود تک‌صفحه‌ای به منظور معرفی خود، مهارت‌ها و ارائه فایل رزومه دیجیتال.",
      ar: "تطوير صفحة هبوط شخصية بسيطة للتعريف بنفسي وعرض سيرتي الذاتية الرقمية.",
      de: "Entwicklung einer minimalistischen Landingpage zur Vorstellung meiner Person und Präsentation meines Werdegangs.",
      fr: "Développement d'un site web à page unique pour me présenter et exposer mon parcours.",
      it: "Sviluppato un sito web monopagina per introdurre me stesso ed esibire il mio curriculum.",
      zh: "设计开发了一款简约的个人主页与单页引导网站，用于自我介及展示数字化简历。",
      ru: "Простая страница-визитка для краткого рассказа о себе и быстрой отправки резюме.",
      el: "Ανάπτυξη απλής σελίδας παρουσίασης για την εισαγωγή του εαυτού μου και την ανάδειξη του βιογραφικού μου.",
      la: "Situs parvus ad me demonstrandum et curriculum vitae meum praebendum."
    }
  },
  {
    id: "flutter-chatbot-games",
    title: {
      en: "Flutter Chatbot and Games App",
      fa: "اپلیکیشن چت‌بات و بازی‌های Flutter",
      ar: "تطبيق الألعاب وبوت محادثة بـ Flutter",
      de: "Flutter Chatbot- & Spiele-App",
      fr: "Application Flutter de Chatbot & Jeux",
      it: "App Flutter Chatbot & Giochi",
      zh: "Flutter聊天机器人与小游戏应用",
      ru: "Приложение Flutter: чат-бот и игры",
      el: "Εφαρμογή Flutter Chatbot & Παιχνιδιών",
      la: "Applicatio Flutter cum Bot et Ludis"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Built a basic Flutter app functioning as a chatbot with multiple games, including Tetris, Tic-Tac-Toe (XO), memory game, snake game, and more.",
      fa: "ساخت اپلیکیشن فلاتر چندمنظوره شامل چت‌بات هوشمند و چندین مینی‌گیم جذاب نظیر تتریس، دوز (XO)، بازی حافظه، مار و غیره.",
      ar: "بناء تطبيق Flutter أساسي يعمل كروبوت محادثة مع ألعاب متعددة، تشمل تتريس (Tetris)، تيك تاك تو (XO)، لعبة الذاكرة، الثعبان والمزيد.",
      de: "Erstellung einer Flutter-App, die als Chatbot fungiert und klassische Spiele wie Tetris, Tic-Tac-Toe, ein Memory-Spiel und Snake bereithält.",
      fr: "Développement d’une application Flutter combinant assistant de chat et plusieurs mini-jeux classiques (Tetris, Morpion, jeu de mémoire, Snake).",
      it: "Creata un'applicazione mobile Flutter che unisce un chatbot a giochi classici come Tetris, Tris, gioco della memoria e Snake.",
      zh: "使用 Flutter 开发的多功能移动应用，集成智能机器人聊天及俄罗斯方块、井字棋（XO）、记忆卡牌、贪吃蛇等多个经典小游戏。",
      ru: "Мобильное приложение Flutter, объединяющее функции чат-бота и набор мини-игр: Тетрис, Крестики-Нолики, змейка и др.",
      el: "Κατασκευή εφαρμογής Flutter που λειτουργεί ως chatbot με πολλαπλά mini-games (Tetris, Τρίλιζα, παιχνίδι μνήμης, φιδάκι).",
      la: "Applicatio Flutter cum bot et ludis ut Tetris, XO, aliisque recreamentis programmata est."
    }
  },
  {
    id: "telegram-content-gen",
    title: {
      en: "Telegram Group Content Generator",
      fa: "تولیدکننده محتوای خودکار گروه تلگرامی",
      ar: "إنشاء محتوى مجموعات تليجرام المؤتمت",
      de: "Automatischer Telegram-Inhaltsgenerator",
      fr: "Générateur Automatique de Contenu Telegram",
      it: "Generatore Contenuti per Gruppi Telegram",
      zh: "电报群组内容自动生成器",
      ru: "Автогенератор контента для групп Telegram",
      el: "Αυτόματη Γεννήτρια Περιεχομένου Telegram",
      la: "Generator Materiae in Groupibus Telegram"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Implemented an automation bot for Telegram groups using Make, which generates content from any specified website upon joining the group.",
      fa: "پیاده‌سازی ربات اتوماسیون تلگرام برای گروه‌ها با پلتفرم Make به منظور تولید و ارسال خودکار محتوای سایت‌های مورد نظر به محض عضویت اعضای جدید.",
      ar: "تنفيذ بوت أتمتة لمجموعات تليجرام باستخدام Make، يقوم بإنشاء ومشاركة المحتوى من أي موقع ويب محدد بمجرد انضمام مستخدم جديد للمجموعة.",
      de: "Realisierung eines Automatisierungs-Bots mit Make für Telegram, der Inhalte von Websites extrahiert und beim Beitreten neuer Mitglieder sendet.",
      fr: "Déploiement d'un bot automatisé via la plateforme Make qui distribue du contenu extrait d'un site cible dès l'inscription d'un membre.",
      it: "Implementato un flusso Make per automatizzare i gruppi Telegram, inviando contenuti freschi da un sito web all'ingresso di nuovi membri.",
      zh: "通过 Make 自动化平台实现电报群自动化管理流程，可在新成员加入时自动抓取指定站点的信息进行内容推送分发。",
      ru: "Бот автоматизации для групп в Telegram на платформе Make, отправляющий новый веб-контент при вступлении пользователей.",
      el: "Υλοποίηση bot αυτοματισμού για ομάδες Telegram μέσω Make, το οποίο παράγει περιεχόμενο από καθορισμένο ιστότοπο.",
      la: "Automaton ad materiam trahendam a Make in groupibus Telegram constructum est."
    }
  },
  {
    id: "persian-chatbot-site",
    title: {
      en: "Persian Chatbot Website",
      fa: "وب‌سایت چت‌بات کاملاً فارسی",
      ar: "موقع ويب بوت چات فارسي بالكامل",
      de: "Persische Chatbot-Website",
      fr: "Site de Chatbot en Persan",
      it: "Sito Chatbot Persiano",
      zh: "波斯语聊天机器人网站",
      ru: "Чат-бот сайт на персидском языке",
      el: "Ιστότοπος Περσικού Chatbot",
      la: "Situs Dialogi Persicus"
    },
    category: "personal",
    date: {
      en: "2025 Summer",
      fa: "تابستان ۱۴۰۴",
      ar: "صيف 2025",
      de: "Sommer 2025",
      fr: "Été 2025",
      it: "Estate 2025",
      zh: "2025年夏季",
      ru: "Лето 2025",
      el: "Καλοκαίρι 2025",
      la: "Aestas 2025"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Created another chatbot website with a unique design, fully in Persian, featuring a user-friendly admin panel for ease of management.",
      fa: "طراحی و توسعه پلتفرم خلاقانه چت‌بات به زبان فارسی همراه با یک پنل کنترل تحت وب توسعه یافته برای ادمین‌ها.",
      ar: "إنشاء موقع بوت چات آخر بتصميم فريد باللغة الفارسية بالكامل، يتميز بلوحة تحكم إدارية سهلة الاستخدام لتبسيط الإدارة.",
      de: "Entwicklung einer persischen Chatbot-Plattform mit exklusivem Design und einer optimierten Admin-Verwaltungskonsole.",
      fr: "Création d’une autre interface de chatbot entièrement traduite en persan avec un tableau de bord administratif ergonomique.",
      it: "Sviluppato un chatbot alternativo interamente in persiano con interfaccia amministrativa intuitiva e design futuristico.",
      zh: "设计开发了一款独特的波斯语聊天机器人网站，并具有直观好用的后台，以便管理员轻松管理监控。",
      ru: "Другая интуитивно понятная платформа чат-ботов на персидском языке с удобной панелью администрирования.",
      el: "Δημιουργία περσικού chatbot με μοναδικό σχεδιασμό και εύχρηστο πίνακα ελέγχου για τον διαχειριστή.",
      la: "Situs dialogi Persicus alius creatus est, cum tabula rectoris disposita."
    }
  },
  {
    id: "teacher-grading",
    title: {
      en: "Teacher Grading System",
      fa: "سیستم نمره‌دهی و پرتال دبیران",
      ar: "نظام تسجيل درجات الطلاب للمدرسين",
      de: "Lehrer-Notenverwaltungssystem",
      fr: "Système d'Évaluation Scolaire",
      it: "Sistema Portale Voti per Docenti",
      zh: "教师评分与登记系统",
      ru: "Школьная система выставления оценок",
      el: "Σύστημα Βαθμολόγησης Καθηγητών",
      la: "Systema Gradiendi Magistrorum"
    },
    category: "school",
    date: {
      en: "2022 Winter",
      fa: "زمستان ۱۴۰۱",
      ar: "شتاء 2022",
      de: "Winter 2022",
      fr: "Hiver 2022",
      it: "Inverno 2022",
      zh: "2022年冬季",
      ru: "Зима 2022",
      el: "Χειμώνας 2022",
      la: "Hiems 2022"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Developed a website with backend where teachers log in to assign grades to students; restricted editing access to teachers only, preventing changes by students or unauthorized users.",
      fa: "توسعه پورتال نمره‌دهی معلمان با پنل اختصاصی ورود برای ثبت نمرات دانش‌آموزان به همراه ایجاد محدودیت دسترسی کامل برای دانش‌آموزان و کاربران غیرمجاز.",
      ar: "تطوير موقع مع لوحة تحكم خلفية حيث يقوم المعلمون بتسجيل الدخول لتعيين الدرجات للطلاب؛ مع تقييد وصول التعديل للمعلمين فقط، لمنع التعديلات من قبل الطلاب أو غير المصرح لهم.",
      de: "Entwicklung eines schulinternen Portals mit sicherem Login für Lehrkräfte zur Notenerfassung, geschützt gegen Zugriffe unbefugter Schüler.",
      fr: "Développement d’un espace enseignant sécurisé pour l'administration des notes des élèves, empêchant toute modification clandestine.",
      it: "Sviluppato un portale docenti con login sicuro per registrare i voti degli studenti, protetto per prevenire manomissioni.",
      zh: "开发了拥有安全登录的教师评分系统，严格限制仅限教职员工修改信息，杜绝学生或非授权者修改分数。",
      ru: "Защищенный веб-портал оценок для преподавателей с авторизацией, исключающий несанкционированный доступ со стороны учеников.",
      el: "Ανάπτυξη διαδικτυακής πύλης βαθμολογίας για εκπαιδευτικούς με περιορισμένη πρόσβαση μόνο برای δασκάλους.",
      la: "Situs magistrorum gradiendi constructus est ad gradus discipulorum ordinandos sine mutationibus alienis."
    }
  },
  {
    id: "anonymous-feedback",
    title: {
      en: "Anonymous Teacher Feedback Platform",
      fa: "سامانه ارزیابی و بازخورد ناشناس دبیران",
      ar: "منصة التقييم غير المرئي للمعلمين",
      de: "Anonyme Lehrer-Feedbackplattform",
      fr: "Plateforme d'Évaluation Anonyme des Professeurs",
      it: "Piattaforma Feedback Anonimo Docenti",
      zh: "教师匿名评议与意见反馈平台",
      ru: "Анонимная оценка преподавателей",
      el: "Πλατφόρμα Ανώνυμης Αξιολόγησης",
      la: "Suggestus Censurae Magistrorum"
    },
    category: "school",
    date: {
      en: "2022 Autumn",
      fa: "پاییز ۱۴۰۱",
      ar: "خريف 2022",
      de: "Herbst 2022",
      fr: "Automne 2022",
      it: "Autunno 2022",
      zh: "2022年秋季",
      ru: "Осень 2022",
      el: "Φθινόπωρο 2022",
      la: "Autumnus 2022"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    },
    desc: {
      en: "Built a project listing all students’ names, allowing anonymous rating and feedback for teachers.",
      fa: "طراحی سامانه نظرسنجی و بازخورد ناشناس دانش‌آموزان به منظور ثبت نظرات، سوالات و نمره‌دهی به دبیران کلاس.",
      ar: "بناء نظام يعرض أسماء الطلاب ويسمح بتقييم المعلمين وإرسال الآراء والملاحظات بشكل مجهول الهوية لدعم جودة التعليم.",
      de: "Erstellung einer feedbackorientierten Anwendung zur anonymen Beurteilung und Benotung von Lehrbeauftragten durch Schülerklassen.",
      fr: "Conception d'une plateforme sécurisée d'évaluation anonyme permettant aux élèves de laisser des avis constructifs sur l'enseignement.",
      it: "Sviluppato un sistema di feedback incentrato sulla valutazione anonima dei docenti da parte della classe.",
      zh: "开发了一款旨在促进匿名评价的系统，列出全部 student 名字后，可对教师班级教学等进行匿名打分与评议反馈。",
      ru: "Площадка для анонимного анкетирования и сбора мнений учащихся с целью повышения качества школьного образования.",
      el: "Δημιουργία συστήματος ανώνυμης αξιολόγησης καθηγητών από τους μαθητές.",
      la: "Systema censurae ad magistros sine nominibus iudicandos a discipulis confectum est."
    }
  }
];

export const cvSkills: string[] = [
  "Web Development",
  "AI Development",
  "AI Prompting",
  "SQL/MySQL",
  "Django",
  "Flutter",
  "Full-stack Developer",
  "UI/UX",
  "Git GitHub",
  "Deployment",
  "Python",
  "Photoshop",
  "Arduino",
  "CapCut",
  "Excel",
  "Video Editing",
  "Image Editing"
];

export const cvSoftSkills: Record<LanguageType, string[]> = {
  en: ["Hard-working", "Self-learning", "Open-Minded", "Leadership", "Teamwork", "Flexible Schedule", "Lifelong-Learner"],
  fa: ["سخت‌کوش و با پشتکار", "یادگیرنده خودگردان با انگیزه", "دارای ذهن باز و پذیرای انتقاد", "مهارت‌های رهبری و مدیریت تیمی", "کار تیمی و روحیه همکاری فشرده", "برنامه زمانی منعطف برای پروژه‌ها", "علاقه‌مند به یادگیری مادام‌العمر"],
  ar: ["العمل الجاد والمثابرة", "التعلم الذاتي المستمر", "الانفتاح وتقبل الأفكار", "القدرة القيادية والإدارية", "العمل بروح الفريق الواحد", "جدول عمل مرن لإكمال المهام", "البحث والتعلم مدى الحياة"],
  de: ["Fleißig", "Autodidaktisch", "Weltoffen", "Führungsqualitäten", "Teamfähigkeit", "Flexibler Zeitplan", "Lebenslanges Lernen"],
  fr: ["Travailleur", "Autonome dans l'apprentissage", "Esprit ouvert", "Leadership", "Travail d'équipe", "Flexibilité des horaires", "Apprentissage continu"],
  it: ["Lavoratore diligente", "Autoapprendimento costante", "Mentalità aperta", "Leadership", "Lavoro di squadra", "Flessibilità oraria", "Apprendimento continuo"],
  zh: ["刻苦勤奋", "自学能力强", "思维开阔", "具备领导力", "团队协作卓越", "工作时间灵活配合", "终身学习实践者"],
  ru: ["Трудолюбие", "Самообучаемость", "Широкий кругозор", "Лидерство", "Командная работа", "Гибкий график", "Постоянное развитие"],
  el: ["Εργατικός", "Αυτοδίδακτος", "Δεκτικός", "Ηγετικότητα", "Ομαδικότητα", "Ευέλικτο Ωράριο", "Δια βίου μάθηση"],
  la: ["Laboriosus", "Autodidactus", "Animo Patente", "Ducatus", "Consociatio", "Tempora Flexibilia", "Discipulus Perpetuus"]
};

export interface CVCertificate {
  id: string;
  title: Record<LanguageType, string>;
  desc: Record<LanguageType, string>;
  grade: string;
  pdfFile?: string;
}

export const cvCertificates: CVCertificate[] = [
  {
    id: "emerging-tech",
    title: {
      en: "Familiarity with Emerging Technologies & Future Jobs",
      fa: "آشنایی با فناوری‌های نوظهور و مشاغل آینده",
      ar: "التعرف على التقنيات الناشئة ووظائف المستقبل",
      de: "Vertrautheit mit neuen Technologien und zukünftigen Arbeitsplätzen",
      fr: "Sensibilisation aux technologies émergentes et aux métiers du futur",
      it: "Familiarità con le tecnologie emergenti e i lavori del futuro",
      zh: "熟悉新兴技术与未来职业",
      ru: "Ознакомление с новыми технологиями и профессиями будущего",
      el: "Εξοικείωση με Αναδυόμενες Τεχνολογίες & Επαγγέλματα του Μέλλοντος",
      la: "Cognitio Technologiarum Emergentium et Munerum Futurorum"
    },
    desc: {
      en: "Specialized certification on artificial intelligence (AI), blockchain technology, generative modeling, Internet of Things (IoT), cloud transformation, and strategic adaptation to future labor markets.",
      fa: "گواهی تخصصی بررسی عمیق هوش مصنوعی، فناوری بلاکچین، الگوهای مدل‌سازی مولد، اینترنت اشیاء (IoT)، ابزارهای تحول ابری و راهبرد‌های انطباق با نیازمندی‌های بازار کار آینده.",
      ar: "شهادة متخصصة تغطي الذكاء الاصطناعي، تكنولوجيا البلوكشين، النمذجة التوليدية، إنترنت الأشياء (IoT)، الحوسبة السحابية والتكيف مع وظائف سوق العمل المستقبلية وجوانب الثورة الصناعية الرابعة.",
      de: "Spezialisiertes Zertifikat über künstliche Intelligenz (KI), Blockchain-Technologie, generative Modellierung, Internet der Dinge (IoT), Cloud-Transformation und die Anpassung an zukünftige Arbeitsmärkte.",
      fr: "Certification spécialisée sur l’intelligence artificielle (IA), la technologie blockchain, la modélisation générative, l’Internet des Objets (IoT), la transformation cloud et l’adaptation aux métiers du futur.",
      it: "Certificazione specialistica su intelligenza artificiale (IA), tecnologia blockchain, modellazione generativa, Internet delle Cose (IoT), trasformazione cloud e adattamento ai mercati del lavoro futuri.",
      zh: "涵盖人工智能（AI）、区块链技术、生成式建模、物联网（IoT）、云转型以及应对工业 4.0 时期未来就业市场需求战略调整的专业认证证书。",
      ru: "Специализированный сертификат, охватывающий искусственный интеллект (ИИ), технологию блокчейн, генеративное моделирование, интернет вещей (IoT), облачную трансформацию и адаптацию к будущему рынку труда.",
      el: "Εξειδικευμένη πιστοποίηση στην τεχνητή νοημοσύνη (AI), την τεχνολογία blockchain, τη δημιουργική μοντελοποίηση, το Internet of Things (IoT), τον μετασχηματισμό cloud και τη στρατηγική προσαρμογή στις μελλοντικές αγορές εργασίας.",
      la: "Testimonium academicum de intellegentia artificiali, technologia blockchain, modellis generativis, rerum interretialibus, ac de aptatione ad mercatus futuros laborandi."
    },
    grade: "90.00% / 100",
    pdfFile: "FamiliaritywithEmergingTechnologiesandFuture Jobs.pdf"
  },
  {
    id: "sharif-django",
    title: {
      en: "Django Full-Stack Architecture",
      fa: "معماری فول‌استک پورتال‌های وب با جنگو",
      ar: "معمارية الويب المتكاملة مع جانغو",
      de: "Django Full-Stack-Architektur",
      fr: "Architecture de développement Django Full-Stack",
      it: "Architettura Web Full-Stack Django",
      zh: "Django 全栈系统架构工程师",
      ru: "Проектирование фулстэк-архитектуры на Django",
      el: "Αρχιτεκτονική Full-Stack Django",
      la: "Architectura Django Full-Stack Web"
    },
    desc: {
      en: "Advanced backend engineering course focusing on secure user registration, email notification queues, multi-tenant databases, middleware overrides, custom auth vectors, and containerized deployment pipelines.",
      fa: "دوره مهندسی پیشرفته بک‌اند با جنگو؛ شامل طراحی آرتیکچر پورتال‌های وب، پیاده‌سازی سیستم‌های احراز هویت سفارشی، صف پیام و ایمیل مارکتینگ، مدیریت دیتابیس‌های چند‌مستاجره (Multi-Tenant) و داکرایز کردن سرورها.",
      ar: "مسار هندسة الخلفية المتقدمة مع جانغو؛ تصميم معماريات الويب، أنظمة التوثيق المخصصة، طوابير المهام، قواعد البيانات متعددة المستأجرين ونشر الحاويات.",
      de: "Fortgeschrittener Backend-Engineering-Kurs mit Fokus auf sichere Nutzerregistrierung, E-Mail-Dienstwarteschlangen, mandantenfähige Datenbanken und Container-Deployments.",
      fr: "Formation avancée axée sur l’enregistrement sécurisé, les files d'attente d'alertes e-mail, les bases de données multi-locataires, la création de middlewares et le déploiement.",
      it: "Corso avanzato di ingegneria incentrato su registrazione sicura, code di notifiche email, database multi-tenant, personalizzazione di middleware e containerizzazione.",
      zh: "谢里夫高级后端工程专项课程。内容聚焦安全注册流、异步邮件队列、多租户数据库、自定义中间件重写以及容器化部署流水线。",
      ru: "Продвинутый курс бэкенд-разработки с упором на безопасную авторизацию, очереди отправки почты, мультиарендность баз данных, кастомные middleware и контейнеризацию.",
      el: "Προχωρημένο μάθημα backend μηχανικής, με εστίαση στην ασφαλή αυθεντικοποίηση χρηστών, ουρές ειδοποιήσεων email, και containerized deployment.",
      la: "Cursus provectus de creatione rectorum et datorum ab Universitate Sharif, continens securitatem integrationis et deployment."
    },
    grade: "100% / 100",
    pdfFile: "WebApplicationTechnologiesandDjango.pdf"
  },
  {
    id: "michigan-python",
    title: {
      en: "University of Michigan: Python for Everybody Specialization",
      fa: "دانشگاه میشیگان: تخصص کاربردی پایتون برای همه",
      ar: "جامعة ميشيغان: تخصص لغة بايثون للجميع",
      de: "University of Michigan: Python für alle Spezialisierung",
      fr: "Université du Michigan: Spécialisation Python pour tous",
      it: "University of Michigan: Specializzazione Python per tutti",
      zh: "密歇根大学：应用级全民 Python 核心技能专项",
      ru: "Мичиганский университет: Специализация Python для всех",
      el: "Πανεπιστήμιο του Μίσιγκان: Εξειδίκευση Python για όλους",
      la: "Michigan Universitas: Python pro Omnibus Specializatio"
    },
    desc: {
      en: "Multi-layered academic curriculum covering database design, web scraping interfaces (BeautifulSoup), XML/JSON web data parsing, secure REST API integrations, and database visualizations.",
      fa: "برنامه جامع علمی دانشگاه میشیگان شامل اصول پایگاه داده، استخراج اطلاعات از وب‌سایت‌ها (Scraping)، تجزیه فرمت‌های وب اعم از XML و JSON، ارتباطات وب‌سرویس RESTful و بصری‌سازی داده‌ها.",
      ar: "منهج أكاديمي شامل يغطي تصميم وإدارية قواعد البيانات، طرق استخراج البيانات من الويب (Web Scraping)، تحليل بيانات XML/JSON، وتكامل واجهات تطبيقات REST API الآمنة.",
      de: "Akademischer Lehrplan über Datenbankdesign, Web-Scraping (BeautifulSoup), XML/JSON-Datenanalyse, sichere REST-API-Integrationen und Datenvisualisierung.",
      fr: "Programme d'études complet couvrant la conception de bases de données, le scraping (BeautifulSoup), l'analyse XML/JSON, les API REST et les visualisations.",
      it: "Curriculum accademico completo che copre progettazione database, web scraping (BeautifulSoup), parsing XML/JSON, integrazione di REST API e visualizzazione dati.",
      zh: "涵盖数据库底座设计、网页数据清洗抓取（BeautifulSoup）、XML/JSON 网络数据解析、多重 REST API 接口调用及数据可视化的全面课程。",
      ru: "Академическая учебная программа, охватывающая проектирование баз данных, веб-скрейпинг (BeautifulSoup), парсинг XML/JSON, интеграцию с API и визуализацию данных.",
      el: "Ακαδημαϊκό πρόγραμμα που καλύπτει σχεδίαση βάσεων δεδομένων, scraping (BeautifulSoup), ανάλυση XML/JSON, REST API και οπτικοποίηση δεδομένων.",
      la: "Programma academicum de designatione datorum, scraping interretis (BeautifulSoup), analysis XML/JSON et visually demonstrandi scientias."
    },
    grade: "93.21% / 100",
    pdfFile: "Programming for Everybody(GettingStartedwithPython).pdf"
  },
  {
    id: "rice-python",
    title: {
      en: "Rice University: An Introduction to Interactive Programming in Python (Part 1)",
      fa: "دانشگاه رایس: مقدمه‌ای بر برنامه‌نویسی تعاملی در پایتون (بخش اول)",
      ar: "جامعة رايس: مقدمة في البرمجة التفاعلية بلغة بايثون (الجزء الأول)",
      de: "Rice University: Einführung in die interaktive Programmierung in Python (Teil 1)",
      fr: "Rice University: Une introduction à la programmation interactive en Python (Partie 1)",
      it: "Rice University: Introduzione alla programmazione interattiva in Python (Parte 1)",
      zh: "莱斯大学：Python 交互式编程导论（第一部分）",
      ru: "Университет Райса: Введение в интерактивное программирование на Python (Часть 1)",
      el: "Πανεπιστήμιο Ράις: Εισαγωγή στον Διαδراکتيوو البرمجة بلعبة بايثون (الجزء الأول)",
      la: "Universitas Rice: Introductio ad Programmationem Interactivam in Python (Pars I)"
    },
    desc: {
      en: "Authorized course focusing on functional programming, event-driven applications, user interfaces, simple game loops, and mathematical models using Python.",
      fa: "دوره رسمی دانشگاه رایس؛ متمرکز بر مفاهیم برنامه‌نویسی تابعی، برنامه‌نویسی رویدادمحور، رابط‌های کاربری گرافیکی، حلقه‌های پایه‌ای بازی‌سازی و مدل‌های منطقی ریاضی با پایتون.",
      ar: "دورة معتمدة تركز على مفاهيم البرمجة الوظيفية، التطبيقات القائمة على الأحداث، واجهات المستخدم، وتطوير ألعاب بسيطة ونماذج رياضية باستخدام بايثون.",
      de: "Autorisierter Kurs der Rice University über funktionale Konzepte, ereignisgesteuerte Programmierung, Benutzeroberflächen und Spiele-Loops.",
      fr: "Cours certifié par l'Université Rice, axé sur la programmation fonctionnelle, les applications événementielles, les interfaces utilisateur et les boucles de jeu simples en Python.",
      it: "Corso autorizzato dalla Rice University, focalizzato sui concetti di programmazione funzionale, applicazioni orientate agli eventi, interfacce utente e loop di gioco.",
      zh: "莱斯大学官方授权。核心模块涵盖函数式编程、事件驱动应用、GUI用户界面、基础游戏循环及数学物理计算模型。",
      ru: "Официальный курс Университета Райса, посвященный концепциям функционального программирования, событийным приложениям, пользовательским интерфейсам и игровым циклам.",
      el: "Επίσημο μάθημα του Πανεπιστημίου Ράις, με εστίαση στον συναρτησιακό προγραμματισμό, εφαρμογές βασισμένες σε συμβάντα, user interfaces και απλούς βρόχους παιχνιδιών.",
      la: "Cursus academicus Universitatis Rice de programmatione interactiva et creatione ludorum levium per Python."
    },
    grade: "87.84% / 100",
    pdfFile: "AnIntroductiontoInteractiveProgramminginPythonPart1.pdf"
  },
  {
    id: "jhu-html-css-js",
    title: {
      en: "Johns Hopkins University: HTML, CSS, and Javascript for Web Developers",
      fa: "دانشگاه جانز هاپکینز: توسعه وب با HTML، CSS و جاوااسکریپت",
      ar: "جامعة جونز هوبكنز: لغات HTML و CSS وجافا سكريبت لمطوري الويب",
      de: "Johns Hopkins University: HTML, CSS und Javascript für Webentwickler",
      fr: "Johns Hopkins University: HTML, CSS et Javascript pour les développeurs web",
      it: "Johns Hopkins University: HTML, CSS e Javascript per Sviluppatori Web",
      zh: "约翰斯·霍普金斯大学：面向 Web 开发者的 HTML、CSS 和 JavaScript 卓越课程",
      ru: "Университет Джонса Хопкинса: HTML, CSS и Javascript для веб-разработчиков",
      el: "Πανεπιστήμιο Τζονς Χόπκινς: HTML, CSS και Javascript για Προγραμματιστές Web",
      la: "Universitas Johns Hopkins: HTML, CSS, et Javascript pro Web Developers"
    },
    desc: {
      en: "Comprehensive web development architecture covering semantic HTML5 structures, responsive layout design with CSS, Twitter Bootstrap implementation, and Javascript.",
      fa: "دوره جامع معماری فرانت‌اند و طراحی وب واکنش‌گرا با HTML5 معنایی، استایل‌دهی مدرن با CSS، سیستم گرید بوت‌استرپ و پیاده‌سازی منطق جاوااسکریپت.",
      ar: "معمارية ويب متكاملة تغطي هياكل HTML5 الدلالية، تصميم الصفحات التفاعلية مع CSS، إطار العمل وبوتستراب، وهندسة خوارزميات جافا سكريبت.",
      de: "Umfassende Webentwicklungsarchitektur, die semantische HTML5-Strukturen, responsives Layout mit CSS, Bootstrap-Implementierung und Javascript-Steuerungen abdeckt.",
      fr: "Architecture de développement web complète couvrant les structures HTML5, le responsive design, l'utilisation de Bootstrap et l'algorithmique JavaScript.",
      it: "Architettura completa di sviluppo web che copre strutture HTML5, layout responsivo, utilizzo di Bootstrap e fondamentali di programmazione in Javascript.",
      zh: "系统性前端网页构建技术。涉及语义化 HTML5 标签结构、响应式流式布局设计（CSS）、Twitter Bootstrap 混合布局及富交互 JS 脚本编程。",
      ru: "Комплексный курс по веб-разработке, включающий семантическую верстку HTML5, адаптивный дизайн на CSS, сетку Bootstrap и основы программирования на Javascript.",
      el: "Ολοκληρωμένο πρόγραμμα ανάπτυξης web που καλύπτει σημασιολογικό HTML5, responsive σχεδιασμό με CSS, χρήση Bootstrap και προγραμματισμό με Javascript.",
      la: "Delineatio et scriptura interretialis per HTML5, CSS layout adaptivum, et logica elementorum Javascript."
    },
    grade: "93.00% / 100",
    pdfFile: "HTML,CSS,andJavascriptforWebDevelopers.pdf"
  },
  {
    id: "meta-frontend-intro",
    title: {
      en: "Meta: Introduction to Front-End Development",
      fa: "متا: مقدمه‌ای بر توسعه مستقل فرانت‌اند",
      ar: "ميتا: مقدمة في تطوير واجهات المستخدم (Front-End)",
      de: "Meta: Einführung in die Front-End-Entwicklung",
      fr: "Meta: Introduction au développement Front-End",
      it: "Meta: Introduzione allo Sviluppo Front-End",
      zh: "Meta：前端网页开发技术导论",
      ru: "Meta: Введение в фронтенд-разработку",
      el: "Meta: Εισαγωγή στο Front-End Development",
      la: "Meta: Introductio ad Front-End Development"
    },
    desc: {
      en: "Professional layout principles designed by Meta, exploring client-side app engineering, UI components, HTML/CSS formatting, design workflows, and responsive browser rendering.",
      fa: "اصول طراحی رابط کاربری حرفه‌ای از مهندسین شرکت متا (فیسبوک سابق)؛ بررسی مدل‌های رندرینگ مرورگر، طراحی کامپوننت‌های مدرن، طرح‌بندی واکنش‌گرا و وب اپلیکیشن‌های سمت کلاینت.",
      ar: "مبادئ العمل المهنية المصممة من شركة ميتا، تستكشف تطبيقات العميل، مكونات واجهة المستخدم، تنسيقات HTML/CSS، وعمليات التصميم والتفاعل في المتصفح.",
      de: "Professionelle Layout-Prinzipien von Meta, die clientseitige App-Strukturierung, UI-Komponenten, HTML/CSS-Formatierung und modernes Responsive-Design erforschen.",
      fr: "Principes professionnels du design d'interface conçus par Meta, explorant les architectures d'applications côté client, les composants UI et le responsive.",
      it: "Principi professionali di layout ideati da Meta, esplorando l'ingegneria delle applicazioni client-side, i componenti UI e le performance del rendering.",
      zh: "Meta专家团队设计的前端开发必修课。涉及客户端单页架构、人机交互组件（UI）、浏览器排版渲染性能 and 极速加载调优。",
      ru: "Профессиональные стандарты верстки от инженеров Meta, изучение клиентской архитектуры, UI-компонентов, адаптивных стилей и рендеринга в веб-браузерах.",
      el: "Επαγγελματικές αρχές σχεδιασμού από τη Meta, διερευνώντας τη δομή εφαρμογών client-side, στοιχεία UI, HTML/CSS και responsive rendering.",
      la: "Regulae fundamentales et configurationes interretis a societate Meta instructae, pro creatione UI et elementorum interretis."
    },
    grade: "92.00% / 100",
    pdfFile: "IntroductiontoFrontEndDevelopment.pdf"
  },
  {
    id: "upenn-python-intro",
    title: {
      en: "University of Pennsylvania: Introduction to Python Programming",
      fa: "دانشگاه پنسیلوانیا: مقدمه‌ای بر برنامه‌نویسی ساختاریافته پایتون",
      ar: "جامعة بنسلفانيا: مقدمة في برمجة بايثون",
      de: "University of Pennsylvania: Einführung in die Python-Programmierung",
      fr: "University of Pennsylvania: Introduction à la programmation Python",
      it: "University of Pennsylvania: Introduzione alla Programmazione in Python",
      zh: "宾夕法尼亚大学：Python 编程基础与学术级实战",
      ru: "Пенсильванский университет: Введение в программирование на Python",
      el: "Πανεπιστήμιο της Πενσυλβάνια: Εισαγωγή στον Προγραμματισμό με Python",
      la: "Universitas Pennsylvania: Introductio ad Programmationem Python"
    },
    desc: {
      en: "Academic path covering core programming structures, data types, condition controls, iterative processing steps, function constructs, error handling, and file read/write operations.",
      fa: "مسیر آکادمیک دانشگاه پنسیلوانیا پوشش‌دهنده انواع داده‌های ساختاریافته، دستورات کنترلی و شرطی، الگوریتم‌های مرتب‌سازی و جستجو، سازمان‌دهی توابع، مدیریت خطاها و کار با فایل در پایتون.",
      ar: "مسار أكاديمي متميز يغطي هياكل البرمجة الأساسية، أنواع البيانات، الجمل الشرطية، الحلقات التكرارية، بناء الدوال، ومعالجة الأخطاء والتعامل مع الملفات بلغة بايثون.",
      de: "Akademischer Pfad über Kernstrukturen der Programmierung, Datentypen, Kontrollstrukturen, Iterationen, Funktionen, strukturierte Fehlerbehandlung und Dateioperationen.",
      fr: "Parcours académique couvrant les structures fondamentales de la programmation, les types de données, les conditions, les fonctions et la manipulation de fichiers.",
      it: "Curriculum accademico focalizzato sulle strutture fondamentali della programmazione: tipi di dati, controlli condizionali, funzioni e gestione delle eccezioni.",
      zh: "常春藤名校学术级课程。核心讲解Python语言底层变量分配、多元控制结构、定制函数模块، روبوستي وقود وبناء ملف I/O ردیف کار با فایل.",
      ru: "Академическая программа, охватывающая синтаксические конструкции программирования, типы данных, циклы, функции, обработку исключений и файловый ввод-вывод.",
      el: "Ακαδημαϊκό πρόγραμμα που καλύπτει βασικές δομές προγραμματισμού, τύπους δεδομένων, ελέγχους συνθηκών, συναρτήσεις, διαχείριση σφαλμάτων και οperations αρχείων.",
      la: "Cursus academicus Universitatis Pennsylvaniae de structuris Python, typis datorum, ac de scriptura datorum."
    },
    grade: "90.07% / 100",
    pdfFile: "IntroductiontoPythonProgramming.pdf"
  },
  {
    id: "toronto-fundamentals",
    title: {
      en: "University of Toronto: Learn to Program: The Fundamentals",
      fa: "دانشگاه تورنتو: مبانی و اصول بهینه‌سازی کدهای برنامه‌نویسی",
      ar: "جامعة تورنتو: تعلم البرمجة - المفاهيم الأساسية",
      de: "University of Toronto: Programmieren lernen - Die Grundlagen",
      fr: "University of Toronto: Apprendre à programmer - Les bases",
      it: "University of Toronto: Imparare a Programmare - I Fondamentali",
      zh: "多伦多大学：编程之美：核心算法与开发基础",
      ru: "Университет Торонто: Изучение программирования - Фундаментальные основы",
      el: "Πανεπιστήμιο του Τορόντο: Μαθαίνοντας Προγραμματισμό: Τα Θεμέλια",
      la: "Universitas Toronto: Discere Programmare - Fundamenta"
    },
    desc: {
      en: "Fostering algorithmic thinking via Python, teaching code modularization, dry run executions, variables tracking, memory diagrams, custom modules, and multi-layered array abstractions.",
      fa: "پرورش تفکر الگوریتمی و منطق خلاق حل مسئله با پایتون؛ مدل‌سازی حافظه، ماژولار کردن برنامه‌ها، شبیه‌سازی گام‌به‌گام و انتزاع ساختارهای داده چندبعدی.",
      ar: "تنصيب التفكير الخوارزمي البرمجي بواسطة لغة بايثون، ووحدات الأكواد البرمجية، تتبع قيم المتغيرات في الذاكرة، وبناء مصفوفات وهياكل متعددة الأبعاد.",
      de: "Förderung des algorithmischen Denkens mit Python, modulare Code-Strukturierung, Speichermodelle, Variablen-Tracing und mehrdimensionale Datenstrukturen.",
      fr: "Développement de la logique algorithmique avec Python, modularité du code, traçages des variables en mémoire et structures de données complexes.",
      it: "Sviluppo del pensiero algoritmico attraverso Python, modulazione del codice, analisi delle variabili in memoria e astrazione delle strutture dati.",
      zh: "多伦多大学计算机科学系精品课。培养纯粹的算法思维，全面讲授代码模块化重构、内存跟踪图表、多维数组抽象 e 软件开发健壮性基础。",
      ru: "Развитие алгоритмического мышления на Python, модульность кода, отслеживание состояния переменных в памяти и абстракция массивов.",
      el: "Καλλιέργεια αλγοριθμικής σκέψης μέσω Python, διδασκαλία σπονδυλωτού κώδικα, ιχνηλάτηση μεταβλητών στη μνήμη και δομές δεδομένων.",
      la: "Ratio cogitandi algorithmorum per Python ab Universitate Toronto, cum memoriae diagrammatibus et modularitate scripturae."
    },
    grade: "92.71% / 100",
    pdfFile: "LearntoProgramTheFundamentals.pdf"
  },
  {
    id: "london-responsive-web",
    title: {
      en: "University of London: Responsive Website Basics",
      fa: "دانشگاه لندن: مبانی مهندسی فرانت‌اند واکنش‌گرا و وب پویا",
      ar: "جامعة لندن: أساسيات مواقع الويب التفاعلية (Responsive)",
      de: "University of London: Grundlagen responsiver Websites",
      fr: "University of London: Les bases du Web Responsive",
      it: "University of London: Fondamentali delle Pagine Web Responsive",
      zh: "伦敦大学：响应式网站开发基础及交互设计",
      ru: "Лондонский университет: Основы адаптивного веб-дизайна",
      el: "Πανεπιστήμιο του Λονδίνου: Βασικές Αρχές Responsive Web",
      la: "Universitas Londini: Fundamenta Web Adaptivi et Responsive"
    },
    desc: {
      en: "Constructing multi-fidelity screen layouts, flexible media assets integration, CSS grid properties, browser navigation models, and DOM updates dynamically utilizing JavaScript.",
      fa: "ساخت صفحات وب چندرسانه‌ای انعطاف‌پذیر با سیستم گرید و فلکس‌باکس در سی‌اس‌اس و پویایی بخشیدن به اجزای صفحه وب با جاوااسکریپت و تعامل با درخت DOM.",
      ar: "بناء هياكل صفحات مرنة متوافقة مع أحجام الشاشات المختلفة، مصفوفات التنسيق CSS Grid، وتحديث مكونات الصفحة بشكل ديناميكي من خلال لغة جافا سكريبت والدوم (DOM).",
      de: "Konstruktion flexibler Bildschirm-Layouts, Grid- und Flexbox-Systeme, Integration anpassbarer Medien und dynamische DOM-Updates mit Javascript.",
      fr: "Modélisation de maquettes fluides, intégration de médias responsives, utilisation avancée des CSS grids et manipulation interactive du DOM.",
      it: "Costruzione di layout fluidi adattabili a diversi schermi, griglie CSS, integrazione di media flessibili e aggiornamento dinamico del DOM.",
      zh: "探讨跨设备视口自适应布局。使用网格布局（CSS Grid）、弹性盒（Flexbox）、媒体查询驱动的导航，及动态 JavaScript 操作 DOM 的深度结合。",
      ru: "Проектирование гибких сеток веб-страниц (CSS Grid/Flexbox), интеграция медиафайлов и динамическое обновление DOM-дерева через Javascript.",
      el: "Κατασκευή ευέλικτων layouts, ενσωμάτωση responsive πολυμέσων, χρήση CSS Grid και δυναμική ενημέρωση του DOM με Javascript.",
      la: "Designatio chartarum et elementorum per CSS grid et flexbox, ac renovatio DOM sub scriptis Javascript."
    },
    grade: "90.40% / 100",
    pdfFile: "ResponsiveWebsiteBasicsCodewithHTML,CSS,andJavaScript.pdf"
  },
  {
    id: "michigan-django",
    title: {
      en: "University of Michigan: Web Application Technologies and Django",
      fa: "دانشگاه میشیگان: تکنولوژی‌های مدرن وب و فریم‌ورک جنگو",
      ar: "جامعة ميشيغان: تقنيات تطبيقات الويب وإطار عمل جانغو",
      de: "University of Michigan: Webanwendungstechnologien und Django",
      fr: "University of Michigan: Technologies Web et Django",
      it: "University of Michigan: Tecnologie delle Applicazioni Web & Django",
      zh: "密歇根大学：Web 开发技术精粹与 Django 后端开发",
      ru: "Мичиганский университет: Веб-технологии и фреймворк Django",
      el: "Πανεπιστήμιο του Μίσιγκαν: Τεχνολογίες Web Εφαρμογών και Django",
      la: "Universitas Michigan: Technologiae Web et Django"
    },
    desc: {
      en: "Building database backends, relational schema designs (SQL), Django model-view-controller (MVC) structures, middleware configurations, and HTML templates generation.",
      fa: "توزعه سمت سرور با پایگاه‌های داده رابطه‌ای (SQL)، معماری مدل-نما-کنترل فریمورک قدرتمند جنگو (Django)، پردازش درخواست در پایگاه‌داده و تولید تمپلت‌های پویای وب.",
      ar: "بناء وإدارة خوادم قواعد البيانات، المخططات المرتبطة SQL، نمط MVC لإطار عمل جانغو، وتوليد القوالب التفاعلية لعرض البيانات.",
      de: "Entwicklung von Datenbank-Backends, relationalen Schemata (SQL), der MVC-Architektur von Django und modularer Template-Generierung.",
      fr: "Conception de backends de bases de données, schémas relationnels (SQL), architecture Django MVT/MVC et rendu de templates.",
      it: "Sviluppo backend con basi di dati relazionali (SQL), architettura MVC in Django, gestione delle rotte e viste dinamiche.",
      zh: "关系型数据库设计（SQL）、Django的MVC/MVT设计模式、路由与中间件拦截器配置及动态模板引擎原理机制。",
      ru: "Проектирование бэкенда на Django, реляционных баз данных (SQL), шаблонов страниц и паттерна MVC.",
      el: "Ανάπτυξη βάσεων δεδομένων, σχεδιασμός σχεσιακών σχημάτων (SQL), αρχιτεκτονική MVC του Django και δημιουργία HTML templates.",
      la: "Creatio backend cum SQL et Django framework MVC pro generatione templorum interretis."
    },
    grade: "100% / 100",
    pdfFile: "WebApplicationTechnologiesandDjango.pdf"
  },
  {
    id: "michigan-web-design-capstone",
    title: {
      en: "University of Michigan: Web Design for Everybody Capstone",
      fa: "دانشگاه میشیگان: پروژه نهایی و یکپارچه طراحی وب برای همگان",
      ar: "جامعة ميشيغان: المشروع الختامي لتصميم مواقع الويب للجميع",
      de: "University of Michigan: Webdesign für alle Abschlussarbeit",
      fr: "University of Michigan: Projet de fin d'études Web Design pour tous",
      it: "University of Michigan: Progetto Finale di Web Design per Tutti",
      zh: "密歇根大学：全能网页设计师终极毕业设计大作",
      ru: "Мичиганский университет: Дипломный проект по веб-дизайну",
      el: "Πανεπιστήμιο του Μίσιγκان: Πτυχιακή Εργασία Σχεδίασης Web",
      la: "Universitas Michigan: Capstone in Configuratione Web pro Omnibus"
    },
    desc: {
      en: "Capstone implementation verifying high-quality frontend assets, accessibility compliance auditing (WCAG), interactive DOM events, viewport transitions, and complete responsive performance index optimization.",
      fa: "پروژه نهایی و کاربردی شامل ممیزی دسترس‌پذیری وب‌سایت طبق کدهای استاندارد WCAG، بهینه‌سازی فرآیند بارگذاری مدیاها، توسعه موبایل‌فرست و ارائه یک طراحی وب مدرن بی‌نقص.",
      ar: "تطبيق للمشروع النهائي للتحقق من جودة واجهات المستخدم، تلبية معايير سهولة الوصول WCAG، تفاعلات DOM، وتنسيق الأداء المتكامل للهواتف الذكية.",
      de: "Praktische Abschlussarbeit zur Überprüfung von barrierefreien Web-Standards (WCAG), interaktiven DOM-Events und vollendeter responsiver Optimierung.",
      fr: "Projet de fin d'études validant l'accessibilité web (norme WCAG), les animations adaptées aux appareils mobiles et l'optimisation des performances.",
      it: "Sviluppo del progetto finale che attesta l'accessibilità web (WCAG), interazioni DOM e ottimizzazione delle prestazioni responsive su ogni dispositivo.",
      zh: "顶尖网页设计的收官大作。完成 WCAG 网页无障碍可用性合规审计、高度可访问的 交互事件注册、极佳的移动视口顺滑过渡 and 全链性能调优。",
      ru: "Финальный выпускной проект, проверяющий доступность интерфейсов (стандарты WCAG), адаптивность верстки и быструю скорость загрузки страниц.",
      el: "Κατασκευή πτυχιακού έργου που επικυρώνει την προσβασιμότητα (WCAG), αλληλεπιδράσεις DOM και βελτιστοποίηση της responsive απόδοσης.",
      la: "Inceptum finale de accessibility WCAG et executionis web pro mobili et computatro."
    },
    grade: "100% / 100",
    pdfFile: "WebDesignforEverybodyCapstone.pdf"
  }
];
export interface CVArduinoProject {
  id: string;
  title: Record<LanguageType, string>;
  desc: Record<LanguageType, string>;
  date: Record<LanguageType, string>;
  location: Record<LanguageType, string>;
}

export const cvArduinoProjects: CVArduinoProject[] = [
  {
    id: "smart-irrigation",
    title: {
      en: "Smart Agricultural Irrigation IoT System",
      fa: "سامانه آبیاری هوشمند کشاورزی مبتنی بر اینترنت اشیاء (IoT)",
      ar: "نظام الري الزراعي المطور لإنترنت الأشياء",
      de: "Intelligentes landwirtschaftliches Bewässerungs-IoT-System",
      fr: "Système d'irrigation IoT agricole intelligent",
      it: "Sistema IoT di Irrigazione Agricola Intelligente",
      zh: "基于物联网的智能农业灌溉硬核系统",
      ru: "Умная IoT-система полива в сельском хозяйстве",
      el: "Έξυπνο IoT Σύστημα Γεωργικής Άρδευσης",
      la: "Systema Irrigandi Agriculturae IoT Computatum"
    },
    desc: {
      en: "Constructed an automated agricultural watering system using Arduino microcontrollers, soil moisture telemetry, automatic relays, liquid pumps, and water solenoid valves, reducing local water consumption by 35%.",
      fa: "پیاده‌سازی برد سخت‌افزاری اتوماتیک کشاورزی با میکروکنترلرهای آردوینو، تله‌متری مداوم رطوبت خاک، ماژول‌های رله مدار الکتریکی، پمپ‌های مایعات و شیرهای پمپاژ برقی جهاد کاهش ۳۵ درصدی اتلاف آب.",
      ar: "بناء وتطبيق نظام ري تلقائي للأراضي الزراعية باستخدام متحكمات آردوينو، ومستشعرات رطوبة التربة التلقائية، والمرحلات ومضخات السوائل وصمامات المياه الكهربائية لتقليل الفاقد بنسبة 35%.",
      de: "Entwicklung eines automatischen landwirtschaftlichen Bewässerungssystems mit Arduino, Bodenfeuchtigkeitssensoren, Relaismodulen, Flüssigkeitspumpen und Magnetventilen zur Reduzierung des Wasserverbrauchs um 35%.",
      fr: "Conception d'un système d'arrosage agricole autonome via microcontrôleurs Arduino, capteurs de sol, relais et vannes électriques permettant de réduire la consommation d'eau de 35%.",
      it: "Realizzato un sistema di irrigazione automatico basato su schede Arduino, sensori di umidità del terreno, relè, pompe per liquidi e valvole solenoide, riducendo gli sprechi idrici del 35%.",
      zh: "使用 Arduino 微控制器、土壤湿度遥测探针、电子继电器、液体水泵)和电磁阀，设计并构建了一套农业灌溉自动化控制系统，使当地水源消耗降低了35%。",
      ru: "Создали автоматизированную систему полива растений на базе контроллеров Arduino, датчиков влажности почвы, реле, водяных насосов и соленоидов, что позволило сократить расход воды на 35%.",
      el: "Κατασκευή αυτοματοποιημένου συστήματος άρδευσης με μικροελεγκτές Arduino, τηλεμετρία υγρασίας εδάφους, ρελέ, αντλίες και ηλεκτροβάνες, μειώνοντας την κατανάλωση νερού κατά 35%.",
      la: "Systema irrigandi automaticum confectum est ex microcontrolleribus Arduino, sensoribus humidi, valvis, et pompis, quod aquae consumptionem reductit ad XXXV centesimas."
    },
    date: {
      en: "2023 Summer",
      fa: "تابستان ۱۴۰۲",
      ar: "صيف 2023",
      de: "Sommer 2023",
      fr: "Été 2023",
      it: "Estate 2023",
      zh: "2023年夏季",
      ru: "Лето 2023",
      el: "Καλοκαίρι 2023",
      la: "Aestas 2023"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "ایران，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    }
  },
  {
    id: "rfid-security",
    title: {
      en: "Smart Access Alarm & Control Lock System (RFID)",
      fa: "سیستم دزدگیر و قفل دیجیتالی هوشمند فرکانس رادیویی (RFID)",
      ar: "نظام تأمين الأبواب وقفل الأمان بالـ RFID والإنذار",
      de: "Intelligentes RFID-Zutrittskontroll- und Schließsystem",
      fr: "Système de contrôle d'accès intelligent par badge RFID",
      it: "Sistema di Sicurezza e Blocco Elettronico RFID",
      zh: "基于 RFID 射频卡的多功能安全报警门禁控制锁系统",
      ru: "Интеллектуальный дверной замок на базе датчиков RFID",
      el: "Έξυπνο Σύστημα Ελέγχου Πρόσβασης & Ασφάλειας RFID",
      la: "Systema Securitatis et Ianuae RFID Instructum"
    },
    desc: {
      en: "Engineered an RFID-authenticated physical security access control system using Arduino chipsets, high-frequency electromagnetic solenoid locks, buzzer notification alerts, and SPI memory logs to trace visitors and entries.",
      fa: "طراحی بردهای امنیتی مجهز به رسیور کارت‌های الکترونیکی مغناطیسی، سولنوئیدهای تحریک قفل، سیستم بوق اخطار خطا و لاگ‌های حافظه تحت پروتکل SPI برای تایید هویت و ثبت ترددهای ورودی.",
      ar: "تصميم وهندسة نظام تحكم في الدخول آمن مجهّز بقارئ بطاقات RFID، قفل كهرومغناطيسي، منبهات تحذيرية صوتية، وتخزين سجلات الدخول والخروج للزوار عبر بروتوكول SPI.",
      de: "Entwicklung eines RFID-basierten Zutrittskontrollsystems mit Arduino, elektromagnetischen Magnetschmuckschlössern, Summer-Alarmen und SPI-Speicherung.",
      fr: "Ingénierie d'un système de contrôle d'accès physique par badge RFID intégrant serrures électromagnétiques, avertisseurs sonores et sauvegarde SPI des entrées.",
      it: "Progettato un sistema di blocco accessi elettronico sicuro basato su badge RFID, serrature solenoide elettro-magnetiche, cicalino di segnalazione e log SPI dei transiti.",
      zh: "基于 Arduino 单片机、高频电磁式电控锁、蜂鸣器警报模块和 SPI 总线存储芯片，设计并搭建了射频识别（RFID）门禁系统，以实时追踪并记录出入日志。",
      ru: "Разработали систему контроля доступа с аутентификацией по картам RFID на контроллере Arduino, электромагнитным замком, звуковой сиреной и логированием через SPI.",
      el: "Σχεδιασμός συστήματος ελέγχου πρόσβασης με RFID, ηλεκτρομαγνητική κλειδαριά σωληνοειδούς, βομβητή και καταγραφή SPI, για την παρακολούθηση των επισκεπτών.",
      la: "Systema securitatis RFID confectum est ex formis magneticis, solenoideis, resonantibus et SPI scriptis ad aditus hominum custodiendos."
    },
    date: {
      en: "2022 Winter",
      fa: "زمستان ۱۴۰۱",
      ar: "شتاء 2022",
      de: "Winter 2022",
      fr: "Hiver 2022",
      it: "Inverno 2022",
      zh: "2022年冬季",
      ru: "Зима 2022",
      el: "Χειμώνας 2022",
      la: "Hiems 2022"
    },
    location: {
      en: "Iran, Rasht",
      fa: "ایران، رشت",
      ar: "إيران، رشت",
      de: "Iran, Rasht",
      fr: "Iran, Rasht",
      it: "Iran, Rasht",
      zh: "伊朗，拉什特",
      ru: "Иран, Решт",
      el: "Ιράν, Ραστ",
      la: "Irania, Rasht"
    }
  }
];
