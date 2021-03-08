import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { left, marginRight, position, top, transform, width } from "styles";
import { selectControl } from "storybook/storyHelpers";

import { Wrapper } from "../../../index";
import DropDownMenu, { DropdownMenuInterface } from "../DropdownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItem from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import { ListItemSize } from "../DropdownItem/types";
import DropdownDivider from "../DropdownDivider";
import DropdownGroup from "../DropdownGroup";

export default {
  title: "DropDownMenu/DropDownMenu",
  component: DropDownMenu.type,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
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
      <DropDownMenu {...props} stylesReference={[width(350)]} placeholder="на этом месте будут выбранные элементы">
        <DropdownGroup
          topElement={
            <>
              <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
                ValueByDefault
              </DropdownItem>
              <DropdownDivider />
            </>
          }
          bottomElement={
            <>
              <DropdownDivider />
              <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
                ValueByDefault
              </DropdownItem>
            </>
          }
        >
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
