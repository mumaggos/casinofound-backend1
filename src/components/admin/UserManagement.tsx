import { useTranslation } from 'react-i18next';
import theme from '../../lib/theme';

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

export default UserManagement;
