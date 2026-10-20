/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aleric: {
          bg: '#0B0F19',
          surface: '#0D121F',
          border: '#1E293B',
          lightBg: '#F8FAFC',
          lightSurface: '#FFFFFF',
          lightBorder: '#E2E8F0',
          primary: '#6366F1',
          primaryHover: '#4F46E5',
          accent: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
