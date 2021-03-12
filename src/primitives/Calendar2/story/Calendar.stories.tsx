import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { DateMode } from "@worksolutions/utils";

import { momentControl, selectControl } from "storybook/storyHelpers";

import CalendarComponent, { CalendarInterface } from "../index";
import { intl } from "../../../intl";

export default {
  title: "Calendar2",
  component: CalendarComponent.type,
  argTypes: {
    min: selectControl([]),
    max: selectControl([]),
    momentFormat: selectControl(Object.values(DateMode)),
  },
};

const CalendarTemplate: Story<CalendarInterface> = (props) => <CalendarComponent {...props} />;

export const Button = CalendarTemplate.bind({});

Button.args = {
  min: intl.formatDate(intl.currentDate.minus({ year: 5 }), DateMode.DATE_TIME),
  max: intl.formatDate(intl.currentDate.plus({ year: 5 }), DateMode.DATE_TIME),
  mode: DateMode.DATE_TIME,
} as CalendarInterface;
