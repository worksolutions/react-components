import React from "react";
import { DateTime } from "luxon";

import { allYearMonths, lastMonthIndex } from "../info";

export function useMonthCalculation(year: number, min: DateTime, max: DateTime) {
  return React.useMemo(() => {
    const from = min.year === year ? min.month : 0;
    const to = max.year === year ? max.month : lastMonthIndex;
    return allYearMonths.map((month, index) => (index >= from && index <= to ? month : null));
  }, [max.month, max.year, min.month, min.year, year]);
}
