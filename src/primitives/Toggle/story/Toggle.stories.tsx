import React from "react";
import { Story } from "@storybook/react/types-6-0";

import ToggleComponent, { ToggleInterface } from "../index";

export default {
  title: "Toggle",
  component: ToggleComponent.type,
};

const Template: Story<ToggleInterface> = (props) => <ToggleComponent {...props} />;

export const Toggle = Template.bind({});

Toggle.args = {
  text: "Модифицировать",
} as ToggleInterface;
