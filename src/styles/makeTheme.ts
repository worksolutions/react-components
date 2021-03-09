import { DeepPartial } from "utility-types";
import { mergeDeepRight } from "ramda";
import { Theme as BaseTheme } from "@worksolutions/react-utils";

import { Colors } from "../constants/colors";
import { defaultTheme } from "./defaultTheme";

export interface Theme extends BaseTheme<Colors> {
  definitions: {
    Icon: {
      default: {
        color: Colors;
      };
    };
    Button: {
      primary: {
        color: Colors;
        backgroundColor: Colors;
      };
      focus: { color: Colors };
    };
    Tabs: {
      bottomLine: {
        color: Colors;
      };
      Tab: {
        backgroundColor: Colors;
        titleColor: Colors;
        titleHoverColor: Colors;
        titleActiveColor: Colors;
      };
    };
    Badge: {
      default: {
        backgroundColor: Colors;
      };
      prominent: {
        backgroundColor: Colors;
      };
      primary: {
        backgroundColor: Colors;
      };
    };
    Counter: {
      default: {
        color: Colors;
      };
      prominent: {
        color: Colors;
      };
      primary: {
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
    DropdownHeader: {
      text: Colors;
    };
    ListItem: {
      selected: { backgroundColor: Colors };
    };
    Popper: {
      border: Colors;
      boxShadow: Colors;
    };
    DropdownDivider: {
      backgroundColor: Colors;
    };
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
