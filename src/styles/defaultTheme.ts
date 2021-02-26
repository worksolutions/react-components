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
      bottomLineColor: "blue/05",
      tabBackgroundColor: "white",
      tabTitleColor: "gray-blue/05",
      tabTitleHoverColor: "gray-blue/07",
      tabTitleActiveColor: "gray-blue/09",
    },
  },
};
