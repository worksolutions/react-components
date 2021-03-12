import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Counter, { CounterInterface } from "../index";

export default {
  title: "Counter",
  component: Counter.type,
};

const Template: Story<CounterInterface> = (props) => {
  return <Counter {...props} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 123,
};
