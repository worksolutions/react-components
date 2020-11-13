import React from "react";
import { isNil, range } from "ramda";
import moment, { Moment } from "moment";
import { Intl } from "@worksolutions/utils";

import { ai, alignContent, child, flex, flexWrap, fullWidth, height, jc, width } from "../../../../styles";

import Wrapper from "../../../Wrapper";
import Typography from "../../../Typography";

import { allWeekDays } from "../libs";

import CalendarItem from "./CalendarItem";
import { useHolyDays, useSelectedDays } from "./hooks";

interface CalendarViewInterface {
  selectedValue: Moment | null;
  currentInnerValue: Moment;
  onChange: (day: number) => void;
}

function getDaysRange(value: Moment) {
  const firstDayInMonthWeekday = moment(value).date(1).weekday();
  const emptyDaysToFillFirstWeek: null[] = (range(0, firstDayInMonthWeekday) as any).fill(null!);
  return [...emptyDaysToFillFirstWeek, ...range(1, value.daysInMonth() + 1)];
}

function CalendarView({ currentInnerValue, selectedValue, onChange }: CalendarViewInterface) {
  const days = React.useMemo(() => getDaysRange(currentInnerValue), [currentInnerValue]);

  const selectedDays = useSelectedDays(currentInnerValue, selectedValue, days);

  const holidays = useHolyDays(currentInnerValue, days);

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
      ]}
    >
      {allWeekDays.map((day) => (
        <Wrapper key={day} className="weekDay">
          <Typography type="caption-semi-bold" color="gray-blue/03">
            {day}
          </Typography>
        </Wrapper>
      ))}
      {days.map((day, index) =>
        isNil(day) ? (
          <CalendarItem key={index} />
        ) : (
          <CalendarItem
            key={index}
            value={day}
            selected={!!selectedDays[index]}
            holiday={!!holidays[index]}
            isToday={Intl.currentLocalDate.isSame(currentInnerValue, "month") && Intl.currentLocalDate.date() === day}
            onClick={() => onChange(day)}
          />
        ),
      )}
    </Wrapper>
  );
}

export default React.memo(CalendarView);
