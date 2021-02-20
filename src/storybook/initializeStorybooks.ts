import { INTL } from "@worksolutions/utils";
import "moment/locale/ru";

import { colors as lightColor } from "../constants/colorsMap/light";
import { colors as darkColors } from "../constants/colorsMap/dark";

import { setColorsTheme } from "../constants/colors";
import { intl, setIntl } from "../intl";
import { ruIntlDictionary } from "../intl/ru";

setIntl(new INTL(ruIntlDictionary));
intl.init();

setColorsTheme(darkColors);
