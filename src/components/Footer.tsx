import { useSiteText } from '../lib/useSiteText';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PageType } from '../types';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { cvTranslations } from '../lib/cv_data';
import { humanFooterCopy } from '../lib/human_copy';
import '../styles/shell.css';
import { FragmentType } from './InteractiveHeadline';

interface FooterProps {
  onNavigate: (pageId: PageType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const l = useSiteText();
  const { lang, dir, t } = useLanguageTheme();
  const reducedMotion = useReducedMotion();
  const profile = cvTranslations[lang];
  const copy = humanFooterCopy[lang];
  const contacts = profile.contactValues;
  const navItems: { page: PageType; label: string }[] = [
    { page: 'projects', label: lang === 'en' ? 'Work' : t.navProjects },
    { page: 'about', label: t.navAbout },
    { page: 'resume', label: t.navResume },
    { page: 'contact', label: t.navContact },
  ];
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
    onNavigate(page);
  };
  return (
    <footer className="shell-footer" id="global-footer" dir={dir}>
      <div className="shell-footer-inner">
        <motion.div
          className="shell-footer-contact"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shell-footer-eyebrow">
            <span className="shell-status-dot" /> {l(copy.intro)}
          </div>
          <a
            href={`mailto:${contacts.email}`}
            className="shell-footer-big-link"
          >
            <span>
              <FragmentType text={l(copy.first)}/>
              <span className="shell-footer-accent"><FragmentType text={l(copy.second)}/></span>
            </span>
            <span className="shell-footer-arrow">
              <ArrowUpRight strokeWidth={1.1} aria-hidden="true" />
            </span>
          </a>
          <a
            href={`mailto:${contacts.email}`}
            className="shell-footer-email"
            dir="ltr"
          >
            {l(contacts.email)}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
        <div className="shell-footer-meta">
          <div className="shell-footer-identity">
            <a
              className="shell-wordmark shell-footer-wordmark"
              href="/"
              onClick={(event) => navigate(event, 'home')}
              aria-label={l(t.navHome)}
              dir="ltr"
            >
              PIMX
              <span className="shell-wordmark-star" aria-hidden="true">
                ✳
              </span>
              <span className="shell-wordmark-period">.</span>
            </a>
            <p>{l(profile.name)}</p>
            <span>{l(copy.note)}</span>
          </div>
          <nav className="shell-footer-nav" aria-label={l("Footer navigation")}>
            {l(navItems.map((item) => (
              <a
                key={item.page}
                href={`/${item.page === 'projects' ? 'project' : item.page}`}
                onClick={(event) => navigate(event, item.page)}
              >
                {l(item.label)}
              </a>
            )))}
          </nav>
          <div className="shell-footer-socials" dir="ltr">
            <a href={contacts.github} target="_blank" rel="noopener noreferrer">
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href={`https://t.me/${contacts.telegram.replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="shell-footer-bottom">
          <span>
            © {l(new Date().getFullYear())} {l(profile.name)}
          </span>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? 'auto' : 'smooth',
              });
            }}
          >
            {l(lang === 'fa'
              ? 'بازگشت به بالا'
              : lang === 'ar'
                ? 'العودة للأعلى'
                : 'Back to top')}{l(' ')}
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
