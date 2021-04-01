import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Badge, { BadgeInterface } from "../index";
import { colorControl } from "../../../storybook/storyHelpers";

export default {
  title: "Badge",
  component: Badge.type,
  argTypes: {
    color: colorControl(),
  },
};

const Template: Story<BadgeInterface> = (props) => {
  return <Badge {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  color: "blue/06",
};
