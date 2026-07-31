import type { ProjectAccent, ProjectLanguage } from '$lib/types';

export interface ProjectDefinition {
  slug: string;
  translationKey: string;
  featured?: boolean;
  siteUrl?: string;
  githubUrl?: string;
  githubRepositories?: string[];
  fallbackLanguages?: ProjectLanguage[];
  image?: string;
  accent?: ProjectAccent;
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    slug: 'mapcn-rn',
    translationKey: 'mapcn-rn',
    featured: true,
    siteUrl: 'https://mapcn-rn.dev',
    githubUrl: 'https://github.com/aikenahac/mapcn-react-native',
    githubRepositories: ['aikenahac/mapcn-react-native'],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 95 },
      { name: 'JavaScript', percentage: 4 },
      { name: 'CSS', percentage: 1 },
    ],
    image: '/projects/mapcn-react-native.webp',
    accent: 'mapcn',
  },
  {
    slug: 'gigatable',
    translationKey: 'gigatable',
    featured: true,
    siteUrl: 'https://gigatable.dev',
    githubUrl: 'https://github.com/aikenahac/gigatable',
    githubRepositories: ['aikenahac/gigatable'],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 76 },
      { name: 'CSS', percentage: 11 },
      { name: 'JavaScript', percentage: 9 },
    ],
    image: '/projects/gigatable.webp',
    accent: 'gigatable',
  },
  {
    slug: 'echo',
    translationKey: 'echo',
    githubUrl: 'https://github.com/aikenahac/echo',
    githubRepositories: ['aikenahac/echo'],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 96 },
      { name: 'SQL', percentage: 2 },
      { name: 'CSS', percentage: 1 },
    ],
  },
  {
    slug: 'mwh',
    translationKey: 'mwh',
    siteUrl: 'https://gomwh.com',
    githubUrl: 'https://github.com/aikenahac/mwh',
    githubRepositories: ['aikenahac/mwh'],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 98 },
      { name: 'CSS', percentage: 1 },
      { name: 'Dockerfile', percentage: 1 },
    ],
  },
  {
    slug: 'frivsspr',
    translationKey: 'frivsspr',
    siteUrl: 'https://fri.bogi.si',
    githubUrl: 'https://github.com/aikenahac/frivsspr',
    githubRepositories: ['aikenahac/frivsspr'],
    fallbackLanguages: [
      { name: 'Svelte', percentage: 59 },
      { name: 'TypeScript', percentage: 36 },
      { name: 'JavaScript', percentage: 2 },
    ],
  },
  {
    slug: 'socialko',
    translationKey: 'socialko',
    githubUrl: 'https://github.com/aikenahac/socialko',
    githubRepositories: [
      'SocialkoApp/backend',
      'SocialkoApp/app',
      'SocialkoApp/account-management',
    ],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 58 },
      { name: 'Dart', percentage: 41 },
      { name: 'HTML', percentage: 1 },
    ],
  },
  {
    slug: 'hdwyg',
    translationKey: 'hdwyg',
    siteUrl: 'https://hdwyg.bogi.si',
  },
  {
    slug: 'routes',
    translationKey: 'routes',
    githubUrl: 'https://github.com/aikenahac/google_maps_routes',
    githubRepositories: ['aikenahac/google_maps_routes'],
    fallbackLanguages: [
      { name: 'Dart', percentage: 78 },
      { name: 'Ruby', percentage: 14 },
      { name: 'Swift', percentage: 7 },
    ],
  },
  {
    slug: 'app-tutorial',
    translationKey: 'app_tutorial',
    githubUrl: 'https://github.com/aikenahac/app_tutorial',
    githubRepositories: ['aikenahac/app_tutorial'],
    fallbackLanguages: [
      { name: 'Dart', percentage: 93 },
      { name: 'Swift', percentage: 6 },
      { name: 'Kotlin', percentage: 1 },
    ],
  },
  {
    slug: 'imageproc',
    translationKey: 'imageproc',
    siteUrl: 'https://imageproc.aiken.si',
    githubUrl: 'https://github.com/aikenahac/imageproc',
    githubRepositories: ['aikenahac/imageproc'],
    fallbackLanguages: [
      { name: 'TypeScript', percentage: 96 },
      { name: 'JavaScript', percentage: 3 },
      { name: 'HTML', percentage: 1 },
    ],
  },
];
