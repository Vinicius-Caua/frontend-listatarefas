/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#e2253b",
        secondary: "#851a2a",
        dark: "#222222",
      },
      backgroundImage: {
        "note-pad": "url('./assets/notepad.svg')",
      },
    },
  },
  plugins: [],
};
