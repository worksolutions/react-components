import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import BackdropDisabler from "./index";
import { backgroundColor } from "../../styles";

export default {
  title: "BackdropDisabler",
  component: BackdropDisabler.type,
  decorators: [storybookWrapper],
};

const BackdropDisablerTemplate: Story<{ styles?: any }> = (props) => <BackdropDisabler {...props} />;

export const Default = BackdropDisablerTemplate.bind({});

Default.args = {
  styles: [backgroundColor("violet/02")],
};
