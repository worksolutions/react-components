import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { width, Wrapper } from "../../../index";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownDivider from "../DropdownDivider";
import DropdownGroup, { DropdownGroupProps } from "../DropdownGroup/DropdownGroup";

import { left, marginRight, position, top, transform } from "styles";

export default {
  title: "DropDownMenu/DropdownGroup",
  component: DropdownGroup.type,
  argTypes: {},
};

const Template: Story<DropdownGroupProps> = (props: any) => {
  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropdownGroup {...props} styles={[width(250)]}>
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
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
