import { DeepPartial } from "utility-types";
import { mergeDeepRight } from "ramda";
import { Theme as BaseTheme } from "@worksolutions/react-utils";

import { Colors } from "../constants/colors";
import { defaultTheme } from "./defaultTheme";

export interface Theme extends BaseTheme<Colors> {
  definitions: {
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
    Avatar: {
      Empty: {
        color: Colors;
      };
      Wrapper: {
        backgroundColor: Colors;
        shadowColor: Colors;
      };
    };
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
