import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary — Prune/Mauve (dominant)
        "primary": "#8e496a",
        "on-primary": "#ffffff",
        "primary-container": "#ffd8e8",
        "on-primary-container": "#3a0725",
        "primary-fixed": "#ffd8e8",
        "primary-fixed-dim": "#f0b0cc",
        "on-primary-fixed": "#3a0725",
        "on-primary-fixed-variant": "#723252",

        // Secondary — Warm Gold (sharp accent)
        "secondary": "#a67c52",
        "on-secondary": "#ffffff",
        "secondary-container": "#ffecd4",
        "on-secondary-container": "#5c3d1e",
        "secondary-fixed": "#ffecd4",
        "secondary-fixed-dim": "#dfc4a0",
        "on-secondary-fixed": "#2e1a04",
        "on-secondary-fixed-variant": "#6b4a28",

        // Tertiary — Sage green (spa wellness)
        "tertiary": "#5c7a5e",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#d4ecd6",
        "on-tertiary-container": "#1a3a1c",
        "tertiary-fixed": "#d4ecd6",
        "tertiary-fixed-dim": "#b0d4b2",
        "on-tertiary-fixed": "#1a3a1c",
        "on-tertiary-fixed-variant": "#3e5a40",

        // Error
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Surfaces — Warm cream (not pink)
        "background": "#faf6f2",
        "on-background": "#1e1b18",
        "surface": "#faf6f2",
        "on-surface": "#1e1b18",
        "surface-variant": "#f0e8e0",
        "on-surface-variant": "#4d4540",
        "surface-dim": "#ddd6ce",
        "surface-bright": "#faf6f2",
        "surface-tint": "#8e496a",
        "surface-container": "#f0ebe6",
        "surface-container-low": "#f5f1ec",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#eae4de",
        "surface-container-highest": "#e4ded8",

        // Sidebar — Dark prune
        "sidebar": "#3a2030",
        "sidebar-surface": "#4d2e40",
        "sidebar-text": "#f0d8e4",
        "sidebar-muted": "#b89aaa",
        "sidebar-active": "#8e496a",
        "sidebar-hover": "#5a3648",

        // Utility accents
        "accent-gold": "#c49a5c",
        "accent-gold-light": "#ffecd4",
        "accent-gold-dark": "#8b6914",
        "success": "#5c7a5e",
        "success-light": "#d4ecd6",

        // Outline
        "outline": "#847370",
        "outline-variant": "#d7c8c4",
        "inverse-surface": "#342f2b",
        "inverse-on-surface": "#f8f0e8",
        "inverse-primary": "#f0b0cc",
      },
      fontFamily: {
        display: ['"Bilbo Swash Caps"', 'cursive'],
        headline: ['Marcellus', 'serif'],
        sans: ['"Nunito Sans"', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
        label: ['"Nunito Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'pill': '50px',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(142, 73, 106, 0.06)',
        'card-hover': '0 8px 30px rgba(142, 73, 106, 0.12)',
        'soft': '0 10px 40px rgba(30, 27, 24, 0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config
