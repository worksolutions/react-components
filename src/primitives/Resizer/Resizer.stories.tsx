import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Resizer, { ResizerInterface } from "./index";
import { storybookWrapper } from "../../storybookWrapper";
import Button from "../Button";
import Wrapper from "../Wrapper";
import { fullWidth, height } from "../../styles";
import { ResizeMode } from "./useResizer";

export default {
  title: "Resizer",
  component: Resizer.type,
  decorators: [storybookWrapper],
};

const Template: Story<ResizerInterface> = (props) => <Resizer {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <Wrapper styles={[fullWidth, height(200)]}>
      <Button>hello</Button>
    </Wrapper>
  ),
  initialWidth: 200,
  mode: ResizeMode.LEFT_TO_RIGHT,
};
