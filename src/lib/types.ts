import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Route {
  name: string;
  path: string;
}

export interface Social {
  icon: IconDefinition;
  link: string;
}