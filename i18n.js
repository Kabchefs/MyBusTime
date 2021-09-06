import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./assets/locales/en/translation.json";
import hi from "./assets/locales/hi/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: 'en',
  fallbackLng: ['en','hi'],
  interpolation: {
    escapeValue: false,
  },
});
