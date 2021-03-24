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
    Text: { defaultColor: Colors };
    Icon: {
      default: {
        color: Colors;
      };
    };
    LoadingProvider: {
      Spinner: {
        color: Colors;
      };
      Backplate: {
        backgroundColor: Colors;
      };
    };
    Button: {
      primary: {
        color: Colors;
        backgroundColor: Colors;
      };
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
    };
    Select: {
      RightArrow: {
        color: Colors;
      };
    };
    ListItemsDivider: {
      backgroundColor: Colors;
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
    SelectTriggerElement: {
      colorText: Colors;
    };
    InputContainer: {
      rightIconColor: Colors;
      leftIconColor: Colors;
      hoverBoxShadowColor: Colors;
      focusBoxShadowColor: Colors;
      placeholderColor: Colors;
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
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
