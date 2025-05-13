import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "mouth-move": {
          "50%": { transform: "scaleY(0.7)" },
        },
        sleep: {
          "50%": { transform: "scale(0.9, 1.05)" },
        },
        "bubble-scale": {
          "50%": { transform: "scale(1.6)" },
        },
        shadow: {
          "50%": { transform: "scaleX(0.7)" },
        },
      },
      animation: {
        "mouth-move": "mouth-move 2s infinite",
        sleep: "sleep 2s infinite",
        "bubble-scale": "bubble-scale 2s infinite",
        shadow: "shadow 2s infinite",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
