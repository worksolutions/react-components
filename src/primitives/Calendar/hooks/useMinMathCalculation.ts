import React from "react";
import { DateMode } from "@worksolutions/utils";

import { intl } from "../../../intl";

function getInitialMomentValueForRange(value: string | undefined, mode: DateMode, addYearsIfUndefined: number) {
  if (value) return intl.getDateTime(value, mode);

  return intl.currentDate.plus({ year: addYearsIfUndefined });
}

export function useMinMaxCalculation(mode: DateMode, minValue?: string, maxValue?: string) {
  const min = React.useMemo(() => getInitialMomentValueForRange(minValue, mode, -50), [minValue, mode]);
  const max = React.useMemo(() => getInitialMomentValueForRange(maxValue, mode, 50), [maxValue, mode]);
  return { min, max };
}
