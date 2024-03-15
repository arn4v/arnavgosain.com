"use strict";
const { sky: _, ...colors } = require("tailwindcss/colors");
const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
const radixColors = require("@radix-ui/colors");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        sans: ["Inter", ...fontFamily.sans],
        serif: ['"Playfair Display"', ...fontFamily.serif],
      },
      backgroundColor: {
        primary: "#F1F0E9",
      },
      colors: {
        ...colors,
        radix: radixColors,
      },
      borderColor: {
        ...colors,
        radix: radixColors,
      },
      // thanks @leerob; https://github.com/leerob/leerob.io
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.emerald.700"),
              "&:hover": {
                color: theme("colors.emerald.600"),
              },
              code: { color: theme("colors.emerald.600") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.emerald.600") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
      }),
    },
  },
  plugins: [typography],
};
