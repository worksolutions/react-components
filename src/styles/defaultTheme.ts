import { Theme } from "./makeTheme";
import { colors as darkColors } from "../constants/colorsMap/dark";

export const defaultTheme: Theme = {
  colors: darkColors,
  definitions: {
    Scrollbars: {
      basePlaceBackgroundColor: "transparent",
      draggablePartColor: "gray-blue/02",
      draggablePartHoverColor: "gray-blue/06",
    },
    Typography: { defaultColor: "gray-blue/09" },
    TypographyLink: {
      Internal: { color: "gray-blue/09", hoverColor: "gray-blue/07" },
      External: { color: "blue/06", hoverColor: "blue/06" },
    },
    Icon: {
      defaultColor: "gray-blue/07",
    },
    ButtonPrimary: {
      color: "white",
      backgroundColor: "blue/09",
      iconColor: "white",
      hoverBackgroundColor: "blue/06",
      focusBorderColor: "blue/04",
      activeBackgroundColor: "blue/07",
      disabledBackgroundColor: "blue/02",
    },
    ButtonIcon: {
      iconColor: "gray-blue/07",
      hoverBackgroundColor: "gray-blue/01",
      hoverSmallBackgroundColor: "gray-blue/05",
      focusBorderColor: "blue/04",
      activeBackgroundColor: "gray-blue/02",
      disabledIconColor: "gray-blue/03",
    },
    ButtonGhost: {
      textColor: "gray-blue/07",
      iconColor: "gray-blue/07",
      hoverBackgroundColor: "gray-blue/01",
      focusBorderColor: "blue/04",
      activeBackgroundColor: "gray-blue/02",
      disabledColor: "gray-blue/03",
    },
    ButtonSecondary: {
      textColor: "gray-blue/07",
      borderColor: "gray-blue/02",
      iconColor: "gray-blue/07",
      hoverBackgroundColor: "gray-blue/01",
      focusBorderColor: "blue/04",
      activeBackgroundColor: "gray-blue/02",
      disabledTextAndIconColor: "gray-blue/03",
      disabledBorderColor: "gray-blue/01",
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
    ListItem: {
      Selected: { backgroundColor: "gray-blue/01" },
      UnSelected: { hoverBackgroundColor: "gray-blue/01", focusColor: "blue/05" },
      BorderIcons: {
        color: "gray-blue/09",
      },
    },
    ListItemsDivider: {
      backgroundColor: "gray-blue/02",
    },
    ListItemSearch: {
      backgroundColor: "white",
    },
    ListItemEmpty: {
      textColor: "gray-blue/05",
    },
    Select: {
      RightIcon: {
        color: "gray-blue/07",
      },
      Placeholder: {
        color: "gray-blue/05",
      },
    },
    Popup: {
      backgroundColor: "white",
      borderColor: "gray-blue/02",
    },
    Tooltip: {
      shadowColor: "gray-blue/02",
      backgroundColor: "white",
      textColor: "gray-blue/09",
    },
    Hint: {
      backgroundColor: "blue/10",
      borderColor: "gray-blue/03",
      textColor: "white",
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
    InputContainer: {
      rightIconColor: "gray-blue/07",
      leftIconColor: "gray-blue/05",
      hoverBoxShadowColor: "gray-blue/03",
      focusBoxShadowColor: "blue/05",
    },
    InputContainerVariantDefault: {
      background: "gray-blue/01",
      shadowColor: "gray-blue/02",
      tip: "gray-blue/07",
      placeholder: "gray-blue/04",
      color: "gray-blue/09",
    },
    InputContainerVariantError: {
      background: "red/01",
      shadowColor: "red/05",
      tip: "red/07",
      placeholder: "red/03",
      color: "gray-blue/09",
    },
    InputContainerVariantSuccess: {
      background: "green/01",
      shadowColor: "green/05",
      tip: "green/07",
      placeholder: "gray-blue/04",
      color: "gray-blue/09",
    },
    InputContainerVariantDisabled: {
      background: "gray-blue/01",
      shadowColor: "transparent",
      tip: "gray-blue/07",
      placeholder: "gray-blue/02",
      color: "gray-blue/03",
    },
    InputContainerTitle: {
      color: "gray-blue/05",
    },
    Calendar: {
      ButtonsList: {
        Selected: {
          backgroundColor: "blue/09",
        },
        Unselected: {
          borderColor: "gray-blue/02",
          focusBorderColor: "blue/04",
          hoverBackgroundColor: "gray-blue/01",
          textColor: "gray-blue/07",
        },
      },
      CalendarView: {
        WeekDays: {
          color: "gray-blue/03",
        },
        DaysButtons: {
          Today: {
            borderColor: "gray-blue/03",
            hoverBackgroundColor: "gray-blue/01",
          },
          Holiday: {
            textColor: "red/05",
            hoverBackgroundColor: "gray-blue/01",
          },
        },
      },
      SwitchModeButton: {
        backgroundColor: "gray-blue/01",
        borderColor: "gray-blue/02",
        hoverBorderColor: "gray-blue/03",
        openedBorderColor: "blue/04",
        textColor: "gray-blue/07",
      },
    },
    Toast: {
      backgroundColor: "white",
      textColor: "gray-blue/09",
      defaultBorderColor: "gray-blue/02",
      errorBorderColor: "red/05",
    },
    Resizer: {
      Border: { color: "gray-blue/02", hoverColor: "gray-blue/03", activeColor: "blue/05" },
      ArrowButton: {
        backgroundColor: "white",
      },
    },
    Spinner: {
      color: "gray-blue/09",
      backplateColor: "white",
    },
    Token: {
      backgroundColor: "white",
      removeIconColor: "gray-blue/07",
      removeIconHoverColor: "gray-blue/05",
    },
    Modal: {
      underModalBackgroundColor: "gray-blue/09",
      subtitleTextColor: "gray-blue/06",
      borderColor: "gray-blue/02",
      backgroundColor: "white",
    },
  },
};
