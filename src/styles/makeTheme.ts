import { DeepPartial } from "utility-types";
import { mergeDeepRight } from "ramda";
import { Theme as BaseTheme } from "@worksolutions/react-utils";

import { Colors } from "../constants/colors";
import { defaultTheme } from "./defaultTheme";
import { InputContainerVariantType } from "../primitives/InputContainer/libs";

export interface Theme extends BaseTheme<Colors> {
  definitions: {
    Scrollbars: {
      basePlaceBackgroundColor: Colors;
      draggablePartColor: Colors;
      draggablePartHoverColor: Colors;
    };
    Typography: { defaultColor: Colors };
    TypographyLink: {
      Internal: { color: Colors; hoverColor: Colors };
      External: { color: Colors; hoverColor: Colors };
    };
    Icon: {
      defaultColor: Colors;
    };
    ButtonPrimary: {
      color: Colors;
      backgroundColor: Colors;
      iconColor: Colors;
      hoverBackgroundColor: Colors;
      focusBorderColor: Colors;
      activeBackgroundColor: Colors;
      disabledBackgroundColor: Colors;
    };
    ButtonIcon: {
      iconColor: Colors;
      hoverBackgroundColor: Colors;
      hoverSmallBackgroundColor: Colors;
      focusBorderColor: Colors;
      activeBackgroundColor: Colors;
      disabledIconColor: Colors;
    };
    ButtonGhost: {
      textColor: Colors;
      iconColor: Colors;
      hoverBackgroundColor: Colors;
      focusBorderColor: Colors;
      activeBackgroundColor: Colors;
      disabledColor: Colors;
    };
    ButtonSecondary: {
      textColor: Colors;
      borderColor: Colors;
      iconColor: Colors;
      hoverBackgroundColor: Colors;
      focusBorderColor: Colors;
      activeBackgroundColor: Colors;
      disabledTextAndIconColor: Colors;
      disabledBorderColor: Colors;
    };
    Tabs: {
      BottomLine: {
        color: Colors;
      };
      Tab: {
        backgroundColor: Colors;
        color: Colors;
        hoverColor: Colors;
      };
      TabActive: {
        color: Colors;
      };
    };
    Breadcrumbs: {
      LevelDivider: {
        color: Colors;
      };
      BreadcrumbsText: {
        color: Colors;
      };
      BreadcrumbsLink: {
        color: Colors;
      };
    };
    Avatar: {
      Empty: {
        color: Colors;
      };
      Wrapper: {
        backgroundColor: Colors;
        shadowColor: Colors;
      };
    };
    Editor: {
      TopPanel: {
        borderBottomColor: Colors;
        ButtonsGroupDivider: {
          color: Colors;
        };
        Item: {
          Active: {
            backgroundColor: Colors;
            color: Colors;
          };
          Inactive: {
            color: Colors;
            Hover: {
              backgroundColor: Colors;
            };
          };
        };
        Dropdown: {
          borderColor: Colors;
        };
      };
      ActiveArea: {
        backgroundColor: Colors;
      };
    };
    ListItem: {
      Selected: {
        backgroundColor: Colors;
      };
      UnSelected: {
        focusColor: Colors;
        hoverBackgroundColor: Colors;
      };
      BorderIcons: {
        color: Colors;
      };
    };
    ListItemsDivider: {
      backgroundColor: Colors;
    };
    ListItemSearch: {
      backgroundColor: Colors;
    };
    ListItemEmpty: {
      textColor: Colors;
    };
    Select: {
      RightIcon: {
        color: Colors;
      };
      Placeholder: {
        color: Colors;
        disabledColor: Colors;
      };
    };
    Popup: {
      backgroundColor: Colors;
      borderColor: Colors;
    };
    Tooltip: {
      textColor: Colors;
      backgroundColor: Colors;
      shadowColor: Colors;
    };
    Hint: {
      textColor: Colors;
      backgroundColor: Colors;
      borderColor: Colors;
    };
    InputContainer: {
      rightIconColor: Colors;
      leftIconColor: Colors;
      hoverBoxShadowColor: Colors;
      focusBoxShadowColor: Colors;
    };
    InputContainerVariantDefault: InputContainerVariantType;
    InputContainerVariantError: InputContainerVariantType;
    InputContainerVariantSuccess: InputContainerVariantType;
    InputContainerVariantDisabled: InputContainerVariantType;
    InputContainerTitle: {
      color: Colors;
    };
    Calendar: {
      ButtonsList: {
        Selected: {
          backgroundColor: Colors;
        };
        Unselected: {
          borderColor: Colors;
          focusBorderColor: Colors;
          hoverBackgroundColor: Colors;
          textColor: Colors;
        };
      };
      CalendarView: {
        WeekDays: {
          color: Colors;
        };
        DaysButtons: {
          Today: {
            borderColor: Colors;
            hoverBackgroundColor: Colors;
          };
          Holiday: {
            textColor: Colors;
            hoverBackgroundColor: Colors;
          };
        };
      };
      SwitchModeButton: {
        backgroundColor: Colors;
        borderColor: Colors;
        hoverBorderColor: Colors;
        openedBorderColor: Colors;
        textColor: Colors;
      };
    };
    Toast: {
      backgroundColor: Colors;
      defaultBorderColor: Colors;
      errorBorderColor: Colors;
      textColor: Colors;
    };
    Resizer: {
      Border: {
        color: Colors;
        hoverColor: Colors;
        activeColor: Colors;
      };
      ArrowButton: {
        backgroundColor: Colors;
      };
    };
    Spinner: {
      color: Colors;
      backplateColor: Colors;
    };
    Token: {
      backgroundColor: Colors;
      removeIconColor: Colors;
      removeIconHoverColor: Colors;
    };
    Modal: {
      underModalBackgroundColor: Colors;
      subtitleTextColor: Colors;
      borderColor: Colors;
      backgroundColor: Colors;
    };
    RadioGroup: {
      borderColor: Colors;
      focusBorderColor: Colors;
      backgroundColor: Colors;
      textColor: Colors;
      activeTextColor: Colors;
      dividerColor: Colors;
      Active: {
        backgroundColor: Colors;
        borderColor: Colors;
      };
    };
    Toggle: {
      switchBackgroundColor: Colors;
      textColor: Colors;
      Enabled: {
        backgroundColor: Colors;
        hoverBackgroundColor: Colors;
      };
      Disabled: {
        backgroundColor: Colors;
        hoverBackgroundColor: Colors;
      };
    };
    Checkbox: {
      Box: {
        Icon: { color: Colors };
        CheckedEnabled: {
          backgroundColor: Colors;
          hoverBackgroundColor: Colors;
          activeBackgroundColor: Colors;
        };
        UncheckedEnabled: {
          borderColor: Colors;
          backgroundColor: Colors;
          hoverBackgroundColor: Colors;
          activeBackgroundColor: Colors;
        };
        Disabled: {
          backgroundColor: Colors;
        };
        Focus: {
          borderColor: Colors;
        };
        Error: {
          borderColor: Colors;
        };
      };
      Text: {
        Enabled: { color: Colors };
        Disabled: { color: Colors };
      };
      RequiredStar: { color: Colors };
    };
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides as any);
}
