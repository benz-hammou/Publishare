/* @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        maxQuartScreen: "25vh",
        maxOneThirdScreen: "33vh",
        "14": "3.5rem",
        "40vh": "40vh",
        "50vh": "50vh",
      },
      minHeight: {
        14: "3.5rem",
        "40vh": "40vh",
        "50vh": "50vh",
      },
      height: {
        quartScreen: "25vh",
        oneThirdScreen: "33vh",
        "40vh": "40vh",
        "50vh": "50vh",
      },
      maxWidth: {
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
      },
      width: {
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "70%": "70%",
        "80%": "80%",
      },
      minWidth: {
        "6rem": "6rem",
        "40%": "40%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
      },
      aspectRatio: {
        "21/6": "21 / 6",
        "18/9": "18 / 9",
        "16/13": "16 / 13",
        "11/8": "11 / 8",
        "4/2": "4 / 2",
        "4/3": "4 / 3",
      },
      boxShadow: {
        shadowPost: "0 4px 16px 0 rgba(0, 0, 0, 0.16) ",
      },
    },
  },
  plugins: [],
});
