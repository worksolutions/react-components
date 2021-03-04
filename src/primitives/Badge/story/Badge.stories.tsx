import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Badge, { BadgeType, BadgeInterface } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Badge",
  component: Badge.type,
  argTypes: {
    type: selectControl(Object.keys(BadgeType)),
  },
};

const Template: Story<BadgeInterface> = (props) => {
  return <Badge {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  type: BadgeType.default,
};
