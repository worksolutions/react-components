import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { left, marginRight, position, top, transform, width } from "styles";

import { Wrapper } from "../../../index";
import DropdownGroup, { DropdownGroupProps } from "../DropdownGroup";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownDivider from "../DropdownDivider";

export default {
  title: "DropDownMenu/DropdownItemGroup",
  component: DropdownGroup.type,
};

const Template: Story<DropdownGroupProps> = (props: any) => {
  const [checked, setChecked] = useState("");

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropdownGroup
        styles={[width(300)]}
        topElement={
          <>
            <DropdownItem
              itemSize={props.itemSize}
              code="ValueByDefault"
              selected={checked === "ValueByDefault"}
              onChange={setChecked}
            >
              ValueByDefault
            </DropdownItem>
            <DropdownDivider />
          </>
        }
        bottomElement={
          <>
            <DropdownDivider />
            <DropdownItem
              itemSize={props.itemSize}
              code="ValueByDefault1"
              selected={checked === "ValueByDefault1"}
              onChange={setChecked}
            >
              ValueByDefault
            </DropdownItem>
          </>
        }
      >
        <DropdownItem
          selected={checked === "DropdownItemElement3"}
          code="DropdownItemElement3"
          itemSize={props.itemSize}
          onChange={setChecked}
        >
          DropdownItemElement3
        </DropdownItem>
        <DropdownItem
          selected={checked === "DropdownItemElement4"}
          code="DropdownItemElement4"
          disabled={true}
          leftContent="user"
          itemSize={props.itemSize}
          onChange={setChecked}
        >
          DropdownItemElement4
        </DropdownItem>
        <DropdownItem
          selected={checked === "DropdownItemElement1"}
          code="DropdownItemElement1"
          subTitle="Еще один тайтл • email@worksolutions.ru"
          leftContent="user"
          itemSize={props.itemSize}
          onChange={setChecked}
        >
          DropdownItemElement1
        </DropdownItem>
        <DropdownItem
          selected={checked === "DropdownItemElement2"}
          code="DropdownItemElement2"
          subTitle="Еще один тайтл"
          itemSize={props.itemSize}
          onChange={setChecked}
        >
          DropdownItemElement2
        </DropdownItem>
      </DropdownGroup>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
