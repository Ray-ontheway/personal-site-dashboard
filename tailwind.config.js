/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./src/**/*.{html,vue,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.sans],
      logo: ['"Akaya Kanadaka"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
