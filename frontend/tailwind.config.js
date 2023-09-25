/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B3005E", // Amaranth Purple
        secondary: "#060047", // Federal Blue
        accent: "#FF89BC", // Persian Pink
        light: "#FFDEEB", // Mimi Pink
      },
    },
  },
  plugins: [],
};
