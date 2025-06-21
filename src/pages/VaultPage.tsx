import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';
import useWalletConnect from '../hooks/useWalletConnect';
import WalletConnectButton from '../components/WalletConnectButton';
import TokenBalanceCard from '../components/TokenBalanceCard';
import TokenPurchaseCard from '../components/TokenPurchaseCard';
import StakingCard from '../components/StakingCard';
import { tokenAPI } from '../lib/api';

const VaultPage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, walletAddress, isLoading: walletLoading, connect, disconnect, error: walletError } = useWalletConnect();
  
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [stakedBalance, setStakedBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Buscar dados do token quando conectado
  useEffect(() => {
    const fetchTokenData = async () => {
      if (!walletAddress) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Obter saldo de tokens - sem argumentos para o mock
        const balanceResponse = await tokenAPI.getBalance();
        
        if (balanceResponse.data.success) {
          setTokenBalance(balanceResponse.data.balance);
          setStakedBalance(balanceResponse.data.staked);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados do token:', error);
        setError(t('errors.server_error'));
        setIsLoading(false);
      }
    };
    
    if (isConnected && walletAddress) {
      fetchTokenData();
    }
  }, [isConnected, walletAddress, refreshTrigger, t]);

  // Handler para compra de tokens
  const handlePurchase = async (): Promise<boolean> => {
    if (!walletAddress) {
      setError(t('errors.wallet_connection'));
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulação para demonstração
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar saldo após compra
      setRefreshTrigger(prev => prev + 1);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erro na compra de tokens:', error);
      setError(t('errors.server_error'));
      setIsLoading(false);
      return false;
    }
  };

  // Handler para stake de tokens
  const handleStake = async (): Promise<void> => {
    if (!walletAddress) {
      setError(t('errors.wallet_connection'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Sem argumentos para o mock
      const response = await tokenAPI.stake();
      
      if (response.data.success) {
        // Atualizar saldo após stake
        setRefreshTrigger(prev => prev + 1);
      } else {
        setError(t('errors.server_error'));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erro no stake de tokens:', error);
      setError(t('errors.server_error'));
      setIsLoading(false);
    }
  };

  // Handler para unstake de tokens
  const handleUnstake = async (): Promise<void> => {
    if (!walletAddress) {
      setError(t('errors.wallet_connection'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Sem argumentos para o mock
      const response = await tokenAPI.unstake();
      
      if (response.data.success) {
        // Atualizar saldo após unstake
        setRefreshTrigger(prev => prev + 1);
      } else {
        setError(t('errors.server_error'));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erro no unstake de tokens:', error);
      setError(t('errors.server_error'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: theme.colors.background.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
            {t('vault.title')}
          </h1>
          
          {!isConnected && (
            <p 
              className="text-lg mb-8"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('vault.connect_wallet')}
            </p>
          )}
          
          {!isConnected && (
            <div className="flex justify-center mb-8">
              <WalletConnectButton
                isConnected={isConnected}
                walletAddress={walletAddress}
                onConnect={connect}
                onDisconnect={disconnect}
                isLoading={walletLoading}
              />
            </div>
          )}
          
          {walletError && (
            <div 
              className="p-4 rounded-md max-w-md mx-auto mb-8"
              style={{ 
                background: 'rgba(255, 56, 96, 0.1)',
                border: `1px solid ${theme.colors.status.error}`,
                color: theme.colors.status.error
              }}
            >
              {walletError}
            </div>
          )}
        </div>
        
        {isConnected && walletAddress && (
          <div className="space-y-8">
            {/* Saldo de tokens */}
            <TokenBalanceCard 
              walletAddress={walletAddress}
              refreshTrigger={refreshTrigger}
            />
            
            {/* Compra de tokens */}
            <TokenPurchaseCard 
              walletAddress={walletAddress}
              onPurchase={handlePurchase}
              isLoading={isLoading}
            />
            
            {/* Staking de Tokens */}
            <StakingCard
              tokenAmount={tokenBalance}
              stakedAmount={stakedBalance}
              onStake={async () => await handleStake()}
              onUnstake={async () => await handleUnstake()}
              isLoading={isLoading}
            />

            {/* Exibir erro se houver */}
            {error && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultPage;
