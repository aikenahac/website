import { setLocale, setRoute } from '$lib/translations';

export const load = async ({ data }) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};