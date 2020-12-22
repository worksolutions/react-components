import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";
import Spinner, { SpinnerInterface } from "./index";

export default {
  title: "Loader",
  component: Spinner.type,
  decorators: [storybookWrapper],
};

const LoadTemplate: Story<SpinnerInterface> = (props) => <Spinner {...props} />;

export const grayBlueLoad = LoadTemplate.bind({});
export const orangeLoad = LoadTemplate.bind({});
export const greenLoad = LoadTemplate.bind({});
export const redLoad = LoadTemplate.bind({});

grayBlueLoad.args = {
  color: "gray-blue/09",
};

orangeLoad.args = {
  color: "orange/07",
};

greenLoad.args = {
  color: "green/04",
};

redLoad.args = {
  color: "red/08",
};
