import { useTranslation } from 'react-i18next';
import theme from '../../lib/theme';

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

export default ConfigManagement;
