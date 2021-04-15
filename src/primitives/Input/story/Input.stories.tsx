import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { iconsControl, selectControl } from "storybook/storyHelpers";

import { marginBottom } from "styles";

import Input, { InputInterface } from "../Input";

import { InputContainerSize, InputContainerTitlePosition } from "../../InputContainer/enums";

export default {
  title: "Inputs",
  component: Input,
  argTypes: {
    leftIcon: iconsControl(),
    rightIcon: iconsControl(),
    titlePosition: selectControl(Object.keys(InputContainerTitlePosition)),
    size: selectControl(Object.keys(InputContainerSize)),
  },
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
  title: "title",
};

DisableInput.args = {
  ...BaseInput,
  disabled: true,
  rightIcon: "bullseye-arrow",
  tip: "disable",
};

SuccessInput.args = {
  ...BaseInput,
  title: "title",
  size: InputContainerSize.LARGE,
  tip: "success",
  success: true,
};

ErrorInput.args = {
  ...BaseInput,
  title: "title",
  tip: "error",
  error: true,
};

BullseyeArrowInput.args = {
  ...BaseInput,
  title: "title",
  rightIcon: "bullseye-arrow",
  tip: "tip",
};

BaseMultiline.args = {
  ...BaseInput,
  title: "title",
  multiline: true,
  tip: "tip",
};

BullseyeArrowAndSettingsMultiline.args = {
  ...BaseInput,
  title: "title",
  multiline: true,
  rightIcon: "bullseye-arrow",
  leftIcon: "settings",
  tip: "tip",
};
