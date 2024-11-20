import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        aipink: "#D423C6",
        aiblack: "#171512",
      }
    }
  },

  plugins: []
} satisfies Config;
