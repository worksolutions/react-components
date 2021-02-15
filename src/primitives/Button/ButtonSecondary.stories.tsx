import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { selectControl } from "storyHelpers";

import Button, { ButtonInterface, ButtonSize, ButtonType } from "./index";

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
