import { Info } from "luxon";
import { capitalizeFirstStringCharacter } from "@worksolutions/utils";

import { intl } from "../../intl";

export const allYearMonths = [null, ...Info.months(undefined, { locale: "ru" }).map(capitalizeFirstStringCharacter)];
export const lastMonthIndex = allYearMonths.length - 1;
export const allWeekDays = Info.weekdays("short", { locale: "ru" }).map(capitalizeFirstStringCharacter);

export const currentDate = intl.currentDate.set({ second: 0 });
