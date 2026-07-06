/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        retro: ['"VT323"', 'monospace'],
        creepster: ['Creepster', 'cursive'],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        accent: "hsl(var(--accent))",
      },
      keyframes: {
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "role-fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        "glow-pulse": {
          "0%, 100%": { textShadow: "0 0 4px #ff1a1a, 0 0 12px #ff1a1a" },
          "50%": { textShadow: "0 0 10px #ff1a1a, 0 0 25px #e50914" },
        },
      },
      animation: {
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "role-fade-in": "role-fade-in 0.4s ease-out forwards",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "flicker": "flicker 3s infinite",
        "glow-pulse": "glow-pulse 2s infinite ease-in-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
