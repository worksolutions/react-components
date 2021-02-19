import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { colorControl, selectControl } from "storyHelpers";

import Spinner, { SpinnerInterface, SpinnerSize } from "../index";

export default {
  title: "Spinner",
  component: Spinner.type,
  argTypes: {
    color: colorControl(),
    size: selectControl(Object.keys(SpinnerSize)),
  },
};

const LoadTemplate: Story<SpinnerInterface> = (props) => {
  return <Spinner {...props} />;
};

export const Loader = LoadTemplate.bind({});

Loader.args = {
  color: "gray-blue/09",
  size: SpinnerSize.medium,
};
