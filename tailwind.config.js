/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure this is correct
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          customWhite: "#FAFAFA",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        screens: {
          sm: "375px", // Small screens (Mobile devices)
          md: "834px", // Medium screens (Tablets)
          lg: "1440px", // Large screens (Desktops)
        },
        animation: {
          "fade-in": "fadeIn 0.5s ease-in-out",
          "slide-up": "slideUp 0.3s ease-out",
          "slide-down": "slideDown 0.3s ease-out",
          "scale-in": "scaleIn 0.2s ease-out",
          "bounce-light": "bounceLight 1s infinite",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          slideUp: {
            "0%": { transform: "translateY(10px)", opacity: "0" },
            "100%": { transform: "translateY(0)", opacity: "1" },
          },
          slideDown: {
            "0%": { transform: "translateY(-10px)", opacity: "0" },
            "100%": { transform: "translateY(0)", opacity: "1" },
          },
          scaleIn: {
            "0%": { transform: "scale(0.9)", opacity: "0" },
            "100%": { transform: "scale(1)", opacity: "1" },
          },
          bounceLight: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-5px)" },
          },
        },
        transitionProperty: {
          height: "height",
          spacing: "margin, padding",
        },
        transitionDuration: {
          2000: "2000ms",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  
  