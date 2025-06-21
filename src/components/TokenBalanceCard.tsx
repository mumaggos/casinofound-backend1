import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';
import { tokenAPI } from '../lib/api';

interface TokenBalanceCardProps {
  walletAddress: string;
  refreshTrigger: number;
}

const TokenBalanceCard: React.FC<TokenBalanceCardProps> = ({
  walletAddress,
  refreshTrigger
}) => {
  const { t } = useTranslation();
  const [balance, setBalance] = useState<number>(0);
  const [staked, setStaked] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(21000000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Sem argumentos para o mock
        const balanceResponse = await tokenAPI.getBalance();
        
        if (balanceResponse.data.success) {
          setBalance(balanceResponse.data.balance);
          setStaked(balanceResponse.data.staked);
          setPercentage(balanceResponse.data.percentage);
          setTotalSupply(balanceResponse.data.total_supply);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao obter saldo:', error);
        setError(t('errors.server_error'));
        setIsLoading(false);
      }
    };
    
    fetchBalance();
  }, [walletAddress, refreshTrigger, t]);
  
  // Formatar percentagem
  const formatPercentage = (value: number): string => {
    return (value * 100).toFixed(4) + '%';
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
        {t('vault.balance_title')}
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : error ? (
        <div 
          className="p-4 rounded-md"
          style={{ 
            background: 'rgba(255, 56, 96, 0.1)',
            border: `1px solid ${theme.colors.status.error}`,
            color: theme.colors.status.error
          }}
        >
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p style={{ color: theme.colors.text.secondary }}>
                {t('vault.wallet_address')}:
              </p>
              <p 
                className="font-mono text-sm break-all"
                style={{ color: theme.colors.text.primary }}
              >
                {walletAddress}
              </p>
            </div>
            
            <div className="mb-4">
              <p style={{ color: theme.colors.text.secondary }}>
                {t('vault.tokens_owned')}:
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {balance.toFixed(2)} CFD
              </p>
            </div>
            
            <div className="mb-4">
              <p style={{ color: theme.colors.text.secondary }}>
                {t('vault.tokens_staked')}:
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: theme.colors.accent.neonGreen }}
              >
                {staked.toFixed(2)} CFD
              </p>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <p style={{ color: theme.colors.text.secondary }}>
                {t('vault.total_tokens')}:
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {(balance + staked).toFixed(2)} CFD
              </p>
            </div>
            
            <div className="mb-4">
              <p style={{ color: theme.colors.text.secondary }}>
                {t('vault.percentage_owned')}:
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: theme.colors.accent.neonBlue }}
              >
                {formatPercentage(percentage)}
              </p>
              <p 
                className="text-sm"
                style={{ color: theme.colors.text.muted }}
              >
                {t('vault.total_supply')}: {totalSupply.toLocaleString()} CFD
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenBalanceCard;
