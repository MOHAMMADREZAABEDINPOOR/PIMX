import { useLanguageTheme } from '../context/LanguageThemeContext';
import { useCallback } from 'react';
import { translateSiteText } from './site_text';
export function useSiteText() {
  const { lang } = useLanguageTheme();
  return useCallback(<T,>(value:T):T => translateSiteText(lang,value),[lang]);
}
