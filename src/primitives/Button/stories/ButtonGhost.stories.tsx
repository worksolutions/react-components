import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "storyHelpers";

import { ButtonInterface, ButtonSize, ButtonType } from "../index";
import Button from "../index";

import { internalIcons } from "../../Icon/list";

export default {
  title: "Button/Ghost",
  component: Button.type,
  argTypes: {
    type: selectControl(Object.keys(ButtonType)),
    size: selectControl(Object.keys(ButtonSize)),
    iconLeft: selectControl(Object.keys(internalIcons)),
    iconRight: selectControl(Object.keys(internalIcons)),
  },
};

const ButtonTemplate: Story<ButtonInterface> = (props) => <Button {...props} />;

export const DefaultButton = ButtonTemplate.bind({});

export const RightIconMedium = ButtonTemplate.bind({});

export const LeftIconLarge = ButtonTemplate.bind({});

LeftIconLarge.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.LARGE,
  iconLeft: "alert",
};

RightIconMedium.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.MEDIUM,
  iconRight: "alert",
};

DefaultButton.args = {
  children: "hello",
  type: ButtonType.GHOST,
  size: ButtonSize.SMALL,
};
