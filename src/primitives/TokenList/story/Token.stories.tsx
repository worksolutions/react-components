import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import Token, { TokenInterface } from "../Token";

export default {
  title: "Token",
  component: Token.type,
};

const Template: Story<TokenInterface> = (props) => {
  const [removeToken, setRemoveToken] = useState(true);
  return removeToken ? <Token {...props} onRemove={() => setRemoveToken(false)} /> : <div>Token remove</div>;
};

export const Default = Template.bind({});
Default.args = {
  title: "title",
  canRemove: false,
};
