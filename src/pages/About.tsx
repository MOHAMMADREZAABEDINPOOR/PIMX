import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Code2, 
  Cpu, 
  UserCheck, 
  Heart, 
  GitBranch, 
  Terminal, 
  Server, 
  Database, 
  Bot, 
  Sparkles, 
  MonitorSmartphone, 
  Globe, 
  PenTool, 
  Film, 
  Layers, 
  Wrench, 
  FileSpreadsheet, 
  Activity 
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import { aboutPageTranslations, getSkillTranslation } from '../lib/about_translations';

// Holographic futuristic digital sound synthesizer blip on hover
const playHoverSound = () => {
  // Sshhh... quiet on hover
};

// Target Locking Sound
const playRadarLockSound = () => {
  // Sshhh... quiet on radar lock
};

// Holographic Target Radar Sweep Scanner component
const RadarScanner: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="relative w-40 h-40 mx-auto flex items-center justify-center bg-slate-950/95 rounded-full border border-cyber-teal/30 shadow-[0_0_25px_rgba(20,184,166,0.15)] overflow-hidden">
      {/* Grid Crosshair overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_rgba(20,184,166,0.08)_100%)]" />
      <div className="absolute w-[1px] h-full bg-cyber-teal/20 left-1/2 -translate-x-1/2" />
      <div className="absolute h-[1px] w-full bg-cyber-teal/20 top-1/2 -translate-y-1/2" />
      
      {/* High-tech spinning sweep laser */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        className="absolute w-1/2 h-[3px] bg-gradient-to-r from-cyber-teal via-cyber-cyan/50 to-transparent origin-left left-1/2 top-1/2 -translate-y-1/2 z-10 shadow-[0_0_12px_rgba(20,184,166,0.9)]"
      />
      
      {/* Concentric rings */}
      <div className="absolute w-[130px] h-[130px] rounded-full border border-cyber-teal/25 border-dashed animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-[94px] h-[94px] rounded-full border border-cyber-teal/15" />
      <div className="absolute w-[50px] h-[50px] rounded-full border border-cyber-teal/10" />

      {/* Targeted level dot positioned geometrically based on percentage level */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
        style={{
          transform: `translate(${Math.cos((level * 3.6) * Math.PI / 180) * 48}px, ${Math.sin((level * 3.6) * Math.PI / 180) * 48}px)`
        }}
        className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,1)] z-20 border-2 border-white"
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse">
          LOCK_TARGET
        </span>
        <span className="text-[14px] font-mono font-black text-gray-100 tracking-wider mt-0.5">
          METRIC_{level}
        </span>
      </div>
    </div>
  );
};

