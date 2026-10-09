import { useSiteText } from '../lib/useSiteText';
import LanguageSelect from './LanguageSelect';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { PageType } from '../types';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { languagesInfo, LanguageType } from '../lib/translations';
import '../styles/shell.css';

interface NavbarProps {
  currentPage: PageType;
}
const pageHref = (page: PageType) =>
  page === 'home' ? '/' : `/${page === 'projects' ? 'project' : page}`;

export default function Navbar({ currentPage }: NavbarProps) {
  const l = useSiteText();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, theme, setTheme, dir, t } = useLanguageTheme();
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const navItems: { id: PageType; label: string }[] = [
    { id: 'projects', label: lang === 'en' ? 'Work' : t.navProjects },
    { id: 'about', label: t.navAbout },
    { id: 'playground', label: t.navPlayground },
    { id: 'resume', label: t.navResume },
  ];

  useEffect(() => {
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMobileOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [mobileOpen]);
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)');
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const navigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: PageType
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    setMobileOpen(false);
    const target = pageHref(page);
    if (window.location.pathname !== target)
      window.history.pushState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header ref={headerRef} className="shell-header" dir={dir}>
      <div className="shell-header-inner">
        <a
          href="/"
          className="shell-wordmark"
          aria-label={l(`${t.brandName} — ${t.navHome}`)}
          onClick={(event) => navigate(event, 'home')}
          id="nav-logo"
          dir="ltr"
        >
          PIMX
          <span className="shell-wordmark-star" aria-hidden="true">
            ✳
          </span>
          <span className="shell-wordmark-period">.</span>
        </a>
        <nav className="shell-desktop-nav" aria-label={l("Main navigation")}>
          {l(navItems.map((item) => (
            <a
              key={item.id}
              href={pageHref(item.id)}
              onClick={(event) => navigate(event, item.id)}
              id={`nav-${item.id}`}
              className={`shell-nav-link${currentPage === item.id ? ' is-active' : ''}`}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span>{l(item.label)}</span>
              <span className="shell-nav-dot" aria-hidden="true" />
            </a>
          )))}
        </nav>
        <div className="shell-header-actions">
          <button
            type="button"
            className="shell-icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={
              l(theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme')
            }
            title={l(theme === 'dark' ? 'Light theme' : 'Dark theme')}
            id="theme-toggler-btn"
          >
            {l(theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />)}
          </button>
          <LanguageSelect value={lang} onChange={setLang} compact id="language-select-trigger" onOpen={()=>setMobileOpen(false)}/>
          <a
            href="/contact"
            className="shell-talk-link"
            onClick={(event) => navigate(event, 'contact')}
          >
            <span>{l(lang === 'en' ? 'Let’s talk' : t.navContact)}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            ref={mobileTriggerRef}
            className="shell-icon-button shell-menu-button"
            onClick={() => {
              setMobileOpen(!mobileOpen);
                      }}
            aria-expanded={mobileOpen}
            aria-controls="shell-mobile-nav"
            aria-label={l(mobileOpen ? 'Close navigation' : 'Open navigation')}
            id="mobile-menu-toggle"
          >
            {l(mobileOpen ? <X size={22} /> : <Menu size={22} />)}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {l(mobileOpen && (
          <motion.nav
            id="shell-mobile-nav"
            className="shell-mobile-nav"
            aria-label={l("Mobile navigation")}
            initial={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            {l([
              { id: 'home' as PageType, label: t.navHome },
              ...navItems,
              { id: 'contact' as PageType, label: t.navContact },
            ].map((item, index) => (
              <a
                key={item.id}
                href={pageHref(item.id)}
                onClick={(event) => navigate(event, item.id)}
                className={currentPage === item.id ? 'is-active' : ''}
                aria-current={currentPage === item.id ? 'page' : undefined}
                id={`nav-mob-${item.id}`}
              >
                <span className="shell-mobile-index" aria-hidden="true">
                  0{l(index + 1)}
                </span>
                <span>{l(item.label)}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            )))}
            <div className="shell-mobile-note" dir="ltr">
              <span className="shell-status-dot" /> {l("PYTHON · AI · WEB")}</div>
          </motion.nav>
        ))}
      </AnimatePresence>
    </header>
  );
}
