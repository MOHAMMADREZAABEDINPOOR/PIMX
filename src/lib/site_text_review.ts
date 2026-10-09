import type { LanguageType } from './translations';

/** Editorial overrides for short phrases whose meaning depends on the surrounding headline. */
export const reviewedSiteText: Record<string,Partial<Record<LanguageType,string>>> = {
  'WORLDS': {la:'MUNDI'},
  'HUMAN': {la:'HOMO'},
  'KNOWLEDGE': {la:'SCIENTIA'},
  'THE STORY': {la:'FABULA'},
  'CONNECT': {la:'CONIUNGE'},
  'A DIFFERENT WORLD.': {la:'ALTER MUNDUS.'},
  'Curiosity,': {fa:'کنجکاوی،',ar:'فضولٌ،',de:'Neugier,',fr:'Curiosité,',it:'Curiosità,',zh:'好奇心，',ru:'Любопытство,',el:'Περιέργεια,',la:'Curiositas,'},
  'in code.': {fa:'با کد.',ar:'بلغة الكود.',de:'in Code.',fr:'en code.',it:'nel codice.',zh:'以代码表达。',ru:'в коде.',el:'μέσα στον κώδικα.',la:'in codice.'},
  'deserve': {fa:'لایقِ',ar:'تستحق',de:'verdienen',fr:'méritent',it:'meritano',zh:'值得',ru:'заслуживают',el:'αξίζουν',la:'merentur'},
  'hello.': {fa:'سلام.',ar:'مرحبًا.',de:'hallo.',fr:'bonjour.',it:'ciao.',zh:'你好。',ru:'привет.',el:'γεια.',la:'salve.'},
  'Select': {fa:'انتخاب',ar:'اختيار',de:'Auswählen',fr:'Choisir',it:'Seleziona',zh:'选择',ru:'Выбрать',el:'Επιλογή',la:'Elige'},
  'Explore': {fa:'کشف',ar:'استكشف',de:'Entdecken',fr:'Explorer',it:'Esplora',zh:'探索',ru:'Изучить',el:'Εξερεύνηση',la:'Explora'},
  'Show': {fa:'نمایش',ar:'عرض',de:'Anzeigen',fr:'Afficher',it:'Mostra',zh:'显示',ru:'Показать',el:'Προβολή',la:'Monstra'},
  'Open': {fa:'باز کردن',ar:'فتح',de:'Öffnen',fr:'Ouvrir',it:'Apri',zh:'打开',ru:'Открыть',el:'Άνοιγμα',la:'Aperi'},
  'credentials': {fa:'گواهی‌نامه‌ها',ar:'الشهادات',de:'Nachweise',fr:'attestations',it:'attestati',zh:'证书',ru:'сертификаты',el:'πιστοποιητικά',la:'testimonia'},
  'institutions': {fa:'مؤسسه‌ها',ar:'المؤسسات',de:'Institutionen',fr:'établissements',it:'istituzioni',zh:'机构',ru:'учреждения',el:'ιδρύματα',la:'instituta'},
  'records': {fa:'سوابق',ar:'سجلات',de:'Einträge',fr:'dossiers',it:'documenti',zh:'记录',ru:'записи',el:'εγγραφές',la:'documenta'},
};

