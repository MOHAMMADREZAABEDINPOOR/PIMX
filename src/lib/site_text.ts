import type { LanguageType } from './translations';
import { reviewedSiteText } from './site_text_review';

const localeLoaders = {
  fa: () => import('./site_locales/fa.json'),
  ar: () => import('./site_locales/ar.json'),
  de: () => import('./site_locales/de.json'),
  fr: () => import('./site_locales/fr.json'),
  it: () => import('./site_locales/it.json'),
  zh: () => import('./site_locales/zh.json'),
  ru: () => import('./site_locales/ru.json'),
  el: () => import('./site_locales/el.json'),
  la: () => import('./site_locales/la.json'),
};
const locales: Partial<Record<LanguageType, Record<string, string>>> = {};
const pending: Partial<Record<LanguageType, Promise<void>>> = {};

/** Load one bundled locale, then keep all lookups synchronous and cached. */
export function loadSiteText(lang: LanguageType): Promise<void> {
  if (lang === 'en' || locales[lang]) return Promise.resolve();
  if (pending[lang]) return pending[lang];
  pending[lang] = localeLoaders[lang]().then(module => {
    locales[lang] = module.default;
  }).catch(error => {
    delete pending[lang];
    throw error;
  });
  return pending[lang];
}
const lookup = (lang: LanguageType, key: string) => reviewedSiteText[key]?.[lang] ?? locales[lang]?.[key];
/** Local, synchronous translations. Product names, source code and URLs retain their spelling. */
export function translateSiteText<T>(lang: LanguageType, value: T): T {
  if (lang === 'en') return value;
  if (typeof value === 'string') {
    const key=value.trim(), translated=lookup(lang,key);
    if(translated)return value.replace(key,()=>translated) as T;
    const count=key.match(/^(\d+)\s+(.+)$/);
    if(count && lookup(lang,count[2]))return `${count[1]} ${lookup(lang,count[2])}` as T;
    const caption=key.match(/^(.+?):\s+(.+)$/);
    if(caption && lookup(lang,caption[1]))return `${lookup(lang,caption[1])}: ${caption[2]}` as T;
    const action=key.match(/^(Select|Explore|Show|Open)\s+(.+)$/);
    if(action)return `${lookup(lang,action[1]) || action[1]} ${action[2]}` as T;
    return value;
  }
  if (Array.isArray(value)) return value.map(item=>translateSiteText(lang,item)) as T;
  return value;
}
