import { useTranslation } from 'react-i18next';
import theme from '../../lib/theme';

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

export default NewsletterManagement;
