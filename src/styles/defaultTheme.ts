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
    LoadingProvider: {
      Spinner: { color: "gray-blue/09" },
      Backplate: { backgroundColor: "white" },
    },
    Button: {
      primary: {
        color: "white",
        backgroundColor: "blue/09",
      },
      focus: { color: "blue/04" },
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
    Breadcrumbs: {
      BreadcrumbsLink: { color: "gray-blue/05" },
      BreadcrumbsText: { color: "gray-blue/05" },
      LevelDivider: { color: "gray-blue/05" },
    },
    DropdownSource: {
      textColor: "gray-blue/05",
    },
    ListItem: {
      Selected: { backgroundColor: "gray-blue/01" },
    },
    Popper: {
      boxShadowColor: "gray-blue/02",
    },
    DropdownDivider: {
      backgroundColor: "gray-blue/02",
    },
    Avatar: {
      Empty: { color: "gray-blue/05" },
      Wrapper: {
        backgroundColor: "gray-blue/01",
        shadowColor: "gray-blue/02",
      },
    },
    Editor: {
      TopPanel: {
        borderBottomColor: "gray-blue/02",
        ButtonsGroupDivider: {
          color: "gray-blue/02",
        },
        Item: {
          Active: {
            backgroundColor: "blue/02",
            color: "blue/05",
          },
          Inactive: {
            color: "gray-blue/07",
            Hover: {
              backgroundColor: "blue/01",
            },
          },
        },
        Dropdown: {
          borderColor: "gray-blue/02",
        },
      },
      ActiveArea: {
        backgroundColor: "gray-blue/01",
      },
    },
    DropdownRightIcon: {
      color: "gray-blue/07",
    },
    Tooltip: {
      color: "gray-blue/09",
    },
  },
};
