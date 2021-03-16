import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import Tooltip from "../index";
import TooltipContainer, { TooltipContainerInterface } from "../TooltipContainer";
import Wrapper from "../../Wrapper";
import { BaseInput } from "../../Input/story/Input.stories";

import { selectControl } from "../../../storybook/storyHelpers";
import { left, marginRight, position, top, transform } from "../../../styles";

export default {
  title: "Tooltip",
  component: TooltipContainer.type,
  argTypes: {
    primaryPlacement: selectControl(placements),
  },
};

const Template: Story<TooltipContainerInterface> = (props) => {
  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <TooltipContainer {...props}>
        {(toggleVisibility) => (
          <Wrapper onClick={toggleVisibility}>
            <BaseInput value="baseValue" onChange={() => {}} />
          </Wrapper>
        )}
      </TooltipContainer>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  hasArrow: true,
  tooltipText: "text",
};
