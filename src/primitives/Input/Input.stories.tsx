import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import { marginBottom } from "styles";

import Input, { InputInterface, InputSize } from "./Input";

export default {
  title: "Inputs",
  component: Input,
  decorators: [storybookWrapper],
};

const InputTemplate: Story<InputInterface> = (props) => <Input {...props} />;

export const BaseInput = InputTemplate.bind({});
export const DisableInput = InputTemplate.bind({});
export const SuccessInput = InputTemplate.bind({});
export const ErrorInput = InputTemplate.bind({});
export const BullseyeArrowInput = InputTemplate.bind({});
export const BaseMultiline = InputTemplate.bind({});
export const BullseyeArrowAndSettingsMultiline = InputTemplate.bind({});

BaseInput.args = {
  outerStyles: marginBottom(16),
  placeholder: "value",
};

DisableInput.args = {
  ...BaseInput,
  disabled: true,
  iconRight: "bullseye-arrow",
  tip: "disable",
};

SuccessInput.args = {
  ...BaseInput,
  size: InputSize.LARGE,
  tip: "success",
  success: true,
};

ErrorInput.args = {
  ...BaseInput,
  tip: "error",
  error: true,
};

BullseyeArrowInput.args = {
  ...BaseInput,
  iconRight: "bullseye-arrow",
  tip: "tip",
};

BaseMultiline.args = {
  ...BaseInput,
  multiline: true,
  tip: "tip",
};

BullseyeArrowAndSettingsMultiline.args = {
  ...BaseInput,
  multiline: true,
  iconRight: "bullseye-arrow",
  iconLeft: "settings",
  tip: "tip",
};
