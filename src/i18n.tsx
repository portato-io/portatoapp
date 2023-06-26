import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Import all translation files
import translationEnglish from './Translation/English/translation.json';
import translationGerman from './Translation/German/translation.json';
import translationFrench from './Translation/French/translation.json';

//---Using different namespaces
const resources = {
  en: {
    home: translationEnglish,
  },
  de: {
    home: translationGerman,
  },
  fr: {
    home: translationFrench,
  },
};

const savedLanguage = localStorage.getItem('language');

if (savedLanguage) {
  i18next.init({
    lng: savedLanguage,
  });
} else {
  i18next.use(LanguageDetector).init({
    resources,
    //fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
  });
}

export default i18next;
