/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "business",
      "corporate",
      {
        valentine: {
          ...require("daisyui/src/theming/themes")["valentine"],
          primary: "#f472b6",
          secondary: "#c084fc",
          accent: "#93c5fd",
          accent: "#93c5fd",
        },
      },
    ],
  },
};
