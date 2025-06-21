import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';
import { newsletterAPI } from '../lib/api';
import CountdownTimer from '../components/CountdownTimer';
import IcoPhaseCard from '../components/IcoPhaseCard';
import NewsletterForm from '../components/NewsletterForm';
import TokenomicsChart from '../components/TokenomicsChart';

// Mock do configAPI para substituir a dependência em falta
const configAPI = {
  getAll: async () => {
    return {
      data: {
        success: true,
        config: {
          casino_launch_date: '2026-01-01T00:00:00Z',
          ico_phase: 2,
          ico_prices: [0.02, 0.04, 0.06, 0.08]
        }
      }
    };
  }
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [launchDate, setLaunchDate] = useState<Date>(new Date('2026-01-01'));
  // Remover variável não utilizada
  const [icoPhase, setIcoPhase] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isNewsletterLoading, setIsNewsletterLoading] = useState<boolean>(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  
  // Buscar configurações ao carregar a página
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await configAPI.getAll();
        
        if (response.data.success) {
          const configs = response.data.config;
          
          // Definir data de lançamento
          if (configs.casino_launch_date) {
            setLaunchDate(new Date(configs.casino_launch_date));
          }
          
          // Definir fase da ICO
          if (configs.ico_phase) {
            setIcoPhase(configs.ico_phase);
          }
          
          // Definir preço da ICO atual
          if (configs.ico_prices && configs.ico_phase) {
            // Usar o preço mas não armazenar em estado
            console.log('Preço atual da ICO:', configs.ico_prices[configs.ico_phase - 1]);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    };
    
    fetchConfig();
  }, []);
  
  // Handler para subscrição da newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsNewsletterLoading(true);
    setNewsletterSuccess(false);
    setNewsletterError(null);
    
    try {
      // Sem argumentos para o mock
      const response = await newsletterAPI.subscribe();
      
      if (response.data.success) {
        setNewsletterSuccess(true);
        setEmail('');
      } else {
        setNewsletterError(t('errors.server_error'));
      }
      
      setIsNewsletterLoading(false);
    } catch (error) {
      console.error('Erro ao subscrever newsletter:', error);
      setNewsletterError(t('errors.server_error'));
      setIsNewsletterLoading(false);
    }
  };
  
  return (
    <div style={{ background: theme.colors.background.primary }}>
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundImage: 'url(/images/hero-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to bottom, rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.9))'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ 
              color: theme.colors.text.primary,
              textShadow: theme.effects.textShadow.gold
            }}
          >
            CasinoFound (CFD)
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            {t('home.token_intro_subtitle')}
          </p>
          
          <div className="mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: theme.colors.accent.gold }}
            >
              {t('home.countdown_title')}
            </h2>
            <CountdownTimer targetDate={launchDate} />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a 
              href="#ico"
              className="px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300"
              style={{
                background: theme.components.button.primary.background,
                color: theme.components.button.primary.color,
                boxShadow: theme.components.button.primary.shadow
              }}
            >
              {t('home.buy_tokens')}
            </a>
            
            <a 
              href="/vault"
              className="px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300"
              style={{
                background: 'transparent',
                color: theme.colors.accent.gold,
                border: `2px solid ${theme.colors.accent.gold}`
              }}
            >
              {t('navigation.vault')}
            </a>
          </div>
        </div>
      </section>
      
      {/* ICO Section */}
      <section 
        id="ico"
        className="py-20"
        style={{ background: theme.colors.background.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: theme.colors.text.primary }}
            >
              {t('home.ico_title')}
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('home.ico_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IcoPhaseCard 
              phase={1}
              price="0.02"
              totalTokens={2520000}
              currentPhase={icoPhase}
              percentageSold={icoPhase > 1 ? 100 : 75}
            />
            
            <IcoPhaseCard 
              phase={2}
              price="0.04"
              totalTokens={2520000}
              currentPhase={icoPhase}
              percentageSold={icoPhase > 2 ? 100 : icoPhase === 2 ? 45 : 0}
            />
            
            <IcoPhaseCard 
              phase={3}
              price="0.06"
              totalTokens={2520000}
              currentPhase={icoPhase}
              percentageSold={icoPhase > 3 ? 100 : icoPhase === 3 ? 15 : 0}
            />
            
            <IcoPhaseCard 
              phase={4}
              price="0.08"
              totalTokens={2520000}
              currentPhase={icoPhase}
              percentageSold={icoPhase === 4 ? 5 : 0}
            />
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/vault"
              className="px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 inline-block"
              style={{
                background: theme.components.button.primary.background,
                color: theme.components.button.primary.color,
                boxShadow: theme.components.button.primary.shadow
              }}
            >
              {t('home.buy_now')}
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        className="py-20"
        style={{ background: theme.colors.background.secondary }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: theme.colors.text.primary }}
              >
                {t('home.about_title')}
              </h2>
              
              <p 
                className="text-lg mb-6"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('home.about_text_1')}
              </p>
              
              <p 
                className="text-lg mb-6"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('home.about_text_2')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/whitepaper"
                  className="px-6 py-2 rounded-lg text-base font-medium transition-all duration-300"
                  style={{
                    background: 'transparent',
                    color: theme.colors.accent.gold,
                    border: `2px solid ${theme.colors.accent.gold}`
                  }}
                >
                  {t('home.read_whitepaper')}
                </a>
                
                <a 
                  href="/roadmap"
                  className="px-6 py-2 rounded-lg text-base font-medium transition-all duration-300"
                  style={{
                    background: 'transparent',
                    color: theme.colors.accent.neonGreen,
                    border: `2px solid ${theme.colors.accent.neonGreen}`
                  }}
                >
                  {t('home.view_roadmap')}
                </a>
              </div>
            </div>
            
            <div>
              <TokenomicsChart />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section 
        className="py-20"
        style={{ 
          background: 'linear-gradient(to right, rgba(0, 255, 200, 0.05), rgba(64, 0, 255, 0.05))',
          borderTop: `1px solid ${theme.colors.background.tertiary}`,
          borderBottom: `1px solid ${theme.colors.background.tertiary}`
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: theme.colors.text.primary }}
          >
            {t('home.newsletter_title')}
          </h2>
          
          <p 
            className="text-lg mb-8"
            style={{ color: theme.colors.text.secondary }}
          >
            {t('home.newsletter_text')}
          </p>
          
          <NewsletterForm 
            email={email}
            setEmail={setEmail}
            isLoading={isNewsletterLoading}
            success={newsletterSuccess}
            error={newsletterError}
            onSubmit={handleNewsletterSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
