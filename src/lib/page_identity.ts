import type { PageType } from '../types';

/** Navigation, accents and scroll signatures share each page's identity. */
export const pageIdentities: Record<PageType, { color: string; light: string; word: string; index: string }> = {
  home: { color: '#e8fa72', light: '#657828', word: 'PIMX', index: '00' },
  projects: { color: '#a1d8ff', light: '#236593', word: 'WORLDS', index: '01' },
  about: { color: '#b8f394', light: '#38733f', word: 'HUMAN', index: '02' },
  playground: { color: '#ffd49b', light: '#936126', word: 'KNOWLEDGE', index: '03' },
  resume: { color: '#ece9db', light: '#756249', word: 'THE STORY', index: '04' },
  contact: { color: '#b1a9ef', light: '#6c5f9f', word: 'CONNECT', index: '05' },
};
