/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
  "bg-[url('/src/serit.png')]",
  "bg-[url('/serit.png')]",
  "bg-[url('/src/assets/serit.png')]"
]
}

