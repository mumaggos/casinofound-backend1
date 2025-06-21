import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${i18n.language === 'pt' ? 'ring-2' : ''}`}
        style={{ 
          background: i18n.language === 'pt' ? theme.colors.accent.gold : 'transparent',
          color: i18n.language === 'pt' ? '#000' : theme.colors.text.secondary,
          border: i18n.language === 'pt' ? 'none' : `1px solid ${theme.colors.text.secondary}`
        }}
        onClick={() => changeLanguage('pt')}
      >
        PT
      </button>
      
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${i18n.language === 'en' ? 'ring-2' : ''}`}
        style={{ 
          background: i18n.language === 'en' ? theme.colors.accent.gold : 'transparent',
          color: i18n.language === 'en' ? '#000' : theme.colors.text.secondary,
          border: i18n.language === 'en' ? 'none' : `1px solid ${theme.colors.text.secondary}`
        }}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${i18n.language === 'fr' ? 'ring-2' : ''}`}
        style={{ 
          background: i18n.language === 'fr' ? theme.colors.accent.gold : 'transparent',
          color: i18n.language === 'fr' ? '#000' : theme.colors.text.secondary,
          border: i18n.language === 'fr' ? 'none' : `1px solid ${theme.colors.text.secondary}`
        }}
        onClick={() => changeLanguage('fr')}
      >
        FR
      </button>
      
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center ${i18n.language === 'cn' ? 'ring-2' : ''}`}
        style={{ 
          background: i18n.language === 'cn' ? theme.colors.accent.gold : 'transparent',
          color: i18n.language === 'cn' ? '#000' : theme.colors.text.secondary,
          border: i18n.language === 'cn' ? 'none' : `1px solid ${theme.colors.text.secondary}`
        }}
        onClick={() => changeLanguage('cn')}
      >
        CN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
