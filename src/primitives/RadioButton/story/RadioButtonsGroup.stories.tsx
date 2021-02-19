import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import RadioButton, { RadioButtonProps } from "../index";
import Wrapper from "../../Wrapper";

export default {
  title: "RadioButtonGroup",
  component: RadioButton.type,
};

const RadioButtonsGroupTemplate: Story<RadioButtonProps> = () => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <Wrapper onClick={() => setValue("text1")}>
        <RadioButton text={"text1"} disabled={false} error={false} isChecked={"text1" === value} />
      </Wrapper>
      <Wrapper onClick={() => setValue("text2")}>
        <RadioButton text={"text2"} disabled={false} error={false} isChecked={"text2" === value} />
      </Wrapper>
      <Wrapper onClick={() => setValue("text3")}>
        <RadioButton text={"text3"} disabled={true} error={false} isChecked={"text3" === value} />
      </Wrapper>
      <Wrapper onClick={() => setValue("text4")}>
        <RadioButton text={"text4"} disabled={false} error={true} isChecked={"text4" === value} />
      </Wrapper>
    </Wrapper>
  );
};

export const RadioButtonsGroup = RadioButtonsGroupTemplate.bind({});
