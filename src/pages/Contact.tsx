import React from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  Mail, 
  Github, 
  ExternalLink
} from 'lucide-react';
import { useLanguageTheme } from '../context/LanguageThemeContext';

// Holographic futuristic digital sound synthesizer blip on hover
const playHoverSound = () => {
  // Sshhh... silence
};

export default function Contact() {
  const { theme, dir, t } = useLanguageTheme();

  return (
    <div 
      className={`py-16 md:py-24 min-h-[90vh] relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'text-slate-850' : 'text-gray-100'
      }`} 
      dir={dir}
    >
      
      {/* Background radial gradient overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div className={`text-center border-b pb-8 mb-16 max-w-4xl mx-auto ${theme === 'light' ? 'border-slate-200' : 'border-dark-border/30'}`}>
          <div className="flex justify-center items-center gap-2.5 mb-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-teal animate-ping" />
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest border px-3 py-1 rounded-md ${
              theme === 'light' ? 'bg-teal-50 border-cyber-teal/30 text-cyber-teal' : 'bg-teal-950/40 border-cyber-teal/20 text-cyber-teal'
            }`}>
              {t.contactBadge}
            </span>
          </div>
          <h1 className={`text-3xl md:text-5xl font-black font-sans tracking-wide ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
            {t.contactTitle}
          </h1>
          <p className="text-gray-400 mt-4 font-sans leading-relaxed text-sm md:text-base max-w-xl mx-auto font-medium">
            {t.contactSub}
          </p>
        </div>

        {/* Layout Grid (Exactly designed to match About Page cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* GitHub Card Node */}
          <motion.a 
            href="https://github.com/MOHAMMADREZAABEDINPOOR"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            whileHover={{ y: -8, borderColor: 'rgba(20,184,166,0.5)', boxShadow: '0 10px 30px -10px rgba(20,184,166,0.15)' }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group cursor-pointer ${
              theme === 'light' 
                ? 'bg-white border-slate-250 shadow-slate-150' 
                : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-[#010204]'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent" />
            
            <div>
              <div className={`flex items-center gap-4 mb-6 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-teal-50 border-cyber-teal/30' 
                    : 'bg-teal-950/40 border-cyber-teal/30 group-hover:bg-teal-950/60 group-hover:border-cyber-teal/60'
                }`}>
                  <Github className="h-6 w-6 text-cyber-teal" />
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className={`text-base font-bold font-sans group-hover:text-cyber-teal transition-colors ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
                    {t.contactGithubTitle}
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">{t.contactGithubSub}</span>
                </div>
              </div>
              
              <p className={`text-xs leading-relaxed font-sans font-medium text-justify ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                {t.contactGithubDesc}
              </p>

              {/* Micro tech cards/badges */}
              <div className={`mt-5 flex flex-wrap gap-1.5 ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                <span className="text-[9px] font-mono bg-teal-950/20 text-cyber-teal border border-cyber-teal/20 px-2.5 py-0.5 rounded-md">[ CODE ]</span>
                <span className="text-[9px] font-mono bg-indigo-950/20 text-indigo-300 border border-indigo-500/10 px-2.5 py-0.5 rounded-md">[ PY_MODULES ]</span>
              </div>
            </div>

            <div className={`border-t pt-4 mt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center p-2.5 rounded-lg ${
              theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-dark-border/20 bg-slate-150/5'
            }`}>
              <span className="flex items-center gap-1.5 direction-ltr">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-teal animate-pulse" />
                MH-REZA
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-cyber-teal opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>

          {/* Telegram Card Node */}
          <motion.a 
            href="https://t.me/@Pleasechangetheworld"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            whileHover={{ y: -8, borderColor: 'rgba(6,182,212,0.5)', boxShadow: '0 10px 30px -10px rgba(6,182,212,0.15)' }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group cursor-pointer ${
              theme === 'light' 
                ? 'bg-white border-slate-250 shadow-slate-150' 
                : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-[#010204]'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
            
            <div>
              <div className={`flex items-center gap-4 mb-6 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-cyan-50 border-cyber-cyan/30' 
                    : 'bg-cyan-950/40 border-cyber-cyan/30 group-hover:bg-cyan-950/60 group-hover:border-cyber-cyan/60'
                }`}>
                  <Send className="h-6 w-6 text-cyber-cyan -rotate-45" />
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className={`text-base font-bold font-sans group-hover:text-cyber-cyan transition-colors ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
                    {t.contactTelegramTitle}
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">{t.contactTelegramSub}</span>
                </div>
              </div>
              
              <p className={`text-xs leading-relaxed font-sans font-medium text-justify ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                {t.contactTelegramDesc}
              </p>

              {/* Micro tech cards/badges */}
              <div className={`mt-5 flex flex-wrap gap-1.5 ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                <span className="text-[9px] font-mono bg-cyan-950/20 text-cyber-cyan border border-cyber-cyan/20 px-2.5 py-0.5 rounded-md">[ FAST_CONN ]</span>
                <span className="text-[9px] font-mono bg-violet-950/20 text-violet-300 border border-violet-500/10 px-2.5 py-0.5 rounded-md">[ CHAT_AGENT ]</span>
              </div>
            </div>

            <div className={`border-t pt-4 mt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center p-2.5 rounded-lg ${
              theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-dark-border/20 bg-slate-150/5'
            }`}>
              <span className="flex items-center gap-1.5 direction-ltr">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                ID: @Pleasechangetheworld
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>

          {/* Email Card Node */}
          <motion.a 
            href="mailto:mohammadrezaabedinpoor6@gmail.com"
            onMouseEnter={playHoverSound}
            whileHover={{ y: -8, borderColor: 'rgba(99,102,241,0.5)', boxShadow: '0 10px 30px -10px rgba(99,102,241,0.15)' }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={`rounded-2xl border p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group cursor-pointer ${
              theme === 'light' 
                ? 'bg-white border-slate-250 shadow-slate-150' 
                : 'border-dark-border/60 bg-gradient-to-b from-slate-900/60 to-slate-950/80 shadow-[#010204]'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -top-[1px] right-8 w-16 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            
            <div>
              <div className={`flex items-center gap-4 mb-6 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-indigo-50 border-indigo-500/20' 
                    : 'bg-indigo-950/40 border-indigo-500/30 group-hover:bg-indigo-950/60 group-hover:border-indigo-500/60'
                }`}>
                  <Mail className="h-6 w-6 text-indigo-400" />
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className={`text-base font-bold font-sans group-hover:text-indigo-400 transition-colors ${theme === 'light' ? 'text-slate-900' : 'text-gray-100'}`}>
                    {t.contactEmailTitle}
                  </h3>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">{t.contactEmailSub}</span>
                </div>
              </div>
              
              <p className={`text-xs leading-relaxed font-sans font-medium text-justify ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                {t.contactEmailDesc}
              </p>

              {/* Micro tech cards/badges */}
              <div className={`mt-5 flex flex-wrap gap-1.5 ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                <span className="text-[9px] font-mono bg-indigo-950/20 text-indigo-300 border border-indigo-500/10 px-2.5 py-0.5 rounded-md">[ INBOX ]</span>
                <span className={`text-[9px] font-mono border px-2.5 py-0.5 rounded-md ${
                  theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-900 text-cyan-350 border-dark-border'
                }`}>[ COLLAB ]</span>
              </div>
            </div>

            <div className={`border-t pt-4 mt-6 text-[10px] font-mono text-gray-500 flex justify-between items-center p-2.5 rounded-lg ${
              theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-dark-border/20 bg-slate-150/5'
            }`}>
              <span className="flex items-center gap-1.5 direction-ltr">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {t.contactConnected}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>

        </div>

      </div>
    </div>
  );
}
