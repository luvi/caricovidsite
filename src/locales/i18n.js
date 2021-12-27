import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import fr from './fr'
import es from './es'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(initReactI18next)
.use(LanguageDetector)
.init({
  resources: {
    en,
    fr,
    es
  },
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  debug: true,
})

export default i18n
