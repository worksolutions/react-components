import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import RadioButton, { RadioButtonProps } from "./index";

export default {
  title: "RadioButton",
  component: RadioButton.type,
  decorators: [storybookWrapper],
};

const CheckBoxTemplate: Story<RadioButtonProps> = (props) => <RadioButton {...props} />;

export const Default = CheckBoxTemplate.bind({});
Default.args = {
  text: "text",
};
