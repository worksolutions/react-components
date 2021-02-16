import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import Toggle, { ToggleInterface } from "./index";

export default {
  title: "Toggle",
  component: Toggle,
  decorators: [storybookWrapper],
};

const Template: Story<ToggleInterface> = (props) => <Toggle {...props} />;

export const Default = Template.bind({});

Default.args = {
  text: "text",
};
