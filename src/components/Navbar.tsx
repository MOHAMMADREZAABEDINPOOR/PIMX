import React from 'react';
import { Terminal, AppWindow, Cpu, User, Mail, Sparkles, Menu, X, Sun, Moon, Globe, ChevronDown, FileText } from 'lucide-react';
import { PageType } from '../types';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { languagesInfo, LanguageType } from '../lib/translations';

interface NavbarProps {
  currentPage: PageType;
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const { lang, setLang, theme, setTheme, dir, t } = useLanguageTheme();

  const navItems = [
    { id: 'home', label: t.navHome, icon: Terminal },
    { id: 'playground', label: t.navPlayground, icon: Sparkles },
    { id: 'projects', label: t.navProjects, icon: AppWindow },
    { id: 'about', label: t.navAbout, icon: User },
    { id: 'resume', label: t.navResume, icon: FileText },
    { id: 'contact', label: t.navContact, icon: Mail }
  ] as const;

  const navigateTo = (pageId: PageType) => {
    const target = pageId === 'home' ? '/' : `/${pageId === 'projects' ? 'project' : pageId}`;
    window.history.pushState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
      theme === 'light' ? 'border-slate-200 bg-white/85' : 'border-dark-border/80 bg-dark-bg/85'
    }`}>
      <div 
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" 
        dir={dir}
      >
        
        {/* Brand / Name Logo */}
        <div 
          onClick={() => navigateTo('home')} 
          className="flex cursor-pointer items-center gap-2 group"
          id="nav-logo"
        >
          <div className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
            theme === 'light' ? 'bg-teal-50 border-cyber-teal/30 group-hover:border-cyber-cyan' : 'bg-teal-950/40 border-cyber-teal/40 group-hover:border-cyber-cyan'
          }`}>
            <Cpu className="h-5 w-5 text-cyber-teal group-hover:text-cyber-cyan animate-pulse" />
            <div className="absolute inset-0 rounded-lg bg-cyber-teal/10 opacity-0 group-hover:opacity-100 transition-opacity blur" />
          </div>
          <div className={`flex flex-col items-start ${dir === 'rtl' ? 'pr-1 text-right' : 'pl-1 text-left'}`}>
            <span className="text-sm font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 font-sans">
              {t.brandName}
            </span>
            <span className={`text-[10px] font-mono tracking-wider ${theme === 'light' ? 'text-slate-500' : 'text-cyan-400'}`}>
              {t.brandRole}
            </span>
          </div>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => navigateTo(item.id)}
                  className={`group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyber-teal bg-teal-500/10 border border-cyber-teal/30 shadow-[0_0_15px_rgba(20,184,166,0.1)] font-bold'
                      : theme === 'light'
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-950/50 border border-transparent'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-cyber-teal' : 'text-gray-500 group-hover:text-cyber-teal'} transition-colors`} />
                  <span>{item.label}</span>
                  
                  {/* Active Indicator bar */}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-3 right-3 h-[2px] bg-gradient-to-r from-cyber-teal to-cyber-cyan rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right section controls (theme + language) */}
          <div className={`flex items-center gap-2 border-l pl-4 ${theme === 'light' ? 'border-slate-200' : 'border-dark-border'}`}>
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-950 text-gray-300'
              }`}
              title="Toggle Theme"
              id="theme-toggler-btn"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-yellow-400" />}
            </button>

            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-950 hover:bg-slate-900 text-gray-300'
                }`}
                id="language-select-trigger"
              >
                <Globe className="h-3.5 w-3.5 text-cyber-teal" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                  <div className={`absolute mt-1.5 w-44 rounded-xl border p-1 shadow-xl z-20 transition-all ${
                    dir === 'rtl' ? 'left-0' : 'right-0'
                  } ${
                    theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200' : 'bg-[#0b0f19] border-dark-border text-gray-200 shadow-black/50'
                  }`}>
                    <div className="max-h-64 overflow-y-auto space-y-0.5 animate-fadeIn">
                      {Object.entries(languagesInfo).map(([code, info]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLang(code as LanguageType);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                            lang === code
                              ? 'bg-teal-500/10 text-cyber-teal font-bold'
                              : theme === 'light'
                                ? 'hover:bg-slate-100 text-slate-600'
                                : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{info.nativeName}</span>
                          <span className="font-mono text-[9px] uppercase opacity-50">/{code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Control Buttons + Menu toggler */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Switcher for mobile */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-950 text-gray-300'
            }`}
          >
            {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-yellow-400" />}
          </button>

          {/* Quick language toggle */}
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono min-w-[42px] justify-center ${
              theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-950 text-gray-300'
            }`}
          >
            <Globe className="h-4 w-4 text-cyber-teal" />
            <span className="uppercase font-bold">{lang}</span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`inline-flex items-center justify-center rounded-md p-2 hover:text-gray-200 focus:outline-none cursor-pointer ${
              theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-gray-400 hover:bg-gray-900'
            }`}
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Lang Dropdown Modal Overlay */}
          {langMenuOpen && (
            <>
              <div className="fixed inset-0 z-35 bg-transparent" onClick={() => setLangMenuOpen(false)} />
              <div className={`absolute top-14 ${dir === 'rtl' ? 'left-6' : 'right-6'} w-40 rounded-xl border p-1 shadow-lg z-40 ${
                theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200' : 'bg-[#0b0f19] border-dark-border text-gray-200 shadow-black'
              }`}>
                {Object.entries(languagesInfo).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code as LanguageType);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      lang === code
                        ? 'bg-cyber-teal/10 text-cyber-teal font-bold'
                        : theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-900 text-gray-300'
                    }`}
                  >
                    <span>{info.nativeName}</span>
                    <span className="font-mono text-[9px] uppercase opacity-50">/{code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div 
          className={`md:hidden border-b py-2 px-4 shadow-lg animate-fadeIn transition-colors ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-dark-card border-dark-border'
          }`} 
          dir={dir}
        >
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-mob-${item.id}`}
                  onClick={() => {
                    setMobileOpen(false);
                    navigateTo(item.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-cyber-teal bg-teal-500/10 font-black border-r-4 border-cyber-teal'
                      : theme === 'light'
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-cyber-teal" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
