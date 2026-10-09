import { useSiteText } from '../lib/useSiteText';
import { useLayoutEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { PageType } from '../types';
import '../styles/transition-portal.css';
import { pageIdentities } from '../lib/page_identity';

export default function TransitionPortal({ page, initialEntry = false, ready = true }: { page: PageType; initialEntry?: boolean; ready?: boolean }) {
  const l = useSiteText();
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  useLayoutEffect(() => {
    document.getElementById('startup-portal')?.remove();
  }, []);
  if (finished) return null;
  const art = pageIdentities[page] || pageIdentities.home;
  const horizontal = page === 'playground' || page === 'resume';
  const count = horizontal ? 7 : 10;
  const covered = initialEntry || reduced;
  const waiting = initialEntry && !ready;
  return <motion.div className={`transition-portal portal-${page}`} style={{ '--portal-color': art.color, '--portal-letters': l(art.word).length * (/[\u2e80-\u9fff]/.test(l(art.word)) ? 2 : 1) } as CSSProperties} aria-hidden="true" initial={{ opacity: 1 }} animate={{ opacity: waiting ? 1 : [1, 1, 1, 0] }} transition={{ duration: reduced ? .2 : 1.15, times: [0, .35, .9, 1] }} onAnimationComplete={definition => { if (typeof definition === 'object' && 'opacity' in definition && Array.isArray(definition.opacity) && definition.opacity.at(-1) === 0) setFinished(true); }}>
    <div className={`portal-panels ${horizontal ? 'portal-horizontal' : ''}`}>{Array.from({ length: count }, (_, i) => <motion.div className="portal-panel" key={i} initial={horizontal ? { x: covered ? '0%' : i % 2 ? '110%' : '-110%', rotateY: covered ? 0 : 40 } : { y: covered ? '0%' : i % 2 ? '110%' : '-110%', rotateX: covered ? 0 : 35 }} animate={reduced || waiting ? {} : horizontal ? { x: [covered ? '0%' : i % 2 ? '110%' : '-110%', '0%', '0%', i % 2 ? '-110%' : '110%'], rotateY: [covered ? 0 : 40, 0, 0, -35] } : { y: [covered ? '0%' : i % 2 ? '110%' : '-110%', '0%', '0%', i % 2 ? '-110%' : '110%'], rotateX: [covered ? 0 : 35, 0, 0, -35] }} transition={{ duration: .92, delay: i * .013, times: [0, .31, .7, 1], ease: [.76, 0, .24, 1] }} />)}</div>
    <motion.div className="portal-message" initial={{ opacity: covered ? 1 : 0, scale: covered ? 1 : .7, rotateX: covered ? 0 : 30 }} animate={reduced || waiting ? {} : { opacity: [covered ? 1 : 0, 1, 1, 0], scale: [covered ? 1 : .7, 1, 1, 1.06], rotateX: [covered ? 0 : 30, 0, 0, -20] }} transition={{ duration: 1.02, times: [0, .35, .67, 1], ease: [.22, 1, .36, 1] }}>
      <span className="portal-coordinate">{l("PIMX /")}{l(art.index)}</span><div className="portal-orbits"><i /><i /><i /></div><strong>{l(art.word)}</strong><span className="portal-symbol">✳</span><span className="portal-caption">{l("A DIFFERENT WORLD.")}</span>
    </motion.div>
  </motion.div>;
}
