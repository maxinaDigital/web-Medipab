import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul marino del logotipo MEDIPAB
        primary: {
          DEFAULT: "#14365A",
          light: "#E8F1F8",
          dark: "#0E2640",
        },
        // Verde azulado de "HOSPITAL DE ESPECIALIDADES" (DEFAULT oscurecido para texto blanco AA)
        accent: {
          DEFAULT: "#1F7F78",
          dark: "#17635D",
          bright: "#2B9E96",
        },
        // Cian de la cruz del emblema — solo sobre fondos oscuros
        glow: {
          DEFAULT: "#5FCAD0",
          light: "#8FE6EC",
        },
        // Degradado institucional (hero y bandas oscuras)
        ocean: {
          from: "#0E2640",
          via: "#15466F",
          to: "#1B7C86",
        },
        // Reservado para Urgencias
        urgent: {
          DEFAULT: "#DC2626",
          dark: "#B91C1C",
        },
        brand: {
          bg: "#F7FAFC",
          surface: "#FFFFFF",
          border: "#E2E8F0",
          text: "#1E293B",
          muted: "#64748B",
          success: "#10B981",
          warning: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
