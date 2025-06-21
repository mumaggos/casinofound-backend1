import { useTranslation } from 'react-i18next';
import theme from '../../lib/theme';

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

export default ContentManagement;
