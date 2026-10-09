import type { GithubProject } from './github_projects';
import type { LanguageType } from './translations';

/** Public source verified on 2026-10-09; the Support deployment currently returns 404. */
export const recentGithubProjects: GithubProject[] = [
  {
    id: 'github-pimx-support', repoName: 'PIMX_SUPPORT', title: 'PIMX Support', titleEn: 'PIMX Support', titleFa: 'PIMX Support',
    description: 'I built a bilingual support page for my projects, with an interactive 3D heart, searchable wallet destinations, address copying and QR codes.',
    descriptionFa: 'صفحهٔ دو‌زبانه‌ای برای حمایت از پروژه‌هایم ساختم؛ با قلب سه‌بعدی تعاملی، جست‌وجوی مقصدهای کیف پول، کپی آدرس و کد QR.',
    githubUrl: 'https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT',
    link: 'https://pimxsupport.pages.dev/', linkKind: 'website', liveStatus: 'unavailable', activitySource: 'http',
    verifiedAt: '2026-10-09', accent: 'emerald', category: 'web', badge: 'WEB PROJECT', language: 'TypeScript',
    technologies: ['React', 'TypeScript', 'Three.js', 'Vite'], topics: ['bilingual', 'donation-page', 'threejs'],
    origin: 'github', isFork: false, isArchived: false,
  },
  {
    id: 'github-pimx-agent-bot', repoName: 'PIMX_AGENT_BOT', title: 'PIMX Agent Bot', titleEn: 'PIMX Agent Bot', titleFa: 'PIMX Agent Bot',
    description: 'I built an AI workspace inside Telegram: streamed chats, multiple model providers, saved memory and conversations, plus a Mini App and portable archives.',
    descriptionFa: 'فضای کاری هوش مصنوعی داخل تلگرام ساختم؛ با پاسخ‌های تدریجی، چند ارائه‌دهندهٔ مدل، حافظه و گفت‌وگوهای ذخیره‌شده، مینی‌اپ و خروجی قابل انتقال.',
    githubUrl: 'https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_AGENT_BOT',
    linkKind: 'bot', liveStatus: 'unknown', accent: 'indigo', category: 'ai', badge: 'TELEGRAM AI WORKSPACE', language: 'JavaScript',
    technologies: ['JavaScript', 'Telegram Mini App', 'Cloudflare Workers', 'D1', 'KV'], topics: ['ai', 'telegram-bot', 'telegram-mini-app'],
    origin: 'github', isFork: false, isArchived: false,
  },
];

const descriptions: Record<LanguageType, [string, string]> = {
  en: [recentGithubProjects[0].description, recentGithubProjects[1].description],
  fa: [recentGithubProjects[0].descriptionFa, recentGithubProjects[1].descriptionFa],
  ar: ['أنشأت صفحة ثنائية اللغة لدعم مشاريعي، مع قلب ثلاثي الأبعاد تفاعلي والبحث عن عناوين المحافظ ونسخ العناوين ورموز QR.', 'أنشأت مساحة عمل للذكاء الاصطناعي داخل تلغرام، مع ردود تدريجية ومزودي نماذج متعددين وذاكرة ومحادثات محفوظة وتطبيق مصغر وأرشيفات قابلة للنقل.'],
  de: ['Ich habe eine zweisprachige Unterstützungsseite für meine Projekte gebaut: mit interaktivem 3D-Herz, durchsuchbaren Wallet-Adressen, Kopierfunktion und QR-Codes.', 'Ich habe einen KI-Arbeitsbereich in Telegram gebaut: mit gestreamten Antworten, mehreren Modellanbietern, gespeicherten Gesprächen und Erinnerungen, Mini App und exportierbaren Archiven.'],
  fr: ['J’ai créé une page bilingue pour soutenir mes projets, avec un cœur 3D interactif, une recherche d’adresses de portefeuille, la copie d’adresses et des codes QR.', 'J’ai créé un espace de travail IA dans Telegram : réponses progressives, plusieurs fournisseurs de modèles, mémoire et conversations sauvegardées, Mini App et archives exportables.'],
  it: ['Ho creato una pagina bilingue per sostenere i miei progetti, con un cuore 3D interattivo, ricerca degli indirizzi dei portafogli, copia degli indirizzi e codici QR.', 'Ho creato uno spazio di lavoro IA in Telegram: risposte progressive, diversi fornitori di modelli, memoria e conversazioni salvate, Mini App e archivi esportabili.'],
  zh: ['我为自己的项目制作了一个双语支持页面，包含可交互的三维心形、钱包地址搜索、地址复制和二维码。', '我在 Telegram 中构建了一个 AI 工作空间，支持流式回复、多家模型提供商、保存记忆和对话、迷你应用及可导出的档案。'],
  ru: ['Я создал двуязычную страницу поддержки моих проектов: интерактивное 3D-сердце, поиск адресов кошельков, копирование адресов и QR-коды.', 'Я создал рабочее пространство ИИ в Telegram: потоковые ответы, разные поставщики моделей, сохранённая память и диалоги, мини-приложение и переносимые архивы.'],
  el: ['Έφτιαξα μια δίγλωσση σελίδα υποστήριξης για τα έργα μου, με διαδραστική τρισδιάστατη καρδιά, αναζήτηση διευθύνσεων πορτοφολιών, αντιγραφή και κωδικούς QR.', 'Έφτιαξα έναν χώρο εργασίας τεχνητής νοημοσύνης στο Telegram: σταδιακές απαντήσεις, πολλούς παρόχους μοντέλων, αποθηκευμένη μνήμη και συνομιλίες, Mini App και εξαγώγιμα αρχεία.'],
  la: ['Paginam bilingui sermone ad opera mea sustinenda creavi, cum corde tridimensionali, quaestione inscriptionum crumenarum, earum copia et codicibus QR.', 'Spatium laboris intelligentiae artificialis in Telegram creavi: responsa gradatim, plures praebitores exemplarium, memoriam et colloquia servata, applicationem parvam et tabularia exportabilia.'],
};
const badges: Record<LanguageType, [string, string]> = {
  en: ['WEB PROJECT', 'TELEGRAM AI WORKSPACE'], fa: ['پروژهٔ وب', 'فضای کاری هوش مصنوعی تلگرام'],
  ar: ['مشروع ويب', 'مساحة عمل الذكاء الاصطناعي في تلغرام'], de: ['WEBPROJEKT', 'KI-ARBEITSBEREICH IN TELEGRAM'],
  fr: ['PROJET WEB', 'ESPACE IA DANS TELEGRAM'], it: ['PROGETTO WEB', 'SPAZIO IA IN TELEGRAM'],
  zh: ['网页项目', 'TELEGRAM AI 工作空间'], ru: ['ВЕБ-ПРОЕКТ', 'РАБОЧЕЕ ПРОСТРАНСТВО ИИ В TELEGRAM'],
  el: ['ΕΡΓΟ ΙΣΤΟΥ', 'ΧΩΡΟΣ ΤΕΧΝΗΤΗΣ ΝΟΗΜΟΣΥΝΗΣ ΣΤΟ TELEGRAM'], la: ['OPUS INTERRETIALE', 'SPATIUM INTELLIGENTIAE ARTIFICIALIS IN TELEGRAM'],
};
export function getRecentProjectCopy(id: string, lang: string) {
  const index = recentGithubProjects.findIndex(project => project.id === id);
  if (index < 0) return {};
  const language = lang in descriptions ? lang as LanguageType : 'en';
  return { description: descriptions[language][index], badge: badges[language][index] };
}
