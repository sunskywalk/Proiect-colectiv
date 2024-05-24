import 'intl-pluralrules'; // Importă polyfill-ul pentru Intl.PluralRules
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './public/locales/en.json';
import translationRO from './public/locales/ro.json';
import translationRU from './public/locales/ru.json';
import translationFR from './public/locales/fr.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ro: {
    translation: translationRO,
  },
  ru: {
    translation: translationRU,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Limba implicită
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
