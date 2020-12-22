import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";
import Input, { InputInterface, InputSize } from "./Input";
import { marginBottom } from "../../styles";

export default {
  title: "Inputs",
  component: Input,
  decorators: [storybookWrapper],
};

const InputTemplate: Story<InputInterface> = (props) => <Input {...props} />;

export const BaseInput = InputTemplate.bind({});
export const SuccessInput = InputTemplate.bind({});
export const ErrorInput = InputTemplate.bind({});
export const BullseyeArrowInput = InputTemplate.bind({});
export const BaseMultiline = InputTemplate.bind({});
export const BullseyeArrowAndSettingsMultiline = InputTemplate.bind({});

BaseInput.args = {
  size: InputSize.MEDIUM,
  outerStyles: marginBottom(16),
  disabled: false,
  placeholder: "disabled",
  value: "value",
};

SuccessInput.args = {
  size: InputSize.LARGE,
  outerStyles: marginBottom(16),
  tip: "success",
  placeholder: "one",
  success: true,
  value: "value",
};

ErrorInput.args = {
  outerStyles: marginBottom(16),
  tip: "error",
  placeholder: "one",
  error: true,
  value: "value",
};

BullseyeArrowInput.args = {
  outerStyles: marginBottom(16),
  tip: "default",
  placeholder: "one",
  iconRight: "bullseye-arrow",
  value: "value",
};

BaseMultiline.args = {
  multiline: true,
  outerStyles: marginBottom(16),
  disabled: false,
  placeholder: "value",
  value: "value",
  tip: "tip",
};

BullseyeArrowAndSettingsMultiline.args = {
  placeholder: "one",
  value: "value",
  multiline: true,
  outerStyles: marginBottom(16),
  tip: "default",
  iconRight: "bullseye-arrow",
  iconLeft: "settings",
};
