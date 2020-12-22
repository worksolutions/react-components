import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import ProgressBar, { ProgressBarProps } from "./index";

export default {
  title: "ProgressBar",
  component: ProgressBar.type,
  decorators: [storybookWrapper],
};

const ProgressTemplate: Story<ProgressBarProps> = (props) => <ProgressBar {...props} />;

export const ProgressInput = ProgressTemplate.bind({});

ProgressInput.args = {
  value: 0.9,
};
