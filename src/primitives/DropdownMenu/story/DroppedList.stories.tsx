import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import { left, marginRight, position, top, transform } from "styles";

import { ButtonSize, ButtonType, ListItemSize, Wrapper } from "../../../index";
import DropDownMenu, { DropdownMenuInterface } from "../DropdownMenu";
import DropdownItem from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import DropdownGroup from "../DropdownGroup/DropdownGroup";

import Button from "../../Button";
import { numbersControl, selectControl } from "../../../storybook/storyHelpers";
import { internalIcons } from "../../Icon/list";

export default {
  title: "DropDownMenu/DroppedList",
  component: DropDownMenu.type,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
    placement: selectControl(placements),
    x: numbersControl(-100, 100, 2),
    y: numbersControl(-50, 50, 1),
  },
};

interface StoryDropDownProp {
  itemSize: ListItemSize;
}

const Template: Story<DropdownMenuInterface & StoryDropDownProp> = (props: any) => {
  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropDownMenu
        {...props}
        targetElement={
          <Button className="card-actions" type={ButtonType.ICON} size={ButtonSize.SMALL} iconLeft="kebab-horizontal" />
        }
        offset={[props.x, props.y]}
      >
        <DropdownGroup>
          <DropdownItem code="DropdownItemElement3">DropdownItemElement3</DropdownItem>
          <DropdownItem code="DropdownItemElement4">DropdownItemElement4</DropdownItem>
        </DropdownGroup>
      </DropDownMenu>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  placement: "bottom-start",
  size: InputSize.MEDIUM,
  itemSize: ListItemSize.MEDIUM,
};