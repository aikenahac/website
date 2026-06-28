import i18n, { type Config } from 'sveltekit-i18n';

export const defaultLocale = 'en';

const config: Config = {
  preprocess: 'preserveArrays',
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./i18n/en/common.json')).default,
    },
    {
      locale: 'en',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./i18n/en/home.json')).default,
    },
    {
      locale: 'en',
      key: 'work',
      routes: ['/work'],
      loader: async () => (await import('./i18n/en/work.json')).default,
    },
    {
      locale: 'en',
      key: 'projects',
      routes: ['/projects'],
      loader: async () => (await import('./i18n/en/projects.json')).default,
    },
    {
      locale: 'en',
      key: 'highlights',
      routes: ['/highlights'],
      loader: async () => (await import('./i18n/en/highlights.json')).default,
    },
    {
      locale: 'en',
      key: 'music',
      routes: ['/music'],
      loader: async () => (await import('./i18n/en/music.json')).default,
    },
  ],
};

export const { t, locale, locales, loading, loadTranslations, setLocale, setRoute } = new i18n(
  config,
);
