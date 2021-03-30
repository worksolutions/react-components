import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { colorControl } from "storybook/storyHelpers";

import TypographyComponent, { TypographyInterface } from "../index";

export default {
  title: "Typography",
  component: TypographyComponent.type,
  argTypes: {
    color: colorControl(),
  },
};

const Template: Story<TypographyInterface> = (args) => <TypographyComponent {...args} />;

export const Typography = Template.bind({});

Typography.args = {
  children: "hello",
};
