import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import CheckBox, { CheckboxProps, CheckboxSize } from "./index";
import { selectControl } from "../../storyHelpers";

export default {
  title: "CheckBox",
  component: CheckBox.type,
  decorators: [storybookWrapper],
  argTypes: {
    size: selectControl([CheckboxSize.medium, CheckboxSize.large])
  },
};

const CheckBoxTemplate: Story<CheckboxProps> = (props) => <CheckBox {...props} />;

export const Default = CheckBoxTemplate.bind({});

Default.args = {};
