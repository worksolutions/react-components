import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import { backgroundColor, borderRight, borderTop, height, ListItemSize, Wrapper } from "../../../index";
import DropDownMenu, { DropdownMenuInterface } from "../DropdownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItem from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import DropdownDivider from "../DropdownDivider";
import DropdownGroup from "../DropdownGroup/DropdownGroup";

import { left, marginRight, position, top, transform, width } from "styles";
import { selectControl } from "storybook/storyHelpers";

export default {
  title: "DropDownMenu/DropDownMenu",
  component: DropDownMenu.type,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
    placement: selectControl(placements),
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
        stylesReference={[width(350)]}
        placeholder="на этом месте будут выбранные элементы"
        arrowElem={<Wrapper styles={[width(15), height(15), backgroundColor("black"), borderTop(1, "red/01")]} />}
      >
        <DropdownGroup>
          <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem code="DropdownItemElement3" itemSize={props.itemSize}>
            DropdownItemElement3
          </DropdownItem>
          <DropdownItem code="DropdownItemElement4" disabled={true} leftContent="user" itemSize={props.itemSize}>
            DropdownItemElement4
          </DropdownItem>
          <DropdownItem
            code="DropdownItemElement1"
            subTitle="Еще один тайтл • email@worksolutions.ru"
            leftContent="user"
            itemSize={props.itemSize}
          >
            DropdownItemElement1
          </DropdownItem>
          <DropdownItem code="DropdownItemElement2" subTitle="Еще один тайтл" itemSize={props.itemSize}>
            DropdownItemElement2
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
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
