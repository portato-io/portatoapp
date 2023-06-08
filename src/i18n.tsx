import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Import all translation files
import translationEnglish from './Translation/English/translation.json';
import translationDeutch from './Translation/Deutch/translation.json';
import translationFrench from './Translation/French/translation.json';

//---Using different namespaces
const resources = {
  en: {
    home: translationEnglish,
  },
  de: {
    home: translationDeutch,
  },
  fr: {
    home: translationFrench,
  },
};

i18next.use(LanguageDetector).init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['navigator'],
  }, // default fallback language
});

export default i18next;
