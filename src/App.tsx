import React from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Playground from './pages/Playground';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Loader from './components/Loader';
import { LanguageThemeProvider, useLanguageTheme } from './context/LanguageThemeContext';
import { trackActivity } from './lib/analytics';
import Admin from './pages/Admin';

function MainApp() {
  const [currentPage, setCurrentPage] = React.useState<PageType>('home');
  const { theme, dir } = useLanguageTheme();

  React.useEffect(() => {
    // Track page visit on mount
    trackActivity('visit');

    const validPages: PageType[] = ['home', 'about', 'projects', 'playground', 'contact', 'resume'];
    const resolvePath = (path: string) => {
      const rawPath = path.replace(/^\/+/, '');
      const firstSeg = rawPath.split('/')[0] || '';
      const normalized = firstSeg === 'project' ? 'projects' : firstSeg;
      return validPages.includes(normalized as PageType) ? (normalized as PageType) : 'home';
    };

    setCurrentPage(resolvePath(window.location.pathname));

    const handlePopState = () => {
      setCurrentPage(resolvePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageType) => {
    const target = page === 'home' ? '/' : `/${page === 'projects' ? 'project' : page}`;
    window.history.pushState({}, '', target);
    setCurrentPage(page);
    trackActivity('navigate');
  };

  return (
    <div
      dir={dir}
      className={`relative min-h-screen flex flex-col overflow-x-hidden font-sans selection:bg-cyber-teal/30 selection:text-white transition-colors duration-300 bg-plus-grid ${
        theme === 'light' ? 'bg-slate-50 text-slate-800' : 'bg-dark-bg text-gray-100'
      }`} 
      id="mra-portfolio-app"
    >
      {/* Glazing Ambient Orbs in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[-10%] right-[5%] h-[600px] w-[600px] rounded-full bg-teal-900/10 opacity-60 filter blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-cyan-900/10 opacity-40 filter blur-[120px]" />
      </div>
      
      {/* Dynamic Navbar */}
      <Navbar currentPage={currentPage} />

      {/* Primary Page Canvas */}
      <main className="flex-grow z-10 relative pt-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-[-8rem] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute bottom-[-5rem] left-[-6rem] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-20 dark:opacity-60" />
        </div>
        <div className="relative z-10">
          {currentPage === 'home' && <Home />}
          {currentPage === 'about' && <About />}
          {currentPage === 'projects' && <Projects />}
          {currentPage === 'playground' && <Playground />}
          {currentPage === 'resume' && <Resume />}
          {currentPage === 'contact' && <Contact />}
        </div>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cinematic Loader overlay */}
      <Loader />
    </div>
  );
}

export default function App() {
  const isPimxAdmin = typeof window !== 'undefined' && (
    window.location.pathname === '/pimxadmin' || 
    window.location.pathname.startsWith('/pimxadmin/') ||
    false
  );

  if (isPimxAdmin) {
    return (
      <LanguageThemeProvider>
        <Admin />
      </LanguageThemeProvider>
    );
  }

  return (
    <LanguageThemeProvider>
      <MainApp />
    </LanguageThemeProvider>
  );
}

