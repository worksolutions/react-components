import { Theme } from "./makeTheme";
import { colors as darkColors } from "../constants/colorsMap/dark";

export const defaultTheme: Theme = {
  colors: darkColors,
  definitions: {
    Icon: {
      default: {
        color: "gray-blue/05",
      },
    },
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/09",
      },
      focus: { color: "blue/04" },
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
    Badge: {
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
    Counter: {
      default: {
        color: "white",
      },
      prominent: {
        color: "white",
      },
      primary: {
        color: "white",
      },
    },
    Breadcrumbs: {
      BreadcrumbsLink: { color: "gray-blue/05" },
      BreadcrumbsText: { color: "gray-blue/05" },
      LevelDivider: { color: "gray-blue/05" },
    },
    DropdownHeader: {
      text: "gray-blue/05",
    },
    ListItem: {
      selected: { backgroundColor: "gray-blue/01" },
    },
    Popper: {
      border: "gray-blue/01",
      boxShadow: "gray-blue/02",
    },
    DropdownDivider: {
      backgroundColor: "gray-blue/02",
    },
  },
};
