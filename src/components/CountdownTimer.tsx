import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';
import Countdown from 'react-countdown';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const { t } = useTranslation();
  
  // Renderer para o contador
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Renderizar quando o contador chegar a zero
      return (
        <div 
          className="p-6 rounded-xl text-center"
          style={{ 
            background: theme.colors.background.card,
            border: theme.components.card.border,
            boxShadow: theme.components.card.shadow
          }}
        >
          <h3 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: theme.colors.accent.gold }}
          >
            {t('countdown.launched')}
          </h3>
          <p 
            className="text-lg"
            style={{ color: theme.colors.text.secondary }}
          >
            {t('countdown.visit_casino')}
          </p>
          <a 
            href="#"
            className="mt-4 px-6 py-2 rounded-lg inline-block text-base font-medium"
            style={{
              background: theme.components.button.primary.background,
              color: theme.components.button.primary.color,
              boxShadow: theme.components.button.primary.shadow
            }}
          >
            {t('countdown.visit_button')}
          </a>
        </div>
      );
    } else {
      // Renderizar contador
      return (
        <div className="flex flex-wrap justify-center gap-4">
          <div 
            className="w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-xl"
            style={{ 
              background: theme.colors.gradient.darkGold,
              boxShadow: theme.effects.boxShadow.md
            }}
          >
            <span 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#000' }}
            >
              {days}
            </span>
            <span 
              className="text-xs md:text-sm"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              {t('countdown.days')}
            </span>
          </div>
          
          <div 
            className="w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-xl"
            style={{ 
              background: theme.colors.gradient.darkGold,
              boxShadow: theme.effects.boxShadow.md
            }}
          >
            <span 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#000' }}
            >
              {hours}
            </span>
            <span 
              className="text-xs md:text-sm"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              {t('countdown.hours')}
            </span>
          </div>
          
          <div 
            className="w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-xl"
            style={{ 
              background: theme.colors.gradient.darkGold,
              boxShadow: theme.effects.boxShadow.md
            }}
          >
            <span 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#000' }}
            >
              {minutes}
            </span>
            <span 
              className="text-xs md:text-sm"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              {t('countdown.minutes')}
            </span>
          </div>
          
          <div 
            className="w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-xl"
            style={{ 
              background: theme.colors.gradient.darkGold,
              boxShadow: theme.effects.boxShadow.md
            }}
          >
            <span 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#000' }}
            >
              {seconds}
            </span>
            <span 
              className="text-xs md:text-sm"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              {t('countdown.seconds')}
            </span>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div>
      <h3 
        className="text-xl md:text-2xl font-bold mb-6 text-center"
        style={{ color: theme.colors.text.primary }}
      >
        {t('countdown.title')}
      </h3>
      <Countdown 
        date={targetDate} 
        renderer={renderer}
      />
    </div>
  );
};

export default CountdownTimer;
