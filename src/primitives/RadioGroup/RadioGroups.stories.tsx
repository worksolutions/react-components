import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import RadioGroups, { RadioGroupInterface, RadioGroupSize } from "./index";

export default {
  title: "RadioGroups",
  component: RadioGroups,
  decorators: [storybookWrapper],
};

const items = [
  { code: "1", title: "Любое значение" },
  { code: "2", title: "Вариант 1" },
  { code: "3", title: "Вариант 2" },
  { code: "4", title: "Вариант 3" },
  { code: "5", title: "Вариант 4" },
];

const Template: Story<RadioGroupInterface<string>> = (props) => {
  const [value, setValue] = React.useState(items[0].code);
  return <RadioGroups {...props} active={value} onChange={setValue} items={items} />;
};

export const Default = Template.bind({});

Default.args = {
  size: RadioGroupSize.MEDIUM,
};
