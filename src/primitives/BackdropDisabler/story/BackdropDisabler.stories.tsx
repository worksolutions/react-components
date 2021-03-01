import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { backgroundColor } from "styles";

import BackdropDisablerComponent from "../index";

export default {
  title: "BackdropDisabler",
};

const BackdropDisablerTemplate: Story<{ color: any }> = () => <BackdropDisablerComponent />;

export const BackdropDisabler = BackdropDisablerTemplate.bind({});
