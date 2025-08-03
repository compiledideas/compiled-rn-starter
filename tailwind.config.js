const colors = require('./configs/color');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sf: ['SF_Pro_Display'],
      },
      colors,
      fontSize: {
        xxs: '12px',
        xs: '14px', // 14px
        sm: '16px', // 14px
        base: '18px', // 16px
        xl: '20px', // 18px
        xbase: '22px', // 22px
        xxl: '24px', // 24px
        xm: '28px', // 28px
        xxm: '30px', // 30px
        '2xl': '36px', // 36px
        '3xl': '40px', // 36px
        '4xl': '48px', // 36px
      },
      screens: {
        md: { min: '767px', max: '2500px' },
        sm: { min: '20px', max: '767px' },
      },
      container: {
        center: true,
        screens: {
          md: '750px',
          sm: '360px',
        },
      },
    },
  },
  plugins: [],
};
