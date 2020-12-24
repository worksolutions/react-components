import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";
import Spinner, { SpinnerInterface } from "./index";
import { colorControl } from "../../storyHelpers";

export default {
  title: "Loader",
  component: Spinner.type,
  decorators: [storybookWrapper],
  argTypes: {
    color: colorControl(),
  },
};

const LoadTemplate: Story<SpinnerInterface> = (props) => <Spinner {...props} />;

export const Loader = LoadTemplate.bind({});

Loader.args = {
  color: "gray-blue/09",
};
