import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useState } from 'react';
import i18n from './lib/i18n';
import theme from './lib/theme';
import useLanguageDetection from './lib/useLanguageDetection';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VaultPage from './pages/VaultPage';
import AdminPage from './pages/AdminPage';
import SEO from './components/SEO';

function App() {
  // Usar hook de detecção de idioma
  useLanguageDetection();
  
  // Estados para controlo da navbar
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleConnectWallet = () => {
    setIsConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };
  
  return (
    <I18nextProvider i18n={i18n}>
      <SEO />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar 
            onLanguageChange={handleLanguageChange}
            isConnected={isConnected}
            walletAddress={walletAddress}
            onConnectWallet={handleConnectWallet}
            onDisconnectWallet={handleDisconnectWallet}
          />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vault" element={<VaultPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          
          <footer 
            className="py-4"
            style={{ 
              background: theme.components.footer.background,
              borderTop: theme.components.footer.borderTop
            }}
          >
            <div className="container mx-auto px-4 text-center">
              <p style={{ color: theme.colors.text.secondary }}>
                &copy; {new Date().getFullYear()} CasinoFound (CFD). Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;

