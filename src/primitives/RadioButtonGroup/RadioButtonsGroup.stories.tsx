import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import RadioButton from "../RadioButton";
import Wrapper from "../Wrapper";

export default {
  title: "RadioButtonGroup",
  decorators: [storybookWrapper],
};

const RadioButtonsGroupTemplate: Story<{ items: any[] }> = ({ items }) => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      {items.map((item) => {
        return (
          <Wrapper onClick={() => setValue(item.text)}>
            <RadioButton text={item.text} disabled={item.disabled} error={item.error} isChecked={item.text === value} />
          </Wrapper>
        );
      })}
    </Wrapper>
  );
};
export const RadioButtonsGroup = RadioButtonsGroupTemplate.bind({});
RadioButtonsGroup.args = {
  items: [
    { text: "text1", value: "value1" },
    { text: "text2", value: "value2" },
    { text: "text3", value: "value3" },
    { text: "text3", value: "value3", disabled: true },
    { text: "text4", value: "value4", error: true },
  ],
};
