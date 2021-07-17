import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { I18nNamespace, Languages } from 'constants/i18n.const';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to the react-i18next components.
  // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/static/lang/{{lng}}/{{ns}}.json',
    },
    fallbackLng: Languages.ENGLISH,
    debug: true,
    defaultNS: I18nNamespace.COMMON,
    fallbackNS: I18nNamespace.COMMON,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    cleanCode: true,
    supportedLngs: [Languages.ENGLISH, Languages.THAILAND],
    // special options for react-i18next
    // learn more: https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
    },
  });

export default i18n;
