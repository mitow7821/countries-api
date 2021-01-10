module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1800px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      custom: ["Nunito Sans", "sans-serif"],
    },
    textColor: (theme) => theme("colors"),
    textColor: {
      // - Dark Blue (Dark Mode Elements):
      // - Very Dark Blue (Light Mode Text):
      // - Dark Gray (Light Mode Input):
      // - White (Dark Mode Text & Light Mode Elements):

      dark: "hsl(200, 15%, 8%)",
      inputs: "hsl(0, 0%, 52%)",
      light: "hsl(0, 0%, 100%)",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      dark: "hsl(207, 26%, 17%)",
      dark2: "hsl(209, 23%, 22%)",
      light: "hsl(0, 0%, 98%)",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      dark: "hsl(209, 23%, 22%)",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
