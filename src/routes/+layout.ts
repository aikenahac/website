import { setLocale, setRoute } from '$lib/translations';

// export const load: Load = async ({ url }) => {
//   const { pathname } = url;

//   const initLocale = 'sl';

//   await loadTranslations(initLocale, pathname);
//   return {};
// }

export const load = async ({ data }) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};