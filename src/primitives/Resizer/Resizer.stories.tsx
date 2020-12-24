import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import { flex, flexValue, fullWidth, height, width } from "styles";

import Resizer, { ResizerInterface } from "./index";

import Button from "../Button";
import Wrapper from "../Wrapper";

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
    <Resizer {...props} children={children} />
  </Wrapper>
);
const TemplateLeftToRight: Story<ResizerInterface> = (props) => <Resizer {...props} children={children} />;

export const RightToLeft = TemplateRightToLeft.bind({});
export const LeftToRight = TemplateLeftToRight.bind({});

RightToLeft.args = {
  initialWidth: 200,
  mode: ResizeMode.RIGHT_TO_LEFT,
};

LeftToRight.args = {
  initialWidth: 200,
  mode: ResizeMode.LEFT_TO_RIGHT,
};
