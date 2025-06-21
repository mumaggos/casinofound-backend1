import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

interface NewsletterFormProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  success: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  email,
  setEmail,
  isLoading,
  success,
  error,
  onSubmit
}) => {
  const { t } = useTranslation();
  
  return (
    <div>
      {success ? (
        <div 
          className="p-4 rounded-md"
          style={{ 
            background: 'rgba(0, 214, 143, 0.1)',
            border: `1px solid ${theme.colors.status.success}`,
            color: theme.colors.status.success
          }}
        >
          {t('home.newsletter_success')}
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  background: theme.components.input.background,
                  border: theme.components.input.border,
                  color: theme.components.input.color,
                  outline: 'none',
                }}
                placeholder={t('home.newsletter_placeholder')}
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                style={{
                  background: theme.components.button.primary.background,
                  color: theme.components.button.primary.color,
                  boxShadow: theme.components.button.primary.shadow
                }}
                disabled={isLoading || !email}
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
                  t('home.newsletter_button')
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div 
              className="p-3 rounded-md"
              style={{ 
                background: 'rgba(255, 56, 96, 0.1)',
                border: `1px solid ${theme.colors.status.error}`,
                color: theme.colors.status.error
              }}
            >
              {error}
            </div>
          )}
          
          <p 
            className="text-sm mt-2"
            style={{ color: theme.colors.text.muted }}
          >
            {t('newsletter.privacy_notice')}
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
