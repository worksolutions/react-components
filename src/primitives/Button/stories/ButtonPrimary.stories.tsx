import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { selectControl } from "storyHelpers";

import { ButtonInterface, ButtonSize, ButtonType } from "../index";
import Button from "../index";

import { internalIcons } from "../../Icon/list";

export default {
  title: "Button/Primary",
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
