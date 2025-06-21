import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

interface WalletConnectButtonProps {
  isConnected: boolean;
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  isLoading
}) => {
  const { t } = useTranslation();

  // Formatar endereço da carteira
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <button
      className="px-6 py-3 rounded-md text-base font-medium transition-all duration-300 flex items-center justify-center"
      style={{
        background: isConnected ? 'transparent' : theme.components.button.primary.background,
        color: isConnected ? theme.colors.accent.gold : theme.components.button.primary.color,
        border: isConnected ? `2px solid ${theme.colors.accent.gold}` : 'none',
        boxShadow: isConnected ? 'none' : theme.components.button.primary.shadow
      }}
      onClick={isConnected ? onDisconnect : onConnect}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {t('common.loading')}
        </span>
      ) : isConnected ? (
        <span className="flex items-center">
          <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
          {formatAddress(walletAddress!)}
        </span>
      ) : (
        <span className="flex items-center">
          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd"></path>
          </svg>
          {t('common.connect')}
        </span>
      )}
    </button>
  );
};

export default WalletConnectButton;
