/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      colors: {
        // Main Color
        MainYellow1: '#FFCF1F',
        MainYellow2: '#FFF8DE',
        MainPurple1: '#C670F2',
        MainPurple2: '#FAF0FF',
        MainBlue1: '#4461FA',
        MainBlue2: '#ECEFFF',
        MainOrange1: '#F0743F',
        MainOrange2: '#FFEDE5',
        MainYellowGreen1: '#ACEE48',
        MainYellowGreen2: '#EFF6E4',

        // Grey Scale
        GreyScaleWhite: '#FFFFFF',
        GreyScaleWhite2: '#FBFBFB',
        GreyScaleWhite3: '#F8F8F8',
        GreyScaleSilverGrey: '#EBEBEB',
        GreyScaleGrey: '#DDDDDD',
        GreyScaleDarkGrey: '#888888',
        GreyScaleBlack: '#222222',

        // Situation Colors
        WarningRed: '#EE3C3C',
        PositiveGreen: '#04C852',
        GiudeBlue: '#3977F0',
        ErrorYellow: '#F5B100'
      }
    }
  },

  plugins: [require('@tailwindcss/container-queries')]
};