// Holographic real-time signal waveform simulator component
const InteractiveWaveform: React.FC = () => {
  const { theme } = useLanguageTheme();
  return (
    <div className={`h-11 rounded-xl flex flex-col justify-center overflow-hidden relative px-3 py-1.5 shadow-inner border ${
      theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/90 border-dark-border/40'
    }`}>
      <div className={`flex justify-between items-center text-[7.5px] font-mono uppercase tracking-widest mb-1 select-none ${
        theme === 'light' ? 'text-slate-450' : 'text-gray-500'
      }`}>
        <span>RF_SIGNAL_WAVEFORM</span>
        <span className="text-cyber-cyan animate-pulse">STABLE (24.2 MHz)</span>
      </div>
      <div className="flex items-center gap-[1.5px] h-4 w-full justify-between" dir="ltr">
        {Array.from({ length: 44 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: [
                `${25 + Math.sin(i * 0.18) * 35 + Math.random() * 40}%`, 
                `${10 + Math.sin(i * 0.3) * 50 + Math.random() * 30}%`, 
                `${25 + Math.sin(i * 0.18) * 35 + Math.random() * 40}%`
              ] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.9 + (i % 5) * 0.14, 
              ease: "easeInOut" 
            }}
            className="w-[1.5px] bg-cyber-teal rounded-full"
            style={{
              opacity: 0.35 + (i % 4) * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Auto-Typing Code Simulator console component
const TypewriterCode: React.FC<{ code: string }> = ({ code }) => {
  const { theme } = useLanguageTheme();
  const [displayedCode, setDisplayedCode] = React.useState('');
  
  React.useEffect(() => {
    setDisplayedCode('');
    let idx = 0;
    const interval = 5; // Swift typing speed for immediate feedback
    const timer = setInterval(() => {
      setDisplayedCode((prev) => prev + code.charAt(idx));
      idx++;
      if (idx >= code.length) {
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [code]);

  return (
    <div className={`bg-slate-950 rounded-xl p-5 h-[270px] font-mono text-[11.5px] leading-relaxed select-text overflow-hidden text-emerald-400 relative shadow-2xl border ${
      theme === 'light' ? 'border-slate-200 shadow-md' : 'border-dark-border'
    }`}>
      <div className="absolute top-2 left-3 flex gap-1 items-center z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
      </div>
      <div className="absolute top-2 right-3 text-gray-500 text-[8px] select-none uppercase tracking-widest font-extrabold z-10">
        System Node Compiler Sandbox Active Stream
      </div>
      <div className="pt-4 mt-2 overflow-y-auto h-[225px] scrollbar-thin scrollbar-thumb-teal-950 text-left font-mono" dir="ltr">
        <pre className="whitespace-pre font-mono text-emerald-400 select-text text-[11px] leading-relaxed text-left">
          {displayedCode}
          <span className="inline-block w-[7px] h-[13px] bg-emerald-400 ml-0.5 animate-pulse" />
        </pre>
      </div>
    </div>
  );
};

// Highly Innovative interactive Skill Card Node Component (Redesigned completely as a sleek, tech square card cockpit interface)
const SkillTelemetryNode: React.FC<{ sk: any, onHover: () => void, isSelected: boolean }> = ({ sk, onHover, isSelected }) => {
  const { theme } = useLanguageTheme();
  const Icon = sk.icon;
  const seed = (sk.key || "").split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

  // Color mappings for modern thematic glowing shadows
  const shadowColor = 
    sk.category === 'backend' ? 'rgba(99, 102, 241, 0.22)' :
    sk.category === 'ai' ? 'rgba(245, 158, 11, 0.22)' :
    sk.category === 'frontend' ? 'rgba(16, 185, 129, 0.22)' :
    'rgba(6, 182, 212, 0.22)';

  const borderHighlight = 
    sk.category === 'backend' ? 'border-indigo-500/40 text-indigo-400 bg-indigo-950/20' :
    sk.category === 'ai' ? 'border-amber-500/40 text-amber-400 bg-amber-950/20' :
    sk.category === 'frontend' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' :
    'border-cyan-500/40 text-cyan-400 bg-cyan-950/20';

  const categoryGlow = 
    sk.category === 'backend' ? 'text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]' :
    sk.category === 'ai' ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]' :
    sk.category === 'frontend' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]' :
    'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]';

  const categoryBorder = 
    sk.category === 'backend' ? 'hover:border-indigo-500/40 animate-none' :
    sk.category === 'ai' ? 'hover:border-amber-500/40 animate-none' :
    sk.category === 'frontend' ? 'hover:border-emerald-500/40 animate-none' :
    'hover:border-cyan-500/40 animate-none';

  return (
    <motion.div
      id={`skill-node-${sk.key}`}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: isSelected ? 1.025 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -15 }}
      whileHover={{ 
        scale: isSelected ? 1.04 : 1.03,
        y: -6,
        borderColor: isSelected 
          ? 'rgba(20, 184, 166, 1)' 
          : sk.category === 'backend' ? 'rgba(99, 102, 241, 0.45)' :
            sk.category === 'ai' ? 'rgba(245, 158, 11, 0.45)' :
            sk.category === 'frontend' ? 'rgba(16, 185, 129, 0.45)' :
            'rgba(6, 182, 212, 0.45)',
        backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.5)"
      }}
      transition={{ 
        type: 'spring',
        stiffness: 150,
        damping: 22,
        mass: 0.8
      }}
      onMouseEnter={() => {
        playHoverSound();
        onHover();
      }}
      onClick={() => {
        playRadarLockSound();
        onHover();
      }}
      className={`relative rounded-2xl border p-5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[300px] h-full group/card transition-colors duration-500 ${
        isSelected 
          ? theme === 'light'
            ? 'border-cyber-teal bg-white shadow-[0_0_25px_rgba(20,184,166,0.15)] bg-gradient-to-b from-teal-50 via-white to-teal-50/50'
            : 'border-cyber-teal bg-slate-900/90 shadow-[0_0_25px_rgba(20,184,166,0.18)] bg-gradient-to-b from-slate-950/80 via-slate-900 to-slate-950/70' 
          : theme === 'light'
            ? 'border-slate-200 bg-white shadow-sm hover:bg-slate-50'
            : 'border-dark-border/40 bg-dark-card/20 hover:bg-slate-900/10'
      } ${categoryBorder}`}
      style={{
        boxShadow: isSelected ? `0 0 25px ${shadowColor}` : undefined
      }}
    >
      {/* Absolute Tech Grid Overlay background */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

      {/* Ribbon laser highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
        isSelected 
          ? sk.category === 'backend' ? 'bg-indigo-500' :
            sk.category === 'ai' ? 'bg-amber-500' :
            sk.category === 'frontend' ? 'bg-emerald-500' :
            'bg-cyan-500'
          : 'bg-transparent'
      }`} />

      {/* Card Header */}
      <div className="flex justify-between items-center relative z-10 mb-4" dir="ltr">
        <span className={`text-[8.5px] font-mono tracking-widest font-extrabold px-2 py-0.5 rounded border ${
          sk.category === 'backend' ? 'bg-indigo-950/60 border-indigo-500/20 text-indigo-400' :
          sk.category === 'ai' ? 'bg-amber-950/60 border-amber-500/20 text-amber-400' :
          sk.category === 'frontend' ? 'bg-emerald-950/60 border-emerald-500/20 text-emerald-400' :
          'bg-cyan-950/60 border-cyan-500/20 text-cyan-400'
        }`}>
          {sk.category === 'backend' ? 'B_END' :
           sk.category === 'ai' ? 'AI_ENGINE' :
           sk.category === 'frontend' ? 'F_END' :
           'SYS_TOOL'}
        </span>

        <div className="flex items-center gap-1.5">
          <span className={`text-[8px] font-mono tracking-widest ${isSelected ? 'text-cyber-cyan' : 'text-gray-500'}`}>
            {isSelected ? 'ENGAGED' : 'STANDBY'}
          </span>
          <span className={`w-2 h-2 rounded-full ${
            isSelected 
              ? sk.category === 'backend' ? 'bg-indigo-400 animate-pulse' :
                sk.category === 'ai' ? 'bg-amber-400 animate-pulse' :
                sk.category === 'frontend' ? 'bg-emerald-400 animate-pulse' :
                'bg-cyan-400 animate-pulse'
              : 'bg-slate-700'
          }`} />
        </div>
      </div>

      {/* Brand Icon + Name Spec */}
      <div className="relative z-10 text-right flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className={`relative p-3 rounded-xl border shrink-0 transition-all duration-300 shadow-inner group-hover/card:scale-105 ${
              isSelected 
                ? borderHighlight + ' shadow-[0_0_15px_rgba(20,184,166,0.25)]' 
                : theme === 'light'
                  ? 'bg-slate-50 border-slate-200 text-slate-500 group-hover/card:border-cyber-teal group-hover/card:text-cyber-cyan'
                  : 'bg-slate-950/80 border-dark-border text-gray-400 group-hover/card:border-cyber-teal group-hover/card:text-cyber-cyan'
            }`}>
              <Icon className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <h4 className={`text-sm sm:text-base font-black transition-colors ${
                isSelected 
                  ? categoryGlow 
                  : theme === 'light'
                    ? 'text-slate-800 group-hover/card:text-cyber-teal'
                    : 'text-gray-200 group-hover/card:text-cyan-300'
              }`}>
                {sk.name}
              </h4>
              <p className="text-[10px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">{sk.englishName}</p>
            </div>
          </div>

          <p className={`text-[11.5px] leading-relaxed font-sans text-justify line-clamp-3 mb-4 transition-colors ${
            theme === 'light'
              ? 'text-slate-650 group-hover/card:text-slate-900'
              : 'text-gray-400 group-hover/card:text-gray-300'
          }`}>
            {sk.desc}
          </p>
        </div>

        {/* Telemetry Equalizer Graphic */}
        <div className={`space-y-4 pt-3.5 border-t ${theme === 'light' ? 'border-slate-100' : 'border-dark-border/20'}`}>
          
          <div className="w-full" dir="ltr">
            <div className="flex justify-between items-center mb-1 text-[8.5px] font-mono text-gray-500 font-bold tracking-widest">
              <span>FREQUENCY_CTR</span>
              <span className="text-cyber-cyan">{sk.levelText}</span>
            </div>
            
            <div className="flex gap-[2px] items-end h-3">
              {Array.from({ length: 18 }).map((_, i) => {
                const isActive = i < Math.floor((sk.level / 100) * 18);
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-[1px] transition-all duration-300 ${
                      isActive 
                        ? isSelected 
                          ? 'bg-cyber-teal' 
                          : 'bg-cyber-cyan/40' 
                        : theme === 'light'
                          ? 'bg-slate-205'
                          : 'bg-slate-900/60'
                    }`}
                    style={{
                      height: isActive && isSelected 
                        ? `${35 + Math.sin(i * (0.2 + (seed % 3) * 0.08) + (seed % 10)) * 65}%` 
                        : isActive 
                          ? `${20 + ((i + (seed % 4)) % 4) * 20}%` 
                          : '20%',
                      backgroundColor: isActive && isSelected 
                        ? sk.category === 'backend' ? '#6366f1' :
                          sk.category === 'ai' ? '#f59e0b' :
                          sk.category === 'frontend' ? '#10b981' :
                          '#06b6d4'
                        : undefined
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Metric Bottom Info */}
          <div className={`flex justify-between items-center font-mono text-[9px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`} dir="ltr">
            <div className="text-left font-mono">
              <span className={`text-[8px] block uppercase font-extrabold tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-gray-600'}`}>LEVEL_CAP</span>
              <span className={`text-[12px] font-bold tracking-tight ${isSelected ? categoryGlow : theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>
                {sk.levelText}
              </span>
            </div>
            
            <div className="text-right">
              <span className={`text-[8px] block uppercase font-bold tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-gray-600'}`}>HW_GATEWAY</span>
              <span className={`text-[9.5px] font-bold block mt-0.5 ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>CHAN: PORT 3000</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default function About() {
  const { theme, dir, t, lang } = useLanguageTheme();
  const local = aboutPageTranslations[lang] || aboutPageTranslations['en'];
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'backend' | 'ai' | 'frontend' | 'tools'>('all');

  // Interactive Live Compilation Simulation variables
  const [simulationLogs, setSimulationLogs] = React.useState<string[]>([
    "INITIALIZING PORTFOLIO COMPILER SHELL... ✓",
    "SYSTEM CHANNELS BINDED SUCCESSFULLY TO ADDR: localhost:3000",
    "VIRTUAL SANDBOX COMPILER STATUS: STANDBY. SELECT A SKILL NODE BELOW."
  ]);
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [compileProgress, setCompileProgress] = React.useState(0);
  const [codeCopied, setCodeCopied] = React.useState(false);

  const rawSkills = [
    { 
      key: "python",
      name: "برنامه‌نویسی Python", 
      englishName: "Python Core Engine",
      category: "backend", 
      level: 88, 
      levelText: "متوسط",
      icon: Code2, 
      desc: "برنامه‌نویسی تعاملی، توسعه بازی‌ها، اتوماسیون مستقل، فرآیندهای بهینه‌سازی و مبانی علوم داده. تجربه عمیق کار با کتابخانه‌های مختلف پایتون جهت خودکارسازی و حل چالش‌های سیستمی روزمره و عملی.",
      code: `# Python Core Engine & Microservice Daemon
import os, sys, time, asyncio
from dataclasses import dataclass

@dataclass
class SystemPayload:
    node_id: str
    integrity_score: float
    metrics: list

async def dispatch_telemetry(payload: SystemPayload) -> bool:
    try:
        print(f">> [SOCKET] Connecting to local secure port 3000...")
        await asyncio.sleep(0.05)
        if payload.integrity_score > 0.85:
            print(f">> [OK] Payload compiled successfully. Integrity: {payload.integrity_score:.2%}")
            return True
        print(">> [WARN] Payload rejected: Low integrity telemetry.")
        return False
    except ConnectionError as e:
        print(f">> [ERR] Failed transport: {e}")
        return False`
    },
    { 
      key: "web",
      name: "توسعه وب (HTML/CSS/JS)", 
      englishName: "Web Frontend Architecture",
      category: "frontend", 
      level: 82, 
      levelText: "متوسط",
      icon: Globe, 
      desc: "توسعه وب ریسپانسیو فوق‌العاده با ترکیب معماری‌های HTML، CSS و کامپوننت‌های مدرن جاوا اسکریپت با تمرکز بر پیاده‌سازی مو به موی استانداردهای وب، سرعت دسترسی و تجربه روان کاربران نهایی.",
      code: `<!-- Web Frontend Master Core Viewport -->
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    :root { --cyber-teal: #14b8a6; --cyber-cyan: #06b6d4; }
    body { background: #030712; color: #f3f4f6; font-family: 'Space Grotesk', sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; }
    .cyber-module { position: relative; padding: 2.5rem; border-radius: 1.25rem; border: 1px solid var(--cyber-teal); background: rgba(20,184,166,0.06); box-shadow: 0 0 35px rgba(20,184,166,0.15); transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .cyber-module:hover { transform: scale(1.02); border-color: var(--cyber-cyan); box-shadow: 0 0 55px rgba(6,182,212,0.35); }
    .neon-glitch { font-size: 1.75rem; font-weight: 900; background: linear-gradient(135deg, var(--cyber-teal), var(--cyber-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 10px rgba(6,182,212,0.5); }
  </style>
</head>
<body>
  <div class="cyber-module" id="coreModule">
    <div class="neon-glitch">MRA_WEB_ENGINE V2</div>
  </div>
  <script>
    const targetNode = document.getElementById("coreModule");
    targetNode.addEventListener("mouseenter", () => {
      console.log(">>> Live interaction on UI viewport sustained.");
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.setValueAtTime(1450, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    });
  </script>
</body>
</html>`
    },
    { 
      key: "ai",
      name: "توسعه هوش مصنوعی", 
      englishName: "Embedded AI Development",
      category: "ai", 
      level: 95, 
      levelText: "قوی",
      icon: Cpu, 
      desc: "توسعه سیستم‌ها بر اساس موازین مولد هوش مصنوعی، پیاده‌سازی پروسه‌های تعاملی زنده و استفاده بهینه از ابزارها همچون Cursor و ChatGPT به منظور تسریع در بهینه‌سازی، بررسی ساختاری کدها و تولید یونیت‌تست‌ها.",
      code: `// Multi-Agent Orchestration & Gemini Pipeline
import { GoogleGenAI } from "@google/genai";
import { createDiagnosticsLog } from "./telemetry";

interface AISystemConfig {
  model: string;
  temperature: number;
}

export async function compileCodeReview(codebaseSnippet: string, config: AISystemConfig) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log(\`>>> Spawning target agent: [\${config.model}] at Temp \${config.temperature}\`);
  
  const response = await ai.models.generateContent({
    model: config.model,
    contents: \`Review security boundaries & optimized memory layouts:\\n\\n\${codebaseSnippet}\`
  });
  
  await createDiagnosticsLog("GEMINI_API", "METRIC_SUCCESS", response.text);
  return { success: true, payload: response.text };
}`
    },
    { 
      key: "telegram",
      name: "ربات‌های هوشمند تلگرام", 
      englishName: "Telegram Agent Bots",
      category: "ai", 
      level: 94, 
      levelText: "قوی",
      icon: Bot, 
      desc: "طراحی و توسعه موتور بات‌های تعاملی پایتون و وب‌هوهای با فرکانس فوراخوانی بالا. ایجاد سیستم‌های اتوماسیون قدرتمند تلگرام، متصل به ایجنت‌ها، سیستم‌های خبررسان، لاگ‌گیرهای تحت وب و دیتابیس‌های چندگانه.",
      code: `# Telegram Multi-threaded Agent Bot Framework
import os, logging
from aiogram import Bot, Dispatcher, types, Router
from aiogram.filters import Command

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TelegramAgent")

bot = Bot(token=os.getenv("TELEGRAM_API_TOKEN", "743289045:MRA_SECURE_TOKEN_SPEC"))
dp = Dispatcher()
router = Router()

@router.message(Command("diagnostics"))
async def send_system_health(message: types.Message):
    logger.info(f"Received query from User ID: {message.from_user.id}")
    metrics = {
        "status": "OPERATIONAL",
        "ping": "24ms",
        "sandbox_compiler": "ONLINE"
    }
    await message.reply(
        f"⚡ *SYSTEM TELEMETRY SUMMARY*\\n\\n"
        f"● State: \\\`{metrics['status']}\\\`\\n"
        f"● Network Latency: \\\`{metrics['ping']}\\\`\\n"
        f"● Active Gateway: Port 3000",
        parse_mode="MarkdownV2"
    )`
    },
    { 
      key: "django",
      name: "فریمورک Django", 
      englishName: "Django MVC Framework",
      category: "backend", 
      level: 80, 
      levelText: "متوسط",
      icon: Server, 
      desc: "کدنویسی سرور و ساختاردهی وب‌سایت‌های سنگین با استفاده از فریمورک پایتونی Django و REST APIs. مجهز و با سابقه پیاده‌سازی دیتابیس‌های قفل، پنل مدیریت پیشرفته، سطوح احراز هویت قوی و مدیریت کوئری دیتابیس.",
      code: `# Django Enterprise REST Controller Setup
from django.db import models
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated

class AgentNode(models.Model):
    node_hash = models.CharField(max_length=64, unique=True)
    last_seen = models.DateTimeField(auto_now=True)
    is_synchronized = models.BooleanField(default=True)
    capacity = models.IntegerField()

class AgentNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentNode
        fields = ['id', 'node_hash', 'last_seen', 'is_synchronized', 'capacity']

class TelemetryNodeViewSet(viewsets.ModelViewSet):
    queryset = AgentNode.objects.filter(is_synchronized=True)
    serializer_class = AgentNodeSerializer
    permission_classes = [IsAuthenticated]`
    },
    { 
      key: "sql",
      name: "SQL و پایگاه داده", 
      englishName: "SQL / MySQL Databases",
      category: "backend", 
      level: 75, 
      levelText: "متوسط",
      icon: Database, 
      desc: "فرموله‌کردن پایگاه داده‌های منسجم و رابطه‌ای، طراحی ساختاری مدل‌ها، بررسی گلوگاه‌های کندی ترنزکشن‌ها، و مانیتورینگ ارتباط دیتابیس با مدل‌ها. نوشتن کوئری‌های رابطه‌ای بهینه چسباندن مجزای دادها.",
      code: `-- Advanced Partitioning query & Transaction Locking optimizer
BEGIN TRANSACTION;

WITH RankedActivity AS (
    SELECT 
        sessions.user_id,
        sessions.ip_address,
        actions.operation_code,
        ROW_NUMBER() OVER(PARTITION BY sessions.user_id ORDER BY actions.timestamp DESC) as event_rank
    FROM user_sessions sessions
    INNER JOIN session_actions actions ON sessions.id = actions.session_id
    WHERE sessions.active = TRUE
)
SELECT 
    users.username, 
    users.email, 
    act.operation_code, 
    act.ip_address
FROM users
INNER JOIN RankedActivity act ON users.id = act.user_id
WHERE act.event_rank = 1
FOR UPDATE;

COMMIT;`
    },
    { 
      key: "git",
      name: "Git و GitHub", 
      englishName: "Git & Version Control",
      category: "tools", 
      level: 84, 
      levelText: "متوسط",
      icon: GitBranch, 
      desc: "کنترل نسخه‌های نرم‌افزار، مدیریت شاخه‌سازی کدهای چندنفره به صورت ایمن، حل برخوردهای کامیت (Merge Conflicts) به صورت مقتدرانه، مدیریت مخزن‌های منبع باز پورتفولیو و گردش کارهای گیت‌هاب دیپلوی.",
      code: `# Enterprise Monorepo Git workflow
$ git status
On branch main
Your branch is up to date with 'origin/main'.

# Synchronize upstreams cleanly with rebase to prevent empty merges
$ git fetch upstream
$ git rebase upstream/production-stage
Successfully rebased and updated refs/heads/main.

# Deploy feature module to remote pipeline
$ git add -A
$ git commit -S -m "feat(ui): design unified technical command station dashboard"
$ git push origin main --force-with-lease`
    },
    { 
      key: "prompt",
      name: "پرامپت انجینیرینگ علمی", 
      englishName: "Prompt Engineering Suite",
      category: "ai", 
      level: 92, 
      levelText: "قوی",
      icon: Terminal, 
      desc: "طراحی پرامپت‌های ساختار یافته چند مرحله‌ای و تفکری برای مدل‌های بزرگ زبانی هوش مصنوعی. مهار رفتارهای کاذب مدل‌ها، اجبار مدل به تولید فرمت‌های دقیق خروجی شامل الگوهای JSON صلب و بی نقص سفارشی.",
      code: `<!-- Badass Master System Prompt Design & Context Setup -->
<system_prompt_architecture>
  <identity_spec>
    <model_profile>Ultimate AI Senior Systems Architect / Expert Code Compiler</model_profile>
    <security_protocol>Zero-compromise data isolation sandbox mode</security_protocol>
  </identity_spec>
  
  <cognitive_reasoning_framework>
    1. Map dependency matrix in incoming payloads.
    2. Perform predictive static analysis of architectural latency.
    3. Draft a logical flow diagram matching technical parameters.
    4. Apply modern TypeScript configurations for high-speed client rendering.
  </cognitive_reasoning_framework>
  
  <output_constraints>
    [RULE 01] Write only 100% production-ready, highly clean, typed modules.
    [RULE 02] Embed real integration endpoints instead of trivial mock state logic.
    [RULE 03] Maintain high color-contrast ratio schemas conforming with WCAG.
  </output_constraints>
</system_prompt_architecture>`
    },
    { 
      key: "scraping",
      name: "وب اسکرپینگ اختصاصی", 
      englishName: "Web Scraping Suite",
      category: "backend", 
      level: 85, 
      levelText: "متوسط",
      icon: Globe, 
      desc: "مکانیزه کردن و جمع‌آوری دیتای منسجم از اینترنت با کدهای پایتونی Selenium به همراه حل کدهای کپچا تاییدیه. استخراج بی‌عیب اطلاعات ساختاریافته از وب‌سایت‌های کاملاً پویا و ذخیره‌سازی داده‌های استخراج شده.",
      code: `# Asynchronous Dynamic Browser Crawler (Selenium / Playwright)
import asyncio
from playwright.async_api import async_playwright, BrowserContext

async def harvest_cyber_portal(target_url: str) -> dict:
    print(">>> Running Playwright agent in headless VM...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context: BrowserContext = await browser.new_context()
        page = await context.new_page()
        
        await page.goto(target_url, wait_until="networkidle")
        print(f">>> Viewport linked to {target_url}")
        
        # Auto-resolve cloudflare challenge waits
        await page.wait_for_timeout(2000)
        extracted_dom = await page.locator("div.telemetry-board").inner_text()
        await browser.close()
        return {"raw_data": extracted_dom, "status_code": 200}`
    },
    { 
      key: "deployment",
      name: "استقرار و مدیریت پروژه", 
      englishName: "Deployment & SysOps",
      category: "backend", 
      level: 78, 
      levelText: "متوسط",
      icon: Layers, 
      desc: "آشنایی مناسب با شیوه قرارگیری برنامه‌ها بر روی انواع هاست‌های اشتراکی و سرورهای VPS به علاوه پیکربندی پورت‌ها، رمزهای آدرس SSL، کانفیگ وب‌سوکت‌ها، پایداری اتوماتیک ابزارهای فرانت و بک.",
      code: `# Secure Deploy Daemon & Nginx Reverse Proxy
$ sudo ufw allow 3000/tcp
Rules updated (v4/v6)

$ cat /etc/nginx/sites-available/portfolio.conf
server {
    listen 80;
    server_name portfolio.abedinpor.ir;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

$ sudo systemctl restart nginx
$ pm2 restart applet-server-node --update-env
>>> [DEPLOY_SUCCESSFUL] Production channel live.`
    },
    { 
      key: "arduino",
      name: "Arduino و اینترنت اشیا", 
      englishName: "Arduino & IoT Hardware",
      category: "tools", 
      level: 45, 
      levelText: "مبتدی",
      icon: Wrench, 
      desc: "برنامه‌نویسی مقدماتی بردهای آردوینو، خوانش اطلاعات از سنسورهای مختلف دما (LM35) و فاصله سنجی اولتراسونیک. بهینه‌سازی مسیرها برای خلق سیستم‌های اتوماسیون قطعات فیزیکی سخت‌افزاری.",
      code: `// Microcontroller Telemetry Node for IoT Sensor
#include <WiFi.h>
#include <PubSubClient.h>

const char* SSID = "MRA_SECURE_LAN";
const char* PASSWORD = "CYBER_KEYPASS_V5";
const int AD_CONV_PIN = 34; // Dedicated ADC channel

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setup_wifi() {
  Serial.begin(115200);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) { delay(200); }
  Serial.println("[WIFI_CONNECTED]");
}

void loop() {
  int adcVal = analogRead(AD_CONV_PIN);
  float voltage = (adcVal * 3.3) / 4095.0;
  mqttClient.publish("telemetry/adc", String(voltage).c_str());
  delay(500);
}`
    },
    { 
      key: "flutter",
      name: "توسعه اپ Flutter موبایل", 
      englishName: "Flutter Mobile Cross-Platform",
      category: "frontend", 
      level: 50, 
      levelText: "مبتدی",
      icon: Sparkles, 
      desc: "آشنایی مقدماتی با فریم‌ورک Flutter به زبان دارت به منظور شبیه‌سازی رابط‌های کاربری تعاملی موبایل کاملاً همخوان بر روی هر دو بستر اندروید و آی‌او‌اس با سرعت بالا.",
      code: `// Flutter High-Performance Widget Architecture
import 'package:flutter/material.dart';

class DiagnosticsScreen extends StatefulWidget {
  const DiagnosticsScreen({super.key});
  @override
  State<DiagnosticsScreen> createState() => _DiagnosticsScreenState();
}

class _DiagnosticsScreenState extends State<DiagnosticsScreen> {
  double _efficiency = 0.98;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF030712),
      body: Center(
        child: CircularProgressIndicator(
          value: _efficiency,
          strokeWidth: 6.0,
          color: Colors.tealAccent,
        ),
      ),
    );
  }
}`
    },
    { 
      key: "photoshop",
      name: "Photoshop و گرافیک وب", 
      englishName: "Photoshop Suite",
      category: "frontend", 
      level: 75, 
      levelText: "متوسط",
      icon: PenTool, 
      desc: "اصلاح عیوب تصاویر، روتوش دقیق عکس‌های بستر وب، طراحی بنرهای تبلیغاتی، لوگوهای وکتور و فشرده‌سازی بسیار تخصصی حجم عکس‌ها بدون فدا کردن کیفیت جهت بهینه‌سازی بارگذاری صفحات وب.",
      code: `// Adobe ExtendScript Web Asset Compiler
var doc = app.activeDocument;
var rawWidth = doc.width;
var rawHeight = doc.height;

// Scale assets to target viewport layout
if (rawWidth > 1920) {
    doc.resizeImage(UnitValue(1920, "px"), null, 72, ResampleMethod.BICUBICSHARPER);
}

var outputOptions = new ExportOptionsSaveForWeb();
outputOptions.format = SaveDocumentType.PNG;
outputOptions.PNG8 = false;
outputOptions.transparency = true;

var fileRef = new File("~/Desktop/compressed_assets/optimized_viewport.png");
doc.exportDocument(fileRef, ExportType.SAVEFORWEB, outputOptions);`
    },
    { 
      key: "video",
      name: "تدوین و ویرایش ویدیو", 
      englishName: "Video Editing Suite",
      category: "frontend", 
      level: 78, 
      levelText: "متوسط",
      icon: Film, 
      desc: "ویرایش ویدیوها با CapCut، طراحی تیزرهای تبلیغاتی با افکت‌های صوتی و ویدیویی مدرن جهت اشتراک در یوتیوب یا شبکه‌های اجتماعی برای مستندسازی اصولی پروژه‌های نرم‌افزاری.",
      code: `{
  "codec_profile": "H.265 Main 10 @ L5.1 High",
  "target_bitrate_settings": {
    "audio_codec": "AAC-LC Audio Stream",
    "audio_bitrate": "320 kbps High Definition",
    "video_bitrate": "VBR 2-Pass (Target 18 Mbps, Max 24 Mbps)"
  },
  "resolution": "3840x2160 UHD Native 4K",
  "frame_rate_mode": "Constant Frame Rate 60.00 fps",
  "color_rendering": {
    "primaries": "BT.709 Standard Color Space",
    "transfer_function": "BT.709 Linear Optimized"
  }
}`
    },
    { 
      key: "ui",
      name: "طراحی رابط کاربری UI/UX", 
      englishName: "Modern UI / UX Specs",
      category: "frontend", 
      level: 80, 
      levelText: "متوسط",
      icon: MonitorSmartphone, 
      desc: "ایجاد وایرفریم‌ها، پروتوتایپ‌های رفتاری چشم‌نواز با تم‌های تاریک یا روشن برای رابط‌های وب و موبایل. مدیریت فضاها، رعایت قوانین تضاد نوری WCAG و درک فلوهای بصری کاربر نهایی.",
      code: `// UI/UX Design System Typography & Component Tokens
export const cyberThemeTokens = {
  fonts: {
    headings: "Space Grotesk, sans-serif",
    body: "Inter, sans-serif",
    data: "JetBrains Mono, monospace"
  },
  colors: {
    background: "#030712",
    tealNeon: "#14b8a6",
    cyanGlow: "#06b6d4",
    roseAlarm: "#f43f5e"
  },
  spacing: {
    tight: "6px",
    comfy: "16px",
    luxurious: "32px shadow-mesh"
  }
};`
    },
    { 
      key: "office",
      name: "مجموعه آفیس Microsoft 365", 
      englishName: "Microsoft 365 Analytics",
      category: "tools", 
      level: 72, 
      levelText: "متوسط",
      icon: FileSpreadsheet, 
      desc: "فرمول‌نویسی‌های آماری در مایکروسافت اکسل، محاسبات پیچیده، ایجاد ارائه‌های تحلیلی غنی در پاورپوینت، فرمت متون اسناد و هماهنگ‌سازی دیتاها برای ارائه‌های دقیق دفتری.",
      code: `-- Microsoft Excel Advanced Analytical Model
=IFS(AND(Telemetry!C2="ACTIVE", Telemetry!D2>=90), "HIGH_EFFICIENCY", Telemetry!C2="MAINTENANCE", "MONITORED", TRUE, "OFFLINE")
=XLOOKUP(A2, Project_Directory!$A$2:$A$500, Project_Directory!$D$2:$D$500, "NODE_NOT_SYNC", 0, 1)
=LET(total_sessions, COUNT(Sessions!B2:B5000), SUCCESS_RATE, COUNTIF(Sessions!E2:E5000, "COMPLETED") / total_sessions, SUCCESS_RATE)`
    }
  ];

  const skills = React.useMemo(() => {
    return rawSkills.map(sk => {
      const trans = getSkillTranslation(sk.key, lang);
      return {
        ...sk,
        name: trans?.name || sk.name,
        levelText: trans?.levelText || sk.levelText,
        desc: trans?.desc || sk.desc
      };
    });
  }, [lang]);

  // Hovered Skill tracking - defaults to Python Core Development
  const [hoveredSkillKey, setHoveredSkillKey] = React.useState<string>("python");
  const hoveredSkill = React.useMemo(() => {
    const raw = skills.find(s => s.key === hoveredSkillKey) || skills[0];
    return raw;
  }, [hoveredSkillKey, skills]);

  const runCompilationSimulation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileProgress(0);
    playRadarLockSound();

    const steps = [
      { log: `>> LINKING SYS_TARGET FOR NODE: ${hoveredSkill.key.toUpperCase()}...`, progress: 15 },
      { log: `>> STABILIZING SANDBOX HOST AT localhost:3000 -> INGRESS PIPELINE SECURE`, progress: 35 },
      { log: `>> RESOLVING INTERPRETER WRAPPER / ABSTRACT SYNTAX TREE GENERATION...`, progress: 55 },
      { log: `>> STATIC METRIC CHECK: INTEGRITY RATING = ${hoveredSkill.level}.00% ACCEPTED.`, progress: 75 },
      { log: `>> PIPELINE DISPATCHED. HEADING COMPILATION COMPLETED IN 4ms. ✓`, progress: 100 }
    ];

    setSimulationLogs([`>> INITIATING COMPILER COMMAND FOR [${hoveredSkill.englishName.toUpperCase()}]`]);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${step.log}`]);
        setCompileProgress(step.progress);
        playHoverSound();
        if (index === steps.length - 1) {
          setIsCompiling(false);
        }
      }, (index + 1) * 350);
    });
  };

  const handleCopyCode = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(hoveredSkill.code);
    setCodeCopied(true);
    playRadarLockSound();
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Innovative: On click, set active skill, select parent category to 'all' if needed, and dynamic frame auto scroll focus down
  const handleSkillSelection = (sk: any) => {
    setHoveredSkillKey(sk.key);

    // If active category is filtered and selected skill is outside, shift category to 'all' automatically
    if (selectedCategory !== 'all' && sk.category !== selectedCategory) {
      setSelectedCategory('all');
    }

    // High fidelity auto scroll centering
    setTimeout(() => {
      const el = document.getElementById(`skill-node-${sk.key}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        playRadarLockSound();
      }
    }, 120);
  };

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div 
      className={`py-12 md:py-16 min-h-[90vh] transition-colors duration-300 ${
        theme === 'light' ? 'text-slate-800' : 'text-gray-100'
      }`} 
      dir={dir}
    >
      
      {/* PERFECT SEAMLESS INFINTIE MARQUEE INJECTED CSS */}
      <style>{`
        @keyframes marqueeSmooth {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-smooth {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: marqueeSmooth 18s linear infinite;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Segment */}
        <div className={`border-b pb-6 mb-10 relative ${
          theme === 'light' ? 'border-slate-200' : 'border-dark-border/40'
        } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={`absolute top-0 hidden md:block ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
            <span className={`text-[10px] font-mono tracking-widest uppercase border px-3 py-1.5 rounded-full ${
              theme === 'light' ? 'bg-teal-50 border-cyber-teal/30 text-cyber-teal' : 'bg-cyan-950/40 border-cyber-teal/30 text-cyber-teal'
            }`}>
              SECURE PORTFOLIO ID: MRA-358
            </span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight font-sans flex items-center gap-2.5 ${
            theme === 'light' ? 'text-slate-900' : 'text-gray-100'
          } ${dir === 'rtl' ? 'justify-start' : 'justify-start flex-row-reverse'}`}>
            <span>{t.aboutTitle}</span>
            <Sparkles className="h-6 w-6 text-cyber-teal animate-pulse" />
          </h1>
          <p className={`mt-2 font-sans md:max-w-3xl text-sm leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-gray-400'
          }`}>
            {t.aboutSub}
          </p>
        </div>

        {/* Dynamic Global technology laser scroll tape (Marquee Banner - STRICTLY LTR FOR TRUE CSS TRANSITION REPEATABILITY) */}
        <div className={`rounded-2xl border p-1 relative overflow-hidden mb-12 shadow-2xl ${
          theme === 'light' 
            ? 'border-slate-200 bg-white/90 shadow-md' 
            : 'border-dark-border/50 bg-slate-950/70 shadow-2xl'
        }`} dir="ltr">
          <div className={`absolute inset-y-0 left-0 w-24 bg-gradient-to-r z-20 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/60 to-transparent' : 'from-dark-bg via-dark-bg/60 to-transparent'
          }`} />
          <div className={`absolute inset-y-0 right-0 w-24 bg-gradient-to-l z-20 pointer-events-none ${
            theme === 'light' ? 'from-white via-white/60 to-transparent' : 'from-dark-bg via-dark-bg/60 to-transparent'
          }`} />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden touch-none z-10">
            <motion.div 
               animate={{ x: ['-200%', '200%'] }}
               transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
               className="w-[200px] h-full bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent skew-x-12"
            />
          </div>

          <div className="py-2.5 overflow-hidden w-full relative">
            <div className="animate-marquee-smooth">
              
              {/* Part 1 */}
              <div className="flex gap-4 pr-4 shrink-0">
                {skills.map((sk, idx) => {
                  const ItemIcon = sk.icon;
                  return (
                    <div 
                      key={`marq1-${sk.key}-${idx}`} 
                      onMouseEnter={() => {
                        playHoverSound();
                        setHoveredSkillKey(sk.key);
                      }}
                      onClick={() => {
                        handleSkillSelection(sk);
                      }}
                      className={`flex items-center gap-3.5 px-4.5 py-3 rounded-xl border transition-all cursor-pointer group shadow-sm shrink-0 ${
                        hoveredSkill.key === sk.key 
                          ? theme === 'light'
                            ? 'bg-teal-55 border-cyber-teal shadow-[0_0_15px_rgba(20,184,166,0.12)]' 
                            : 'bg-teal-950/45 border-cyber-teal shadow-[0_0_15px_rgba(20,184,166,0.18)]' 
                          : theme === 'light'
                            ? 'bg-white border-slate-200 hover:border-cyber-teal/45 hover:bg-slate-50'
                            : 'bg-slate-900/40 border-dark-border/40 hover:border-cyber-teal/40 hover:bg-slate-950/80 hover:shadow-[0_0_10px_rgba(20,184,166,0.05)]'
                      }`}
                    >
                      <span className="text-cyber-teal group-hover:scale-110 transition-transform duration-300">
                        <ItemIcon className="w-4 h-4" />
                      </span>
                      <div className="flex flex-col items-start font-mono" dir="ltr">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-black transition-colors ${
                            theme === 'light' ? 'text-slate-800 group-hover:text-black' : 'text-gray-200 group-hover:text-white'
                          }`}>{sk.englishName}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-extrabold uppercase mt-0.5" dir="rtl">
                          <span className={theme === 'light' ? 'text-slate-500 font-sans' : 'text-gray-500'}>{sk.name}</span>
                          <span className="text-gray-700">•</span>
                          <span className="text-cyber-cyan text-[8px] font-mono tracking-wider">{sk.category === 'backend' ? 'CORE' : sk.category.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Part 2: Exact duplicate for frame-perfect seamless looping */}
              <div className="flex gap-4 pr-4 shrink-0" aria-hidden="true">
                {skills.map((sk, idx) => {
                  const ItemIcon = sk.icon;
                  return (
                    <div 
                      key={`marq2-${sk.key}-${idx}`} 
                      onMouseEnter={() => {
                        playHoverSound();
                        setHoveredSkillKey(sk.key);
                      }}
                      onClick={() => {
                        handleSkillSelection(sk);
                      }}
                      className={`flex items-center gap-3.5 px-4.5 py-3 rounded-xl border transition-all cursor-pointer group shadow-sm shrink-0 ${
                        hoveredSkill.key === sk.key 
                          ? theme === 'light'
                            ? 'bg-teal-55 border-cyber-teal shadow-[0_0_15px_rgba(20,184,166,0.12)]' 
                            : 'bg-teal-950/45 border-cyber-teal shadow-[0_0_15px_rgba(20,184,166,0.18)]' 
                          : theme === 'light'
                            ? 'bg-white border-slate-200 hover:border-cyber-teal/45 hover:bg-slate-50'
                            : 'bg-slate-900/40 border-dark-border/40 hover:border-cyber-teal/40 hover:bg-slate-950/80 hover:shadow-[0_0_10px_rgba(20,184,166,0.05)]'
                      }`}
                    >
                      <span className="text-cyber-teal group-hover:scale-110 transition-transform duration-300">
                        <ItemIcon className="w-4 h-4" />
                      </span>
                      <div className="flex flex-col items-start font-mono" dir="ltr">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-black transition-colors ${
                            theme === 'light' ? 'text-slate-800 group-hover:text-black' : 'text-gray-200 group-hover:text-white'
                          }`}>{sk.englishName}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-extrabold uppercase mt-0.5" dir="rtl">
                          <span className={theme === 'light' ? 'text-slate-500 font-sans' : 'text-gray-500'}>{sk.name}</span>
                          <span className="text-gray-700">•</span>
                          <span className="text-cyber-cyan text-[8px] font-mono tracking-wider">{sk.category === 'backend' ? 'CORE' : sk.category.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
        <div className="mb-14" id="academic-ethics-section">
          <div className={`flex items-center gap-3 mb-8 border-b pb-4 ${
            theme === 'light' ? 'border-slate-200' : 'border-dark-border/30'
          } ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`h-8 w-8 rounded-lg border flex items-center justify-center ${
              theme === 'light' ? 'bg-teal-50 border-cyber-teal/30' : 'bg-teal-950/50 border-cyber-teal/40'
            }`}>
              <UserCheck className="h-5 w-5 text-cyber-teal" />
            </div>
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <h2 className={`text-xl font-black font-sans tracking-wide ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>{t.aboutAcademicTitle}</h2>
              <p className="text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-widest">PERSONAL IDENTITY, EDUCATION & WORK CONSTRUCT STATUS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Scientific & Work Profile (نمایه علمی و کاری) */}
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(20,184,166,0.5)' }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group min-h-[320px] ${
                theme === 'light' 
                  ? 'border-slate-200 bg-white shadow-md' 
                  : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-2xl'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent" />
              
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-teal-50 border-cyber-teal/30 hover:bg-teal-100 hover:border-cyber-teal/60'
                      : 'bg-teal-950/40 border border-cyber-teal/30 group-hover:bg-teal-950/60 group-hover:border-cyber-teal/60'
                  }`}>
                    <GraduationCap className="h-6 w-6 text-cyber-teal" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-100'}`}>{local.aboutProfileTitle}</h3>
                    <span className="text-[9px] font-mono text-gray-500 uppercase">RESEARCH & WORK LANE</span>
                  </div>
                </div>
                
                <p className={`text-xs sm:text-sm leading-relaxed font-sans text-justify ${
                  theme === 'light' ? 'text-slate-650 font-medium' : 'text-gray-300'
                }`}>
                  {local.aboutProfileDesc}
                </p>

                {/* Micro tech bullet list on hover */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className={`text-[9px] font-mono border px-2 py-0.5 rounded-md ${
                    theme === 'light' 
                      ? 'bg-slate-50 text-cyber-teal border-cyber-teal/20' 
                      : 'bg-teal-950/30 text-cyber-teal border border-cyber-teal/20'
                  }`}>[ GEN_AI ]</span>
                  <span className={`text-[9px] font-mono border px-2 py-0.5 rounded-md ${
                    theme === 'light' 
                      ? 'bg-slate-50 text-cyber-cyan border-cyber-cyan/20' 
                      : 'bg-cyan-950/30 text-cyber-cyan border border-cyber-cyan/20'
                  }`}>[ PY_AUTOMATION ]</span>
                  <span className={`text-[9px] font-mono border px-2 py-0.5 rounded-md ${
                    theme === 'light' 
                      ? 'bg-slate-50 text-indigo-650 border-indigo-500/20' 
                      : 'bg-indigo-950/30 text-indigo-300 border border-indigo-500/20'
                  }`}>[ BACKEND_ENG ]</span>
                </div>
              </div>

              <div className={`border-t pt-4 mt-6 text-[10px] font-mono flex justify-between items-center p-2 rounded-lg ${
                theme === 'light' 
                  ? 'border-slate-100 bg-slate-50 text-slate-500' 
                  : 'border-dark-border/20 bg-slate-950/30 text-gray-500'
              }`}>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-teal animate-pulse" />
                  ROLE: AI DEVELOPER
                </span>
                <span className="text-cyber-teal font-bold bg-teal-950/40 px-1.5 py-0.5 rounded border border-cyber-teal/10">ACTIVE_LANE</span>
              </div>
            </motion.div>

            {/* Sharif University (گواهینامه دوره عالی) */}
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(6,182,212,0.5)' }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group min-h-[320px] ${
                theme === 'light' 
                  ? 'border-slate-200 bg-white shadow-md' 
                  : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-2xl'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
              
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-cyan-50 border-cyber-cyan/30 hover:bg-cyan-100 hover:border-cyber-cyan/60'
                      : 'bg-cyan-950/40 border border-cyber-cyan/30 group-hover:bg-cyan-950/60 group-hover:border-cyber-cyan/60'
                  }`}>
                    <Award className="h-5.5 w-5.5 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-100'}`}>{local.aboutSharifTitle}</h3>
                    <span className="text-[9px] font-mono text-cyan-400 font-semibold uppercase">SHARIF UNIV CREDENTIAL</span>
                  </div>
                </div>
                
                <p className={`text-xs sm:text-sm leading-relaxed font-sans text-justify ${
                  theme === 'light' ? 'text-slate-650 font-medium' : 'text-gray-300'
                }`}>
                  {local.aboutSharifDesc}
                </p>

                {/* Interactive metrics bar for credential rank */}
                <div className={`mt-4 p-2.5 rounded-xl border space-y-1.5 ${
                  theme === 'light' ? 'bg-slate-50 border-slate-150' : 'bg-slate-950/60 border border-dark-border/30'
                }`}>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500 font-bold">NATIONAL RANK</span>
                    <span className="text-cyber-cyan font-bold">#3 IN COUNTRY</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "99%" }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                    />
                  </div>
                </div>
              </div>

              <div className={`border-t pt-4 mt-6 text-[10px] font-mono text-cyber-cyan flex justify-between items-center p-2 rounded-lg font-bold ${
                theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-dark-border/20 bg-slate-950/30'
              }`} dir="ltr">
                <span>RANK_GLOBAL: #548</span>
                <span className="text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/10">VERIFIED ✓</span>
              </div>
            </motion.div>

            {/* Educational Background (دبیرستان نمونه علی‌شریعتی) */}
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(129,140,248,0.5)' }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group min-h-[320px] md:col-span-2 lg:col-span-1 ${
                theme === 'light' 
                  ? 'border-slate-200 bg-white shadow-md' 
                  : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-2xl'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-indigo-50 border-indigo-500/30 hover:bg-indigo-100 hover:border-indigo-500/60'
                      : 'bg-indigo-950/40 border-indigo-500/30 group-hover:bg-indigo-950/60 group-hover:border-indigo-500/60'
                  }`}>
                    <BookOpen className="h-5.5 w-5.5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-100'}`}>{local.aboutAcademicEnvTitle}</h3>
                    <span className="text-[9px] font-mono text-gray-500 uppercase">ACADEMIC TIMELINE</span>
                  </div>
                </div>
                
                <p className={`text-xs sm:text-sm leading-relaxed font-sans text-justify ${
                  theme === 'light' ? 'text-slate-650 font-medium' : 'text-gray-300'
                }`}>
                  {local.aboutAcademicEnvDesc}
                </p>

                {/* High quality academic route flow tracker */}
                <div className={`mt-4 flex items-center justify-between text-[10px] font-mono px-1 ${
                  theme === 'light' ? 'text-slate-500' : 'text-gray-500'
                }`}>
                  <span className="text-indigo-400">MATH_SCI [X]</span>
                  <div className={`flex-grow mx-3 border-t border-dashed ${theme === 'light' ? 'border-slate-200' : 'border-dark-border/80'}`} />
                  <span>DIPLOMA_NODE [2025]</span>
                </div>
              </div>

              <div className={`border-t pt-4 mt-6 text-[10px] font-mono flex justify-between items-center p-2 rounded-lg ${
                theme === 'light' ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-dark-border/20 bg-slate-950/30 text-gray-500'
              }`}>
                <span>ACADEMIC FIELD: MATHS</span>
                <span className="text-indigo-400 font-bold bg-indigo-950/40 px-1.5 py-0.5 rounded border border-indigo-500/10">SAMPLE_HIGH_SCH</span>
              </div>
            </motion.div>

            {/* Ethics Panel (اخلاقیات فردی و تیمی - full width on grid) */}
            <div className={`rounded-3xl border p-6 relative overflow-hidden md:col-span-2 lg:col-span-3 hover:border-cyber-teal/30 transition-all duration-500 shadow-2xl ${
              theme === 'light' 
                ? 'border-slate-200 bg-white shadow-md' 
                : 'border-dark-border/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950'
            }`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.06)_10%,_transparent_50%)] pointer-events-none" />
              
              <div className={`flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-5 mb-6 ${
                theme === 'light' ? 'border-slate-100' : 'border-dark-border/40'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center animate-pulse border ${
                    theme === 'light' ? 'bg-rose-50 border-rose-300' : 'bg-rose-955/50 border border-rose-500/40'
                  }`}>
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <h3 className={`text-base font-black font-sans ${theme === 'light' ? 'text-slate-800' : 'text-gray-100'}`}>{local.aboutEthicsTitle}</h3>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">TEAM_PLAY_COORDINATES // CODE_OF_CONDUCT_ALPHA</p>
                  </div>
                </div>

                <div className={`self-start sm:self-auto flex items-center gap-2 px-3 py-1 rounded-lg text-[9.5px] font-mono border ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200 text-emerald-600' : 'bg-slate-950 border-dark-border/40 text-emerald-400'
                }`}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  INTEGRITY SCORE: 100% OK
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Pillar 1 */}
                <motion.div 
                  whileHover={{ y: -6, skewY: -0.5, backgroundColor: theme === 'light' ? "rgba(242, 244, 247, 0.95)" : "rgba(15, 23, 42, 0.45)" }}
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all shadow-inner h-full md:min-h-[170px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-950/80 border-dark-border/30'
                  } hover:border-cyan-500/40`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono font-black text-cyber-cyan bg-cyan-950/40 border border-cyber-cyan/20 px-2 py-0.5 rounded">NODE_01</span>
                    <span className="text-cyan-400/30 text-xs font-bold font-mono">01/04</span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-black ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>{local.aboutPillar1Title}</h4>
                    <p className={`text-[11px] leading-relaxed mt-1 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>{local.aboutPillar1Desc}</p>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-cyber-cyan w-full" />
                  </div>
                </motion.div>

                {/* Pillar 2 */}
                <motion.div 
                  whileHover={{ y: -6, skewY: 0.5, backgroundColor: theme === 'light' ? "rgba(242, 244, 247, 0.95)" : "rgba(15, 23, 42, 0.45)" }}
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all shadow-inner h-full md:min-h-[170px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-950/80 border-dark-border/30'
                  } hover:border-cyber-teal/40`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono font-black text-cyber-teal bg-teal-950/40 border border-cyber-teal/20 px-2 py-0.5 rounded">NODE_02</span>
                    <span className="text-cyber-teal/30 text-xs font-bold font-mono">02/04</span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-black ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>{local.aboutPillar2Title}</h4>
                    <p className={`text-[11px] leading-relaxed mt-1 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>{local.aboutPillar2Desc}</p>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-cyber-teal w-full" />
                  </div>
                </motion.div>

                {/* Pillar 3 */}
                <motion.div 
                  whileHover={{ y: -6, skewY: -0.5, backgroundColor: theme === 'light' ? "rgba(242, 244, 247, 0.95)" : "rgba(15, 23, 42, 0.45)" }}
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all shadow-inner h-full md:min-h-[170px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-950/80 border-dark-border/30'
                  } hover:border-amber-500/40`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono font-black text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">NODE_03</span>
                    <span className="text-amber-500/30 text-xs font-bold font-mono">03/04</span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-black ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>{local.aboutPillar3Title}</h4>
                    <p className={`text-[11px] leading-relaxed mt-1 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>{local.aboutPillar3Desc}</p>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-amber-400 w-full" />
                  </div>
                </motion.div>

                {/* Pillar 4 */}
                <motion.div 
                  whileHover={{ y: -6, skewY: 0.5, backgroundColor: theme === 'light' ? "rgba(242, 244, 247, 0.95)" : "rgba(15, 23, 42, 0.45)" }}
                  className={`flex flex-col justify-between p-4 rounded-2xl border transition-all shadow-inner h-full md:min-h-[170px] ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-950/80 border-dark-border/30'
                  } hover:border-indigo-500/40`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono font-black text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded">NODE_04</span>
                    <span className="text-indigo-400/30 text-xs font-bold font-mono">04/04</span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-black ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`}>{local.aboutPillar4Title}</h4>
                    <p className={`text-[11px] leading-relaxed mt-1 text-justify ${theme === 'light' ? 'text-slate-650' : 'text-gray-400'}`}>{local.aboutPillar4Desc}</p>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden mt-3 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <div className="h-full bg-indigo-400 w-full" />
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>

        {/* WORKSTATION DIAGNOSTIC PANEL CONTROL CENTER: Placed on Top of Skills List Navigation */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-cyber-teal animate-pulse" />
            <h3 className={`text-base font-bold tracking-wide font-sans ${theme === 'light' ? 'text-slate-800' : 'text-cyan-400'}`}>{local.aboutCommandTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Visual Radar Scope card (takes 4 columns) */}
            <div className={`lg:col-span-4 rounded-xl border p-5 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 ${
              theme === 'light' 
                ? 'border-slate-200 bg-white hover:border-cyber-teal/30 hover:shadow-lg' 
                : 'border-dark-border/80 bg-slate-950/80 hover:border-cyber-teal/45 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)]'
            }`}>
              <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-teal" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-cyan" />
              
              <div>
                <h4 className={`text-[11px] font-extrabold tracking-wider uppercase font-mono mb-4 flex items-center justify-between border-b pb-2 ${
                  theme === 'light' ? 'text-slate-800 border-slate-100' : 'text-cyan-400 border-dark-border/40'
                }`}>
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    SYSTEM DIAGNOSTIC SCOPE
                  </span>
                  <span className="text-[9px] text-emerald-500 animate-pulse font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    LIVE
                  </span>
                </h4>
 
                {/* Animated Target Locking Radar Sweep */}
                <div className="my-4">
                   <RadarScanner level={hoveredSkill.level} />
                </div>
              </div>
 
              {/* Advanced visual diagnostic widgets & active node statistics */}
              <div className="space-y-3.5 mt-4">
                {/* Real-time Oscilloscope Wavesignal */}
                <InteractiveWaveform />
 
                {/* HUD 2x2 statistics grid */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono leading-tight">
                  <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border border-dark-border/30'
                  }`}>
                    <span className="text-gray-500 uppercase tracking-wider text-[7.5px]">TARGET_NODE</span>
                    <span className={`font-black mt-1 truncate uppercase ${theme === 'light' ? 'text-slate-800' : 'text-cyber-cyan'}`} dir="ltr">{hoveredSkill.key}</span>
                  </div>
                  
                  <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border border-dark-border/30'
                  }`}>
                    <span className="text-gray-500 uppercase tracking-wider text-[7.5px]">SYS_INTEGRITY</span>
                    <span className="text-emerald-500 font-bold mt-1">99.98% OK</span>
                  </div>
 
                  <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border border-dark-border/30'
                  }`}>
                    <span className="text-gray-500 uppercase tracking-wider text-[7.5px]">THREAD_CLASS</span>
                    <span className={`font-bold mt-1 uppercase truncate ${theme === 'light' ? 'text-slate-700' : 'text-indigo-400'}`} dir="ltr">{hoveredSkill.category}</span>
                  </div>
 
                  <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border border-dark-border/30'
                  }`}>
                    <span className="text-gray-500 uppercase tracking-wider text-[7.5px]">CAP_REACH</span>
                    <span className={`font-bold mt-1 ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`}>{hoveredSkill.levelText}</span>
                  </div>
                </div>
 
                <div className="text-[8.5px] text-gray-500 text-center font-mono leading-none pt-1">
                  SECURE BIND PROTOCOL // CHAN_PORT: 3000
                </div>
              </div>
            </div>
 
            {/* Extremely generous active compiler sandbox typing shell console (takes 8 columns) */}
            <div className={`lg:col-span-8 rounded-xl border p-5 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 ${
              theme === 'light' 
                ? 'border-slate-200 bg-white hover:border-cyber-cyan/30 hover:shadow-lg' 
                : 'border-dark-border/80 bg-slate-950/90 hover:border-cyber-cyan/30'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
                theme === 'light' ? 'border-slate-100' : 'border-dark-border/30'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-teal animate-ping" />
                  <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>ACTIVE FILE SANDBOX COMPILER INTERFACE</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className={`text-[9.5px] font-mono px-2.5 py-1 rounded transition-all transition-colors cursor-pointer select-none border ${
                      theme === 'light' 
                        ? 'text-slate-600 bg-slate-50 hover:bg-slate-100 border-slate-200 hover:text-slate-900' 
                        : 'text-gray-400 hover:text-white bg-slate-900 hover:bg-slate-800 border-dark-border/60'
                    }`}
                  >
                    {codeCopied ? t.playCopied : (lang === 'fa' ? 'کپی اسکریپت' : lang === 'ar' ? 'نسخ السكربت' : t.playCopy || 'Copy Script')}
                  </button>
                  <span className="text-[10.5px] font-mono text-cyber-cyan font-black bg-cyan-950/30 border border-cyber-cyan/30 px-2.5 py-0.5 rounded uppercase">
                    Telemetry: {hoveredSkill.englishName}
                  </span>
                </div>
              </div>
 
              {/* Upper typewriter sandbox code */}
              <div className="space-y-3">
                <TypewriterCode code={hoveredSkill.code} />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-3 border-t border-dark-border/20 mt-4">
                <span>COMPILER STATUS: READY</span>
                <span>BAUD RATE: 115200</span>
              </div>
            </div>

          </div>
        </div>

        {/* INTEGRATED SKILLS LIST CATEGORIZED UNDERNEATH THE CONTROL SECTION */}
        <div id="skills-workbench-section" className="space-y-6">
          
          {/* Subheading selector row */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b pb-5 ${
            theme === 'light' ? 'border-slate-200' : 'border-dark-border/40'
          }`}>
            <h2 className={`text-xl font-black font-sans flex items-center gap-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-gray-100'
            } ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
              <Activity className="h-5 w-5 text-cyber-cyan animate-pulse" />
              <span>{t.aboutSkillsTitle}</span>
            </h2>
            <div className={`grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 p-1.5 rounded-2xl relative w-full lg:w-auto ${
              theme === 'light' ? 'bg-slate-100 border border-slate-200' : 'bg-slate-950/90 border border-dark-border/80'
            }`}>
              {[
                { id: 'all', label: t.aboutCatAll, icon: Layers, fullWidth: false },
                { id: 'backend', label: t.aboutCatBackend, icon: Server, fullWidth: false },
                { id: 'ai', label: t.aboutCatAI, icon: Bot, fullWidth: false },
                { id: 'frontend', label: t.aboutCatFrontend, icon: MonitorSmartphone, fullWidth: false },
                { id: 'tools', label: t.aboutCatTools, icon: Wrench, fullWidth: true }
              ].map((cat) => {
                const CatIcon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id as any);
                      playHoverSound();
                    }}
                    className={`relative px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold sm:font-bold cursor-pointer transition-all duration-300 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 select-none ${cat.fullWidth ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    {/* Sliding glowing backdrop element using Framer Motion */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterBackdrop"
                        transition={{ type: "spring", stiffness: 220, damping: 22 }}
                        className={`absolute inset-0 rounded-xl shadow-md ${
                          theme === 'light' ? 'bg-white border border-slate-300 shadow-slate-100' : 'bg-teal-950/30 border border-cyber-teal/40'
                        }`}
                      />
                    )}
                    
                    <span className={`relative z-10 flex items-center gap-1.5 sm:gap-2 ${
                      isActive 
                        ? theme === 'light' ? 'text-cyber-teal font-black' : 'text-cyber-cyan' 
                        : theme === 'light' 
                          ? 'text-slate-500 hover:text-slate-800' 
                          : 'text-gray-400 hover:text-white'
                    }`}>
                      <CatIcon className="w-3.5 h-3.5" />
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Core Panel containing telemetry grid elements with high-end border frame */}
          <div className={`rounded-2xl border p-4 sm:p-6 relative overflow-hidden shadow-2xl ${
            theme === 'light' ? 'border-slate-200 bg-white shadow-md' : 'border-dark-border/40 bg-slate-950/20 shadow-2xl'
          }`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-dark-bg/0 to-dark-bg/0 pointer-events-none rounded-xl" />

            <div className={`flex items-center justify-between border-b pb-3 mb-6 ${
              theme === 'light' ? 'border-slate-100' : 'border-dark-border/30'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-pulse" />
                <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>نگه داشتن یا کلیک روی کارت هر مهارت جهت فراخوانی زنده در کنسول فرماندهی بالا</span>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((sk) => (
                  <SkillTelemetryNode 
                    key={sk.key} 
                    sk={sk} 
                    onHover={() => setHoveredSkillKey(sk.key)}
                    isSelected={hoveredSkill.key === sk.key}
                  />
                ))}
              </div>

              {filteredSkills.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-sans">هیچ مهارتی در این دسته‌ی تخصص یافت نشد.</div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
