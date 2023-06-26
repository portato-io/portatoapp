import i18next, { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEnglish from './Translation/English/translation.json';
import translationGerman from './Translation/German/translation.json';
import translationFrench from './Translation/French/translation.json';

const resources: Resource = {
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
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init(options);

export default i18next;
