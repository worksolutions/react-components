import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import Token, { TokenInterface } from "./Token";

export default {
  title: "Token",
  component: Token.type,
  decorators: [storybookWrapper],
};

const Template: Story<TokenInterface> = (props) => {
  const [removeToken, setRemoveToken] = useState(true);
  return removeToken ? <Token {...props} remove={() => setRemoveToken(false)} /> : <div>Token remove</div>;
};

export const Default = Template.bind({});
Default.args = {
  title: "title",
  canRemove: false,
};
