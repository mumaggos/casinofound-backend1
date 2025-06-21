import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

interface StakingCardProps {
  tokenAmount: number;
  stakedAmount: number;
  onStake: () => Promise<void>;
  onUnstake: () => Promise<void>;
  isLoading: boolean;
}

const StakingCard: React.FC<StakingCardProps> = ({
  tokenAmount,
  stakedAmount,
  onStake,
  onUnstake,
  isLoading
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'stake' | 'unstake'>('stake');
  
  // Calcular data de desbloqueio (30 dias a partir de hoje)
  const unlockDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);
  
  // Formatar data
  const formatDateString = (date: Date): string => {
    return date.toLocaleDateString();
  };
  
  // Handler para stake
  const handleStakeSubmit = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError(t('errors.invalid_amount'));
      return;
    }
    
    if (amountNum > tokenAmount) {
      setError(t('errors.insufficient_balance'));
      return;
    }
    
    setError(null);
    
    try {
      await onStake();
      setAmount('');
    } catch (error) {
      console.error('Erro ao fazer stake:', error);
      setError(t('errors.server_error'));
    }
  };
  
  // Handler para unstake
  const handleUnstakeSubmit = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError(t('errors.invalid_amount'));
      return;
    }
    
    if (amountNum > stakedAmount) {
      setError(t('errors.insufficient_staked'));
      return;
    }
    
    setError(null);
    
    try {
      await onUnstake();
      setAmount('');
    } catch (error) {
      console.error('Erro ao fazer unstake:', error);
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
        {t('vault.staking_title')}
      </h3>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-2 ${activeTab === 'stake' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'stake' ? theme.colors.accent.neonGreen : 'transparent',
              color: activeTab === 'stake' ? theme.colors.accent.neonGreen : theme.colors.text.secondary
            }}
            onClick={() => setActiveTab('stake')}
          >
            {t('vault.stake')}
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'unstake' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'unstake' ? theme.colors.accent.neonBlue : 'transparent',
              color: activeTab === 'unstake' ? theme.colors.accent.neonBlue : theme.colors.text.secondary
            }}
            onClick={() => setActiveTab('unstake')}
          >
            {t('vault.unstake')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {activeTab === 'stake' ? (
            <div>
              <div className="mb-4">
                <label 
                  className="block text-sm mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {t('vault.amount_to_stake')}
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
                  <div
                    className="px-3 py-2 rounded-r-md"
                    style={{ 
                      background: theme.colors.background.secondary,
                      border: theme.components.input.border,
                      color: theme.colors.text.secondary
                    }}
                  >
                    CFD
                  </div>
                </div>
                <p 
                  className="text-xs mt-1"
                  style={{ color: theme.colors.text.muted }}
                >
                  {t('vault.available')}: {tokenAmount.toFixed(2)} CFD
                </p>
              </div>
              
              <button
                className="w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 disabled:opacity-50"
                style={{
                  background: theme.components.button.primary.background,
                  color: theme.components.button.primary.color,
                  boxShadow: theme.components.button.primary.shadow
                }}
                onClick={handleStakeSubmit}
                disabled={isLoading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > tokenAmount}
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
                  t('vault.stake_button')
                )}
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label 
                  className="block text-sm mb-1"
                  style={{ color: theme.colors.text.secondary }}
                >
                  {t('vault.amount_to_unstake')}
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
                  <div
                    className="px-3 py-2 rounded-r-md"
                    style={{ 
                      background: theme.colors.background.secondary,
                      border: theme.components.input.border,
                      color: theme.colors.text.secondary
                    }}
                  >
                    CFD
                  </div>
                </div>
                <p 
                  className="text-xs mt-1"
                  style={{ color: theme.colors.text.muted }}
                >
                  {t('vault.staked')}: {stakedAmount.toFixed(2)} CFD
                </p>
              </div>
              
              <button
                className="w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 disabled:opacity-50"
                style={{
                  background: theme.components.button.primary.background,
                  color: theme.components.button.primary.color,
                  boxShadow: theme.components.button.primary.shadow
                }}
                onClick={handleUnstakeSubmit}
                disabled={isLoading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > stakedAmount}
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
                  t('vault.unstake_button')
                )}
              </button>
            </div>
          )}
          
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
              {t('vault.staking_info_title')}
            </h4>
            
            <ul className="space-y-2">
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.staking_info_1')}</span>
              </li>
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.staking_info_2')}</span>
              </li>
              <li 
                className="flex items-start"
                style={{ color: theme.colors.text.secondary }}
              >
                <span className="mr-2">•</span>
                <span>{t('vault.staking_info_3')}</span>
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
                {t('vault.unlock_date')}: {formatDateString(unlockDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingCard;
