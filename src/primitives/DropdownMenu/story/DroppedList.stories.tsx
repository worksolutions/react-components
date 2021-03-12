import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import { absoluteCenter, left, marginRight, position, top, transform } from "styles";

import { ButtonSize, ButtonType, ListItemSize, Wrapper } from "../../../index";
import DropDownMenu, { DropdownMenuProps } from "../DropdownMenu";
import DropdownItem from "../DropdownItem/DropdownItem";
import List from "../List/List";

import Button from "../../Button";
import { numbersControl, selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "DropDownMenu/DroppedList",
  component: DropDownMenu.type,
  argTypes: {
    itemSize: selectControl(Object.values(ListItemSize)),
    placement: selectControl(placements),
    x: numbersControl(-100, 100, 2),
    y: numbersControl(-50, 50, 1),
  },
};

interface StoryDropDownProp {
  itemSize: ListItemSize;
}

const Template: Story<DropdownMenuProps & StoryDropDownProp> = (props: any) => {
  return (
    <Wrapper styles={[absoluteCenter, top("40%")]}>
      <DropDownMenu
        {...props}
        targetElement={
          <Button className="card-actions" type={ButtonType.ICON} size={ButtonSize.SMALL} iconLeft="kebab-horizontal" />
        }
        offset={[props.x, props.y]}
      >
        <List>
          <DropdownItem code="DropdownItemElement3" itemSize={props.itemSize}>
            DropdownItemElement3
          </DropdownItem>
          <DropdownItem code="DropdownItemElement4" itemSize={props.itemSize}>
            DropdownItemElement4
          </DropdownItem>
        </List>
      </DropDownMenu>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  placement: "bottom-start",
  itemSize: ListItemSize.SMALL,
};
