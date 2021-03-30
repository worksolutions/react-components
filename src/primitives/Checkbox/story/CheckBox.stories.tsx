import React from "react";
import { Story } from "@storybook/react/types-6-0";

import CheckBox, { CheckboxProps, CheckboxSize } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "CheckBox",
  component: CheckBox.type,
  argTypes: {
    size: selectControl(Object.keys(CheckboxSize)),
  },
};

const CheckBoxTemplate: Story<CheckboxProps> = (props) => <CheckBox {...props} />;

export const Default = CheckBoxTemplate.bind({});

Default.args = {
  size: CheckboxSize.medium,
};
