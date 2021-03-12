import React from "react";
import { range } from "ramda";
import { useEffectSkipFirst } from "@worksolutions/react-utils";
import { DateMode } from "@worksolutions/utils";

import Wrapper from "../Wrapper";
import Button, { ButtonSize, ButtonType } from "../Button";

import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  flex,
  flexColumn,
  flexValue,
  horizontalPadding,
  jc,
  marginBottom,
  marginRight,
  marginTop,
  verticalPadding,
  width,
} from "../../styles";
import { elevation16 } from "../../constants/shadows";

import { intl } from "../../intl";
import { useMonthCalculation } from "./hooks/useMonthCalculation";
import { useMinMaxCalculation } from "./hooks/useMinMathCalculation";
import { SwitchModeButton } from "./SwitchModeButton";
import CalendarView from "./CalendarView";
import ButtonsList from "./ButtonsList";

export interface CalendarInterface {
  mode: DateMode;
  min?: string;
  max?: string;
  value?: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string) => void;
}

export enum CalendarViewMode {
  YEAR,
  MONTH,
  DATE,
}

function Calendar({ value, min: minProp, max: maxProp, mode, hasCurrentDayButton, onChange }: CalendarInterface) {
  function getDateTimeFromProps() {
    return value ? intl.getDateTime(value, mode) : intl.currentDate;
  }

  const { min, max } = useMinMaxCalculation(mode, minProp, maxProp);

  const currentValueDateTime = React.useMemo(() => (value ? intl.getDateTime(value, mode) : null), [value]);
  const [dateTime, setDateTime] = React.useState(getDateTimeFromProps);
  useEffectSkipFirst(() => setDateTime(getDateTimeFromProps), [value]);

  const year = React.useMemo(() => dateTime.year, [dateTime]);
  const years = React.useMemo(() => range(min.year, max.year + 1), []);
  const month = React.useMemo(() => dateTime.month, [dateTime]);
  const months = useMonthCalculation(year, min, max);

  const handleClickOnToday = React.useCallback(function () {
    setDateTime(intl.currentDate);
    onChange(intl.formatDate(intl.currentDate, mode));
  }, []);

  const handleChangeYear = React.useCallback(function (year: number) {
    const newDateTime = dateTime.set({ year });

    if (newDateTime.toMillis() < min.toMillis()) {
      setDateTime(min);
      return;
    }

    if (newDateTime.toMillis() > max.toMillis()) {
      setDateTime(max);
      return;
    }

    setDateTime(newDateTime);
  }, []);

  const [viewMode, setViewMode] = React.useState<CalendarViewMode>(CalendarViewMode.DATE);

  const handleChangeMode = React.useCallback(function (newMode: CalendarViewMode) {
    if (newMode === viewMode) {
      return;
    }

    setViewMode(newMode);
  }, []);

  const allControlButtonDisabled = viewMode !== CalendarViewMode.DATE;

  const leftControlButtonDisabled = React.useMemo(() => min.diff(dateTime, "month").months <= 0, [dateTime]);
  const rightControlButtonDisabled = React.useMemo(() => max.diff(dateTime, "month").months >= 0, [dateTime]);

  return (
    <Wrapper
      styles={[
        width(306),
        verticalPadding(12),
        backgroundColor("white"),
        border(1, "gray-blue/02"),
        elevation16,
        borderRadius(6),
        flex,
        flexColumn,
      ]}
    >
      <Wrapper styles={[flex, horizontalPadding(12), flexValue(1), ai("center"), marginBottom(12)]}>
        <Button
          disabled={allControlButtonDisabled || leftControlButtonDisabled}
          styles={marginRight(8)}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-left-long"
          onClick={() => setDateTime(dateTime.minus({ month: 1 }))}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={viewMode === CalendarViewMode.MONTH}
          onClick={() => handleChangeMode(CalendarViewMode.MONTH)}
          value={months[month]!}
          width={108}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={viewMode === CalendarViewMode.YEAR}
          onClick={() => handleChangeMode(CalendarViewMode.YEAR)}
          value={year}
          width={84}
        />
        <Button
          disabled={allControlButtonDisabled || rightControlButtonDisabled}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-right-long"
          onClick={() => setDateTime(dateTime.plus({ month: 1 }))}
        />
      </Wrapper>
      {viewMode === CalendarViewMode.DATE && (
        <CalendarView
          styles={horizontalPadding(12)}
          currentInnerValue={dateTime}
          selectedValue={currentValueDateTime}
          onChange={(day) => onChange(intl.formatDate(dateTime.set({ day }), mode))}
        />
      )}
      {viewMode === CalendarViewMode.MONTH && (
        <ButtonsList
          items={months}
          selectedItemIndex={month}
          onClick={(month) => {
            setDateTime(dateTime.set({ month }));
            handleChangeMode(CalendarViewMode.DATE);
          }}
        />
      )}
      {viewMode === CalendarViewMode.YEAR && (
        <ButtonsList
          items={years}
          selectedItemIndex={years.indexOf(year)}
          onClick={(index) => {
            handleChangeMode(CalendarViewMode.DATE);
            handleChangeYear(years[index]);
          }}
        />
      )}
      {hasCurrentDayButton && (
        <Wrapper styles={[flex, jc("center")]}>
          <Button styles={marginTop(4)} size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={handleClickOnToday}>
            {intl.text("components.calendar.todayButtonText")} {intl.formatDate(intl.currentDate, mode)}
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(Calendar);
