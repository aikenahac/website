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
  title: string;
  url: string;
  description: string;
}

export interface HighlightItem {
  image: string;
  description: string;
}
