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

export const GhostButtonLeftIconLarge = ButtonTemplate.bind({});
export const GhostButtonRightIconMedium = ButtonTemplate.bind({});
export const GhostButtonRightIconSmall = ButtonTemplate.bind({});

GhostButtonLeftIconLarge.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.LARGE,
  iconLeft: "alert",
};

GhostButtonRightIconMedium.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.MEDIUM,
  iconRight: "alert",
};

GhostButtonRightIconSmall.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.SMALL,
};
