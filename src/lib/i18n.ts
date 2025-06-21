import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar recursos de tradução
import translationPT from './locales/pt.json';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationCN from './locales/cn.json';

// Recursos de tradução
const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  cn: {
    translation: translationCN
  }
};

// Função para detectar o idioma do navegador
const detectUserLanguage = () => {
  const language = navigator.language.split('-')[0];
  return ['pt', 'en', 'fr', 'cn'].includes(language) ? language : 'pt';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectUserLanguage(),
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false // React já escapa por padrão
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
