import React from 'react';
import { Github, Send, Mail } from 'lucide-react';
import { PageType } from '../types';
import { useLanguageTheme } from '../context/LanguageThemeContext';

interface FooterProps {
  onNavigate: (pageId: PageType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { theme, dir, t } = useLanguageTheme();

  const handleLink = (page: PageType) => {
    const target = page === 'home' ? '/' : `/${page === 'projects' ? 'project' : page}`;
    window.location.pathname = target;
  };

  return (
    <footer className={`mt-auto border-t transition-colors duration-300 py-10 ${
      theme === 'light' ? 'border-slate-200 bg-white/95' : 'border-dark-border/40 bg-[#030712] border-t-dark-border/40'
    }`} id="global-footer" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Logo & Copyright (5 columns) */}
          <div className={`md:col-span-5 space-y-2 ${dir === 'rtl' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
            <h3 className="text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 font-sans">
              {t.brandName}
            </h3>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
              {t.footerRole}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans opacity-80">
              © {currentYear} {t.footerCopyright}
            </p>
          </div>

          {/* Quick Nav Links (4 columns) */}
          <div className="md:col-span-4 flex flex-wrap justify-center gap-x-4 gap-y-2.5 text-xs font-semibold text-gray-400">
            <button onClick={() => handleLink('home')} className="hover:text-cyber-teal transition-colors cursor-pointer select-none">{t.navHome}</button>
            <span className="text-gray-800 select-none">•</span>
            <button onClick={() => handleLink('playground')} className="hover:text-cyber-teal transition-colors cursor-pointer select-none">{t.navPlayground}</button>
            <span className="text-gray-800 select-none">•</span>
            <button onClick={() => handleLink('projects')} className="hover:text-cyber-teal transition-colors cursor-pointer select-none">{t.navProjects}</button>
            <span className="text-gray-800 select-none">•</span>
            <button onClick={() => handleLink('about')} className="hover:text-cyber-teal transition-colors cursor-pointer select-none">{t.navAbout}</button>
            <span className="text-gray-800 select-none">•</span>
            <button onClick={() => handleLink('contact')} className="hover:text-cyber-teal transition-colors cursor-pointer select-none">{t.navContact}</button>
          </div>

          {/* Contacts & Social Links (3 columns) */}
          <div className={`md:col-span-3 flex justify-center gap-3.5 ${dir === 'rtl' ? 'md:justify-end' : 'md:justify-start'}`}>
            <a 
              href="https://github.com/MOHAMMADREZAABEDINPOOR" 
              target="_blank" 
              rel="noreferrer" 
              className={`rounded-xl border p-2.5 text-gray-400 hover:text-cyber-teal hover:border-cyber-teal/50 hover:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all ${
                theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-dark-border/40'
              }`}
              title="Github"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://t.me/@Pleasechangetheworld" 
              target="_blank" 
              rel="noreferrer" 
              className={`rounded-xl border p-2.5 text-gray-400 hover:text-cyber-teal hover:border-cyber-teal/50 hover:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all ${
                theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-dark-border/40'
              }`}
              title="Telegram"
            >
              <Send className="h-4.5 w-4.5 -rotate-45" />
            </a>
            <a 
              href="mailto:mohammadrezaabedinpoor6@gmail.com" 
              className={`rounded-xl border p-2.5 text-gray-400 hover:text-cyber-teal hover:border-cyber-teal/50 hover:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all ${
                theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-dark-border/40'
              }`}
              title="Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
