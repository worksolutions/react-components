import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Checkbox, { CheckboxProps } from "../index";

export default {
  title: "Checkbox",
  component: Checkbox.type,
};

const CheckboxTemplate: Story<CheckboxProps> = (props) => <Checkbox {...props} />;

export const Default = CheckboxTemplate.bind({});

Default.args = {
  checked: true,
  content: "Checkbox test text",
};
