import React from "react";
import { Placement } from "@popperjs/core";
import moment, { Moment } from "moment";
import { range } from "ramda";
import { useEffectSkipFirst } from "@worksolutions/react-utils";

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
} from "../../../styles";

import Wrapper from "../../Wrapper";
import { getPopperMarginStyleForPlacement } from "../../Popper/usePopper";
import Button, { ButtonSize, ButtonType } from "../../Button";

import ButtonsList from "./ButtonsList";
import { SwitchModeButton } from "./SwitchModeButton";
import { useMonthCalculation } from "./libs";
import CalendarView from "./CalendarView";
import { elevation16 } from "../../../constants/shadows";
import { intl } from "../../../intl";

export interface CalendarInterface {
  min: Moment;
  max: Moment;
  value: string | null;
  placement: Placement;
  momentFormat: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string) => void;
}

type ViewMode = "year" | "month" | "date";

function Calendar({ hasCurrentDayButton, max, min, momentFormat, onChange, placement, value }: CalendarInterface) {
  function calculateMomentValueFromIncomeValue() {
    return value ? moment(value, momentFormat) : moment();
  }

  const [innerMomentValue, setInnerMomentValue] = React.useState(calculateMomentValueFromIncomeValue);

  const year = React.useMemo(() => innerMomentValue.year(), [innerMomentValue]);

  useEffectSkipFirst(() => {
    setInnerMomentValue(calculateMomentValueFromIncomeValue);
  }, [value]);
  const months = useMonthCalculation(year, min, max);
  const years = React.useMemo(() => range(min.year(), max.year() + 1), []);

  function clickOnTodayButton() {
    setInnerMomentValue(intl.currentLocalDate);
    onChange(intl.currentLocalDate.format(momentFormat));
  }

  function changeYear(year: number) {
    const newValue = moment(innerMomentValue).year(year);
    if (newValue.isBefore(min)) {
      setInnerMomentValue(min);
      return;
    }
    if (newValue.isAfter(max)) {
      setInnerMomentValue(max);
      return;
    }
    setInnerMomentValue(newValue);
  }

  const [mode, setMode] = React.useState<ViewMode>("date");

  function toggleMode(newMode: ViewMode) {
    if (newMode === mode) {
      setMode("date");
      return;
    }
    setMode(newMode);
  }

  const allControlButtonDisabled = mode !== "date";

  const selectedMomentValue = React.useMemo(() => (value ? moment(value, momentFormat) : null), [value]);
  const month = React.useMemo(() => innerMomentValue.month(), [innerMomentValue]);
  const leftControlButtonDisabled = React.useMemo(() => innerMomentValue.isSameOrBefore(min, "month"), [
    innerMomentValue,
  ]);
  const rightControlButtonDisabled = React.useMemo(() => innerMomentValue.isSameOrAfter(max, "month"), [
    innerMomentValue,
  ]);

  return (
    <Wrapper
      styles={[
        width(306),
        getPopperMarginStyleForPlacement(placement, 4),
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
          onClick={() => setInnerMomentValue(moment(innerMomentValue).subtract(1, "month"))}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={mode === "month"}
          onClick={() => toggleMode("month")}
          value={months[month]!}
          width={108}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={mode === "year"}
          onClick={() => toggleMode("year")}
          value={year}
          width={84}
        />
        <Button
          disabled={allControlButtonDisabled || rightControlButtonDisabled}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-right-long"
          onClick={() => setInnerMomentValue(moment(innerMomentValue).add(1, "month"))}
        />
      </Wrapper>
      {mode === "date" && (
        <CalendarView
          styles={horizontalPadding(12)}
          currentInnerValue={innerMomentValue}
          selectedValue={selectedMomentValue}
          onChange={(day) => onChange(moment(innerMomentValue).date(day).format(momentFormat))}
        />
      )}
      {mode === "month" && (
        <ButtonsList
          items={months}
          selectedItemIndex={month}
          onClick={(month) => {
            setInnerMomentValue(moment(innerMomentValue).month(month));
            toggleMode("date");
          }}
        />
      )}
      {mode === "year" && (
        <ButtonsList
          items={years}
          selectedItemIndex={years.indexOf(year)}
          onClick={(index) => {
            toggleMode("date");
            changeYear(years[index]);
          }}
        />
      )}
      {hasCurrentDayButton && (
        <Wrapper styles={[flex, jc("center")]}>
          <Button styles={marginTop(4)} size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={clickOnTodayButton}>
            {intl.text("components.calendar.todayButtonText")} {intl.currentLocalDate.format(momentFormat)}
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(Calendar);
