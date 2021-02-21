import { colors as lightColors } from "../constants/colorsMap/light";
import { Theme } from "./makeTheme";

export const defaultTheme: Theme = {
  colors: lightColors,
  definitions: {
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/05",
      },
    },
  },
};
