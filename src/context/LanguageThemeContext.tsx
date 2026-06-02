import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageType, TranslationSet, translations, languagesInfo } from '../lib/translations';

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

const LanguageThemeContext = createContext<LanguageThemeContextType | undefined>(undefined);

export const LanguageThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageType>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('mra_portfolio_lang') as LanguageType;
      return savedLang || 'en';
    }
    return 'en';
  });
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('mra_portfolio_theme') as 'dark' | 'light';
      return savedTheme || 'dark';
    }
    return 'dark';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load initial settings from localStorage to persist user selection

  // Update HTML classes & values upon theme modifications
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = lang === 'fa' ? 'fa' : lang === 'ar' ? 'ar' : lang === 'zh' ? 'zh-CN' : lang;
    root.dir = languagesInfo[lang].dir;
    document.title = localizedSiteTitles[lang] || localizedSiteTitles.en;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', localizedSiteDescriptions[lang] || localizedSiteDescriptions.en);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', localizedSiteTitles[lang] || localizedSiteTitles.en);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', localizedSiteTitles[lang] || localizedSiteTitles.en);
    }
  }, [lang]);

  const setLang = (newLang: LanguageType) => {
    // Trigger awesome loader on language switch to recompile with high fidelity!
    setIsLoading(true);
    localStorage.setItem('mra_portfolio_lang', newLang);
    setLangState(newLang);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setIsLoading(true);
    localStorage.setItem('mra_portfolio_theme', newTheme);
    setThemeState(newTheme);

    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const triggerAwesomeLoad = (durationMs = 1800, onComplete?: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, durationMs);
  };

  const currentInfo = languagesInfo[lang];
  const t = translations[lang];

  return (
    <LanguageThemeContext.Provider
      value={{
        lang,
        theme,
        dir: currentInfo.dir,
        fontClass: currentInfo.fontClass,
        t,
        setLang,
        setTheme,
        isLoading,
        setIsLoading,
        triggerAwesomeLoad
      }}
    >
      <div 
        dir={currentInfo.dir} 
        className={`${currentInfo.fontClass} ${theme === 'light' ? 'theme-light' : 'theme-dark'} transition-colors duration-300`}
        style={{ direction: currentInfo.dir }}
      >
        {children}
      </div>
    </LanguageThemeContext.Provider>
  );
};

export const useLanguageTheme = () => {
  const context = useContext(LanguageThemeContext);
  if (!context) {
    throw new Error('useLanguageTheme must be used within a LanguageThemeProvider');
  }
  return context;
};
