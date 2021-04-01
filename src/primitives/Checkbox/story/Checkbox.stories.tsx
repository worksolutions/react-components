import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Checkbox, { CheckboxProps, CheckboxSize } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Checkbox",
  component: Checkbox.type,
  argTypes: {
    size: selectControl(Object.keys(CheckboxSize)),
  },
};

const CheckboxTemplate: Story<CheckboxProps> = (props) => <Checkbox {...props} />;

export const Default = CheckboxTemplate.bind({});

Default.args = {
  size: CheckboxSize.medium,
  checked: true,
  text: "Checkbox test text",
};
