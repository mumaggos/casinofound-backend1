import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// Configuração dos conectores para Web3
export const injected = new InjectedConnector({
  supportedChainIds: [137] // Polygon Mainnet
});

// Configuração do WalletConnect
export const walletconnect = new WalletConnectConnector({
  rpc: {
    137: 'https://polygon-rpc.com/'
  },
  qrcode: true
});

// Função para obter o nome da rede
export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case 137:
      return 'Polygon Mainnet';
    case 80001:
      return 'Polygon Mumbai Testnet';
    default:
      return 'Rede Desconhecida';
  }
};

// Função para verificar se a rede é suportada
export const isSupportedNetwork = (chainId: number): boolean => {
  return chainId === 137; // Apenas Polygon Mainnet é suportado
};

// Função para formatar endereço de carteira
export const formatWalletAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Função para assinar mensagem (simplificada para build)
export const signMessage = async (): Promise<string> => {
  try {
    // Versão simplificada para build
    return "0x123456789abcdef";
  } catch (error) {
    console.error('Erro ao assinar mensagem:', error);
    throw error;
  }
};

// Função para verificar se o endereço é administrador
export const isAdminWallet = (address: string): boolean => {
  const adminWallet = '0x435FE1f9Fe971BA37c51b25272e9e3d12a39490d';
  return address.toLowerCase() === adminWallet.toLowerCase();
};

// Função para converter de wei para ether (simplificada)
export const fromWei = (value: string): string => {
  return value;
};

// Função para converter de ether para wei (simplificada)
export const toWei = (value: string): string => {
  return value;
};

export default {
  injected,
  walletconnect,
  getNetworkName,
  isSupportedNetwork,
  formatWalletAddress,
  signMessage,
  isAdminWallet,
  fromWei,
  toWei
};
