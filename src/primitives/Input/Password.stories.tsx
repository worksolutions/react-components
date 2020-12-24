import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import Password, { InputPasswordInterface } from "./Password";

export default {
  title: "Password",
  component: Password.type,
  decorators: [storybookWrapper],
};

const PasswordTemplate: Story<InputPasswordInterface> = (props) => <Password {...props} />;

export const PasswordInput = PasswordTemplate.bind({});

PasswordInput.args = {
  placeholder: "one",
  value: "value",
};
