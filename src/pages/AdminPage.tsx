import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';
import useWalletConnect from '../hooks/useWalletConnect';
import WalletConnectButton from '../components/WalletConnectButton';
import { adminAPI } from '../lib/api';

// Componentes de administração
const ContentManagement = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.accent.gold }}>
        {t('admin.content_management')}
      </h3>
      <p className="mb-4" style={{ color: theme.colors.text.secondary }}>
        {t('admin.content_description')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="px-4 py-2 rounded"
          style={{
            background: theme.components.button.secondary.background,
            color: theme.components.button.secondary.color,
            border: theme.components.button.secondary.border
          }}
        >
          {t('admin.edit_home')}
        </button>
        <button
          className="px-4 py-2 rounded"
          style={{
            background: theme.components.button.secondary.background,
            color: theme.components.button.secondary.color,
            border: theme.components.button.secondary.border
          }}
        >
          {t('admin.edit_whitepaper')}
        </button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.accent.gold }}>
        {t('admin.user_management')}
      </h3>
      <p className="mb-4" style={{ color: theme.colors.text.secondary }}>
        {t('admin.user_description')}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left" style={{ color: theme.colors.text.secondary }}>
                {t('admin.wallet_address')}
              </th>
              <th className="px-4 py-2 text-left" style={{ color: theme.colors.text.secondary }}>
                {t('admin.balance')}
              </th>
              <th className="px-4 py-2 text-left" style={{ color: theme.colors.text.secondary }}>
                {t('admin.staked')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2" style={{ color: theme.colors.text.primary }}>0x123...abc</td>
              <td className="px-4 py-2" style={{ color: theme.colors.text.primary }}>1,250.75 CFD</td>
              <td className="px-4 py-2" style={{ color: theme.colors.text.primary }}>750.25 CFD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ConfigManagement = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.accent.gold }}>
        {t('admin.config_management')}
      </h3>
      <p className="mb-4" style={{ color: theme.colors.text.secondary }}>
        {t('admin.config_description')}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-2" style={{ color: theme.colors.text.secondary }}>
            {t('admin.ico_phase')}
          </label>
          <select
            className="w-full px-3 py-2 rounded"
            style={{
              background: theme.components.input.background,
              border: theme.components.input.border,
              color: theme.components.input.color
            }}
          >
            <option value="1">Fase 1 - $0.02</option>
            <option value="2" selected>Fase 2 - $0.04</option>
            <option value="3">Fase 3 - $0.06</option>
            <option value="4">Fase 4 - $0.08</option>
          </select>
        </div>
        <div>
          <label className="block mb-2" style={{ color: theme.colors.text.secondary }}>
            {t('admin.launch_date')}
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded"
            style={{
              background: theme.components.input.background,
              border: theme.components.input.border,
              color: theme.components.input.color
            }}
            value="2026-01-01"
          />
        </div>
      </div>
    </div>
  );
};

