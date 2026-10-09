import { useSiteText } from './lib/useSiteText';
import React, { lazy, Suspense } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Loader from './components/Loader';
import TransitionPortal from './components/TransitionPortal';
import { pageIdentities } from './lib/page_identity';
import ScrollExperience from './components/ScrollExperience';
import './styles/page-identity.css';
import './styles/human.css';
import {
  LanguageThemeProvider,
  useLanguageTheme,
} from './context/LanguageThemeContext';
import { trackActivity } from './lib/analytics';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Playground = lazy(() => import('./pages/Playground'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const validPages: PageType[] = [
  'home',
  'about',
  'projects',
  'playground',
  'contact',
  'resume',
];
function resolvePage(): PageType {
  const segment = window.location.pathname.replace(/^\/+/, '').split('/')[0];
  const page = segment === 'project' ? 'projects' : segment;
  return validPages.includes(page as PageType) ? (page as PageType) : 'home';
}

function ReadyRoute({ children, onReady }: { children: React.ReactNode; onReady: () => void }) {
  const l = useSiteText();
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
    onReady();
  }, [onReady]);
  return <>{l(children)}</>;
}

function CursorOrbit() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 170, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 170, damping: 24 });
  const reduced = useReducedMotion();
  React.useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reduced, x, y]);
  return reduced ? null : (
    <motion.div
      className="cursor-orbit"
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    />
  );
}

function MainApp() {
  const l = useSiteText();
  const [currentPage, setCurrentPage] = React.useState<PageType>(resolvePage);
  const currentPageRef = React.useRef(currentPage);
  const [transitionCount, setTransitionCount] = React.useState(1);
  const [routeReady, setRouteReady] = React.useState(false);
  const markRouteReady = React.useCallback(() => setRouteReady(true), []);
  const { dir, lang, theme } = useLanguageTheme();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mainRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    trackActivity('visit');
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const handlePopState = () => {
      const next = resolvePage();
      if (currentPageRef.current === next) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      currentPageRef.current = next;
      setTransitionCount((count) => count + 1);
      setCurrentPage(next);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.scrollRestoration = restoration;
    };
  }, []);
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.page = currentPage;
    for(const [page, identity] of Object.entries(pageIdentities)) {
      root.style.setProperty(`--identity-${page}`, theme === 'light' ? identity.light : identity.color);
    }
  }, [currentPage, theme]);
  const resetViewport = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  };
  const handleNavigate = (page: PageType) => {
    window.history.pushState(
      {},
      '',
      page === 'home' ? '/' : `/${page === 'projects' ? 'project' : page}`
    );
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const handleInternalLink = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href]'
    );
    if (
      !anchor ||
      anchor.target ||
      anchor.hasAttribute('download') ||
      anchor.getAttribute('href')?.startsWith('#')
    )
      return;
    const target = new URL(anchor.href);
    if (
      target.origin !== window.location.origin ||
      target.hash ||
      ![
        '/',
        '/about',
        '/project',
        '/projects',
        '/playground',
        '/resume',
        '/contact',
      ].includes(target.pathname)
    )
      return;
    event.preventDefault();
    window.history.pushState({}, '', target.pathname);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  return (
    <div
      dir={dir}
      className={`portfolio-app page-${currentPage}`}
      data-page={currentPage}
      id="mra-portfolio-app"
      onClick={handleInternalLink}
    >
      <a className="skip-link" href="#main-content">
        {l(lang === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to content')}
      </a>
      <motion.div
        className="page-scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <Navbar currentPage={currentPage} />
      <main
        ref={mainRef}
        id="main-content"
        className="portfolio-main"
        tabIndex={-1}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={resetViewport}
        >
          <motion.div
            key={currentPage}
            className="route-content"
            initial={{
              opacity: 0,
              y: reduced ? 0 : 20,
              filter: 'none',
            }}
            animate={{ opacity: 1, y: 0, filter: 'none' }}
            exit={{
              opacity: 0,
              y: reduced ? 0 : -15,
              filter: 'none',
            }}
            transition={{
              duration: reduced ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Suspense
              fallback={
                <div
                  className="container-wide section-space micro-label"
                  role="status"
                >
                  {l(lang === 'fa' ? 'در حال بارگذاری…' : 'Loading…')}
                </div>
              }
            >
              <ReadyRoute onReady={markRouteReady}>
              {l(currentPage === 'home' && <Home />)}
              {l(currentPage === 'about' && <About />)}
              {l(currentPage === 'projects' && <Projects />)}
              {l(currentPage === 'playground' && <Playground />)}
              {l(currentPage === 'resume' && <Resume />)}
              {l(currentPage === 'contact' && <Contact />)}
              </ReadyRoute>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
      {l((!reduced || transitionCount === 1) && (
        <div key={transitionCount}><TransitionPortal page={currentPage} initialEntry={transitionCount === 1} ready={routeReady} /></div>
      ))}
      <ScrollExperience page={currentPage} mainRef={mainRef} />
      <CursorOrbit />
      <Loader />
    </div>
  );
}
export default function App() {
  const l = <T,>(value:T):T => value;
  const admin =
    window.location.pathname === '/pimxadmin' ||
    window.location.pathname.startsWith('/pimxadmin/');
  return (
    <LanguageThemeProvider>
      <MotionConfig reducedMotion="user">
        {l(admin ? (
          <Suspense
            fallback={
              <div className="section-space container-wide">Loading…</div>
            }
          >
            <Admin />
          </Suspense>
        ) : (
          <MainApp />
        ))}
      </MotionConfig>
    </LanguageThemeProvider>
  );
}
