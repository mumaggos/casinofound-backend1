import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import theme from '../lib/theme';

ChartJS.register(ArcElement, Tooltip, Legend);

const TokenomicsChart: React.FC = () => {
  const { t } = useTranslation();
  
  // Dados de distribuição de tokens
  const data = {
    labels: [
      t('tokenomics.airdrops'),
      t('tokenomics.donations'),
      t('tokenomics.ico_phase_1'),
      t('tokenomics.ico_phase_2'),
      t('tokenomics.ico_phase_3'),
      t('tokenomics.ico_phase_4'),
      t('tokenomics.team'),
      t('tokenomics.liquidity'),
      t('tokenomics.marketing'),
      t('tokenomics.staking')
    ],
    datasets: [
      {
        data: [6, 1, 12, 12, 12, 12, 15, 10, 10, 10],
        backgroundColor: [
          '#FFD700', // Gold
          '#00FFC8', // Neon Green
          '#4000FF', // Neon Blue
          '#FF3860', // Red
          '#00D68F', // Green
          '#FFAA00', // Orange
          '#9945FF', // Purple
          '#14FFEC', // Cyan
          '#FF14E6', // Pink
          '#19FB9B'  // Light Green
        ],
        borderColor: [
          '#000000'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Opções do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            family: theme.typography.fontFamily.primary,
            size: 12
          },
          color: theme.colors.text.primary,
          padding: 15
        }
      },
      tooltip: {
        titleFont: {
          family: theme.typography.fontFamily.primary,
          size: 14
        },
        bodyFont: {
          family: theme.typography.fontFamily.primary,
          size: 13
        },
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}% (${(value * 210000).toLocaleString()} CFD)`;
          }
        },
        boxShadow: theme.effects.boxShadow.md
      }
    },
  };
  
  return (
    <div 
      className="p-6 rounded-xl"
      style={{ 
        background: theme.colors.background.card,
        border: theme.components.card.border,
        boxShadow: theme.components.card.shadow
      }}
    >
      <h3 
        className="text-xl font-bold mb-4 text-center"
        style={{ color: theme.colors.accent.gold }}
      >
        {t('tokenomics.distribution_title')}
      </h3>
      <div className="max-w-md mx-auto">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6">
        <p 
          className="text-center mb-2"
          style={{ color: theme.colors.text.secondary }}
        >
          {t('tokenomics.total_supply')}: <span style={{ color: theme.colors.text.primary }}>21,000,000 CFD</span>
        </p>
      </div>
    </div>
  );
};

export default TokenomicsChart;
