import React from "react";
import { isNil, range } from "ramda";
import { DateTime } from "luxon";
import { isDateSame } from "@worksolutions/utils";

import { ai, alignContent, child, flex, flexWrap, fullWidth, height, jc, width } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import CalendarItem from "./CalendarItem";
import { useHolyDays, useSelectedDays } from "./hooks";
import { allWeekDays, currentDate } from "../info";

interface CalendarViewInterface {
  styles?: any;
  viewDateTime: DateTime;
  selectedDateTime: DateTime | null;
  onChange: (day: number) => void;
}

function getDaysRange(value: DateTime) {
  const firstDayInMonthWeekday = value.set({ day: 1 }).weekday - 1;
  const emptyDaysToFillFirstWeek: null[] = (range(0, firstDayInMonthWeekday) as any).fill(null!);
  return [...emptyDaysToFillFirstWeek, ...range(1, value.daysInMonth + 1)];
}

function CalendarView({ styles, viewDateTime, selectedDateTime, onChange }: CalendarViewInterface) {
  const days = React.useMemo(() => getDaysRange(viewDateTime), [viewDateTime]);
  const selectedDays = useSelectedDays(viewDateTime, selectedDateTime, days);
  const holidays = useHolyDays(viewDateTime, days);

  const isSameMonth = React.useMemo(() => isDateSame({ value: currentDate, comparisonWith: viewDateTime }, "months"), [
    viewDateTime,
  ]);

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
          <Typography type="caption-semi-bold" color="gray-blue/03">
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
            isToday={isSameMonth && currentDate.day === day}
            onClick={() => onChange(day)}
          />
        );
      })}
    </Wrapper>
  );
}

export default React.memo(CalendarView);
