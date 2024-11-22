import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        aipink: "#D423C6",
        aiblack: "#171512",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    }
  },

  plugins: []
} satisfies Config;
