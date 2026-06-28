import { loadTranslations, defaultLocale } from '$lib/translations';
import type { LayoutServerLoadEvent } from './$types';

export const load = async ({ url }: LayoutServerLoadEvent) => {
  const { pathname } = url;
  const locale = defaultLocale;

  await loadTranslations(locale, pathname);

  return {
    i18n: { locale, route: pathname },
  };
};
