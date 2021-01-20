import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: 'en',
  keySeparator: true,
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  debug: true,
})

export default i18n
