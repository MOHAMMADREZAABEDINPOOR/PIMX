import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AppWindow, 
  Cpu, 
  Bot, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Radio, 
  Zap, 
  ListMusic, 
  Download, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  Users, 
  Mail, 
  Smartphone, 
  CheckCircle2,
  ArrowUpLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { getTranslatedProjects, TranslatedProjectItem } from '../lib/project_translations';

// Hover dynamic high-fidelity synth sound
const playHoverSound = () => {
  // Sshhh... silence
};

// Radar lock selection feedback sound
const playRadarLockSound = () => {
  // Sshhh... silence
};

export default function Projects() {
  const { theme, dir, t, lang } = useLanguageTheme();
  const projects = getTranslatedProjects(lang);
  const nodesActiveText = t.projectsActiveLabel.replace('{count}', `${projects.length}`);

  // Dynamic Accents styling dictionary conforming to high-fidelity design specifications and theme modes
  const accentStyles = {
    teal: {
      border: theme === 'light' ? "hover:border-cyber-teal border-slate-200" : "hover:border-cyber-teal/50 focus:border-cyber-teal/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-cyber-teal to-transparent",
      badge: theme === 'light' ? "bg-teal-50 text-cyber-teal border-cyber-teal/30" : "bg-teal-950/40 text-cyber-teal border-cyber-teal/30",
      glow: theme === 'light' ? "rgba(20,184,166,0.06)" : "rgba(20,184,166,0.22)",
      radialBg: "bg-teal-500/5",
      btnGlow: "rgba(20,184,166,0.35)",
      textColor: theme === 'light' ? "text-teal-600 font-bold" : "text-cyber-teal font-extrabold"
    },
    cyan: {
      border: theme === 'light' ? "hover:border-cyber-cyan border-slate-200" : "hover:border-cyber-cyan/50 focus:border-cyber-cyan/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-cyber-cyan to-transparent",
      badge: theme === 'light' ? "bg-cyan-50 text-cyber-cyan border-cyber-cyan/30" : "bg-cyan-950/40 text-cyber-cyan border-cyber-cyan/30",
      glow: theme === 'light' ? "rgba(6,182,212,0.06)" : "rgba(6,182,212,0.22)",
      radialBg: "bg-cyan-500/5",
      btnGlow: "rgba(6,182,212,0.35)",
      textColor: theme === 'light' ? "text-cyan-600 font-bold" : "text-cyber-cyan font-extrabold"
    },
    indigo: {
      border: theme === 'light' ? "hover:border-indigo-400 border-slate-200" : "hover:border-indigo-500/50 focus:border-indigo-500/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-indigo-500 to-transparent",
      badge: theme === 'light' ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-indigo-950/40 text-indigo-300 border-indigo-500/30",
      glow: theme === 'light' ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.22)",
      radialBg: "bg-indigo-500/5",
      btnGlow: "rgba(99,102,241,0.35)",
      textColor: theme === 'light' ? "text-indigo-600 font-bold" : "text-indigo-400 font-extrabold"
    },
    emerald: {
      border: theme === 'light' ? "hover:border-emerald-400 border-slate-200" : "hover:border-emerald-500/50 focus:border-emerald-500/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-emerald-500 to-transparent",
      badge: theme === 'light' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-emerald-950/40 text-emerald-300 border-emerald-500/30",
      glow: theme === 'light' ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.22)",
      radialBg: "bg-emerald-500/5",
      btnGlow: "rgba(16,185,129,0.35)",
      textColor: theme === 'light' ? "text-emerald-600 font-bold" : "text-emerald-400 font-extrabold"
    },
    rose: {
      border: theme === 'light' ? "hover:border-rose-400 border-slate-200" : "hover:border-rose-500/50 focus:border-rose-500/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-rose-500 to-transparent",
      badge: theme === 'light' ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-rose-950/40 text-rose-300 border-rose-500/30",
      glow: theme === 'light' ? "rgba(244,63,94,0.06)" : "rgba(244,63,94,0.22)",
      radialBg: "bg-rose-500/5",
      btnGlow: "rgba(244,63,94,0.35)",
      textColor: theme === 'light' ? "text-rose-600 font-bold" : "text-rose-400 font-extrabold"
    },
    violet: {
      border: theme === 'light' ? "hover:border-violet-400 border-slate-200" : "hover:border-violet-500/50 focus:border-violet-500/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-violet-500 to-transparent",
      badge: theme === 'light' ? "bg-violet-50 text-violet-600 border-violet-200" : "bg-violet-950/40 text-violet-300 border-violet-500/30",
      glow: theme === 'light' ? "rgba(139,92,246,0.06)" : "rgba(139,92,246,0.22)",
      radialBg: "bg-violet-500/5",
      btnGlow: "rgba(139,92,246,0.35)",
      textColor: theme === 'light' ? "text-violet-600 font-bold" : "text-violet-400 font-extrabold"
    },
    gold: {
      border: theme === 'light' ? "hover:border-amber-400 border-slate-200" : "hover:border-amber-500/50 focus:border-amber-500/60 border-dark-border/60",
      topLine: "bg-gradient-to-r from-transparent via-amber-500 to-transparent",
      badge: theme === 'light' ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-950/40 text-amber-300 border-amber-500/30",
      glow: theme === 'light' ? "rgba(245,158,11,0.06)" : "rgba(245,158,11,0.22)",
      radialBg: "bg-amber-500/5",
      btnGlow: "rgba(245,158,11,0.35)",
      textColor: theme === 'light' ? "text-amber-600 font-bold" : "text-amber-500 font-extrabold"
    }
  };

  const filteredProjects = projects;

  return (
    <div 
      className={`py-12 md:py-16 min-h-[90vh] relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'text-slate-800' : 'text-gray-100'
      }`} 
      dir={dir}
    >
      
      {/* Background radial overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About-Page-style Header Section */}
        <div className={`border-b pb-6 mb-12 relative flex flex-col md:flex-row md:items-end justify-between gap-5 text-start ${
          theme === 'light' ? 'border-slate-200' : 'border-dark-border/40'
        }`}>
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-cyber-teal animate-ping" />
              <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest border px-2.5 py-0.5 rounded-md ${
                theme === 'light' ? 'bg-teal-50 border-cyber-teal/20 text-cyber-teal' : 'bg-teal-950/40 border-cyber-teal/20 text-cyan-400'
              }`}>
                {t.projectsBadge}
              </span>
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight font-sans ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
              {t.projectsTitle}
            </h1>
            <p className={`mt-2 font-sans max-w-2xl leading-relaxed text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
              {t.projectsSub}
            </p>
          </div>

          {/* Quick status details */}
          <div className={`flex items-center gap-1.5 self-start md:self-auto border px-3.5 py-2 rounded-xl text-[10px] font-mono ${
            theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-900/60 border-dark-border/40 text-gray-400'
          }`}>
            <Radio className="h-3.5 w-3.5 text-cyber-teal animate-pulse" />
            <span className="uppercase text-[9px] font-extrabold">{t.projectsNodes}:</span>
            <span className="text-cyber-teal font-extrabold">{nodesActiveText}</span>
          </div>
        </div>

        {/* High Fidelity Grid System matching the About Page architecture */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => {
              const style = accentStyles[p.accent];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.93, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -15 }}
                  transition={{ type: "spring", stiffness: 140, damping: 16 }}
                  whileHover={{ 
                    y: -8, 
                    borderColor: `rgba(20, 184, 166, 0.4)`,
                    backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : undefined
                  }}
                  onMouseEnter={playHoverSound}
                  key={p.id}
                  className={`rounded-2xl border p-5 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group transition-all duration-300 ${
                    theme === 'light' 
                      ? 'bg-white/80 border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' 
                      : 'bg-gradient-to-b from-slate-900/60 to-slate-950/80'
                  } ${style.border}`}
                >
                  {/* Glowing dynamic top accent line */}
                  <div className={`absolute -top-[1px] right-8 w-16 h-[2px] ${style.topLine}`} />
                  
                  {/* Background smooth dynamic radial spot light */}
                  <div className={`absolute top-0 right-0 w-28 h-28 ${style.radialBg} rounded-full filter blur-2xl pointer-events-none`} />

                  <div className="space-y-4">
                    {/* Header: Title badges */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono border px-2.5 py-0.5 rounded-md font-extrabold uppercase ${style.badge} ${
                        theme === 'light' ? 'border-slate-100' : 'border-dark-border/20'
                      }`}>
                        {p.badge}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">
                        {p.category.toUpperCase()}_NODE
                      </span>
                    </div>

                    {/* Title information */}
                    <div className="text-start">
                      <h3 className={`text-base font-black font-sans group-hover:text-cyber-teal transition-colors duration-300 ${
                        theme === 'light' ? 'text-slate-900' : 'text-gray-100'
                      }`}>
                        {p.title}
                      </h3>
                      <p className="text-[9.5px] font-mono text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        {p.titleEn}
                      </p>
                    </div>

                    {/* Descriptions */}
                    <p className={`text-xs leading-relaxed font-sans text-start ${
                      theme === 'light' ? 'text-slate-600' : 'text-gray-300'
                    }`}>
                      {p.description}
                    </p>

                    {/* Interactive high-fidelity checklist for Featured Projects */}
                    {p.features && p.features.length > 0 && (
                      <div className={`border rounded-xl p-3 space-y-2 text-start ${
                        theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-dark-border/30'
                      }`}>
                        <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase block mb-1">KEY_FEATURES_METRIC:</span>
                        {p.features.map((feat, idx) => (
                          <div key={idx} className={`flex items-start gap-2 text-[10.5px] font-sans ${
                            theme === 'light' ? 'text-slate-600' : 'text-gray-300'
                          }`}>
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyber-teal shrink-0 mt-0.5" />
                            <span className="flex-1 text-start leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Connection Link Block (ONLY Rendered if redirect URL is specified) */}
                  {p.link && (
                    <div className={`border-t pt-4 mt-6 ${theme === 'light' ? 'border-slate-100' : 'border-dark-border/20'}`}>
                      <motion.a
                        whileHover={{ scale: 1.025, boxShadow: `0 0 15px ${style.btnGlow}` }}
                        whileTap={{ scale: 0.975 }}
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playRadarLockSound}
                        className={`w-full py-2.5 px-3 rounded-xl border text-[10.5px] font-mono tracking-wide flex items-center justify-between transition-all duration-350 select-none group/btn cursor-pointer ${
                          theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900' : 'bg-slate-900 border-dark-border/40 text-gray-200 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 font-sans font-black">
                          <Radio className="h-3.5 w-3.5 text-cyber-teal animate-pulse" />
                          {t.projectsVisit}
                        </span>
                        <div className="flex items-center gap-1 text-cyber-teal font-extrabold text-[10px]">
                          {t.projectsLaunchLabel}
                          <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </div>
                      </motion.a>
                    </div>
                  )}

                  {/* Design parity check (Fallback visual system indicator) */}
                  {!p.link && (
                    <div className={`border-t pt-4 mt-6 flex justify-between items-center text-[9px] font-mono p-2.5 rounded-xl ${
                      theme === 'light' ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-dark-border/20 bg-slate-950/30 text-gray-500'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-gray-400" />
                        STATUS: LOCAL_COMPILED
                      </span>
                      <span className="font-extrabold text-cyber-teal">MD_SECURE: OK ✓</span>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Floating Aesthetic Parity Visual Card */}
        <div id="academic-ethics-footer" className={`mt-14 rounded-2xl border p-6 backdrop-blur-md relative overflow-hidden ${
          theme === 'light' ? 'bg-white/80 border-slate-200 shadow-sm' : 'border-dark-border/60 bg-gradient-to-r from-teal-950/10 via-slate-950/60 to-cyan-950/10'
        }`}>
          <div className="absolute top-0 right-0 w-44 h-44 bg-cyber-teal/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            <div className="space-y-1.5 flex-1">
              <h4 className={`text-sm font-bold font-sans flex items-center gap-2 justify-start ${
                theme === 'light' ? 'text-slate-900' : 'text-gray-100'
              } ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                <ShieldCheck className="h-4.5 w-4.5 text-cyber-teal" />
                {t.projectsFooterHeading}
              </h4>
              <p className={`text-xs font-sans leading-relaxed max-w-3xl ${
                theme === 'light' ? 'text-slate-600' : 'text-gray-400'
              }`}>
                {t.projectsFooterBody}
              </p>
            </div>
            
            <motion.a 
              href="mailto:mohammadrezaabedinpoor6@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={playHoverSound}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 font-bold text-slate-950 text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(20,184,166,0.15)] shrink-0"
            >
              {t.projectsFooterAction}
              <Mail className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

      </div>
    </div>
  );
}
