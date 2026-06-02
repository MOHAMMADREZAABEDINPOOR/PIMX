export type PageType = 'home' | 'about' | 'projects' | 'playground' | 'contact' | 'resume';

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  longDescription: string;
  longDescriptionEn: string;
  technologies: string[];
  category: 'ai' | 'web' | 'agent';
  imagePlaceholder: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface PromptTemplate {
  name: string;
  nameEn: string;
  category: string;
  basePrompt: string;
}

export interface OptimizeResponse {
  optimizedPrompt: string;
  explanation: string;
  originalResult: string;
  optimizedResult: string;
}
