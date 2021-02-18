import React from "react";
import {Story} from "@storybook/react/types-6-0";

import {storybookWrapper} from "storybookWrapper";
import {colorControl, selectControl} from "storyHelpers";

import Spinner, {SpinnerInterface, SpinnerSize} from "./index";

export default {
  title: "Loader",
  component: Spinner.type,
  decorators: [storybookWrapper],
  argTypes: {
    color: colorControl(),
    size: selectControl(Object.keys(SpinnerSize))

  },
};

const LoadTemplate: Story<SpinnerInterface> = (props) => <Spinner {...props} />;

export const Loader = LoadTemplate.bind({});

Loader.args = {
  color: "gray-blue/09",
};
