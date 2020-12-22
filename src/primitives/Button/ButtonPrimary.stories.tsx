import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import { ButtonInterface, ButtonSize, ButtonType } from "./index";
import Button from "./index";

export default {
  title: "Button",
  component: Button.type,
  decorators: [storybookWrapper],
};

const ButtonTemplate: Story<ButtonInterface> = (props) => <Button {...props} />;

export const PrimaryButtonLeftIconLarge = ButtonTemplate.bind({});
export const PrimaryButtonRightIconMedium = ButtonTemplate.bind({});
export const PrimaryButtonRightIconSmall = ButtonTemplate.bind({});

PrimaryButtonLeftIconLarge.args = {
  children: "hello",
  size: ButtonSize.LARGE,
  iconLeft: "alert",
};

PrimaryButtonRightIconMedium.args = {
  children: "hello",
  size: ButtonSize.MEDIUM,
  iconRight: "alert",
};

PrimaryButtonRightIconSmall.args = {
  children: "hello",
  size: ButtonSize.SMALL,
};
