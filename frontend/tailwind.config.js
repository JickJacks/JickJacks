/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "bg-primary": "#0a0a14",
        "bg-secondary": "#13131f",
        "bg-surface": "#1a1a2e",
        "bg-surface-hover": "#232338",
        "accent-primary": "#6366f1",
        "accent-secondary": "#8b5cf6",
        "accent-tertiary": "#06b6d4",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        "hot-deal": "#ff3366",
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        "border-color": "#2d2d44",
        "border-hover": "#3d3d54",
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
        "gradient-hero": "radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
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
