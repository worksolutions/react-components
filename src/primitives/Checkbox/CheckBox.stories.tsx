import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import CheckBox from "./index";

export default {
  title: "CheckBox",
  component: CheckBox.type,
  decorators: [storybookWrapper],
};

type CheckboxProps = {
  text: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
};

const AspectRatioWrapperTemplate: Story<CheckboxProps> = (props) => <CheckBox {...props} />;

export const Default = AspectRatioWrapperTemplate.bind({});
Default.args = {};
