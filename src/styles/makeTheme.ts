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
  };
}

export function makeTheme(overrides: DeepPartial<Theme> = {}): Theme {
  return mergeDeepRight(defaultTheme, overrides);
}
