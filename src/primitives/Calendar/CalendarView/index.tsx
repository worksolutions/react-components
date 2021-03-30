import React from "react";
import { isNil, range } from "ramda";
import { DateTime } from "luxon";
import { isDateBefore, isDateSame } from "@worksolutions/utils";

import { ai, alignContent, child, flex, flexWrap, fullWidth, height, jc, width } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import CalendarItem from "./CalendarItem";
import { useHolyDays, useSelectedDays } from "./hooks";
import { allWeekDays } from "../info";
import { intl } from "../../../intl";

interface CalendarViewInterface {
  styles?: any;
  min: DateTime;
  max: DateTime;
  viewDateTime: DateTime;
  selectedDateTime: DateTime | null;
  onChange: (day: number) => void;
}

function getDaysRange(value: DateTime, min: DateTime, max: DateTime) {
  if (isDateBefore({ value, comparisonWith: min })) {
    const emptyDaysFeeling = range(1, min.weekday).fill(null!);
    return [...emptyDaysFeeling, ...range(min.day, min.daysInMonth + 1)];
  }

  //TODO: add max

  const firstDayInMonthWeekday = value.set({ day: 1 }).weekday - 1;
  const emptyDaysToFillFirstWeek: null[] = (range(0, firstDayInMonthWeekday) as any).fill(null!);
  return [...emptyDaysToFillFirstWeek, ...range(1, value.daysInMonth + 1)];
}

function CalendarView({ styles, viewDateTime, min, max, selectedDateTime, onChange }: CalendarViewInterface) {
  const days = React.useMemo(() => getDaysRange(viewDateTime, min, max), [max, min, viewDateTime]);
  const selectedDays = useSelectedDays(viewDateTime, selectedDateTime, days);
  const holidays = useHolyDays(viewDateTime, days);

  const isSameMonth = React.useMemo(
    () => isDateSame({ value: intl.currentDate, comparisonWith: viewDateTime }, "months"),
    [viewDateTime],
  );

  return (
    <Wrapper
      styles={[
        fullWidth,
        flex,
        flexWrap,
        alignContent("flex-start"),
        child([width(40), flex, ai("center"), jc("center")]),
        child([height(24)], ".weekDay"),
        child([height(40)], ".day"),
        flex,
        flexWrap,
        styles,
      ]}
    >
      {allWeekDays.map((day) => (
        <Wrapper key={day} className="weekDay">
          <Typography type="caption-semi-bold" color="definitions.CalendarView.WeekDays.color">
            {day}
          </Typography>
        </Wrapper>
      ))}
      {days.map((day, index) => {
        return isNil(day) ? (
          <CalendarItem key={index} />
        ) : (
          <CalendarItem
            key={index}
            value={day}
            selected={selectedDays[index]}
            holiday={holidays[index]}
            isToday={isSameMonth && intl.currentDate.day === day}
            onClick={() => onChange(day)}
          />
        );
      })}
    </Wrapper>
  );
}

export default React.memo(CalendarView);
