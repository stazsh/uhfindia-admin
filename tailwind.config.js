export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        3: "0 25px 50px -12px rgb(0 0 0 / 0.05);",
      },
      colors: {
        /* Light navbar theme: */
        "primary-nav": "white",
        "secondary-nav": "#a7a7a7",
        "tertiary-nav": "#747474",
        "focus-ring-nav": "#4d4d4d",
        "primary-shade-nav": "#2a2a2a",
        "secondary-shade-nav": "#3f3f3f",
        "boundary": "#eaeaea",
        /* Content theme: */
        "primary": "#3a3a3a",
        "secondary": "#696969",
        "tertiary": "#797979",
      },
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      mob: { max: "1023px" },
      // => @media (max-width: 1024px) { ... }

      wide: "1024px",
      // => @media (min-width: 1025px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
