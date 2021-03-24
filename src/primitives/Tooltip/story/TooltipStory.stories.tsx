import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import Wrapper from "../../Wrapper";
import Tooltip, { TooltipInterface, TooltipType } from "../index";

import { selectControl } from "../../../storybook/storyHelpers";
import { left, marginRight, position, top, transform } from "../../../styles";
import Button from "../../Button";

export default {
  title: "Tooltip",
  component: Tooltip.type,
  argTypes: {
    primaryPlacement: selectControl(placements),
    strategy: selectControl(["fixed", "absolute"]),
    type: selectControl(Object.keys(TooltipType)),
  },
};

const Template: Story<TooltipInterface> = (props) => {
  return (
    <Wrapper
      className="absolute"
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <Tooltip {...props}>{({ initRef }) => <Button ref={initRef}>Кнопочка</Button>}</Tooltip>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  text: "text",
  type: TooltipType.TOOLTIP,
};
