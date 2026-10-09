import { useSiteText } from '../lib/useSiteText';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Code2, Cpu, Layers, Wrench } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { getSkillTranslation } from '../lib/about_translations';
import AutoHeight from './AutoHeight';
import DedicatedProjectArt from './DedicatedProjectArt';
import { SkillIllustration, illustratedSkills } from './AboutIllustrations';

const skills = [
  { key: 'python', group: 1, tags: ['Python', 'AsyncIO', 'Tkinter'], art: 'github-clock', repo: 'clock' },
  { key: 'django', group: 1, tags: ['Django', 'ORM', 'REST'], art: 'github-web-application-technologies-and-django-coursera', repo: 'web-application-technologies-and-django-coursera' },
  { key: 'web', group: 1, tags: ['HTML', 'CSS', 'JavaScript'], art: 'github-coursera', repo: 'shop3' },
  { key: 'sql', group: 1, tags: ['SQL', 'MySQL', 'SQLAlchemy'], art: 'github-sqlalchemy', repo: 'sqlalchemy' },
  { key: 'deployment', group: 1, tags: ['Git', 'Hosting', 'Cloudflare'], art: 'github-pimx-pass-panel', repo: 'PIMX_PASS_PANEL' },
  { key: 'flutter', group: 1, tags: ['Flutter', 'Dart', 'Cross-platform'], art: 'github-open-random-window' },
  { key: 'ai', group: 2, tags: ['LLMs', 'Agno', 'Gemini'], art: 'github-bot', repo: 'PIMX_AGENT' },
  { key: 'telegram', group: 2, tags: ['Python', 'Telegram', 'Bots'], art: 'pimx-pass-bot', repo: 'PIMX_PASS_BOT' },
  { key: 'prompt', group: 2, tags: ['Context', 'Instructions', 'Iteration'], art: 'github-email-generator', repo: 'PIMX_AGENT' },
  { key: 'scraping', group: 2, tags: ['Scrapling', 'Parsing', 'Automation'], art: 'github-pimx-save-bot', repo: 'telegram-web-scraping-bot' },
  { key: 'ui', group: 3, tags: ['Typography', 'Interaction', 'Responsive'], art: 'github-3d-animated-interactive-portfolio', repo: '3d-animated-interactive-portfolio' },
  { key: 'git', group: 3, tags: ['Git', 'Branches', 'GitHub'], art: 'github-mcino-introduction-to-git-and-github', repo: 'mcino-introduction-to-git-and-github' },
  { key: 'arduino', group: 3, tags: ['Arduino', 'Sensors', 'Hardware'], art: 'github-clock' },
  { key: 'photoshop', group: 3, tags: ['Photoshop', 'Composition', 'Editing'], art: 'github-turtle-library' },
  { key: 'video', group: 3, tags: ['Editing', 'Timing', 'Storytelling'], art: 'pimx-sonic-bot' },
  { key: 'office', group: 3, tags: ['Documents', 'Spreadsheets', 'Presentations'], art: 'personal-resume-gate' },
];
const icons = [Layers, Code2, Cpu, Wrench];

export default function SkillWorkbench({ labels, title, softSkills }: { labels: string[]; title: string; softSkills: string[] }) {
  const l = useSiteText();
  const { lang } = useLanguageTheme();
  const fa = lang === 'fa', reduced = useReducedMotion();
  const [group, setGroup] = useState(0), [selected, setSelected] = useState('python');
  const visible = skills.filter(skill => !group || skill.group === group);
  const skill = skills.find(item => item.key === selected) || skills[0];
  const detail = getSkillTranslation(skill.key, lang);
  return <section className="page-container skill-workbench" aria-labelledby="skill-workbench-title">
    <div className="skill-workbench-heading"><div><span className="small-label">02 / {l(title)}</span><h2 id="skill-workbench-title">{l(fa ? <>مهارت،<br/><em>در عمل.</em></> : <>{l("The craft.")}<br/><em>{l("Behind the code.")}</em></>)}</h2></div><p>{l(fa ? 'ابزارها وقتی ارزش دارند که چیزی با آن‌ها بسازیم. یک مهارت را انتخاب کنید؛ ببینید کجا به کار می‌آید و ردش را در پروژه‌ها دنبال کنید.' : 'Tools matter when you put them to work. Pick a skill, explore its purpose, and follow the code into a real project.')}</p></div>
    <div className="page-filters skill-filters">{l(labels.map((label, index) => {const Icon = icons[index];return <button key={label} type="button" aria-pressed={group === index} className={group === index ? 'active' : ''} onClick={() => {setGroup(index);if(index && skill.group !== index)setSelected(skills.find(item=>item.group===index)!.key);}}><Icon size={15}/>{l(label)}</button>;}))}</div>
    <div className="skill-workbench-layout"><div className="skill-picker" aria-label={l(title)}>{l(visible.map(item => {const translation = getSkillTranslation(item.key,lang);return <button key={item.key} type="button" className={item.key === selected ? 'selected' : ''} aria-pressed={item.key === selected} aria-controls="skill-inspector" onClick={()=>setSelected(item.key)}><span className="skill-picker-index">{l(String(skills.indexOf(item)+1).padStart(2,'0'))}</span><span>{l(translation.name)}<small>{l(translation.levelText)}</small></span><ArrowUpRight size={17}/></button>;}))}</div>
      <AutoHeight className="skill-inspector" id="skill-inspector" live><AnimatePresence mode="popLayout" initial={false}><motion.article key={skill.key} initial={reduced ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced ? 0:.24}}>
        <div className="skill-art" aria-hidden="true"><span>{l("IN PRACTICE /")}{l(String(skills.indexOf(skill)+1).padStart(2,'0'))}</span><svg viewBox="0 0 960 640" fill="none" stroke="currentColor" strokeWidth="1.6">{l(illustratedSkills.has(skill.key) ? <SkillIllustration skill={skill.key}/> : <DedicatedProjectArt id={skill.art}/>)}</svg><div className="skill-art-tags" dir="ltr">{l(skill.tags.map(tag=><span key={tag}>{l(tag)}</span>))}</div></div>
        <div className="skill-inspector-body"><div className="skill-inspector-label"><span className="small-label">{l(labels[skill.group])}</span><span>{l(detail.levelText)}</span></div><h3>{l(detail.name)}</h3><p>{l(detail.desc)}</p>{l(skill.repo && <a className="skill-source" href={`https://github.com/MOHAMMADREZAABEDINPOOR/${skill.repo}`} target="_blank" rel="noopener noreferrer"><span>{l(fa ? 'نمونهٔ کاربرد در پروژه' : 'Follow the work')}<small dir="ltr">{l(skill.repo)}</small></span><ArrowRight size={22}/></a>)}</div>
      </motion.article></AnimatePresence></AutoHeight>
    </div><div className="skill-human"><span className="small-label">{l(fa ? 'آن‌طرف ابزارها' : 'BEYOND THE TOOLS')}</span><div>{l(softSkills.map(item=><span key={item}>{l(item)}</span>))}</div></div>
  </section>;
}
