/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // 必要に応じて追加
  ],
  theme: {
    extend: {
      fontFamily: {
       kiwi: ["'Kiwi Maru'", "serif"],
      },
    },
  },
  plugins: [],
};
