import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

interface TokenPurchaseCardProps {
  walletAddress: string;
  onPurchase: () => Promise<boolean>;
  isLoading: boolean;
}

const TokenPurchaseCard: React.FC<TokenPurchaseCardProps> = ({
  walletAddress,
  onPurchase,
  isLoading
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'matic' | 'usdt'>('matic');
  const [icoPrice, setIcoPrice] = useState<number>(0.04); // Fase 2 por padrão
  const [error, setError] = useState<string | null>(null);
  
  // Buscar preço atual da ICO
  React.useEffect(() => {
    const fetchIcoPrice = async () => {
      try {
        // Sem argumentos para o mock
        // Removida chamada a getPercentage que não existe
        
        // Preço fixo para demonstração
        setIcoPrice(0.04);
      } catch (error) {
        console.error('Erro ao obter preço da ICO:', error);
      }
    };
    
    fetchIcoPrice();
  }, [walletAddress]);
  
  // Calcular tokens a receber
  const tokensToReceive = React.useMemo(() => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return 0;
    
    return currency === 'matic' 
      ? amountNum / 0.5 // 1 MATIC = 2 CFD (exemplo)
      : amountNum / icoPrice; // 1 USDT = 1/icoPrice CFD
  }, [amount, currency, icoPrice]);
  
  // Handler para compra
  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError(t('errors.invalid_amount'));
      return;
    }
    
    setError(null);
    
    try {
      const success = await onPurchase();
      
      if (success) {
        setAmount('');
      }
    } catch (error) {
      console.error('Erro na compra:', error);
      setError(t('errors.server_error'));
    }
  };
  
  return (
    <div 
      className="rounded-xl p-6 w-full"
      style={{ 
        background: theme.colors.background.card,
        border: theme.components.card.border,
        boxShadow: theme.components.card.shadow
      }}
    >
      <h3 
        className="text-xl font-bold mb-6"
        style={{ color: theme.colors.accent.gold }}
      >
        {t('vault.purchase_title')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label 
              className="block text-sm mb-1"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('vault.purchase_amount')}
            </label>
            <div className="flex">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-grow px-3 py-2 rounded-l-md"
                style={{
                  background: theme.components.input.background,
                  border: theme.components.input.border,
                  color: theme.components.input.color,
                  outline: 'none',
                }}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isLoading}
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'matic' | 'usdt')}
                className="px-3 py-2 rounded-r-md"
                style={{ 
                  background: theme.colors.background.secondary,
                  border: theme.components.input.border,
                  color: theme.colors.text.secondary
                }}
                disabled={isLoading}
              >
                <option value="matic">MATIC</option>
                <option value="usdt">USDT</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label 
              className="block text-sm mb-1"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('vault.tokens_to_receive')}
            </label>
            <div 
              className="px-3 py-2 rounded-md"
              style={{ 
                background: theme.colors.background.tertiary,
                border: theme.components.input.border
              }}
            >
              <span style={{ color: theme.colors.text.primary }}>
                {tokensToReceive.toFixed(2)} CFD
              </span>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.colors.text.muted }}
            >
              {currency === 'usdt' 
                ? `1 USDT = ${(1 / icoPrice).toFixed(2)} CFD`
                : '1 MATIC = 2 CFD'}
            </p>
          </div>
          
          <button
            className="w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 disabled:opacity-50"
            style={{
              background: theme.components.button.primary.background,
              color: theme.components.button.primary.color,
              boxShadow: theme.components.button.primary.shadow
            }}
            onClick={handlePurchase}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.loading')}
              </span>
            ) : (
              t('vault.purchase_button')
            )}
          </button>
          
          {error && (
            <div 
              className="p-3 rounded-md mt-4"
              style={{ 
                background: 'rgba(255, 56, 96, 0.1)',
                border: `1px solid ${theme.colors.status.error}`,
                color: theme.colors.status.error
              }}
            >
              {error}
            </div>
          )}
        </div>
        
        <div>
          <div 
            className="p-4 rounded-md"
            style={{ 
              background: theme.colors.background.tertiary,
              border: theme.components.card.border
            }}
          >
            <h4 
              className="text-lg font-medium mb-2"
              style={{ color: theme.colors.text.primary }}
            >
              {t('vault.purchase_info_title')}
            </h4>
            
            <ul className="space-y-2">
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.purchase_info_1')}</span>
              </li>
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.purchase_info_2')}</span>
              </li>
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.purchase_info_3')}</span>
              </li>
            </ul>
            
            <div 
              className="mt-4 p-3 rounded-md"
              style={{ 
                background: 'rgba(0, 255, 200, 0.05)',
                border: `1px solid ${theme.colors.accent.neonGreen}`
              }}
            >
              <p style={{ color: theme.colors.accent.neonGreen }}>
                {t('vault.current_ico_phase', { phase: 2, price: icoPrice.toFixed(2) })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchaseCard;
