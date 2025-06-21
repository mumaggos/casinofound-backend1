import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Hook para deteção automática de idioma e persistência
const useLanguageDetection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Verificar se existe um idioma guardado no localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && ['pt', 'en', 'fr', 'cn'].includes(savedLanguage)) {
      // Usar o idioma guardado
      i18n.changeLanguage(savedLanguage);
    } else {
      // Detetar idioma do navegador
      const browserLang = navigator.language.split('-')[0];
      
      // Verificar se o idioma do navegador é suportado
      if (['pt', 'en', 'fr', 'zh'].includes(browserLang)) {
        // Mapear 'zh' para 'cn' para chinês
        const langCode = browserLang === 'zh' ? 'cn' : browserLang;
        i18n.changeLanguage(langCode);
        localStorage.setItem('preferredLanguage', langCode);
      } else {
        // Usar inglês como padrão se o idioma não for suportado
        i18n.changeLanguage('en');
        localStorage.setItem('preferredLanguage', 'en');
      }
    }
  }, [i18n]);

  return i18n.language;
};

export default useLanguageDetection;
