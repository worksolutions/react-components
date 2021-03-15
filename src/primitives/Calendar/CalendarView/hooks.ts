import React from "react";
import { DateTime } from "luxon";
import { isDateSame } from "@worksolutions/utils";
import { isNil } from "ramda";

export function useSelectedDays(viewDateTime: DateTime, selectedDateTime: DateTime | null, days: (number | null)[]) {
  return days.map((day) => {
    if (isNil(day) || !selectedDateTime) return false;
    return isDateSame({ value: viewDateTime.set({ day }), comparisonWith: selectedDateTime }, "day");
  });
}

export function useHolyDays(viewDateTime: DateTime, days: (number | null)[]) {
  return React.useMemo(() => {
    return days.map((day) => {
      if (!day) return false;
      const weekday = viewDateTime.set({ day }).weekday;
      return weekday === 6 || weekday === 7;
    });
  }, [days, viewDateTime]);
}
