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
        primary: "#E1057A", // Mexican Pink
        secondary: "#060047", // Federal Blue
        accent: "#FF89BC", // Persian Pink
        light: "#FFDEEB", // Mimi Pink
      },
    },
  },
  plugins: [],
};
