import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import fr from './fr'
import es from './es'

i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
    es
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
