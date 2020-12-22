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

export const LoadingButtonLeftIconLarge = ButtonTemplate.bind({});
export const LoadingButtonRightIconMedium = ButtonTemplate.bind({});
export const LoadingButtonRightIconSmall = ButtonTemplate.bind({});

LoadingButtonLeftIconLarge.args = {
  children: "hello",
  loadingRight: true,
  type: ButtonType.SECONDARY,
  size: ButtonSize.LARGE,
  iconLeft: "alert",
};

LoadingButtonRightIconMedium.args = {
  children: "hello",
  type: ButtonType.PRIMARY,
  disabled: true,
  loadingRight: true,
  size: ButtonSize.MEDIUM,
  iconRight: "alert",
};

LoadingButtonRightIconSmall.args = {
  children: "hello",
  type: ButtonType.GHOST,
  disabled: true,
  loadingRight: true,
  size: ButtonSize.SMALL,
};
