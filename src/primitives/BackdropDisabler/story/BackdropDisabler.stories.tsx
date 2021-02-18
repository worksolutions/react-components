import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { backgroundColor } from "styles";

import { colorControl } from "storyHelpers";

import BackdropDisabler from "../index";

export default {
  title: "Backdrop Disabler",
  argTypes: {
    color: colorControl(),
  },
};

const BackdropDisablerTemplate: Story<{ color: any }> = (props) => (
  <BackdropDisabler styles={[backgroundColor(props.color)]} />
);

export const Default = BackdropDisablerTemplate.bind({});

Default.args = {
  color: "green/01",
};
