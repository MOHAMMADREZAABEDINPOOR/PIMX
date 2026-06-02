import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Sparkles, Brain, Code, Bot, ArrowUpRight, Award, Zap, 
  GraduationCap, BookOpen, Activity, Clock, Cpu, Server, ShieldCheck, 
  CheckCircle2, ChevronRight, Layers, Heart, Globe, ExternalLink
} from 'lucide-react';
import { PageType } from '../types';
import { useLanguageTheme } from '../context/LanguageThemeContext';

// Profile detailed database for Mohammadreza Abedinpoor
import { homeTranslations as homeData } from '../lib/home_translations';

export default function Home() {
  const { theme, dir, lang, t } = useLanguageTheme();
  const customData = homeData[lang] || homeData['en'];

  // States for live interactive diagnostics widget
  const [isDiagnosticRunning, setIsDiagnosticRunning] = React.useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = React.useState(0);
  const [diagnosticLogs, setDiagnosticLogs] = React.useState<string[]>([]);

  // States for terminal mockup
  const [terminalIndex, setTerminalIndex] = React.useState(0);
  const [typedText, setTypedText] = React.useState('');

  const terminalCommands = [
    {
      cmd: "python3 --version",
      output: "Python 3.11.4 (Active Virtualenv: production-daemons)"
    },
    {
      cmd: "cat info_spec.json",
      output: `{
  "developer": "Mohammadreza Abedinpoor",
  "specialties": ["Backend systems", "Generative AI Architectures", "Autonomous Bot Automation"],
  "status": "Ready for high-fidelity collaborations",
  "academic": "Sharif University Select Group participant"
}`
    },
    {
      cmd: "ping -c 3 api.openai.com",
      output: `PING api.openai.com (104.18.7.192): 56 data bytes
64 bytes from 104.18.7.192: icmp_seq=0 ttl=58 time=12 ms
64 bytes from 104.18.7.192: icmp_seq=1 ttl=58 time=14 ms
64 bytes from 104.18.7.192: icmp_seq=2 ttl=58 time=11 ms

--- api.openai.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
rtt min/avg/max/mdev = 11.2/12.3/14.1/1.24 ms`
    },
    {
      cmd: "python3 mra_autonomous_daemons.py --status",
      output: `[INFO] Polling independent scripts and daemons...
[SUCCESS] 14 active daemon worker threads are online.
[SYSTEM] Database latency: 12ms | Prompt Precision Score: 99.4%`
    }
  ];

  React.useEffect(() => {
    setTypedText('');
    const command = terminalCommands[terminalIndex].cmd;
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < command.length) {
        setTypedText(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => {
      clearInterval(interval);
    };
  }, [terminalIndex]);

  const nextTerminalCommand = () => {
    setTerminalIndex(prev => (prev + 1) % terminalCommands.length);
  };

  const navigateTo = (pageId: PageType) => {
    const target = pageId === 'home' ? '/' : `/${pageId === 'projects' ? 'project' : pageId}`;
    window.location.pathname = target;
  };

  const triggerDiagnostics = () => {

    if (isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    setDiagnosticProgress(0);
    setDiagnosticLogs([]);

    const faLogs = [
      "[INFO] اتصال برقرار شد. دسترسی به داده‌های تله‌متری کد فعال گردید...",
      "[SUCCESS] هویت آکادمیک تایید شد: رتبه ۳ شریف با افتخار ثبت شده است.",
      "[INFO] اسکن برنامه‌های پایتون در فضای نام فعال...",
      "[SUCCESS] ۱۴ فرآیند خودکار شناسایی شد. لیتنسی پایگاه داده: ۱۲ میلی‌ثانیه.",
      "[INFO] سنجش دقت الگوهای پرامپت (System & CoT)...",
      "[SUCCESS] آزمایش پایان یافت. نمره کالیبراسیون ۰.۹۹۴. سامانه پایدار است."
    ];

    const arLogs = [
      "[INFO] تم الاتصال بنجاح. فحص متصل لنظام التليميتري الداخلي...",
      "[SUCCESS] تم التحقق من الهوية الأكاديمية: في المرتبة ٣ في جامعة شريف.",
      "[INFO] جاري التحقق من وظائف بايثون الخلفية وبوت الأتمتة المباشرة...",
      "[SUCCESS] تم العثور على ١٤ برمجية نشطة. زمن الاستجابة: ١٢ ملي ثانية.",
      "[INFO] اختبار دقة أطر الأوامر وهندسة الموجهات وتغطيتها...",
      "[SUCCESS] اكتمل الفحص الأمني. سلامة النظام ٠.٩٩٤. كل الأخضر."
    ];

    const deLogs = [
      "[INFO] Verbindung hergestellt. Zugriff auf Code-Telemetriedaten...",
      "[SUCCESS] Akademische Identität bestätigt: Universität Sharif Top-3-Schüler-Rang.",
      "[INFO] Scanne Python-Daemons im aktiven Namensbereich...",
      "[SUCCESS] 14 Automatisierungsprozesse aktiv. Datenbank-Latenz: 12ms.",
      "[INFO] Benchmarking Prompt-Engineering-Modelle...",
      "[SUCCESS] Test erfolgreich abgeschlossen. Integritätsscore 0.994. System stabil."
    ];

    const enLogs = [
      "[INFO] Socket established. Connected to live core telemetry channel...",
      "[SUCCESS] Academic identity verified: Sharif University Top 3 scholar placement.",
      "[INFO] Scanning active Python automation sweeps...",
      "[SUCCESS] 14 live daemon workers active. DB query latency: 12ms.",
      "[INFO] Assessing command precision vectors & prompting heuristic scores...",
      "[SUCCESS] Core diagnostic complete. Security Integrity Score 0.994. System optimal."
    ];

    const logsArray = lang === 'fa' ? faLogs : lang === 'ar' ? arLogs : lang === 'de' ? deLogs : enLogs;
    let currentStep = 0;

    const interval = setInterval(() => {
      setDiagnosticProgress(p => {
        const next = p + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDiagnosticRunning(false);
          }, 1500);
          return 100;
        }
        
        // Add step logs at key intervals
        const step = Math.floor((next / 100) * logsArray.length);
        if (step > currentStep && currentStep < logsArray.length) {
          setDiagnosticLogs(prev => [...prev, logsArray[currentStep]]);
          currentStep++;
        }
        
        return next;
      });
    }, 120);
  };

  return (
    <div className="relative min-h-screen py-10 overflow-hidden">
      {/* Background decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Profile / Intro Hero */}
        <div className="text-center max-w-4xl mx-auto pt-10 pb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-teal/30 bg-teal-950/20 px-3 py-1.5 text-xs font-mono font-medium text-cyber-teal mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>{t.homeBadge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans leading-tight tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-gray-100'
            }`}
          >
            {t.homeTitlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyber-teal to-cyan-400">
              {t.homeTitleHighlight}
            </span>
          </motion.h1>

          {/* Biography Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans font-medium mt-4 ${
              theme === 'light' ? 'text-slate-650' : 'text-gray-400'
            }`}
          >
            {t.homeBio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => navigateTo('playground')}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_25px_rgba(20,184,166,0.3)] cursor-pointer"
            >
              <Zap className="h-4.5 w-4.5 text-slate-950 fill-slate-950 shrink-0" />
              <span>{t.homeCtaPlayground}</span>
              <ArrowUpRight className={`h-4 w-4 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} group-hover:-translate-y-0.5`} />
            </button>
            
            <button
              onClick={() => navigateTo('projects')}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm'
                  : 'border-dark-border bg-slate-900/50 hover:bg-slate-900 text-gray-300 hover:text-white'
              }`}
            >
              <Code className="h-4.5 w-4.5 text-gray-500 shrink-0" />
              <span>{t.homeCtaProjects}</span>
            </button>
          </motion.div>
        </div>

        {/* Live Terminal Console Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`w-full max-w-3xl rounded-xl border shadow-2xl overflow-hidden pulsing-glow mb-16 ${
            theme === 'light' ? 'bg-white border-slate-300' : 'border-dark-border/80 bg-slate-950/90'
          }`}
          id="home-terminal"
        >
          {/* Terminal Title Bar */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${
            theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-b-dark-border/60'
          }`}>
            <div className="flex gap-1.5 shrink-0">
              <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40 inline-block" />
            </div>
            <div className={`flex items-center gap-2 text-xs font-mono font-medium ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
              <Terminal className="h-3.5 w-3.5 text-cyber-teal shrink-0" />
              <span>mra@cyber-core: ~/portfolio-terminal</span>
            </div>
          </div>
          
          {/* Terminal Content Panel */}
          <div className="p-5 font-mono text-xs sm:text-sm text-left leading-relaxed min-h-[170px]" style={{ direction: 'ltr' }}>
            <div className="flex items-center gap-1.5 text-emerald-500">
              <span className="shrink-0">$</span>
              <span>{typedText}</span>
              <span className="w-1.5 h-4 bg-cyber-teal inline-block animate-pulse ml-0.5 shrink-0" />
            </div>
            
            {/* Terminal Output */}
            {typedText.length === terminalCommands[terminalIndex].cmd.length && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.2 }}
                className={`mt-3 whitespace-pre-line border-t pt-2 font-semibold ${
                  theme === 'light' ? 'text-cyan-800 border-slate-200' : 'text-cyan-300/90 border-dark-border/40'
                }`}
              >
                {terminalCommands[terminalIndex].output}
              </motion.div>
            )}
          </div>

          {/* Terminal Next Trigger */}
          <div className={`border-t px-4 py-2.5 flex justify-between items-center text-xs ${
            theme === 'light' ? 'bg-slate-50/50 border-slate-200 text-slate-500' : 'bg-slate-950/40 border-dark-border/40 text-gray-500'
          }`}>
            <span>{t.homeFetching}</span>
            <button 
              onClick={nextTerminalCommand}
              className="text-cyber-teal hover:text-cyber-cyan font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{t.homeNextCmd}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        </motion.div>



        {/* DETAILED STATS DASHBOARD & OVERVIEW */}
        <div className="w-full mb-16">
          <div className="text-center mb-10">
            <h2 className={`text-2xl md:text-3xl font-black font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
              {lang === 'fa' ? '📊 آمارنامه و شاخص‌های کلیدی مهارتی' : lang === 'ar' ? '📊 مؤشرات الأداء والإحصائيات الرئيسية' : lang === 'de' ? '📊 Wichtige Meilensteinindikatoren & Statistiken' : '📊 Key Milestone Indicators & Stats'}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium max-w-2xl mx-auto">
              {lang === 'fa' 
                ? 'مروری خلاصه بر برجسته‌ترین دستاوردهای تخصصی، الگوریتمی و توانمندی‌های اتوماسیون محمدرضا' 
                : lang === 'ar'
                ? 'نظرة سريعة وموثقة على مؤشرات ومستويات أداء البرمجة ومشاريع الأتمتة لمحمد رضا'
                : lang === 'de'
                ? 'Ein schneller mathematischer Blick auf die verifizierten Programmier-Meilensteine, die von Mohammadreza erreicht wurden'
                : 'A quick mathematical look at the validated programming milestones achieved by Mohammadreza'}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className={`rounded-2xl border p-5 transition-all text-center ${
              theme === 'light' ? 'bg-white border-slate-350 shadow-sm' : 'border-dark-border/60 bg-gradient-to-br from-slate-900/60 to-slate-950/40'
            }`}>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 font-mono mb-1">
                {lang === 'fa' ? 'دانش‌آموز برتر' : lang === 'ar' ? 'المشارك المميز' : lang === 'de' ? 'Spitzen-Teilnehmer' : 'Top Participant'}
              </div>
              <div className={`text-xs sm:text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                {lang === 'fa' ? 'دوره برنامه‌نویسی دانشگاه شریف' : lang === 'ar' ? 'برنامج جامعة شريف للتكنولوجيا' : lang === 'de' ? 'Sharif-Studentenprogramm' : 'Sharif Student Program'}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">{lang === 'fa' ? 'شریف: رتبه ۳ ایران / ۵۴۸ جهان' : lang === 'ar' ? 'شريف: المرتبة ٣ في إيران / ٥٤٨ عالمياً' : lang === 'de' ? 'Sharif: Platz 3 im Iran / Platz 548 weltweit' : 'Sharif: Ranked #3 in IR / #548 Globally'}</p>
            </div>

            <div className={`rounded-2xl border p-5 transition-all text-center ${
              theme === 'light' ? 'bg-white border-slate-350 shadow-sm' : 'border-dark-border/60 bg-gradient-to-br from-slate-900/60 to-slate-950/40'
            }`}>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono mb-1">
                100%
              </div>
              <div className={`text-xs sm:text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                {lang === 'fa' ? 'نمره‌ کل پایگاه‌داده جنگو' : lang === 'ar' ? 'درجة دجانغو ميشيغان' : lang === 'de' ? 'Michigan Django Datenbank' : 'Michigan Database Django'}
              </div>
              <p className="text-[10px] text-gray-550 mt-1 font-mono">
                {lang === 'ar' ? 'التقييم: ١٠٠ / ١٠٠ ممتاز' : lang === 'fa' ? 'نمره: ۱۰۰ از ۱۰۰ عالی' : lang === 'de' ? 'Note: 100 / 100 Perfekt' : 'Grade: 100 / 100 Perfect'}
              </p>
            </div>

            <div className={`rounded-2xl border p-5 transition-all text-center ${
              theme === 'light' ? 'bg-white border-slate-350 shadow-sm' : 'border-dark-border/60 bg-gradient-to-br from-slate-900/60 to-slate-950/40'
            }`}>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-mono mb-1">
                {lang === 'ar' ? '١٤+' : lang === 'fa' ? '۱۴+' : '14+'}
              </div>
              <div className={`text-xs sm:text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                {lang === 'fa' ? 'سورس فعال پایتون و بات تلگرام' : lang === 'ar' ? 'بوتات الأتمتة وسكربتات بايثون النشطة' : lang === 'de' ? 'Aktive Automations-Daemons' : 'Active Automation Daemons'}
              </div>
              <p className="text-[10px] text-gray-550 mt-1 font-mono">
                {lang === 'ar' ? 'أداء متزامن وسريع ١٠٠٪' : lang === 'fa' ? '۱۰۰٪ ناهمگام و غیرانسدادی' : lang === 'de' ? '100% Asynchron & Nicht-blockierend' : '100% Async Non-blocking'}
              </p>
            </div>

            <div className={`rounded-2xl border p-5 transition-all text-center ${
              theme === 'light' ? 'bg-white border-slate-350 shadow-sm' : 'border-dark-border/60 bg-gradient-to-br from-slate-900/60 to-slate-950/40'
            }`}>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono mb-1">
                {lang === 'fa' ? '۴+ مدرک' : lang === 'ar' ? '٤+ شهادات معتمدة' : lang === 'de' ? '4+ Zertifikate' : '4+ Certs'}
              </div>
              <div className={`text-xs sm:text-sm font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>
                {lang === 'fa' ? 'گواهینامه‌های تخصصی کورسرا' : lang === 'ar' ? 'سجل شهادات ومؤهلات كورسيرا' : lang === 'de' ? 'Verifizierte Coursera-Zertifikate' : 'Verified Coursera Credentials'}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">{lang === 'fa' ? 'متا، میشیگان، لندن و پنسیلوانیا' : lang === 'ar' ? 'ميتا، ميشيغان، لندن وبنسلفانيا' : lang === 'de' ? 'Meta, Michigan, London & Penn' : 'Meta, Michigan, London & Penn'}</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: ACADEMIC TIMELINE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-20 border-t border-dark-border/20 pt-16"
          id="academic-roadmap"
        >
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-black font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
              {customData.academicTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium max-w-2xl mx-auto">
              {customData.academicSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {customData.timeline.map((item, idx) => (
              <div 
                key={idx}
                className={`group rounded-2xl border p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-350 shadow-sm hover:border-cyber-teal/50 hover:shadow-md' 
                    : 'border-dark-border/80 bg-slate-900/40 hover:border-cyber-teal/40 hover:bg-slate-900/60'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full filter blur-2xl pointer-events-none" />
                
                {/* Glowing line indicators */}
                <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyber-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-cyber-teal font-black tracking-widest uppercase bg-teal-950/20 px-2 py-0.5 border border-cyber-teal/20 rounded">
                    {item.badge}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${theme === 'light' ? 'text-slate-600' : 'text-cyan-400'}`}>
                    {item.period}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-1.5 font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
                  {item.title}
                </h3>
                
                <p className={`text-xs font-mono font-extrabold mb-3 select-all ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                  📍 {item.institution}
                </p>

                <p className={`text-xs sm:text-sm leading-relaxed font-sans text-justify ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 2: LIVE PROJECTS VENDOR */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-20 border-t border-dark-border/20 pt-16"
          id="automation-pillars"
        >
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-black font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
              {customData.automationTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium max-w-2xl mx-auto">
              {customData.automationSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customData.autos.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className={`group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-350 shadow-sm hover:border-cyber-cyan/50' 
                      : 'border-dark-border/80 bg-slate-900/40 hover:border-cyber-cyan/40 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      theme === 'light' 
                        ? 'bg-cyan-50 border-cyber-cyan/30' 
                        : 'bg-cyan-950/20 border-cyber-cyan/30 group-hover:border-cyber-cyan'
                    }`}>
                      <IconComp className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                        <span className={`text-[10px] font-black font-mono tracking-wider px-2 py-0.5 rounded border ${
                          theme === 'light' 
                            ? 'bg-slate-100 border-slate-200 text-slate-600' 
                            : 'bg-slate-950/60 border-dark-border/45 text-gray-400'
                        }`}>
                          {item.badge}
                        </span>
                        
                        <span className="flex items-center gap-1.5 text-[10px] font-bold font-sans text-emerald-500 animate-pulse">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {lang === 'fa' ? 'فعال و آنلاین' : lang === 'ar' ? 'نشط ومباشر' : 'Active & Live'}
                        </span>
                      </div>

                      <h3 className={`text-base sm:text-lg font-bold mb-2 font-sans transition-colors group-hover:text-cyber-cyan ${
                        theme === 'light' ? 'text-slate-900' : 'text-gray-150'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed font-sans text-justify ${
                        theme === 'light' ? 'text-slate-800' : 'text-gray-400'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {item.link && (
                    <div className="mt-5 pt-4 border-t border-dashed border-dark-border/10 flex justify-end">
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-bold font-sans flex items-center gap-1 transition-all px-3 py-1.5 rounded-lg border ${
                          theme === 'light' 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 hover:border-slate-350 select-none' 
                            : 'bg-slate-950/40 hover:bg-slate-950/80 text-gray-200 border-dark-border/60 hover:border-cyber-cyan/50 hover:text-cyber-cyan select-none'
                        }`}
                      >
                        <span>
                          {lang === 'fa' ? 'ورود به پلتفرم' : lang === 'ar' ? 'الدخول إلى المنصة' : 'Launch Platform'}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* SECTION 3: PERSONAL PHILOSOPHY AND ETHICS BENTO GRID */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-20 border-t border-dark-border/20 pt-16"
          id="professional-standards"
        >
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-black font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
              {customData.philosophyTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium max-w-2xl mx-auto">
              {customData.philosophySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customData.philosophies.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyber-emerald/40 ${
                    theme === 'light' 
                      ? 'bg-white border-slate-350 shadow-sm shadow-slate-100 hover:bg-slate-50/50' 
                      : 'border-dark-border/80 bg-slate-900/30 hover:bg-slate-900/50'
                  }`}
                >
                  <div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all mb-4 ${
                      theme === 'light' 
                        ? 'bg-emerald-50 border-cyber-emerald/30' 
                        : 'bg-emerald-950/20 border-cyber-emerald/30 group-hover:border-cyber-emerald'
                    }`}>
                      <IconComp className="h-5 w-5 text-cyber-emerald" />
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold mb-2 font-sans ${
                      theme === 'light' ? 'text-slate-900' : 'text-gray-200'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-xs leading-relaxed font-sans mt-2 text-justify ${
                    theme === 'light' ? 'text-slate-800' : 'text-gray-400'
                  }`}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>



        {/* Highlights Banner Credits */}
        <div className={`w-full mt-8 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
          theme === 'light' ? 'bg-white border-slate-300 shadow-md shadow-slate-100' : 'bg-gradient-to-r from-teal-950/30 to-slate-950 border-dark-border/75'
        }`}>
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
              theme === 'light' ? 'bg-teal-50 border-cyber-teal/30' : 'bg-teal-900/20 border-cyber-teal/30'
            }`}>
              <Award className="h-6 w-6 text-cyber-teal shrink-0" />
            </div>
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <h4 className={`text-base font-bold font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-200'}`}>
                {t.homeAwardTitle}
              </h4>
              <p className="text-xs text-slate-500 font-sans mt-0.5 font-semibold">
                {t.homeAwardSub}
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('playground')}
            className="shrink-0 text-xs font-black px-4 py-2.5 border border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-dark-bg cursor-pointer transition-all rounded-lg"
          >
            {t.homeAwardBtn}
          </button>
        </div>

      </div>
    </div>
  );
}
