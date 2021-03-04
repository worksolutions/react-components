import { Theme } from "./makeTheme";
import { colors as darkColors } from "../constants/colorsMap/dark";

export const defaultTheme: Theme = {
  colors: darkColors,
  definitions: {
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/09",
      },
    },
    Tabs: {
      bottomLine: {
        color: "red/05",
      },
      Tab: {
        backgroundColor: "transparent",
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
    Breadcrumbs: {
      BreadcrumbsLink: { color: "gray-blue/05" },
      BreadcrumbsText: { color: "gray-blue/05" },
      LevelDivider: { color: "gray-blue/05" },
    },
  },
};
