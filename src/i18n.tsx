import i18next, { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEnglish from './Translation/English/translation.json';
import translationGerman from './Translation/German/translation.json';
import translationFrench from './Translation/French/translation.json';

const resources: Resource = {
  en_US: {
    translation: translationEnglish,
  },
  de_DE: {
    translation: translationGerman,
  },
  fr_FR: {
    translation: translationFrench,
  },
  en: {
    translation: translationEnglish,
  },
  de: {
    translation: translationGerman,
  },
  fr: {
    translation: translationFrench,
  },
};

const options: InitOptions = {
  debug: true,
  resources,
  fallbackLng: 'de_DE',
  detection: {
    order: ['navigator', 'localStorage'],
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init(options);

export default i18next;
