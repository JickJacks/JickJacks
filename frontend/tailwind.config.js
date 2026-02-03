/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-surface-hover": "var(--color-bg-surface-hover)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-secondary": "var(--color-accent-secondary)",
        "accent-tertiary": "var(--color-accent-tertiary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        "hot-deal": "var(--color-hot-deal)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "border-color": "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0, 0, 0, 0.4)",
        md: "0 4px 16px rgba(0, 0, 0, 0.5)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.6)",
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
        hot: "0 0 30px rgba(255, 51, 102, 0.6)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "gradient-hero":
          "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
        "gradient-card": "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 400ms ease-out",
        "pulse-glow": "pulseGlow 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
