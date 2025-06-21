import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface WalletConnectHookResult {
  isConnected: boolean;
  walletAddress: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletConnect = (): WalletConnectHookResult => {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o endereço é administrador
  const checkIfAdmin = (address: string): boolean => {
    const adminWallet = '0x435FE1f9Fe971BA37c51b25272e9e3d12a39490d';
    return address.toLowerCase() === adminWallet.toLowerCase();
  };

  // Conectar carteira (versão simplificada para build)
  const connect = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulação de conexão para build
      const mockAddress = '0x435FE1f9Fe971BA37c51b25272e9e3d12a39490d';
      
      setIsConnected(true);
      setWalletAddress(mockAddress);
      setIsAdmin(checkIfAdmin(mockAddress));
      localStorage.setItem('walletConnected', 'true');
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      setError(t('errors.wallet_connection'));
    } finally {
      setIsLoading(false);
    }
  };

  // Desconectar carteira
  const disconnect = (): void => {
    try {
      setIsConnected(false);
      setWalletAddress(null);
      setIsAdmin(false);
      localStorage.removeItem('walletConnected');
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
    }
  };

  // Efeito para reconectar automaticamente
  useEffect(() => {
    const isWalletConnected = localStorage.getItem('walletConnected') === 'true';
    
    if (isWalletConnected) {
      connect();
    }
  }, []);

  return {
    isConnected,
    walletAddress,
    isAdmin,
    isLoading,
    error,
    connect,
    disconnect
  };
};

export default useWalletConnect;
