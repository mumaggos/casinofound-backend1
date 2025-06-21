import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

interface IcoPhaseCardProps {
  phase: number;
  price: string;
  totalTokens: number;
  currentPhase: number;
  percentageSold: number;
}

const IcoPhaseCard: React.FC<IcoPhaseCardProps> = ({
  phase,
  price,
  totalTokens,
  currentPhase,
  percentageSold
}) => {
  const { t } = useTranslation();
  
  // Determinar status da fase
  const isActive = phase === currentPhase;
  const isCompleted = phase < currentPhase;
  
  // Determinar cor de fundo baseada no status
  const getBackgroundColor = () => {
    if (isActive) return 'rgba(0, 255, 200, 0.05)';
    if (isCompleted) return 'rgba(0, 214, 143, 0.05)';
    return theme.colors.background.card;
  };
  
  // Determinar cor da borda baseada no status
  const getBorderColor = () => {
    if (isActive) return theme.colors.accent.neonGreen;
    if (isCompleted) return theme.colors.status.success;
    return '#333';
  };
  
  // Determinar cor do texto de status
  const getStatusColor = () => {
    if (isActive) return theme.colors.accent.neonGreen;
    if (isCompleted) return theme.colors.status.success;
    return theme.colors.text.muted;
  };
  
  // Texto de status
  const getStatusText = () => {
    if (isActive) return t('ico.active');
    if (isCompleted) return t('ico.completed');
    return t('ico.upcoming');
  };
  
  return (
    <div 
      className="rounded-xl p-6"
      style={{ 
        background: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        boxShadow: theme.components.card.shadow
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-lg font-bold"
          style={{ color: theme.colors.text.primary }}
        >
          {t('ico.phase')} {phase}
        </h3>
        <span 
          className="text-sm px-2 py-1 rounded"
          style={{ 
            color: getStatusColor(),
            border: `1px solid ${getStatusColor()}`,
            background: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          {getStatusText()}
        </span>
      </div>
      
      <div className="mb-4">
        <p style={{ color: theme.colors.text.secondary }}>
          {t('ico.price')}:
        </p>
        <p 
          className="text-2xl font-bold"
          style={{ color: theme.colors.accent.gold }}
        >
          ${price} USD
        </p>
      </div>
      
      <div className="mb-4">
        <p style={{ color: theme.colors.text.secondary }}>
          {t('ico.allocation')}:
        </p>
        <p 
          className="text-lg font-medium"
          style={{ color: theme.colors.text.primary }}
        >
          {totalTokens.toLocaleString()} CFD
        </p>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <p 
            className="text-sm"
            style={{ color: theme.colors.text.secondary }}
          >
            {t('ico.sold')}
          </p>
          <p 
            className="text-sm font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            {percentageSold}%
          </p>
        </div>
        <div 
          className="w-full h-2 rounded-full"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div 
            className="h-full rounded-full"
            style={{ 
              width: `${percentageSold}%`,
              background: isActive 
                ? theme.colors.accent.neonGreen 
                : isCompleted 
                  ? theme.colors.status.success 
                  : theme.colors.accent.gold
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IcoPhaseCard;
