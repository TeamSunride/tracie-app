/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    darkMode: "class",
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
            sunrideRed: "#dc453d",
        }
      },
      colors: {
        primary: "#dc453d",
        secondary: "#320e3b",
      },
      fontFamily: {
        "sans": ["Roboto", "sans-serif"],
      }
    },
    plugins: [],
  }