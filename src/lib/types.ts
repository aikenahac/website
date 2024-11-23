import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Route {
  name: string;
  path: string;
}

export interface Social {
  icon: IconDefinition;
  link: string;
}

export interface JobItem {
  title: string;
  location: string;
  start: string;
  end: string;
  url: string;
  description: string;
  description2?: string;
  description3?: string;
  description4?: string;
  item?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
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
