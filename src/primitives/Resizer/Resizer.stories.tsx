import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Resizer, { ResizerInterface } from "./index";
import { storybookWrapper } from "../../storybookWrapper";
import Button from "../Button";
import Wrapper from "../Wrapper";
import { flex, flexValue, fullWidth, height, width } from "../../styles";
import { ResizeMode } from "./useResizer";

export default {
  title: "Resizer",
  component: Resizer.type,
  decorators: [storybookWrapper],
};

const children = (
  <>
    <Wrapper styles={[fullWidth, height(200)]}>
      <Button>hello</Button>
    </Wrapper>
  </>
);

const TemplateRightToLeft: Story<ResizerInterface> = (props) => (
  <Wrapper styles={[flex, width(400)]}>
    <Wrapper styles={flexValue(1)} />
    <Resizer {...props} />
  </Wrapper>
);
const TemplateLeftToRight: Story<ResizerInterface> = (props) => <Resizer {...props} />;

export const RightToLeft = TemplateRightToLeft.bind({});
export const LeftToRight = TemplateLeftToRight.bind({});

RightToLeft.args = {
  children: children,
  initialWidth: 200,
  mode: ResizeMode.RIGHT_TO_LEFT,
};

LeftToRight.args = {
  children: children,
  initialWidth: 200,
  mode: ResizeMode.LEFT_TO_RIGHT,
};
