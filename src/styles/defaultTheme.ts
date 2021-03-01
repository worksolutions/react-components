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
    Tabs: {
      bottomLine: {
        color: "blue/05",
      },
      Tab: {
        backgroundColor: "white",
        titleColor: "gray-blue/05",
        titleHoverColor: "gray-blue/07",
        titleActiveColor: "gray-blue/09",
      },
    },
    Counter: {
      default: {
        backgroundColor: "gray-blue/05",
      },
      prominent: {
        backgroundColor: "red/05",
      },
      primary: {
        backgroundColor: "blue/05",
      },
    },
  },
};
