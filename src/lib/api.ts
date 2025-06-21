// API mock para o site CasinoFound
// Este arquivo simula as chamadas de API para permitir build e validação visual

// API de autenticação
export const authAPI = {
  connect: async () => {
    return {
      data: {
        success: true,
        is_admin: true,
        token: 'mock-jwt-token'
      }
    };
  }
};

// API de tokens
export const tokenAPI = {
  getBalance: async () => {
    return {
      data: {
        success: true,
        balance: 1250.75,
        staked: 750.25,
        percentage: 0.0095, // 0.95% do total
        total_supply: 21000000
      }
    };
  },
  stake: async () => {
    return {
      data: {
        success: true,
        transaction_hash: '0x123456789abcdef',
        new_balance: 1150.75,
        new_staked: 850.25
      }
    };
  },
  unstake: async () => {
    return {
      data: {
        success: true,
        transaction_hash: '0x123456789abcdef',
        new_balance: 1350.75,
        new_staked: 650.25
      }
    };
  },
  purchase: async () => {
    return {
      data: {
        success: true,
        transaction_hash: '0x123456789abcdef',
        tokens_purchased: 100,
        new_balance: 1350.75
      }
    };
  }
};

// API de conteúdo
export const contentAPI = {
  getAll: async () => {
    return {
      data: {
        success: true,
        content: {
          home: {
            hero_title: 'CasinoFound (CFD)',
            hero_subtitle: 'O futuro dos casinos na blockchain',
            about_title: 'Sobre o CasinoFound',
            about_text: 'CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador.'
          },
          whitepaper: {
            introduction: 'CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador.',
            vision: 'Através do token CFD, os detentores participam dos lucros do casino em polygon, recebendo dividendos proporcionais à quantidade de tokens que possuem em Stack.'
          },
          roadmap: [
            {
              phase: 'Fase 1',
              title: 'Lançamento do Token',
              description: 'Criação e distribuição inicial do token CFD na rede Polygon.',
              date: '2025-Q1',
              completed: true
            },
            {
              phase: 'Fase 2',
              title: 'ICO e Listagem',
              description: 'Oferta inicial de moedas e listagem em exchanges descentralizadas.',
              date: '2025-Q2',
              completed: true
            },
            {
              phase: 'Fase 3',
              title: 'Desenvolvimento do Casino',
              description: 'Desenvolvimento da plataforma de casino online com jogos exclusivos.',
              date: '2025-Q3',
              completed: false
            },
            {
              phase: 'Fase 4',
              title: 'Lançamento do Casino',
              description: 'Lançamento oficial do casino online com integração completa do token CFD.',
              date: '2026-Q1',
              completed: false
            }
          ],
          tokenomics: {
            total_supply: 21000000,
            distribution: [
              { category: 'Airdrops', percentage: 6, amount: 1260000, description: 'Promoções e recompensas à comunidade' },
              { category: 'Doações sociais/ambientais', percentage: 1, amount: 210000, description: 'Responsabilidade social e ambiental' },
              { category: 'ICO Fase 1', percentage: 12, amount: 2520000, description: '$0.02 por token' },
              { category: 'ICO Fase 2', percentage: 12, amount: 2520000, description: '$0.04 por token' },
              { category: 'ICO Fase 3', percentage: 12, amount: 2520000, description: '$0.06 por token' },
              { category: 'ICO Fase 4', percentage: 12, amount: 2520000, description: '$0.08 por token' },
              { category: 'Equipa e Desenvolvimento', percentage: 15, amount: 3150000, description: 'Bloqueado por 2 anos' },
              { category: 'Reserva de Liquidez', percentage: 10, amount: 2100000, description: 'Para operações do casino' },
              { category: 'Marketing', percentage: 10, amount: 2100000, description: 'Promoção e parcerias' },
              { category: 'Staking e Recompensas', percentage: 10, amount: 2100000, description: 'Incentivos aos holders' }
            ]
          },
          team: [
            {
              name: 'João Silva',
              position: 'CEO & Fundador',
              bio: 'Especialista em blockchain com mais de 10 anos de experiência em desenvolvimento de software.',
              image: '/images/team-member1.jpg'
            },
            {
              name: 'Maria Santos',
              position: 'CTO',
              bio: 'Desenvolvedora blockchain com experiência em Ethereum e Polygon. Anteriormente trabalhou na Binance.',
              image: '/images/team-member2.jpg'
            },
            {
              name: 'António Ferreira',
              position: 'CMO',
              bio: 'Especialista em marketing digital com foco em criptomoedas e iGaming.',
              image: '/images/team-member3.jpg'
            }
          ]
        }
      }
    };
  },
  update: async () => {
    return {
      data: {
        success: true,
        message: 'Conteúdo atualizado com sucesso'
      }
    };
  }
};

// API de configuração
export const configAPI = {
  getAll: async () => {
    return {
      data: {
        success: true,
        config: {
          ico_phase: 2,
          ico_prices: [0.02, 0.04, 0.06, 0.08],
          casino_launch_date: '2026-01-01T00:00:00Z',
          staking_min_days: 30,
          staking_apr: 12, // 12% ao ano
          admin_wallet: '0x435FE1f9Fe971BA37c51b25272e9e3d12a39490d'
        }
      }
    };
  },
  update: async () => {
    return {
      data: {
        success: true,
        message: 'Configurações atualizadas com sucesso'
      }
    };
  }
};

// API de administração
export const adminAPI = {
  getDashboard: async () => {
    return {
      data: {
        success: true,
        stats: {
          total_users: 1250,
          total_tokens_staked: 4500000,
          total_subscribers: 3750,
          last_updated: new Date().toISOString()
        }
      }
    };
  },
  getUsers: async () => {
    return {
      data: {
        success: true,
        users: [
          {
            address: '0x123456789abcdef',
            balance: 1250.75,
            staked: 750.25,
            joined_date: '2025-03-15T10:30:00Z'
          },
          {
            address: '0x987654321fedcba',
            balance: 3500.50,
            staked: 2000.00,
            joined_date: '2025-03-10T14:45:00Z'
          }
        ]
      }
    };
  }
};

// API de newsletter
export const newsletterAPI = {
  subscribe: async () => {
    return {
      data: {
        success: true,
        message: 'Email subscrito com sucesso'
      }
    };
  },
  unsubscribe: async () => {
    return {
      data: {
        success: true,
        message: 'Email removido com sucesso'
      }
    };
  },
  getSubscribers: async () => {
    return {
      data: {
        success: true,
        subscribers: [
          { email: 'exemplo1@email.com', language: 'pt', subscribed_date: '2025-03-15T10:30:00Z' },
          { email: 'exemplo2@email.com', language: 'en', subscribed_date: '2025-03-16T11:45:00Z' }
        ]
      }
    };
  },
  sendNewsletter: async () => {
    return {
      data: {
        success: true,
        message: 'Newsletter enviada com sucesso',
        recipients: 1250
      }
    };
  }
};
