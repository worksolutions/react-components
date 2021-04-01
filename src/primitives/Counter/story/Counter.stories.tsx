import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Counter, { CounterInterface } from "../index";
import { colorControl } from "../../../storybook/storyHelpers";

export default {
  title: "Counter",
  component: Counter.type,
  argTypes: {
    color: colorControl(),
  },
};

const Template: Story<CounterInterface> = (props) => {
  return <Counter {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 4,
  color: "blue/06",
};
