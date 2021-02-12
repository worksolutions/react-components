import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { colorControl } from "storyHelpers";

import Typography, { TypographyInterface } from "./index";

export default {
  title: "Typography",
  component: Typography.type,
  decorators: [storybookWrapper],
  argTypes: {
    color: colorControl(),
  },
};

const Template: Story<TypographyInterface> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "hello",
};
