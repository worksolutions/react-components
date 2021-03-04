import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Counter, { CounterProps, CounterType } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Counter",
  component: Counter.type,
  argTypes: {
    type: selectControl(Object.keys(CounterType)),
  },
};

const Template: Story<CounterProps> = (props) => {
  return <Counter {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 123,
  type: CounterType.default,
};
