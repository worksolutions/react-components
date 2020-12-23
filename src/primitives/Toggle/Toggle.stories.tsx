import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import Wrapper from "../Wrapper";
import Toggle, { ToggleInterface } from "./index";
import { child, flex, flexColumn, jc, marginBottom } from "../../styles";

export default {
  title: "Toggle",
  component: Toggle,
  decorators: [storybookWrapper],
};

const Template: Story<ToggleInterface> = (props) => {
  const [switched, setSwitched] = React.useState(false);
  return (
    <Wrapper styles={[flex, flexColumn, jc("align-center"), child(marginBottom(30))]}>
      <Toggle enabled={switched} onChange={setSwitched} />
      <Toggle text="asd" enabled={switched} onChange={setSwitched} />
      <Toggle textOnRight text="asd" enabled={switched} onChange={setSwitched} />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
