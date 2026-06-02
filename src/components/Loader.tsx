import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

export default function Loader() {
  const { isLoading, theme, t, lang } = useLanguageTheme();
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('');

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
        const step = Math.floor(Math.random() * 15) + 5;
        const next = Math.min(prev + step, 100);
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
            theme === 'light'
              ? 'loader-bg-light text-slate-900'
              : 'loader-bg-dark text-gray-100'
          }`}
          id="premium-loader-viewport"
        >
          {/* Cybernetic grid lines backdrop */}
          <div className={`absolute inset-0 opacity-[0.03] select-none pointer-events-none ${theme === 'light' ? 'bg-plus-grid scale-105' : 'bg-plus-grid'}`} />

          {/* Premium Glowing Core */}
          <div className="relative flex flex-col items-center max-w-md px-6 text-center">
            
            {/* Spinning Radar concentric rings + central CPU logo */}
            <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
              {/* Outer dashed spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className={`absolute w-32 h-32 rounded-full border-2 border-dashed ${
                  theme === 'light' ? 'border-cyber-teal/30' : 'border-cyber-teal/20'
                }`}
              />
              
              {/* Inner fast spin ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className={`absolute w-24 h-24 rounded-full border border-cyber-cyan/40 border-r-transparent origin-center`}
              />

              {/* Hexagon tech core container */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className={`relative flex items-center justify-center w-16 h-16 rounded-2xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-[0_0_20px_rgba(20,184,166,0.2)] border border-cyber-teal/50' 
                    : 'bg-slate-950 border border-cyber-teal/60 shadow-[0_0_25px_rgba(20,184,166,0.3)]'
                }`}
              >
                <Cpu className="h-8 w-8 text-cyber-teal animate-pulse" />
              </motion.div>

              {/* Sweeping laser pointer */}
              <div className="absolute inset-0 w-full h-full animate-[spin_1.8s_linear_infinite]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_12px_rgba(6,182,212,1)] absolute top-0 left-1/2 -translate-x-1/2" />
              </div>
            </div>

            {/* Micro details: Signal Integrity Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-mono font-black uppercase tracking-[0.2em] mb-4 border ${
                theme === 'light'
                  ? 'bg-teal-50 border-cyber-teal/40 text-cyber-teal'
                  : 'bg-teal-950/40 border-cyber-teal/30 text-cyber-teal'
              }`}
            >
              <Zap className="h-3 w-3 animate-bounce" />
              <span>SYSTEM_READY_ENGAGING</span>
            </motion.div>

            {/* Translation state title */}
            <h2 className="text-sm font-black font-mono tracking-widest uppercase mb-1 drop-shadow-md text-center opacity-85">
              M.R.A PORTFOLIO CORE
            </h2>

            {/* Dynamic Status messages translated */}
            <div className={`h-8 flex items-center justify-center ${theme === 'light' ? 'text-slate-600' : 'text-cyan-400'} font-mono text-xs font-semibold px-4`}>
              <Terminal className="h-3.5 w-3.5 mr-2 animate-pulse shrink-0" />
              <span className="text-center truncate">{statusLog}...</span>
            </div>

            {/* Fullwidth Progress Bar */}
            <div className={`w-64 h-1.5 rounded-full overflow-hidden mt-4 relative border ${
              theme === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-slate-950 border-dark-border'
            }`}>
              {/* Active glow filler */}
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyber-teal to-cyber-cyan shadow-[0_0_10px_rgba(20,184,166,0.8)] rounded-full transition-all duration-150"
              />
            </div>

            {/* Percentage Indicator */}
            <span className="text-[10px] font-mono text-gray-500 font-bold mt-2">
              COMPILING_SYSTEM: {progress}%
            </span>

            {/* Tiny decoration bar */}
            <div className="flex gap-1 mt-6">
              <span className={`w-1.5 h-1.5 rounded-full ${progress > 25 ? 'bg-cyber-teal' : 'bg-gray-700/40'}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${progress > 50 ? 'bg-cyber-teal' : 'bg-gray-700/40'}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${progress > 75 ? 'bg-cyber-teal' : 'bg-gray-700/40'}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${progress >= 100 ? 'bg-cyber-teal' : 'bg-gray-700/40'}`} />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
