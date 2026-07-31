import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Route {
  name: string;
  path: string;
}

export interface Social {
  icon: IconDefinition;
  link: string;
}

export interface JobBulletItem {
  text: string;
  children?: JobBulletItem[];
}

export interface JobReference {
  label: string;
  url: string;
}

export interface WorkJobContent {
  title: string;
  location: string;
  paragraphs: string[];
  bullets?: JobBulletItem[];
}

export interface JobItem {
  title: string;
  location: string;
  start: string;
  end: string;
  url: string;
  paragraphs: string[];
  bullets?: JobBulletItem[];
  references?: JobReference[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  siteUrl?: string;
  githubUrl?: string;
  githubRepositories: string[];
  fallbackLanguages: ProjectLanguage[];
  languages: ProjectLanguage[];
  image?: string;
  imageAlt?: string;
  accent: ProjectAccent;
  highlights?: string[];
}

export interface ProjectLanguage {
  name: string;
  percentage: number;
}

export interface ProjectLabels {
  featured: string;
  languages: string;
  visit: string;
  source: string;
  live: string;
}

export type ProjectAccent = 'pink' | 'mapcn' | 'gigatable';

export interface HighlightItem {
  image: string;
  description: string;
}
