"use strict";
const { lightBlue, ...colors } = require("tailwindcss/colors");
const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
const radixColors = require("@radix-ui/colors");
const typography = require("@tailwindcss/typography");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",

  purge: ["./src/**/*.{js,ts,jsx,tsx,css,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
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
              color: theme("colors.orange.500"),
              "&:hover": {
                color: theme("colors.orange.700"),
              },
              code: { color: theme("colors.orange.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.orange.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.orange.400"),
              "&:hover": {
                color: theme("colors.orange.500"),
              },
              code: { color: theme("colors.orange.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [typography],
};
