import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { DateMode } from "@worksolutions/utils";

import { selectControl } from "storybook/storyHelpers";

import CalendarComponent, { CalendarInterface } from "../index";
import { intl } from "../../../intl";

export default {
  title: "Calendar",
  component: CalendarComponent.type,
  argTypes: {
    min: selectControl([]),
    max: selectControl([]),
    mode: selectControl(Object.values(DateMode)),
  },
};

const CalendarTemplate: Story<CalendarInterface> = (props) => {
  const [value, setValue] = React.useState<string | undefined>(props.value);
  return (
    <CalendarComponent
      {...props}
      value={value}
      onChange={(value) => {
        props.onChange(value);
        setValue(value);
      }}
    />
  );
};

export const Button = CalendarTemplate.bind({});

Button.args = {
  min: intl.formatDate(intl.currentDate.minus({ year: 5 }), DateMode.DATE_TIME),
  max: intl.formatDate(intl.currentDate.plus({ year: 5 }), DateMode.DATE_TIME),
  mode: DateMode.DATE_TIME,
  hasCurrentDayButton: true,
} as CalendarInterface;
