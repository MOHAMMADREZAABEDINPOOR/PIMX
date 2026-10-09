import { useSiteText } from '../lib/useSiteText';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Braces, CircuitBoard, Globe2, Orbit, Terminal } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { githubCatalogStats } from '../lib/github_projects';
import { portfolioCatalogStats } from '../lib/project_translations';
import { cvCertificates } from '../lib/cv_data';
import '../styles/developer-story.css';
import AutoHeight from './AutoHeight';
import { StoryIllustration } from './AboutIllustrations';

const chapters = [
  {
    icon: Terminal, code: 'PYTHON / FOUNDATIONS', projects: ['clock', 'sqlalchemy', 'thermometer'],
    title: ['It started with a small experiment.', 'از یک آزمایش کوچک شروع شد.'],
    paragraphs: [
      ['I began programming in 2021. My early repositories make that curiosity visible: number games, clocks, countdowns, Turtle drawings and small C++ file exercises. Each one gave an abstract idea a result I could see.', 'برنامه‌نویسی را از سال ۲۰۲۱ شروع کردم. مخزن‌های اولیه‌ام رد این کنجکاوی را دارند: بازی حدس عدد، ساعت، شمارش معکوس، طراحی با Turtle و تمرین‌های فایل در ++C. هر تمرین، یک مفهوم ذهنی را به نتیجه‌ای تبدیل می‌کرد که می‌توانستم ببینم.'],
      ['Python became a place to explore both logic and interfaces. Tkinter let me experiment with events and timing; SQLAlchemy and MySQL introduced a different question: how should a program remember what happened?', 'پایتون برایم فضایی شد برای شناخت منطق و رابط کاربری. با Tkinter زمان‌بندی و رویدادها را آزمایش کردم؛ SQLAlchemy و MySQL سؤال تازه‌ای پیش رویم گذاشتند: یک برنامه چگونه باید اتفاقات را به خاطر بسپارد؟'],
    ],
  },
  {
    icon: Braces, code: 'WEB / FULL STACK', projects: ['shop', 'shop2', 'shop3'],
    title: ['Then the interface became a system.', 'بعد، رابط کاربری به یک سیستم تبدیل شد.'],
    paragraphs: [
      ['A useful website needs more than a polished first screen. Working with Django, Express, Laravel and PHP led me into accounts, carts, orders, databases and admin interfaces. I enjoy connecting those pieces into a coherent experience.', 'یک سایت کاربردی، بیشتر از یک صفحهٔ اول زیبا نیاز دارد. کار با Django، Express، Laravel و PHP من را به حساب کاربری، سبد خرید، سفارش، پایگاه داده و پنل مدیریت رساند. از کنار هم قرار دادن این بخش‌ها و ساختن یک تجربهٔ منسجم لذت می‌برم.'],
      ['The three shop repositories explore the same product problem through different architectures. My older personal website and today’s PIMX portfolio also show how my approach to layout, interaction and delivery keeps evolving.', 'سه مخزن فروشگاهی‌ام، یک مسئلهٔ محصول را با معماری‌های مختلف بررسی می‌کنند. سایت شخصی قدیمی و پورتفولیوی PIMX امروز هم نشان می‌دهند که نگاه من به چیدمان، تعامل و اجرای یک سایت همچنان در حال تغییر است.'],
    ],
  },
  {
    icon: CircuitBoard, code: 'AI / AUTOMATION', projects: ['PIMX_AGENT', 'PIMX_SAVE_BOT', 'telegram-web-scraping-bot'],
    title: ['I like making software do the busywork.', 'دوست دارم نرم‌افزار کارهای تکراری را انجام دهد.'],
    paragraphs: [
      ['Telegram bots gave me a practical canvas for automation: media workflows, application discovery, data collection and conversations. They taught me to think about queues, asynchronous work, persistence and clear feedback when a request takes time.', 'ربات‌های تلگرام برایم بستری عملی برای اتوماسیون شدند: کار با رسانه، کشف اپلیکیشن، جمع‌آوری داده و گفتگو. این پروژه‌ها باعث شدند بیشتر به صف کارها، اجرای ناهمگام، ذخیرهٔ وضعیت و بازخورد روشن هنگام انتظار فکر کنم.'],
      ['PIMX_AGENT brings that interest into an AI workspace with conversations, attachments, libraries and research workflows. The property-discovery bot connects a conversation to web collection using Agno, Gemini and Scrapling. I care about what these tools let someone actually get done.', 'PIMX_AGENT این علاقه را به فضای کاری هوش مصنوعی با گفتگو، فایل پیوست، کتابخانه و جریان پژوهش می‌برد. ربات جست‌وجوی ملک هم با Agno، Gemini و Scrapling گفتگو را به جمع‌آوری اطلاعات وب وصل می‌کند. برایم مهم است که این ابزارها واقعاً چه کاری را برای کاربر ممکن می‌کنند.'],
    ],
  },
  {
    icon: Orbit, code: 'EXPERIMENTS / NEW MEDIUMS', projects: ['PIMX_SWAP', 'PIMXDASH', 'PIMXSATS'],
    title: ['A browser is only one starting point.', 'مرورگر فقط یکی از نقطه‌های شروع است.'],
    paragraphs: [
      ['Some ideas want a different medium. PIMX_SWAP uses Rust and Tauri to correct text typed with the wrong keyboard layout on Windows. PIMXDASH turns a Chrome new tab into a place for bookmarks, search and focus.', 'بعضی ایده‌ها قالب دیگری می‌خواهند. PIMX_SWAP با Rust و Tauri متن‌هایی را که در ویندوز با زبان اشتباه صفحه‌کلید تایپ شده‌اند اصلاح می‌کند. PIMXDASH هم تب جدید Chrome را به فضایی برای بوکمارک، جست‌وجو و تمرکز تبدیل می‌کند.'],
      ['With PIMXSATS, the interface becomes a Three.js globe: satellite.js supplies orbital calculations and pass predictions. Projects like this bring together my interest in engineering and visual experiences that invite exploration.', 'در PIMXSATS رابط کاربری به یک کرهٔ Three.js تبدیل می‌شود؛ satellite.js محاسبات مدار و پیش‌بینی گذر را فراهم می‌کند. چنین پروژه‌هایی علاقه‌ام به مهندسی را با تجربه‌های بصری که کاربر را به کشف دعوت می‌کنند پیوند می‌دهند.'],
    ],
  },
  {
    icon: Globe2, code: 'PIMX / CONNECTED PRODUCTS', projects: ['PIMX_MORPH', 'PIMX_NODE', 'PIMX_PORTAL'],
    title: ['Today, those experiments form an ecosystem.', 'امروز، این تجربه‌ها یک اکوسیستم ساخته‌اند.'],
    paragraphs: [
      ['PIMX is the thread connecting my projects. MORPH explores file conversion in the browser; NODE works on direct file transfer with WebRTC; VEIL and WIDE explore encryption workflows. MOJI, WEATHER and the PORTAL approach very different needs with the same curiosity.', 'PIMX رشته‌ای است که پروژه‌هایم را به هم وصل می‌کند. MORPH به تبدیل فایل در مرورگر می‌پردازد؛ NODE انتقال مستقیم فایل با WebRTC را دنبال می‌کند؛ VEIL و WIDE تجربه‌های رمزنگاری را بررسی می‌کنند. MOJI، WEATHER و PORTAL هم با همان کنجکاوی به نیازهای متفاوتی نزدیک می‌شوند.'],
      ['I build, deploy, revisit and document. This archive includes finished interfaces, active experiments and learning repositories, with source links so you can see the work itself. My next project is another opportunity to ask a better question and make something useful.', 'می‌سازم، دیپلوی می‌کنم، دوباره سراغ کار برمی‌گردم و مستند می‌کنم. این آرشیو شامل رابط‌های ساخته‌شده، تجربه‌های در حال توسعه و مخزن‌های آموزشی است؛ لینک کدها هم هست تا خود کار را ببینید. پروژهٔ بعدی برایم فرصتی دیگر است برای پرسیدن یک سؤال بهتر و ساختن چیزی کاربردی.'],
    ],
  },
];

