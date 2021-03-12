import { Info } from "luxon";
import { capitalizeFirstStringCharacter } from "@worksolutions/utils";

export const allYearMonths = Info.months().map(capitalizeFirstStringCharacter);
export const lastMonthIndex = allYearMonths.length - 1;
export const allWeekDays = Info.weekdays().map(capitalizeFirstStringCharacter);
