import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import Button, { ButtonInterface, ButtonSize, ButtonType } from "./index";

export default {
  title: "Button",
  component: Button.type,
  decorators: [storybookWrapper],
};

const ButtonTemplate: Story<ButtonInterface> = (props) => <Button {...props} />;

export const SecondaryButtonLeftIconLarge = ButtonTemplate.bind({});
export const SecondaryButtonRightIconMedium = ButtonTemplate.bind({});
export const SecondaryButtonRightIconSmall = ButtonTemplate.bind({});

SecondaryButtonLeftIconLarge.args = {
  children: "hello",
  type: ButtonType.SECONDARY,
  size: ButtonSize.LARGE,
  iconLeft: "alert",
};

SecondaryButtonRightIconMedium.args = {
  children: "hello",
  type: ButtonType.SECONDARY,
  size: ButtonSize.MEDIUM,
  iconRight: "alert",
};

SecondaryButtonRightIconSmall.args = {
  type: ButtonType.SECONDARY,
  children: "hello",
  size: ButtonSize.SMALL,
};
