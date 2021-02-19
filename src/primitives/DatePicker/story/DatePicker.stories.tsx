import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "storyHelpers";

import { DatePicker, DatePickerInterface, DatePickerMode } from "index";

export default {
  title: "DatePicker",
  component: DatePicker,
  argTypes: {
    mode: selectControl([DatePickerMode.DATE, DatePickerMode.DATE_TIME, DatePickerMode.TIME]),
  },
};

const DatePickerTemplate: Story<DatePickerInterface> = (props) => <DatePicker {...props} />;

export const Default = DatePickerTemplate.bind({});

Default.args = {
  mode: DatePickerMode.DATE,
  hasCurrentDayButton: true,
  onChange: console.log,
};
