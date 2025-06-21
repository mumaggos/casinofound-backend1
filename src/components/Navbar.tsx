import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import theme from '../lib/theme';

interface NavbarProps {
  onLanguageChange: (lang: string) => void;
  isConnected: boolean;
  walletAddress: string | null;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLanguageChange,
  isConnected,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet
}) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  // Detectar scroll para mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Formatar endereço da carteira
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Mudar idioma
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    onLanguageChange(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-opacity-95 backdrop-blur-md shadow-md' : 'bg-opacity-70'
      }`}
      style={{
        backgroundColor: theme.components.navbar.background,
        borderBottom: scrolled ? theme.components.navbar.borderBottom : 'none',
        backdropFilter: theme.components.navbar.backdropFilter
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span 
                className="text-xl font-bold"
                style={{ 
                  color: theme.colors.accent.gold,
                  textShadow: theme.effects.textShadow.gold
                }}
              >
                CasinoFound
              </span>
            </Link>
          </div>

          {/* Menu de navegação desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.home')}
              </Link>
              <Link 
                to="/vault" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.vault')}
              </Link>
              <Link 
                to="/whitepaper" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.whitepaper')}
              </Link>
              <Link 
                to="/roadmap" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.roadmap')}
              </Link>
              <Link 
                to="/tokenomics" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.tokenomics')}
              </Link>
              <Link 
                to="/team" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: theme.colors.text.primary }}
              >
                {t('navigation.team')}
              </Link>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Seletor de idioma */}
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                style={{ color: theme.colors.text.primary }}
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              >
                {i18n.language.toUpperCase()}
                <svg
                  className="ml-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {languageMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1"
                  style={{ 
                    backgroundColor: theme.colors.background.card,
                    border: theme.components.card.border
                  }}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-sm transition-all duration-300 hover:opacity-80"
                    style={{ color: theme.colors.text.primary }}
                    onClick={() => changeLanguage('pt')}
                  >
                    Português
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm transition-all duration-300 hover:opacity-80"
                    style={{ color: theme.colors.text.primary }}
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm transition-all duration-300 hover:opacity-80"
                    style={{ color: theme.colors.text.primary }}
                    onClick={() => changeLanguage('fr')}
                  >
                    Français
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm transition-all duration-300 hover:opacity-80"
                    style={{ color: theme.colors.text.primary }}
                    onClick={() => changeLanguage('cn')}
                  >
                    中文
                  </button>
                </div>
              )}
            </div>

            {/* Botão de conectar/desconectar carteira */}
            <button
              className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
              style={{
                background: isConnected ? 'transparent' : theme.components.button.primary.background,
                color: isConnected ? theme.colors.accent.gold : theme.components.button.primary.color,
                border: isConnected ? `2px solid ${theme.colors.accent.gold}` : 'none',
                boxShadow: isConnected ? 'none' : theme.components.button.primary.shadow
              }}
              onClick={isConnected ? onDisconnectWallet : onConnectWallet}
            >
              {isConnected ? formatAddress(walletAddress!) : t('common.connect')}
            </button>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md transition-all duration-300"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile expandido */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div 
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
            style={{ 
              backgroundColor: theme.colors.background.secondary,
              borderTop: theme.components.navbar.borderBottom
            }}
          >
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link
              to="/vault"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.vault')}
            </Link>
            <Link
              to="/whitepaper"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.whitepaper')}
            </Link>
            <Link
              to="/roadmap"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.roadmap')}
            </Link>
            <Link
              to="/tokenomics"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.tokenomics')}
            </Link>
            <Link
              to="/team"
              className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-80"
              style={{ color: theme.colors.text.primary }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.team')}
            </Link>

            {/* Seletor de idioma mobile */}
            <div className="px-3 py-2">
              <div className="flex space-x-2">
                <button
                  className={`px-2 py-1 rounded text-sm ${i18n.language === 'pt' ? 'font-bold' : 'font-normal'}`}
                  style={{ 
                    color: i18n.language === 'pt' ? theme.colors.accent.gold : theme.colors.text.primary,
                    textShadow: i18n.language === 'pt' ? theme.effects.textShadow.gold : 'none'
                  }}
                  onClick={() => changeLanguage('pt')}
                >
                  PT
                </button>
                <button
                  className={`px-2 py-1 rounded text-sm ${i18n.language === 'en' ? 'font-bold' : 'font-normal'}`}
                  style={{ 
                    color: i18n.language === 'en' ? theme.colors.accent.gold : theme.colors.text.primary,
                    textShadow: i18n.language === 'en' ? theme.effects.textShadow.gold : 'none'
                  }}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </button>
                <button
                  className={`px-2 py-1 rounded text-sm ${i18n.language === 'fr' ? 'font-bold' : 'font-normal'}`}
                  style={{ 
                    color: i18n.language === 'fr' ? theme.colors.accent.gold : theme.colors.text.primary,
                    textShadow: i18n.language === 'fr' ? theme.effects.textShadow.gold : 'none'
                  }}
                  onClick={() => changeLanguage('fr')}
                >
                  FR
                </button>
                <button
                  className={`px-2 py-1 rounded text-sm ${i18n.language === 'cn' ? 'font-bold' : 'font-normal'}`}
                  style={{ 
                    color: i18n.language === 'cn' ? theme.colors.accent.gold : theme.colors.text.primary,
                    textShadow: i18n.language === 'cn' ? theme.effects.textShadow.gold : 'none'
                  }}
                  onClick={() => changeLanguage('cn')}
                >
                  CN
                </button>
              </div>
            </div>

            {/* Botão de conectar/desconectar carteira mobile */}
            <div className="px-3 py-2">
              <button
                className="w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                style={{
                  background: isConnected ? 'transparent' : theme.components.button.primary.background,
                  color: isConnected ? theme.colors.accent.gold : theme.components.button.primary.color,
                  border: isConnected ? `2px solid ${theme.colors.accent.gold}` : 'none',
                  boxShadow: isConnected ? 'none' : theme.components.button.primary.shadow
                }}
                onClick={() => {
                  isConnected ? onDisconnectWallet() : onConnectWallet();
                  setMobileMenuOpen(false);
                }}
              >
                {isConnected ? formatAddress(walletAddress!) : t('common.connect')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
