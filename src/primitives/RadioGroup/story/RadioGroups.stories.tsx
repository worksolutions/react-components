import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl, textControl } from "storybook/storyHelpers";

import RadioGroups, { RadioGroupInterface, RadioGroupSize } from "../index";

const items = [
  { code: "1", title: "Любое значение" },
  { code: "2", title: "Вариант 1" },
  { code: "3", title: "Вариант 2" },
  { code: "4", title: "Вариант 3" },
  { code: "5", title: "Вариант 4" },
];

export default {
  title: "RadioGroups",
  component: RadioGroups,
  argTypes: {
    size: selectControl([RadioGroupSize.MEDIUM, RadioGroupSize.SMALL]),
    title: textControl(),
  },
};

const Template: Story<RadioGroupInterface<string>> = (props) => {
  const [value, setValue] = React.useState(items[0].code);
  return <RadioGroups {...props} active={value} onChange={setValue} items={items} />;
};

export const Default = Template.bind({});

Default.args = {
  size: RadioGroupSize.MEDIUM,
};
