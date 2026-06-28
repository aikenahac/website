import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        aipink: '#D423C6',
        aiblack: '#171512',
      },
      fontFamily: {
        mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },

  plugins: [],
} satisfies Config;
