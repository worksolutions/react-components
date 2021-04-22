import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "storybook/storyHelpers";

import { ButtonInterface, ButtonSize, ButtonType } from "../";
import ButtonComponent from "../index";
import { internalIcons } from "../../Icon/list";

export default {
  title: "Button",
  // @ts-ignore
  component: ButtonComponent.type.render,
  argTypes: {
    type: selectControl(Object.keys(ButtonType)),
    size: selectControl(Object.keys(ButtonSize)),
    iconLeft: selectControl(Object.keys(internalIcons)),
    iconRight: selectControl(Object.keys(internalIcons)),
  },
};

const ButtonTemplate: Story<ButtonInterface> = (props) => <ButtonComponent {...props} />;

export const Button = ButtonTemplate.bind({});

Button.args = {
  children: "hello",
  size: ButtonSize.LARGE,
} as ButtonInterface;
