import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import {
  LanguageType,
  TranslationSet,
  translations,
  languagesInfo,
} from '../lib/translations';
import { loadSiteText } from '../lib/site_text';

const loadingLocaleLabels: Record<LanguageType, string> = {
  en:'Loading…', fa:'در حال بارگذاری…', ar:'جارٍ التحميل…', de:'Wird geladen…',
  fr:'Chargement…', it:'Caricamento…', zh:'正在加载…', ru:'Загрузка…',
  el:'Φόρτωση…', la:'Oneratur…',
};

const localizedSiteTitles: Record<LanguageType, string> = {
  en: 'Mohammadreza Portfolio',
  fa: 'پورتفولیو محمدرضا',
  ar: 'ملف محمدرضا الشخصي',
  de: 'Mohammadreza Portfolio',
  fr: 'Portfolio de Mohammadreza',
  it: 'Portfolio di Mohammadreza',
  zh: '穆罕默德礼萨作品集',
  ru: 'Портфолио Мохаммадрезы',
  el: 'Χαρτοφυλάκιο Mohammadreza',
  la: 'Portfolio Mohammadreza',
};

const localizedSiteDescriptions: Record<LanguageType, string> = {
  en: 'Official portfolio of Mohammadreza Abedinpoor: Python, Django, AI, web development, Telegram bots, projects, resume, and verified certificates.',
  fa: 'پورتفولیو رسمی محمدرضا عابدین‌پور: پروژه‌ها، رزومه، گواهینامه‌ها، Python، Django، هوش مصنوعی، وب و بات‌های تلگرام.',
  ar: 'الملف الشخصي الرسمي لمحمدرضا عابدين بور: مشاريع، سيرة ذاتية، شهادات، Python وDjango والذكاء الاصطناعي وتطوير الويب.',
  de: 'Offizielles Portfolio von Mohammadreza Abedinpoor: Python, Django, KI, Webentwicklung, Telegram-Bots, Projekte, Lebenslauf und Zertifikate.',
  fr: 'Portfolio officiel de Mohammadreza Abedinpoor : Python, Django, IA, développement web, bots Telegram, projets, CV et certificats.',
  it: 'Portfolio ufficiale di Mohammadreza Abedinpoor: Python, Django, IA, sviluppo web, bot Telegram, progetti, CV e certificati.',
  zh: 'Mohammadreza Abedinpoor 官方作品集：Python、Django、人工智能、网页开发、Telegram 机器人、项目、简历和证书。',
  ru: 'Официальное портфолио Mohammadreza Abedinpoor: Python, Django, ИИ, веб-разработка, Telegram-боты, проекты, резюме и сертификаты.',
  el: 'Επίσημο portfolio του Mohammadreza Abedinpoor: Python, Django, AI, web development, Telegram bots, έργα, βιογραφικό και πιστοποιητικά.',
  la: 'Portfolio officiale Mohammadreza Abedinpoor: Python, Django, AI, telae progressio, Telegram automata, opera, curriculum et testimonia.',
};

interface LanguageThemeContextType {
  lang: LanguageType;
  theme: 'dark' | 'light';
  dir: 'rtl' | 'ltr';
  fontClass: string;
  t: TranslationSet;
  setLang: (lang: LanguageType) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  triggerAwesomeLoad: (durationMs?: number, onComplete?: () => void) => void;
}

const LanguageThemeContext = createContext<
  LanguageThemeContextType | undefined
>(undefined);
const isRtlLanguage = (language: LanguageType) =>
  language === 'fa' || language === 'ar';
const isLanguage = (value: unknown): value is LanguageType =>
  typeof value === 'string' &&
  Object.prototype.hasOwnProperty.call(languagesInfo, value);
const readPreference = (key: string) => {
  try {
    return typeof window !== 'undefined'
      ? window.localStorage.getItem(key)
      : null;
  } catch {
    return null;
  }
};
const savePreference = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Preferences still work for this session when storage is unavailable. */
  }
};

export const LanguageThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<LanguageType>(() => {
    const savedLang = readPreference('mra_portfolio_lang');
    return isLanguage(savedLang) ? savedLang : 'en';
  });
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const savedTheme = readPreference('mra_portfolio_theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localeReady, setLocaleReady] = useState(lang === 'en');
  const languageRequest = useRef(0);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (loadingTimer.current !== null) clearTimeout(loadingTimer.current);
    },
    []
  );
  useEffect(() => {
    let disposed=false;
    loadSiteText(lang).then(()=>{if(!disposed)setLocaleReady(true);}).catch(()=>{
      if(!disposed){setLangState('en');setLocaleReady(true);}
    });
    return()=>{disposed=true;};
  },[lang]);

  // Update HTML classes & values upon theme modifications and language changes before paint
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.lang =
      lang === 'fa'
        ? 'fa'
        : lang === 'ar'
          ? 'ar'
          : lang === 'zh'
            ? 'zh-CN'
            : lang;
    root.dir = isRtlLanguage(lang) ? 'rtl' : 'ltr';
    document.title = localizedSiteTitles[lang] || localizedSiteTitles.en;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        'content',
        localizedSiteDescriptions[lang] || localizedSiteDescriptions.en
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        localizedSiteTitles[lang] || localizedSiteTitles.en
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute(
        'content',
        localizedSiteTitles[lang] || localizedSiteTitles.en
      );
    }
  }, [lang]);

  const setLang = (newLang: LanguageType) => {
    if (!isLanguage(newLang)) return;
    const request=++languageRequest.current;
    void loadSiteText(newLang).then(()=>{
      if(request!==languageRequest.current)return;
      savePreference('mra_portfolio_lang', newLang);
      setLangState(newLang);
      setLocaleReady(true);
    }).catch(()=>{/* Keep the current language if a bundled asset cannot be loaded. */});
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    savePreference('mra_portfolio_theme', newTheme);
    setThemeState(newTheme);
  };

  const triggerAwesomeLoad = (durationMs = 320, onComplete?: () => void) => {
    if (loadingTimer.current !== null) clearTimeout(loadingTimer.current);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const delay = reducedMotion
      ? 0
      : Math.max(0, Number.isFinite(durationMs) ? durationMs : 320);
    setIsLoading(true);
    loadingTimer.current = setTimeout(() => {
      loadingTimer.current = null;
      setIsLoading(false);
      onComplete?.();
    }, delay);
  };

  const currentInfo = languagesInfo[lang];
  const currentDir: 'rtl' | 'ltr' = isRtlLanguage(lang) ? 'rtl' : 'ltr';
  const t = translations[lang];

  return (
    <LanguageThemeContext.Provider
      value={{
        lang,
        theme,
        dir: currentDir,
        fontClass: currentInfo.fontClass,
        t,
        setLang,
        setTheme,
        isLoading,
        setIsLoading,
        triggerAwesomeLoad,
      }}
    >
      <div
        dir={currentDir}
        className={`${currentInfo.fontClass} ${theme === 'light' ? 'theme-light' : 'theme-dark'} transition-colors duration-300`}
        style={{ direction: currentDir }}
      >
        {localeReady ? children : <div role="status" className="container-wide section-space">{loadingLocaleLabels[lang]}</div>}
      </div>
    </LanguageThemeContext.Provider>
  );
};

export const useLanguageTheme = () => {
  const context = useContext(LanguageThemeContext);
  if (!context) {
    throw new Error(
      'useLanguageTheme must be used within a LanguageThemeProvider'
    );
  }
  return context;
};
