import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { selectControl } from "storyHelpers";

import { ButtonInterface, ButtonSize, ButtonType } from "./index";
import Button from "./index";

import { internalIcons } from "../Icon/list";

export default {
  title: "Button",
  component: Button.type,
  decorators: [storybookWrapper],
  argTypes: {
    type: selectControl(Object.keys(ButtonType)),
    size: selectControl(Object.keys(ButtonSize)),
    iconLeft: selectControl(Object.keys(internalIcons)),
    iconRight: selectControl(Object.keys(internalIcons)),
  },
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
