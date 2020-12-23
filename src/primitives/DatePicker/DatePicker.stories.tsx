import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import { DatePicker, DatePickerInterface, DatePickerMode } from "../../index";

export default {
  title: "DatePicker",
  component: DatePicker,
  decorators: [storybookWrapper],
};

const DatePickerTemplate: Story<DatePickerInterface> = (props) => <DatePicker {...props} />;

export const Default = DatePickerTemplate.bind({});

Default.args = {
  mode: DatePickerMode.DATE,
  hasCurrentDayButton: true,
  onChange: console.log,
};
