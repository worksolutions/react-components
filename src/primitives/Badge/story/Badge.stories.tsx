import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Badge, { BadgeInterface } from "../index";

export default {
  title: "Badge",
  component: Badge.type,
};

const Template: Story<BadgeInterface> = (props) => {
  return <Badge {...props} />;
};

export const Default = Template.bind({});

Default.args = {};
