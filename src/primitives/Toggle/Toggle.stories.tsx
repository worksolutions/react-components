import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Wrapper from "../Wrapper";
import Toggle, { ToggleInterface } from "./index";

export default {
  title: "Toggle",
  component: Toggle,
  decorators: [storybookWrapper],
};

const Template: Story<ToggleInterface> = (props) => {
  const [switched, setSwitched] = React.useState(false);
  return (
    <Wrapper styles={[flex, flexColumn, jc("align-center"), child(marginBottom(30))]}>
      <Toggle {...props} enabled={switched} onChange={setSwitched} />
      <Toggle {...props} text="asd" enabled={switched} onChange={setSwitched} />
      <Toggle {...props} textOnRight text="asd" enabled={switched} onChange={setSwitched} />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  textOnRight: false,
};
