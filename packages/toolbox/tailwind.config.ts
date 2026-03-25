import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../features-project/src/**/*.{js,ts,jsx,tsx}',
    '../features-finance/src/**/*.{js,ts,jsx,tsx}',
    '../features-*/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
