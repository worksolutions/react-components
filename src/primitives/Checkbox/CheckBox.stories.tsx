import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import CheckBox, {CheckboxProps} from "./index";

export default {
  title: "CheckBox",
  component: CheckBox.type,
  decorators: [storybookWrapper],
};

const AspectRatioWrapperTemplate: Story<CheckboxProps> = (props) => <CheckBox {...props} />;

export const Default = AspectRatioWrapperTemplate.bind({});
Default.args = {};
