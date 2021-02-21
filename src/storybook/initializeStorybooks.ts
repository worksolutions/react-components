import { INTL } from "@worksolutions/utils";
import "moment/locale/ru";

import { intl, setIntl } from "../intl";
import { ruIntlDictionary } from "../intl/ru";

setIntl(new INTL(ruIntlDictionary));
intl.init();