// Short interface labels need explicit translations when the generator preserves English.
const reviewedLocales: Partial<Record<LanguageType, Record<string, string>>> = {
  fa: {
    'AI SYSTEMS':'سیستم‌های هوش مصنوعی', 'AI WORKSPACE':'فضای کار هوش مصنوعی',
    'BUILD / BREAK / REPEAT':'بساز / آزمایش کن / تکرار کن', 'DESKTOP APP':'برنامهٔ دسکتاپ',
    'INTERFACE → SYSTEM':'رابط کاربری ← سیستم', 'LIVE CREATOR PORTAL':'پرتال فعال سازنده',
    'PIMX / CREATIVE DEVELOPER — V.05':'PIMX / توسعه‌دهندهٔ خلاق — V.05',
    'PIMX / THE WORKBENCH':'PIMX / میز کار', 'PYTHON / FOUNDATIONS':'پایتون / مبانی',
    'Git & Version Control':'گیت و کنترل نسخه', 'Photoshop & Asset Opt.':'فتوشاپ و بهینه‌سازی فایل‌ها',
    'Web Scraping':'استخراج داده از وب', 'THINK → BUILD → REFINE':'فکر کن ← بساز ← بهتر کن',
    'ITERATE.':'دوباره امتحان کن.', 'UNLEARN.':'دوباره فکر کن.', 'REFINE.':'بهتر کن.',
    'AI RESPONSE':'پاسخ هوش مصنوعی', 'ACTIVE BOT ↗':'ربات فعال ↗', 'ADMIN PORTAL':'پرتال مدیریت',
  },
  el: {
    'ACTIVE TELEGRAM BOT':'ΕΝΕΡΓΟ BOT TELEGRAM', 'AI SYSTEMS':'ΣΥΣΤΗΜΑΤΑ ΤΕΧΝΗΤΗΣ ΝΟΗΜΟΣΥΝΗΣ',
    'AI WORKSPACE':'ΧΩΡΟΣ ΕΡΓΑΣΙΑΣ ΤΕΧΝΗΤΗΣ ΝΟΗΜΟΣΥΝΗΣ', 'Arduino Engineering':'Μηχανική με Arduino',
    'Core & Soft Skills':'Τεχνικές και προσωπικές δεξιότητες', 'DESKTOP APP':'ΕΦΑΡΜΟΓΗ ΥΠΟΛΟΓΙΣΤΗ',
    'Django Full-Stack Architecture':'Αρχιτεκτονική πλήρους στοίβας με Django',
    'Flutter Cross-Platform':'Ανάπτυξη πολλαπλών πλατφορμών με Flutter',
    'Gemini-Integrated Chatbot with Email':'Chatbot με Gemini και ηλεκτρονικό ταχυδρομείο',
    'Generative AI':'Παραγωγική τεχνητή νοημοσύνη', 'INTERFACE → SYSTEM':'ΔΙΕΠΑΦΗ → ΣΥΣΤΗΜΑ',
    'LIVE CREATOR PORTAL':'ΕΝΕΡΓΗ ΠΥΛΗ ΔΗΜΙΟΥΡΓΟΥ', 'LIVE /':'ΕΝΕΡΓΑ /',
    'PIMX / CREATIVE DEVELOPER — V.05':'PIMX / ΔΗΜΙΟΥΡΓΙΚΟΣ ΠΡΟΓΡΑΜΜΑΤΙΣΤΗΣ — V.05',
    'Photoshop & Asset Opt.':'Photoshop και βελτιστοποίηση αρχείων', 'Python Core':'Βασικές αρχές Python',
    'Smart Access Alarm & Control Lock System (RFID)':'Έξυπνος συναγερμός και έλεγχος πρόσβασης με RFID',
    'THINK IN PYTHON':'ΣΚΕΨΟΥ ΜΕ PYTHON', 'THINK → BUILD → REFINE':'ΣΚΕΨΟΥ → ΔΗΜΙΟΥΡΓΗΣΕ → ΒΕΛΤΙΩΣΕ',
    'Telegram Bot Dev':'Ανάπτυξη bot Telegram', 'Web Scraping':'Εξαγωγή δεδομένων από τον ιστό',
    'University of London: Responsive Website Basics':'Πανεπιστήμιο του Λονδίνου: Βασικές αρχές προσαρμοστικών ιστοτόπων',
    'University of Michigan: Python for Everybody Specialization':'Πανεπιστήμιο του Μίσιγκαν: Εξειδίκευση στην Python για όλους',
    'University of Michigan: Web Application Technologies and Django':'Πανεπιστήμιο του Μίσιγκαν: Τεχνολογίες εφαρμογών ιστού και Django',
    'University of Michigan: Web Design for Everybody Capstone':'Πανεπιστήμιο του Μίσιγκαν: Τελικό έργο σχεδιασμού ιστοτόπων για όλους',
    'University of Toronto: Learn to Program: The Fundamentals':'Πανεπιστήμιο του Τορόντο: Βασικές αρχές προγραμματισμού',
    'ITERATE.':'ΕΠΑΝΕΛΑΒΕ.', 'MAKE.':'ΔΗΜΙΟΥΡΓΗΣΕ.',
  },
  de: {'BUILD / BREAK / REPEAT':'BAUEN / TESTEN / WIEDERHOLEN', 'Telegram Bot Dev':'Telegram-Bot-Entwicklung', 'Web Scraping':'Web-Datenextraktion', 'ITERATION.':'WEITERENTWICKLUNG.'},
  fr: {'ITERATE.':'ITÉREZ.'},
  it: {'Telegram Bot Dev':'Sviluppo di bot Telegram', 'Python Core':'Fondamenti di Python', 'ITERATE.':'ITERA.'},
  la: {
    '2021 - Present':'2021 – Ad praesens', '2022 Autumn':'Autumnus 2022', '2025 Spring':'Ver 2025',
    'AI & automation':'Intellegentia artificialis et automatio', 'AI / AUTOMATION':'INTELLEGENTIA ARTIFICIALIS / AUTOMATIO',
    'AI Development':'Progressio intellegentiae artificialis', 'AI WORKSPACE':'SPATIUM INTELLEGENTIAE ARTIFICIALIS',
    'AI SYSTEMS':'SYSTEMATA INTELLEGENTIAE ARTIFICIALIS', 'AUTOMATION':'AUTOMATIO', 'Automation':'Automatio',
    'Accessibility':'Accessibilitas', 'Arduino & IoT Hardware':'Arduino et instrumenta interretis rerum',
    'BUILD':'CONSTRUE', 'BUILD / BREAK / REPEAT':'CONSTRUE / EXPERIRE / ITERA',
    'Back to top':'Ad initium redire', 'Browser encryption for text and files':'Textus et fasciculorum cryptographia in navigatro',
    'CV / Resume':'Curriculum vitae', 'Contact':'Contactus', 'Core & Soft Skills':'Artes technicae et personales',
    'DESKTOP APP':'APPLICATIO COMPUTATORIA', 'Debugging':'Errorum investigatio', 'Design & tools':'Designatio et instrumenta',
    'Direct Sync & Accountability':'Concordia et responsabilitas',
    'Django Full-Stack Architecture':'Architectura totius systematis cum Django',
    'Download':'Deprome', 'Download CV':'Curriculum deprome', 'Download original PDF':'PDF originale deprome',
    'EXHIBIT':'EXHIBITUM', 'EXHIBIT /':'EXHIBITUM /', 'Education':'Educatio', 'Electronic Mail':'Epistula electronica',
    'Engineering':'Ars ingeniaria', 'Focused Creative Execution':'Creatio diligens et intenta',
    'Gemini-Integrated Chatbot with Email':'Automaton colloquii cum Gemini et epistulis electronicis',
    'Hardware project':'Opus instrumentorum', 'INTELLIGENCE / 001':'INTELLEGENTIA / 001',
    'INTERACTION':'INTERACTIO', 'INTERFACE → SYSTEM':'INTERFACIES → SYSTEMA', 'Image Editing':'Imaginum editio',
    'Johns Hopkins University: HTML, CSS, and Javascript for Web Developers':'Universitas Johns Hopkins: HTML, CSS et JavaScript pro programmatoribus telae',
    'LIVE CREATOR PORTAL':'PORTA VIVA CREATORIS', 'LLM integration':'Integratio exemplarium linguae magnorum',
    'Meta (Company)':'Meta (Societas)', 'Meta: Introduction to Front-End Development':'Meta: Introductio ad interfacierum progressionem',
    'Multilingual Chatbot Site':'Situs colloquii multilinguis', 'PIMX / CREATIVE DEVELOPER — V.05':'PIMX / PROGRAMMATOR CREATIVUS — V.05',
    'PROJECT':'OPUS', 'PROJECTS':'OPERA', 'MORE BUILDS':'ALIA OPERA', 'Personal Project':'Opus personale', 'Projects':'Opera',
    'REPEAT':'ITERA', 'REPOSITORIES':'REPOSITORIA', 'SQL Databases':'Bases datorum SQL',
    'Scientific & Work Profile':'Profilum studiorum et operum', 'Semantic HTML':'HTML semanticum', 'Skip to content':'Ad contentum transire',
    'Smart Access Alarm & Control Lock System (RFID)':'Systema monitorii et sera ad accessum regendum cum RFID',
    'Smart Agricultural Irrigation IoT System':'Systema irrigationis agriculturae cum interrete rerum', 'Student & Developer':'Studiosus et programmator',
    'THE NEXT CHAPTER.':'CAPITULUM PROXIMUM.', 'THE PERSON BEHIND PIMX':'HOMO QUI PIMX CREAT',
    'THE PERSON BEHIND THE PIXELS':'HOMO POST IMAGINES', 'Telegram Agent':'Automaton Telegram',
    'University of London: Responsive Website Basics':'Universitas Londiniensis: Fundamenta situum accommodabilium',
    'University of Michigan: Python for Everybody Specialization':'Universitas Michiganensis: Python omnibus, cursus specialis',
    'University of Michigan: Web Application Technologies and Django':'Universitas Michiganensis: Technologiae applicationum telae et Django',
    'University of Michigan: Web Design for Everybody Capstone':'Universitas Michiganensis: Opus finale designationis telae omnibus',
    'University of Toronto: Learn to Program: The Fundamentals':'Universitas Torontonensis: Fundamenta programmationis',
    'VERIFIED WEBSITES':'SITUS PROBATI', 'Video Editing':'Pellicularum editio', 'View original PDF':'PDF originale vide',
    'Web Development':'Progressio telae', 'Web Scraping':'Extractio datorum e tela', 'Web':'Tela', 'WEB':'TELA',
    'ITERATE.':'ITERA.', 'REFINE.':'PERFICE.', 'DESIGNED.':'DESIGNATUM.', 'DEVELOPED.':'CONSTRUCTUM.', 'DEPLOYED.':'PUBLICATUM.',
    'DISCOVER.':'EXPLORA.', 'BUILD.':'CONSTRUE.', 'IN THE WILD.':'IN MUNDO VERO.',
    'Home':'Initium', 'Footer navigation':'Navigatio pedis paginae', 'Mobile navigation':'Navigatio mobilis',
    'Main navigation':'Navigatio principalis', 'Open navigation':'Navigationem aperi', 'Close navigation':'Navigationem claude',
    'Explore':'Explora', 'Explore project':'Opus explora', 'Open project':'Opus aperi', 'Open bot':'Automaton aperi',
    'Pause animation':'Animationem siste', 'Previous credential':'Testimonium prius', 'Next credential':'Testimonium proximum',
    'Project details':'Operis particularia', 'Project record on GitHub':'Operis testimonium in GitHub',
    'View Live Application':'Applicationem vivam vide',
    'View Featured Projects':'Opera selecta vide', 'Email copied':'Epistulae inscriptio descripta',
  },
};
for (const [language, phrases] of Object.entries(reviewedLocales)) {
  for (const [phrase, translation] of Object.entries(phrases)) {
    reviewedSiteText[phrase] = { ...reviewedSiteText[phrase], [language]: translation };
  }
}

// Product names remain recognisable across languages, like Python and GitHub.
const productNameLanguages: LanguageType[] = ['fa','ar','de','fr','it','zh','ru','el','la'];
for (const name of ['PIMX Agent','PIMXSATS','PIMX Swap']) {
  reviewedSiteText[name] = {};
  for (const lang of productNameLanguages) reviewedSiteText[name][lang] = name;
}
