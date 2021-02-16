import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Wrapper from "../Wrapper";
import Toggle, { ToggleInterface } from "./index";

export default {
  title: "ToggleGroup",
  component: Toggle.type,
  decorators: [storybookWrapper],
};

const Template: Story<ToggleInterface> = (props) => {
  const [switched1, setSwitched1] = React.useState(false);
  const [switched2, setSwitched2] = React.useState(false);
  const [switched3, setSwitched3] = React.useState(false);

  return (
    <Wrapper styles={[flex, flexColumn, jc("align-center"), child(marginBottom(30))]}>
      <Toggle {...props} text="text1 Right" enabled={switched1} textOnRight onChange={setSwitched1} />
      <Toggle {...props} text="text2" enabled={switched2} textOnRight={false} onChange={setSwitched2} />
      <Toggle {...props} text="text3" enabled={switched3} textOnRight={false} onChange={setSwitched3} />
    </Wrapper>
  );
};

export const ToggleGroup = Template.bind({});
