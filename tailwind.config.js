// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        //        titles: 'Palatino Sans Arabic',
        titles: "Cormorant Infant",
      },
      colors: {
        // https://adevade.github.io/color-scheme-generator/
        white: "#ffffff",
        "gray-lightest": "#f9f8fa",
        "gray-lighter": "#e5e4e6",
        "gray-light": "#d1d0d2",
        gray: "#bebdc0",
        "gray-dark": "#979698",
        "gray-darker": "#6f6e70",
        "gray-darkest": "#48484a",
        black: "#212022",

        "brand-light": "#dbc5fe",
        brand: "#1d0ff1",
        "brand-dark": "#251371",

        "cta-light": "#ffe2c6",
        cta: "#f18e0f",
        "cta-dark": "#734615",

        "info-light": "#dbedff",
        info: "#4bb9fd",
        "info-dark": "#2f5876",

        "warning-light": "#feecd7",
        warning: "#ecb560",
        "warning-dark": "#705732",

        "success-light": "#dbf2dc",
        success: "#66c775",
        "success-dark": "#365f3b",

        "danger-light": "#ffd0d7",
        danger: "#e92268",
        "danger-dark": "#6f1f35",

        blue: '#007ace',
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus"],
  },

  // https://github.com/tailwindcss/custom-forms
  plugins: [require("@tailwindcss/custom-forms")],
};
