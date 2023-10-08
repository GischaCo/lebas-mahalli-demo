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
        primary: "#1E3A8A", // Dark Blue
        secondary: "#060047", // Very Dark Blue
        accent: "#FF89BC", // Persian Pink
        light: "#c2cdec", // Light Blue
      },
    },
  },
  plugins: [],
};
