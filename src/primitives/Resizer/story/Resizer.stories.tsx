import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { border, flex, height, width } from "styles";

import Resizer, { ResizerInterface } from "../index";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

export default {
  title: "Resizer",
  component: Resizer.type,
};

const children = <Typography>Some text with a few words</Typography>;

const TemplateRightToLeft: Story<ResizerInterface> = (props) => (
  <Wrapper styles={[flex, width(400), height(400), border(1, "blue/03")]}>
    <Resizer {...props}>{children}</Resizer>
  </Wrapper>
);

export const RightToLeft = TemplateRightToLeft.bind({});

RightToLeft.args = {
  initialWidth: 200,
};
