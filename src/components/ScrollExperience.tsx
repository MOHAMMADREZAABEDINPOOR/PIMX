import { useSiteText } from '../lib/useSiteText';
import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';
import type { PageType } from '../types';
import '../styles/scroll-experience.css';

const clamp = (n: number) => Math.max(0,Math.min(1,n));

/** One passive scroll listener choreographs live headings and a page-specific marginal object. */
export default function ScrollExperience({ page, mainRef }: { page: PageType; mainRef: RefObject<HTMLElement> }) {
  const l = useSiteText();
  const reduced = useReducedMotion();
  const instrument = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const main = mainRef.current, app = document.getElementById('mra-portfolio-app');
    if(!main || !app || reduced) return;
    let frame = 0, lastY = window.scrollY, velocity = 0, lastScroll = 0;
    let scenes: { element: HTMLElement; heading: HTMLElement; top: number; height: number }[] = [];
    let studies: { element: HTMLElement; top: number; height: number; card: HTMLElement | null; side: number }[] = [];
    let heroTargets: HTMLElement[] = [], progressTargets: HTMLElement[] = [];
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      for(const { element,heading } of scenes){element.classList.remove('scroll-scene');heading.classList.remove('scroll-heading');}
      const seen = new Set<HTMLElement>();
      scenes = [...main.querySelectorAll<HTMLElement>('.route-content section, .route-manifesto')].flatMap(element => {
        const heading = element.querySelector<HTMLElement>('h2') || (element.matches('.resume-main-section,.resume-side-section') ? element.querySelector<HTMLElement>('h3') : null);
        if(!heading || seen.has(heading) || heading.closest('section') !== element) return [];
        seen.add(heading);element.classList.add('scroll-scene');heading.classList.add('scroll-heading');
        const bounds = element.getBoundingClientRect();
        return [{element,heading,top:bounds.top+window.scrollY,height:bounds.height}];
      });
      studies = [...main.querySelectorAll<HTMLElement>('.product-study')].map((element,index) => {
        const bounds = element.getBoundingClientRect(), card = element.closest<HTMLElement>('.selected-project');
        if(card) card.dataset.scrollReady='true';
        return {element,top:bounds.top+window.scrollY,height:bounds.height,card,side:index%2 ? 1 : -1};
      });
      heroTargets = [...main.querySelectorAll<HTMLElement>('h1,.cert-hero-object')];
      progressTargets = [...main.querySelectorAll<HTMLElement>('.identity-machine,.signal-universe')];
      schedule();
    };
    const update = (now: number) => {
      frame = 0;
      const position = window.scrollY, vh = window.innerHeight;
      velocity = velocity * .78 + (position-lastY) * .22;
      lastY = position;
      if(now-lastScroll > 350) velocity = 0;
      const progress = clamp(position/Math.max(1,document.documentElement.scrollHeight-vh));
      for(const target of heroTargets) {const value=String(clamp(position/Math.min(vh,650)));if(target.style.getPropertyValue('--hero-progress')!==value) target.style.setProperty('--hero-progress',value);}
      for(const target of progressTargets) target.style.setProperty('--scroll-progress',String(progress));
      instrument.current?.style.setProperty('--scroll-drift',`${Math.max(-10,Math.min(10,velocity))}px`);
      instrument.current?.style.setProperty('--signature-turn',`${progress*300+velocity*.7}deg`);
      instrument.current?.style.setProperty('--signature-spread',String(1+Math.min(Math.abs(velocity),30)*.008));
      const percent = instrument.current?.querySelector<HTMLElement>('.scroll-percent');
      if(percent) percent.textContent = `${Math.round(progress*100).toString().padStart(2,'0')}%`;
      for(const scene of scenes) {
        const top = scene.top-position;
        const visible=top<vh && top+scene.height>0;
        if(scene.element.dataset.scrollVisible!==String(visible))scene.element.dataset.scrollVisible=String(visible);
        if(top>vh+100 || top+scene.height < -100) continue;
        const phase = clamp((vh-top)/(vh+Math.min(scene.height,vh*.8)));
        scene.element.style.setProperty('--scene-phase',String(phase));
        scene.element.style.setProperty('--scene-travel',`${(phase-.5)*22}px`);
        scene.element.style.setProperty('--scene-focus',String(Math.sin(phase*Math.PI)));
      }
      for(const study of studies) {
        const top=study.top-position;
        if(top>vh+80 || top+study.height < -80)continue;
        const phase=clamp((vh-top)/(vh+study.height));
        study.element.style.setProperty('--study-progress',phase.toFixed(3));
        if(study.card){const entry=clamp((vh-top)/(vh*.65));study.card.style.setProperty('--card-lift',`${((1-entry)*48+(phase-.5)*study.side*16).toFixed(2)}px`);study.card.style.setProperty('--card-turn',`${((1-entry)*study.side*2.3).toFixed(2)}deg`);}
      }
      if(Math.abs(velocity)>.1) schedule();
    };
    function schedule(){if(!frame)frame=requestAnimationFrame(update);}
    const scroll = () => {lastScroll=performance.now();schedule();};
    // A changing panel height should not trigger a complete page measurement every frame.
    const scheduleRefresh = () => {
      if(refreshTimer!==undefined)return;
      refreshTimer=setTimeout(()=>{refreshTimer=undefined;refresh();},80);
    };
    const mutation = new MutationObserver(scheduleRefresh);
    mutation.observe(main,{childList:true,subtree:true});
    const resize = new ResizeObserver(scheduleRefresh);resize.observe(main);
    window.addEventListener('scroll',scroll,{passive:true});
    window.addEventListener('resize',refresh,{passive:true});
    refresh();
    return () => {
      cancelAnimationFrame(frame);mutation.disconnect();resize.disconnect();
      clearTimeout(refreshTimer);
      window.removeEventListener('scroll',scroll);window.removeEventListener('resize',refresh);
      for(const {element,heading} of scenes){element.classList.remove('scroll-scene');heading.classList.remove('scroll-heading');element.style.removeProperty('--scene-phase');element.style.removeProperty('--scene-travel');element.style.removeProperty('--scene-focus');}
      app.style.removeProperty('--hero-progress');app.style.removeProperty('--scroll-drift');
      for(const target of heroTargets)target.style.removeProperty('--hero-progress');
      for(const target of progressTargets)target.style.removeProperty('--scroll-progress');
    };
  },[page,reduced,mainRef]);
  if(reduced) return null;
  return <div ref={instrument} className={`scroll-signature signature-${page}`} data-scroll-page={page} aria-hidden="true">
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.1"><g className="scroll-signature-object">
      {l(page==='home' && <g><circle cx="50" cy="50" r="37" strokeDasharray="2 9"/>{l([0,1,2].map(i=><path key={i} d="M50 24v52" transform={`rotate(${i*60} 50 50)`}/>))}<circle cx="50" cy="50" r="4" fill="currentColor"/></g>)}
      {l(page==='projects' && <g><circle cx="50" cy="50" r="29"/><ellipse cx="50" cy="50" rx="46" ry="15" transform="rotate(-32 50 50)"/><ellipse cx="50" cy="50" rx="12" ry="29"/><circle cx="85" cy="28" r="4" fill="currentColor"/></g>)}
      {l(page==='about' && <g>{l([0,1,2,3].map(i=><path key={i} d={`M${16+i*8} 61C${2+i*10} ${4+i*8} ${91-i*10} ${-12+i*14} ${84-i*8} 70`}/>))}<path d="M40 49c-8-16 22-19 20 4l-6 33M32 70l7 15"/></g>)}
      {l(page==='playground' && <g><rect x="23" y="19" width="51" height="64" rx="2" transform="rotate(-13 50 50)"/><rect x="26" y="17" width="51" height="64" rx="2" transform="rotate(9 50 50)"/><path d="M34 30h30M34 40h23M34 50h30"/><circle cx="65" cy="71" r="13"/><path d="m59 71 4 4 8-8"/></g>)}
      {l(page==='resume' && <g><path d="M30 13v74M70 13v74M25 20h10M25 40h10M25 60h10M25 80h10M40 20h20M40 40h20M40 60h20M40 80h20"/><circle cx="30" cy="50" r="4" fill="currentColor"/><path d="M43 49h26"/></g>)}
      {l(page==='contact' && <g><circle cx="50" cy="50" r="7" fill="currentColor" fillOpacity=".2"/>{l([14,25,37].map(radius=><g key={radius}><path d={`M${50-radius*.7} ${50-radius*.7}a${radius} ${radius} 0 0 0 0 ${radius*1.4}M${50+radius*.7} ${50-radius*.7}a${radius} ${radius} 0 0 1 0 ${radius*1.4}`}/></g>))}<path d="M50 35v30"/></g>)}
    </g></svg><span className="scroll-percent">00%</span>
  </div>;
}
