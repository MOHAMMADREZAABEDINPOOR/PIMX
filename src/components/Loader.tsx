import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Zap, Sparkles, Layers, Code2, Database, Bot } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

export default function Loader() {
  const { isLoading, theme, t, lang, fontClass } = useLanguageTheme();
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('');
  const [currentIcon, setCurrentIcon] = useState(0);

  // Rotating icons for visual interest
  const loadingIcons = [
    <Cpu key="cpu" className="h-10 w-10" />,
    <Code2 key="code" className="h-10 w-10" />,
    <Database key="db" className="h-10 w-10" />,
    <Bot key="bot" className="h-10 w-10" />,
    <Layers key="layers" className="h-10 w-10" />
  ];

  // Micro-step simulated compilation log labels
  const progressLogs = [
    t.loadingInitializing || "INITIALIZING DATA SHELL",
    t.loadingCompiling || "COMPILING DESIGN MATRIX",
    t.loadingDecrypting || "DECRYPTING PORTFOLIO TUNNEL"
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 4;
        const next = Math.min(prev + step, 100);
        return next;
      });
    }, 150);

    // Rotate icons every 500ms
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % loadingIcons.length);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(iconInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (progress < 40) {
      setStatusLog(progressLogs[0]);
    } else if (progress < 80) {
      setStatusLog(progressLogs[1]);
    } else {
      setStatusLog(progressLogs[2]);
    }
  }, [progress, lang]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
            theme === 'light'
              ? 'loader-bg-light text-slate-900'
              : 'loader-bg-dark text-gray-100'
          }`}
          id="premium-loader-viewport"
        >
          {/* Animated Triangular Background Orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ 
                y: [0, -40, 0], 
                x: [0, 20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8, 
                ease: "easeInOut" 
              }}
              className="absolute top-10 right-10 h-64 w-64 rounded-full bg-cyber-teal/5 blur-3xl"
            />
            <motion.div
              animate={{ 
                y: [0, 40, 0], 
                x: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-cyber-cyan/5 blur-3xl"
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col items-center max-w-lg px-6 text-center z-10">
            
            {/* Animated Central Core */}
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.3, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className={`absolute w-36 h-36 rounded-full border-2 ${
                  theme === 'light' ? 'border-cyber-teal/20' : 'border-cyber-teal/30'
                }`}
              />
              
              {/* Middle Spinning Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className={`absolute w-28 h-28 rounded-full border border-dashed ${
                  theme === 'light' ? 'border-cyber-cyan/40' : 'border-cyber-cyan/30'
                }`}
              />
              
              {/* Inner Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className={`absolute w-20 h-20 rounded-full border border-cyber-teal/50 border-t-transparent origin-center`}
              />

              {/* Central Icon Container */}
              <motion.div
                key={currentIcon}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className={`relative flex items-center justify-center w-16 h-16 rounded-2xl backdrop-blur-sm ${
                  theme === 'light' 
                    ? 'bg-white/80 shadow-[0_0_30px_rgba(20,184,166,0.3)] border border-cyber-teal/40' 
                    : 'bg-slate-900/80 border border-cyber-teal/50 shadow-[0_0_40px_rgba(20,184,166,0.4)]'
                }`}
              >
                <div className="text-cyber-teal">
                  {loadingIcons[currentIcon]}
                </div>
              </motion.div>

              {/* Scanning Laser Effect */}
              <div className="absolute inset-0 w-full h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,1)] absolute top-0 left-1/2 -translate-x-1/2" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-teal shadow-[0_0_10px_rgba(20,184,166,1)] absolute bottom-0 left-1/2 -translate-x-1/2" />
                </motion.div>
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-5 border ${
                theme === 'light'
                  ? 'bg-teal-50/70 border-cyber-teal/50 text-cyber-teal'
                  : 'bg-teal-950/30 border-cyber-teal/40 text-cyber-teal'
              }`}
            >
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              <span>PORTFOLIO_SYSTEM_BOOT</span>
              <Sparkles className="h-3.5 w-3.5 animate-ping" />
            </motion.div>

            {/* Main Title */}
            <h2 className={`text-lg font-black tracking-widest uppercase mb-2 drop-shadow-lg text-center ${fontClass}`}>
              <span className="text-cyber-teal">M.R.A</span> PORTFOLIO
            </h2>

            {/* Subtitle */}
            <p className={`text-xs opacity-70 mb-4 ${fontClass}`}>
              Loading experience...
            </p>

            {/* Dynamic Status Messages */}
            <div className={`h-10 flex items-center justify-center gap-2 px-6 py-2 rounded-xl ${
              theme === 'light' 
                ? 'bg-slate-100/70 text-slate-700' 
                : 'bg-slate-900/60 text-cyan-300'
            } font-mono text-sm font-semibold border ${
              theme === 'light' ? 'border-slate-200' : 'border-dark-border'
            }`}>
              <Terminal className="h-4 w-4 animate-pulse shrink-0" />
              <span className="text-center">{statusLog}...</span>
            </div>

            {/* Enhanced Progress Bar */}
            <div className={`w-72 h-2 rounded-full overflow-hidden mt-5 relative border ${
              theme === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-dark-border'
            }`}>
              {/* Background Stripes */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(20,184,166,0.1)_10px,rgba(20,184,166,0.1)_20px)]" />
              </div>
              
              {/* Active Progress Fill */}
              <motion.div
                style={{ width: `${progress}%` }}
                className="relative h-full bg-gradient-to-r from-cyber-teal via-cyber-cyan to-cyber-emerald shadow-[0_0_20px_rgba(20,184,166,0.6)] rounded-full transition-all duration-100"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.div>
            </div>

            {/* Percentage & Progress Dots */}
            <div className="flex items-center justify-between w-72 mt-3">
              <span className="text-[11px] font-mono opacity-60">
                {progress}%
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: progress > (i + 1) * 20 ? [1, 1.2, 1] : 1,
                      opacity: progress > (i + 1) * 20 ? 1 : 0.3
                    }}
                    transition={{ 
                      repeat: progress > (i + 1) * 20 ? Infinity : 0,
                      duration: 0.6 
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      progress > (i + 1) * 20 
                        ? 'bg-cyber-teal shadow-[0_0_8px_rgba(20,184,166,0.8)]' 
                        : theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
