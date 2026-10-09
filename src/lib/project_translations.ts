import { githubProjects } from './github_projects';
import { getIndependentProjects } from './independent_projects';
import { previousPortfolioProjects } from './legacy_project_translations';
import { refineLegacyProject } from './legacy_project_details';
import { hasProjectScreenshot, projectScreenshots } from './project_visuals';
import { translateSiteText } from './site_text';
import type { LanguageType } from './translations';
import { getRecentProjectCopy } from './recent_projects';

export interface TranslatedProjectItem {
  id: string;
  badge: string;
  title: string;
  titleEn: string;
  description: string;
  features?: string[];
  link?: string;
  githubUrl?: string;
  accent: 'teal' | 'cyan' | 'indigo' | 'emerald' | 'rose' | 'violet' | 'gold';
  category: 'featured' | 'ai' | 'web' | 'automation';
  language?: string;
  technologies?: string[];
  topics?: string[];
  updatedAt?: string;
  readmeExcerpt?: string;
  readmeUrl?: string;
  repoName?: string;
  isFork?: boolean;
  forkSourceUrl?: string;
  isArchived?: boolean;
  liveStatus?: 'verified' | 'unavailable' | 'unknown';
  linkKind?: 'website' | 'bot';
  activitySource?: 'http' | 'owner';
  verifiedAt?: string;
  stars?: number;
  origin?: 'github' | 'portfolio';
  previewImage?: string;
  sourceNote?: string;
  githubLinkKind?: 'source' | 'record';
}

/** Public portfolio selection plus original work without a matching repository. */
export function getTranslatedProjects(lang: string): TranslatedProjectItem[] {
  const catalog = githubProjects.map(project => ({
    ...project,
    title: lang === 'fa' ? project.titleFa : project.titleEn,
    description: lang === 'fa' ? project.descriptionFa : project.description,
    features: lang === 'fa' ? project.featuresFa || project.features : project.features,
    ...getRecentProjectCopy(project.id, lang),
  }));
  const independent = getIndependentProjects(lang);
  const knownIds = new Set([...catalog, ...independent].map(project => project.id));
  const previousWork = (previousPortfolioProjects[lang] || previousPortfolioProjects.en).filter(project => !knownIds.has(project.id));
  return [...catalog, ...independent, ...previousWork.map(project => refineLegacyProject(project, lang))]
    .filter(project => project.id !== 'github-pimx')
    .map(project => ({ ...project, previewImage: projectScreenshots[project.id], title:translateSiteText(lang as LanguageType,project.title), badge:translateSiteText(lang as LanguageType,project.badge), description:translateSiteText(lang as LanguageType,project.description), features:translateSiteText(lang as LanguageType,project.features), sourceNote:translateSiteText(lang as LanguageType,project.sourceNote) }))
    .sort((a, b) => Number(hasProjectScreenshot(b.id)) - Number(hasProjectScreenshot(a.id)));
}

const completePortfolioCatalog = getTranslatedProjects('en');
export const portfolioCatalogStats = {
  totalProjects: completePortfolioCatalog.length,
  repositories: githubProjects.length,
  originalRepositories: githubProjects.filter(project => !project.isFork).length,
  forks: githubProjects.filter(project => project.isFork).length,
  liveWebsites: completePortfolioCatalog.filter(project => project.liveStatus === 'verified' && project.linkKind !== 'bot' && project.link).length,
  liveBots: completePortfolioCatalog.filter(project => project.liveStatus === 'verified' && project.linkKind === 'bot' && project.link).length,
  portfolioRecords: completePortfolioCatalog.filter(project => project.origin === 'portfolio').length,
};
