module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  safelist: ['bg-blue', 'bg-blue-700', 'bg-blue-500', 'bg-red-light', 'bg-green', 'bg-gray'],
  theme: {
    extend: {
      width: {
        '7/10': '70%',
        '3/10': '30%'
      },
      maxHeight: {
        '1/2': '50%',
        '4/5': '80%',
        '9/10': '90%'
      },
      lineHeight: {
        0: '0'
      },
      colors: {
        blue: {
          DEFAULT: '#299FD9',
          50: '#EAF5FB',
          500: '#217FAE',
          700: '#15506D'
        },
        gray: {
          DEFAULT: '#E7E7E7'
        },
        red: {
          light: '#FEDDDD'
        },
        green: {
          DEFAULT: '#00CF53',
          light: '#ccf5dd'
        },
        yellow: {
          light: '#FEF5EB'
        },
        dark: {
          DEFAULT: '#0F0F0F'
        },
        primary: {
          700: '#2e9c95',
          600: '#3cafa8',
          500: '#59c8c1',
          400: '#61d7cf',
          300: '#80e9e2',
          200: '#adfbf6',
          100: '#c4fefa'
        },
        secondary: {
          DEFAULT: '#575757',
          700: '#3556fe',
          600: '#4564fc',
          500: '#637cff',
          400: '#97a8ff',
          300: '#bcc6ff',
          200: '#ced5f8',
          100: '#eaedff'
        },
        neutral: {
          700: '#101840',
          600: '#333b66',
          500: '#748497',
          400: '#a0abb9',
          300: '#CED5DE',
          200: '#fafafa',
          100: '#E5E5E5'
        },
        system: {
          error: '#F95454',
          warning: '#FDAC4D',
          success: '#1cbc18',
          gray: '#f5f5f5'
        }
      },
      fontSize: {
        0: 0
        // sm: '12px',
        // xs: '10px',
        // lg: '16px',
        // xl: '18px',
        // '2xl': '20px',
        // '3xl': '24px',
        // '4xl': '28px',
        // '5xl': '32px'
      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1200px'
        }
      },
      screens: {
        mdmax: { max: '767px' }
      },
      zIndex: {
        1: '1',
        60: '60',
        '-1': '-1'
      },
      minHeight: {
        contain: 'calc(100vh - 76px)'
      },
      boxShadow: {
        base: '0px 4px 25px rgba(140, 135, 135, 0.15)',
        soft: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        'border-b': 'inset 0px -1px 0px rgba(206, 213, 222, 0.5)',
        'border-r': 'inset -1px 0px 0px #E6EAEE',
        'border-l': 'inset 1px 0px 0px #E6EAEE',
        border: 'inset 0 0 0 1px #CED5DE'
      }
    }
  },
  variants: {
    extend: {
      borderStyle: ['first', 'last'],
      borderWidth: ['first', 'last'],
      borderRadius: ['first', 'last', 'responsive'],
      margin: ['first', 'last', 'hover'],
      padding: ['first', 'last'],
      transform: ['hover', 'focus'],
      backgroundColor: ['active'],
      borderColor: ['active']
    }
  },
  plugins: []
}
