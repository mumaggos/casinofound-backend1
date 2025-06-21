// Tema premium para o site CasinoFound
const theme = {
  colors: {
    background: {
      primary: '#0f0f0f',
      secondary: '#1a1a1a',
      tertiary: '#252525',
      card: '#171717'
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#c0c0c0',
      muted: '#808080'
    },
    accent: {
      gold: '#FFD700',
      neonGreen: '#00FFC8',
      neonBlue: '#4000FF',
      purple: '#9945FF'
    },
    status: {
      success: '#00d68f',
      warning: '#ffaa00',
      error: '#ff3860'
    },
    gradient: {
      goldPrimary: 'linear-gradient(45deg, #FFD700, #FFA500)',
      darkGold: 'linear-gradient(45deg, #B8860B, #DAA520)'
    }
  },
  fonts: {
    primary: "'Poppins', sans-serif",
    secondary: "'Inter', sans-serif"
  },
  typography: {
    fontFamily: {
      primary: "'Poppins', sans-serif",
      secondary: "'Inter', sans-serif"
    }
  },
  effects: {
    textShadow: {
      gold: '0 0 10px rgba(255, 215, 0, 0.5)'
    },
    boxShadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      gold: '0 4px 15px rgba(255, 215, 0, 0.3)'
    }
  },
  components: {
    navbar: {
      background: '#0f0f0f',
      borderBottom: '1px solid #333',
      height: '80px',
      backdropFilter: 'blur(10px)'
    },
    footer: {
      background: '#0f0f0f',
      borderTop: '1px solid #333',
      height: '60px'
    },
    card: {
      border: '1px solid #333',
      borderRadius: '12px',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
    },
    button: {
      primary: {
        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
        color: '#000',
        border: 'none',
        shadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
        hover: {
          background: 'linear-gradient(45deg, #FFA500, #FFD700)',
          transform: 'translateY(-2px)'
        }
      },
      secondary: {
        background: 'transparent',
        border: '1px solid #FFD700',
        color: '#FFD700',
        shadow: 'none',
        hover: {
          background: 'rgba(255, 215, 0, 0.1)',
          transform: 'translateY(-2px)'
        }
      },
      connect: {
        background: 'linear-gradient(45deg, #00FFC8, #4000FF)',
        color: '#fff',
        border: 'none',
        shadow: '0 4px 15px rgba(0, 255, 200, 0.2)',
        hover: {
          background: 'linear-gradient(45deg, #4000FF, #00FFC8)',
          transform: 'translateY(-2px)'
        }
      }
    },
    input: {
      background: '#252525',
      border: '1px solid #333',
      color: '#f0f0f0',
      focus: {
        border: '1px solid #FFD700',
        shadow: '0 0 0 2px rgba(255, 215, 0, 0.25)'
      }
    }
  }
};

export default theme;
