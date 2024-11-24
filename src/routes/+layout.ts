import { setLocale, setRoute } from '$lib/translations';
import type { LayoutLoadEvent } from './$types';

export const load = async ({ data }: LayoutLoadEvent) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};
