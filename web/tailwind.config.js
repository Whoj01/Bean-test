/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        pokealltext: "#4278C4",
        normal: {
          bg: "#E8E8E8",
          text: "#909090"
        },
        fire: {
          bg: "#FFEBCA",
          text: "#E96303"
        },
        water: {
          bg: "#DFECF5",
          text: "#4F77BE"
        },
        grass: {
          bg: "#D6EBDC",
          text: "#73B861"
        },
        flying: {
          bg: "#ECF0F9",
          text: "#758CBD",
        },
        fighting: {
          bg: '#F3DBDF',
          text: '#C44D61',
        },
        poison: {
          bg: '#EEE1F4',
          text: '#AC6ACA',
        },
        electric: {
          bg: '#F5F2DF',
          text: '#D4BC34',
        },
        ground: {
          bg: '#F5E4DB',
          text: '#CE8056',
        },
        rock: {
          bg: '#E7F5F2',
          text: '#84BEB3',
        },
        psychic: {
          bg: '#FBE8E7',
          text: '#EB8B85',
        },
        ice: {
          bg: '#E5F3F0',
          text: '#71BAAC',
        },
        bug: {
          bg: '#E6ECD7',
          text: '#9BBA48',
        },
        ghost: {
          bg: '#DFE2F1',
          text: '#616EB7',
        },
        steel: {
          bg: '#DFE2F1',
          text: '#6594A1',
        },
        dragon: {
          bg: '#DAE1EB',
          text: '#2C6AC1',
        },
        dark: {
          bg: '#D8D8D9',
          text: '#595761',
        },
        fairy: {
          bg: '#F8E8F8',
          text: '#E296E1',
        },
        red: {
          "300": "#F6DEDE",
          "500": "#C20001"
        },
        black: {
          "500": "#2f3133"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        mainbg: "#EFF3F6",
        redpoke: '#BA0001',
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}