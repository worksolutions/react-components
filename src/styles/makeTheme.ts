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
      bottomLineColor: Colors;
      Tab: {
        tabBackgroundColor: Colors;
        tabTitleColor: Colors;
        tabTitleHoverColor: Colors;
        tabTitleActiveColor: Colors;
      };
    };
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