const NewsletterManagement = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.accent.gold }}>
        {t('admin.newsletter_management')}
      </h3>
      <p className="mb-4" style={{ color: theme.colors.text.secondary }}>
        {t('admin.newsletter_description')}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-2" style={{ color: theme.colors.text.secondary }}>
            {t('admin.newsletter_subject')}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded"
            style={{
              background: theme.components.input.background,
              border: theme.components.input.border,
              color: theme.components.input.color
            }}
            placeholder={t('admin.subject_placeholder')}
          />
        </div>
        <div>
          <label className="block mb-2" style={{ color: theme.colors.text.secondary }}>
            {t('admin.newsletter_content')}
          </label>
          <textarea
            className="w-full px-3 py-2 rounded"
            style={{
              background: theme.components.input.background,
              border: theme.components.input.border,
              color: theme.components.input.color
            }}
            rows={6}
            placeholder={t('admin.content_placeholder')}
          ></textarea>
        </div>
        <button
          className="px-4 py-2 rounded"
          style={{
            background: theme.components.button.primary.background,
            color: theme.components.button.primary.color
          }}
        >
          {t('admin.send_newsletter')}
        </button>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, walletAddress, connect, disconnect } = useWalletConnect();
  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  useEffect(() => {
    const checkAdmin = async () => {
      if (isConnected && walletAddress) {
        // Verificar se é admin (simplificado para build)
        setIsAdmin(walletAddress.toLowerCase() === '0x435fe1f9fe971ba37c51b25272e9e3d12a39490d'.toLowerCase());
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [isConnected, walletAddress]);
  
  useEffect(() => {
    const fetchDashboard = async () => {
      if (isAdmin) {
        try {
          // Sem argumentos para o mock
          const response = await adminAPI.getDashboard();
          
          if (response.data.success) {
            setStats(response.data.stats);
          }
        } catch (error) {
          console.error('Erro ao obter dados do dashboard:', error);
        }
      }
    };
    
    if (isAdmin) {
      fetchDashboard();
    }
  }, [isAdmin]);
  
  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-12" style={{ background: theme.colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: theme.colors.text.primary }}
            >
              {t('admin.title')}
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('admin.connect_wallet')}
            </p>
            <div className="flex justify-center">
              <WalletConnectButton
                isConnected={isConnected}
                walletAddress={walletAddress}
                onConnect={connect}
                onDisconnect={disconnect}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 pb-12" style={{ background: theme.colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: theme.colors.text.primary }}
            >
              {t('admin.title')}
            </h1>
            <p 
              className="text-lg mb-4"
              style={{ color: theme.colors.status.error }}
            >
              {t('admin.not_authorized')}
            </p>
            <p 
              className="mb-8"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('admin.admin_only')}
            </p>
            <div className="flex justify-center">
              <WalletConnectButton
                isConnected={isConnected}
                walletAddress={walletAddress}
                onConnect={connect}
                onDisconnect={disconnect}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: theme.colors.background.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              {t('admin.title')}
            </h1>
            <p 
              className="mt-2"
              style={{ color: theme.colors.text.secondary }}
            >
              {t('admin.welcome')}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletConnectButton
              isConnected={isConnected}
              walletAddress={walletAddress}
              onConnect={connect}
              onDisconnect={disconnect}
              isLoading={false}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap mb-6 border-b" style={{ borderColor: theme.colors.background.tertiary }}>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'dashboard' ? 'border-b-2' : ''}`}
            style={{ 
              color: activeTab === 'dashboard' ? theme.colors.accent.gold : theme.colors.text.secondary,
              borderColor: theme.colors.accent.gold
            }}
            onClick={() => setActiveTab('dashboard')}
          >
            {t('admin.dashboard')}
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'content' ? 'border-b-2' : ''}`}
            style={{ 
              color: activeTab === 'content' ? theme.colors.accent.gold : theme.colors.text.secondary,
              borderColor: theme.colors.accent.gold
            }}
            onClick={() => setActiveTab('content')}
          >
            {t('admin.content')}
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'users' ? 'border-b-2' : ''}`}
            style={{ 
              color: activeTab === 'users' ? theme.colors.accent.gold : theme.colors.text.secondary,
              borderColor: theme.colors.accent.gold
            }}
            onClick={() => setActiveTab('users')}
          >
            {t('admin.users')}
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'config' ? 'border-b-2' : ''}`}
            style={{ 
              color: activeTab === 'config' ? theme.colors.accent.gold : theme.colors.text.secondary,
              borderColor: theme.colors.accent.gold
            }}
            onClick={() => setActiveTab('config')}
          >
            {t('admin.config')}
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'newsletter' ? 'border-b-2' : ''}`}
            style={{ 
              color: activeTab === 'newsletter' ? theme.colors.accent.gold : theme.colors.text.secondary,
              borderColor: theme.colors.accent.gold
            }}
            onClick={() => setActiveTab('newsletter')}
          >
            {t('admin.newsletter')}
          </button>
        </div>
        
        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              className="p-6 rounded-lg"
              style={{ 
                background: theme.colors.background.card,
                border: theme.components.card.border,
                boxShadow: theme.components.card.shadow
              }}
            >
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('admin.total_users')}
              </h3>
              <p 
                className="text-3xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {stats.total_users.toLocaleString()}
              </p>
            </div>
            <div 
              className="p-6 rounded-lg"
              style={{ 
                background: theme.colors.background.card,
                border: theme.components.card.border,
                boxShadow: theme.components.card.shadow
              }}
            >
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('admin.tokens_staked')}
              </h3>
              <p 
                className="text-3xl font-bold"
                style={{ color: theme.colors.accent.neonGreen }}
              >
                {stats.total_tokens_staked.toLocaleString()} CFD
              </p>
            </div>
            <div 
              className="p-6 rounded-lg"
              style={{ 
                background: theme.colors.background.card,
                border: theme.components.card.border,
                boxShadow: theme.components.card.shadow
              }}
            >
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('admin.newsletter_subscribers')}
              </h3>
              <p 
                className="text-3xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {stats.total_subscribers.toLocaleString()}
              </p>
            </div>
            <div 
              className="p-6 rounded-lg"
              style={{ 
                background: theme.colors.background.card,
                border: theme.components.card.border,
                boxShadow: theme.components.card.shadow
              }}
            >
              <h3 
                className="text-lg font-medium mb-2"
                style={{ color: theme.colors.text.secondary }}
              >
                {t('admin.last_updated')}
              </h3>
              <p 
                className="text-xl font-medium"
                style={{ color: theme.colors.text.primary }}
              >
                {new Date(stats.last_updated).toLocaleString()}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && <ContentManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'config' && <ConfigManagement />}
        {activeTab === 'newsletter' && <NewsletterManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
