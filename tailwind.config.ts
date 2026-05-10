import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--ink-subtle) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'ui-monospace', 'monospace'],
        crt: ['var(--font-crt)', 'ui-monospace', 'monospace'],
        flat: ['var(--font-flat)', 'system-ui', 'sans-serif'],
        glass: ['var(--font-glass)', 'system-ui', 'sans-serif'],
        brutalist: ['var(--font-brutalist)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-3xl': ['clamp(3.5rem, 11vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-2xl': ['clamp(2.75rem, 8vw, 8rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.25rem, 6vw, 5.5rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        page: '1480px',
        prose: '64ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
