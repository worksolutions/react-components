import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Wrapper from "../Wrapper";
import Toggle from "./index";

export default {
  title: "ToggleGroup",
  decorators: [storybookWrapper],
};

const Template: Story<{ items: typeof items }> = ({ items }) => {
  const [switched, setSwitched] = React.useState("");
  return (
    <Wrapper styles={[flex, flexColumn, jc("align-center"), child(marginBottom(30))]}>
      {items.map((item) => {
        return (
          <Toggle
            textOnRight={item.textOnRight}
            text={item.text}
            enabled={switched === item.text}
            onChange={() => setSwitched(item.text)}
          />
        );
      })}
    </Wrapper>
  );
};

export const ToggleGroup = Template.bind({});

const items = [
  { text: "text1", textOnRight: false },
  { text: "text2", textOnRight: true },
  { text: "text3", textOnRight: false },
];

ToggleGroup.args = { items };
