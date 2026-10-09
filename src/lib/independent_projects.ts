import type { TranslatedProjectItem } from './project_translations';

type IndependentProject = TranslatedProjectItem & {
  titleFa: string;
  descriptionFa: string;
  featuresFa?: string[];
};

/** Owner-confirmed work with public HTTP verification and no invented repository. */
export const independentProjects: IndependentProject[] = [
  {
    id: 'soheil-portal',
    title: 'Soheil Eghtesadi — Links',
    titleEn: 'Soheil Eghtesadi — Links',
    titleFa: 'پورتال لینک‌های سهیل اقتصادی',
    description: 'A bilingual creator link portal for Soheil Eghtesadi, built with HTML, CSS and JavaScript. It brings Telegram, YouTube, Kick and Instagram into an animated profile page with theme and language controls.',
    descriptionFa: 'پورتال دوزبانهٔ لینک‌های سهیل اقتصادی با HTML، CSS و JavaScript؛ صفحهٔ پروفایل متحرک برای دسترسی به تلگرام، YouTube، Kick و اینستاگرام، همراه با انتخاب زبان و تم.',
    features: [
      'Direct links to Telegram, YouTube, Kick and Instagram',
      'Persian and English navigation with right-to-left support',
      'Light and dark themes with saved preferences',
      'Animated profile, particle canvas and reduced-motion handling',
    ],
    featuresFa: [
      'لینک مستقیم تلگرام، YouTube، Kick و اینستاگرام',
      'رابط فارسی و انگلیسی با پشتیبانی از راست‌به‌چپ',
      'تم روشن و تیره با ذخیرهٔ تنظیمات',
      'پروفایل متحرک، ذرات Canvas و رعایت تنظیم کاهش حرکت',
    ],
    link: 'https://soheileghtesadiportal.pages.dev/',
    linkKind: 'website',
    activitySource: 'http',
    liveStatus: 'verified',
    verifiedAt: '2026-10-08T11:56:20.985Z',
    language: 'JavaScript',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
    topics: ['creator-portal', 'bilingual', 'responsive-design'],
    accent: 'violet',
    category: 'web',
    badge: 'LIVE CREATOR PORTAL',
    origin: 'portfolio',
  },
];

/** English is the fallback for the other supported interface languages. */
export function getIndependentProjects(lang: string): TranslatedProjectItem[] {
  return independentProjects.map(project => ({
    ...project,
    title: lang === 'fa' ? project.titleFa : project.titleEn,
    description: lang === 'fa' ? project.descriptionFa : project.description,
    features: lang === 'fa' ? project.featuresFa || project.features : project.features,
  }));
}
