import React from "react";
import { range } from "ramda";
import { useEffectSkipFirst } from "@worksolutions/react-utils";
import { DateMode, isDateAfter, isDateBefore, isDateSame } from "@worksolutions/utils";

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
import { currentDate } from "./info";

export interface CalendarInterface {
  mode: DateMode;
  min?: string;
  max?: string;
  value?: string;
  availableModes?: CalendarViewMode[];
  hasCurrentDayButton?: boolean;
  onChange: (value: string) => void;
}

export enum CalendarViewMode {
  YEAR,
  MONTH,
  DATE,
}

const defaultAvailableModes = [CalendarViewMode.YEAR, CalendarViewMode.MONTH, CalendarViewMode.DATE];

function Calendar({
  value,
  min: minProp,
  max: maxProp,
  mode,
  availableModes = defaultAvailableModes,
  hasCurrentDayButton,
  onChange,
}: CalendarInterface) {
  function getDateTimeFromProps() {
    return value ? intl.getDateTime(value, mode) : currentDate;
  }

  const { min, max } = useMinMaxCalculation(mode, minProp, maxProp);

  const [viewDateTime, setViewDateTime] = React.useState(() => getDateTimeFromProps().set({ day: 1 }));
  const currentSelectedDateTime = React.useMemo(() => (value ? intl.getDateTime(value, mode) : null), [value, mode]);

  useEffectSkipFirst(() => setViewDateTime(getDateTimeFromProps().set({ day: 1 })), [value, mode]);

  const year = React.useMemo(() => viewDateTime.year, [viewDateTime]);
  const years = React.useMemo(() => range(min.year, max.year + 1), [max.year, min.year]);
  const month = React.useMemo(() => viewDateTime.month, [viewDateTime]);
  const months = useMonthCalculation(year, min, max);

  const handleClickOnToday = React.useCallback(() => {
    const formattedTodayDateTime = intl.formatDate(currentDate, mode);

    if (!currentSelectedDateTime) {
      onChange(formattedTodayDateTime);
      return;
    }

    if (!isDateSame({ value: currentSelectedDateTime, comparisonWith: currentDate }, "days")) {
      onChange(formattedTodayDateTime);
      return;
    }

    setViewDateTime(currentDate.set({ day: 1 }));
  }, [currentDate, mode, currentSelectedDateTime, onChange]);

  const handleChangeYear = React.useCallback(
    function (year: number) {
      const newDateTime = viewDateTime.set({ year });

      if (isDateBefore({ value: newDateTime, comparisonWith: min })) {
        setViewDateTime(min.set({ day: 1 }));
        return;
      }

      if (isDateAfter({ value: newDateTime, comparisonWith: max })) {
        setViewDateTime(max.set({ day: 1 }));
        return;
      }

      // setViewDateTime(newDateTime);
    },
    [viewDateTime, min, max],
  );

  const [viewMode, setViewMode] = React.useState<CalendarViewMode>(CalendarViewMode.DATE);

  const toggleMode = React.useCallback(
    (newMode: CalendarViewMode) => setViewMode(newMode === viewMode ? CalendarViewMode.DATE : newMode),
    [viewMode],
  );

  const allControlButtonDisabled = viewMode !== CalendarViewMode.DATE;

  const leftControlButtonDisabled = React.useMemo(
    () =>
      isDateSame({ value: viewDateTime, comparisonWith: min }, "months") ||
      isDateBefore({ value: viewDateTime, comparisonWith: min }, "months"),
    [viewDateTime, min],
  );
  const rightControlButtonDisabled = React.useMemo(
    () =>
      isDateSame({ value: viewDateTime, comparisonWith: max }, "months") ||
      isDateAfter({ value: viewDateTime, comparisonWith: max }, "months"),
    [viewDateTime, max],
  );

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
          onClick={() => setViewDateTime(viewDateTime.minus({ month: 1 }))}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={viewMode === CalendarViewMode.MONTH}
          onClick={() => toggleMode(CalendarViewMode.MONTH)}
          value={months[month]!}
          width={108}
        />
        <SwitchModeButton
          styles={marginRight(8)}
          opened={viewMode === CalendarViewMode.YEAR}
          onClick={() => toggleMode(CalendarViewMode.YEAR)}
          value={year}
          width={84}
        />
        <Button
          disabled={allControlButtonDisabled || rightControlButtonDisabled}
          type={ButtonType.ICON}
          size={ButtonSize.MEDIUM}
          iconLeft="arrow-right-long"
          onClick={() => setViewDateTime(viewDateTime.plus({ month: 1 }))}
        />
      </Wrapper>
      {viewMode === CalendarViewMode.DATE && (
        <CalendarView
          styles={horizontalPadding(12)}
          viewDateTime={viewDateTime}
          selectedDateTime={currentSelectedDateTime}
          onChange={(day) => onChange(intl.formatDate(viewDateTime.set({ day }), mode))}
        />
      )}
      {viewMode === CalendarViewMode.MONTH && (
        <ButtonsList
          items={months}
          selectedItemIndex={month}
          onClick={(month) => {
            setViewDateTime(viewDateTime.set({ month }));
            toggleMode(CalendarViewMode.DATE);
          }}
        />
      )}
      {viewMode === CalendarViewMode.YEAR && (
        <ButtonsList
          items={years}
          selectedItemIndex={years.indexOf(year)}
          onClick={(index) => {
            toggleMode(CalendarViewMode.DATE);
            handleChangeYear(years[index]);
          }}
        />
      )}
      {hasCurrentDayButton && (
        <Wrapper styles={[flex, jc("center")]}>
          <Button styles={marginTop(4)} size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={handleClickOnToday}>
            {intl.text("components.calendar.todayButtonText")} {intl.formatDate(currentDate, DateMode.DATE)}
          </Button>
        </Wrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(Calendar);
