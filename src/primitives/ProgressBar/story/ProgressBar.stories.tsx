import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { numbersControl } from "storybook/storyHelpers";

import ProgressBar, { ProgressBarProps } from "../index";

export default {
  title: "ProgressBar",
  component: ProgressBar.type,
  argTypes: {
    value: numbersControl(0, 1, 0.05),
  },
};

const Template: Story<ProgressBarProps> = (props) => {
  const [progress, setProgress] = React.useState(props.value);

  React.useEffect(() => {
    if (props.value) return;
    const interval = setInterval(() => setProgress(progress + 0.005), 0.1);
    if (progress >= 1) clearInterval(interval);
    return () => clearInterval(interval);
  }, [progress]);

  return <ProgressBar value={progress} />;
};

export const ProgressInput = Template.bind({});

ProgressInput.args = {
  value: 0,
};