export default function DeveloperStory() {
  const l = useSiteText();
  const { lang } = useLanguageTheme();
  const fa = lang === 'fa';
  const index = fa ? 1 : 0;
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const chapter = chapters[selected];
  const metrics = [
    [githubCatalogStats.repositories, fa ? 'مخزن عمومی' : 'public repositories'],
    [portfolioCatalogStats.liveWebsites, fa ? 'سایت با لینک بررسی‌شده' : 'verified websites'],
    [cvCertificates.length, fa ? 'گواهینامهٔ ثبت‌شده' : 'documented credentials'],
  ];
  return (
    <section className="page-container developer-story" aria-labelledby="developer-story-title">
      <div className="story-heading">
        <div><span className="small-label">{l("FIELD NOTES / 2021 → NOW")}</span><h2 id="developer-story-title">{l(fa ? <>مسیر من،<br /><em>در میان کدها.</em></> : <>{l("My story,")}<br /><em>{l("between the lines.")}</em></>)}</h2></div>
        <p>{l(fa ? 'به جای یک فهرست از عنوان‌ها، این‌ها بخش‌هایی از مسیر واقعی من هستند. هر فصل را باز کنید؛ پروژه‌هایش را هم می‌توانید ببینید.' : 'A collection of titles only tells part of the story. Explore the chapters of my work, and the repositories behind them.')}</p>
      </div>
      <div className="story-metrics">{l(metrics.map(([value, label], i) => <motion.div key={label} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><span className="story-metric-value" dir="ltr">{l(value)}<span>↗</span></span><span>{l(label)}</span></motion.div>))}</div>
      <div className="story-explorer">
        <nav className="story-chapters" aria-label={l(fa ? 'فصل‌های مسیر من' : 'Chapters of my work')}>{l(chapters.map((item, i) => {const ChapterIcon = item.icon; return <button key={item.code} type="button" aria-pressed={selected === i} aria-controls="story-chapter-panel" onClick={() => setSelected(i)} className={selected === i ? 'active' : ''}><span className="story-chapter-number">0{l(i+1)}</span><ChapterIcon size={19} /><span>{l(item.title[index])}</span><ArrowUpRight size={18} /></button>;}))}</nav>
        <AutoHeight className="story-reader" id="story-chapter-panel" live>
          <AnimatePresence mode="popLayout" initial={false}><motion.article key={selected} initial={reduced ? false : { opacity: 0, x: fa ? -22 : 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : fa ? 12 : -12 }} transition={{ duration: reduced ? 0 : 0.28 }}>
            <div className="story-scene" data-chapter={selected} aria-hidden="true" dir="ltr"><StoryIllustration chapter={selected}/><span className="story-scene-label">{l(chapter.code)}</span><span className="story-scene-coordinate">{l("PIMX / 0")}{l(selected+1)}</span></div>
            <div className="story-reader-body"><span className="small-label">0{l(selected+1)} / {l(chapter.code)}</span><h3>{l(chapter.title[index])}</h3>{l(chapter.paragraphs.map((paragraph, i) => <p key={i}>{l(paragraph[index])}</p>))}<div className="story-project-links" dir="ltr">{l(chapter.projects.map(name=><a key={name} href={`https://github.com/MOHAMMADREZAABEDINPOOR/${name}`} target="_blank" rel="noopener noreferrer">{l(name)}<ArrowUpRight size={15} /></a>))}</div></div>
          </motion.article></AnimatePresence>
        </AutoHeight>
      </div>
      <a className="story-archive-link" href="/project">{l(fa ? 'تمام پروژه‌ها و کدهایشان را ببینید' : 'Explore the projects and their source')}<ArrowUpRight size={20} /></a>
    </section>
  );
}
