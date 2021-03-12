import React from "react";
import { DateTime } from "luxon";

export function useSelectedDays(currentInnerValue: DateTime, selectedValue: DateTime | null, days: (number | null)[]) {
  return React.useMemo(() => {
    if (!currentInnerValue) return days.fill(null);
    return days.map((day) =>
      day && selectedValue ? currentInnerValue.set({ day }).diff(selectedValue, "day").days === 0 : null,
    );
  }, [days, currentInnerValue]);
}

export function useHolyDays(currentInnerValue: DateTime, days: (number | null)[]) {
  return React.useMemo(() => {
    if (!currentInnerValue) return days.fill(null);
    return days.map((day) => {
      if (!day) return null;
      const weekday = currentInnerValue.set({ day }).weekday;
      return weekday === 5 || weekday === 6;
    });
  }, [days, currentInnerValue]);
}
