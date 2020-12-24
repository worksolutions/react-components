import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import ProgressBar, { ProgressBarProps } from "./index";

export default {
  title: "ProgressBar",
  component: ProgressBar.type,
  decorators: [storybookWrapper],
};

const Template: Story<ProgressBarProps> = (props) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setProgress(progress + 0.005), 0.1);
    if (progress >= 1) clearInterval(interval);
    return () => clearInterval(interval);
  }, [progress]);

  return <ProgressBar value={progress} />;
};
export const ProgressInput = Template.bind({});
ProgressInput.args = {};
