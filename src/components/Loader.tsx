import { useSiteText } from '../lib/useSiteText';
import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguageTheme } from '../context/LanguageThemeContext';
import '../styles/shell.css';

export default function Loader() {
  const l = useSiteText();
  const { isLoading, lang } = useLanguageTheme();
  const reducedMotion = useReducedMotion();
  const label =
    lang === 'fa'
      ? 'در حال آماده‌سازی'
      : lang === 'ar'
        ? 'جارٍ التحضير'
        : 'One moment';
  return (
    <AnimatePresence>
      {l(isLoading && (
        <motion.div
          className="shell-loader"
          id="premium-loader-viewport"
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <div className="shell-loader-content">
            <span className="shell-wordmark shell-loader-wordmark" dir="ltr">
              PIMX
              <span className="shell-wordmark-star" aria-hidden="true">
                ✳
              </span>
              <span className="shell-wordmark-period">.</span>
            </span>
            <div
              className="shell-loader-track"
              role="progressbar"
              aria-label={l(label)}
            >
              <span />
            </div>
            <p>
              {l(label)}
              <span aria-hidden="true"> …</span>
            </p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
