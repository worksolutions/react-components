import { Theme } from "./makeTheme";
import { colors as darkColors } from "../constants/colorsMap/dark";

export const defaultTheme: Theme = {
  colors: darkColors,
  definitions: {
    LoadingProvider: {
      Spinner: { color: "gray-blue/09" },
      Backplate: { backgroundColor: "white" },
    },
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/09",
      },
    },
    Tabs: {
      BottomLine: { color: "red/05" },
      Tab: {
        backgroundColor: "transparent",
        color: "gray-blue/05",
        hoverColor: "gray-blue/07",
      },
      TabActive: { color: "gray-blue/09" },
    },
    Badge: {
      default: { backgroundColor: "gray-blue/05" },
      prominent: { backgroundColor: "red/05" },
      primary: { backgroundColor: "blue/05" },
    },
    Counter: {
      default: { color: "white" },
      prominent: { color: "white" },
      primary: { color: "white" },
    },
    Breadcrumbs: {
      BreadcrumbsLink: { color: "gray-blue/05" },
      BreadcrumbsText: { color: "gray-blue/05" },
      LevelDivider: { color: "gray-blue/05" },
    },
    Avatar: {
      Empty: { color: "gray-blue/05" },
      Wrapper: {
        backgroundColor: "gray-blue/01",
        shadowColor: "gray-blue/02",
      },
    },
  },
};
