import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownGroup, { DropdownGroupProps } from "../DropdownGroup";

export default {
  title: "DropDownMenu/DropdownGroup",
};

const Template: Story<Omit<DropdownGroupProps, "children" | "topElement" | "stylesHeading">> = (props: any) => {
  const [checked, setChecked] = useState("");

  return (
    <DropdownGroup
      {...props}
      topElement={
        <DropdownItem
          itemSize={props.itemSize}
          code="ValueByDefault"
          selected={checked === "ValueByDefault"}
          onChange={setChecked}
        >
          ValueByDefault
        </DropdownItem>
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
    </DropdownGroup>
  );
};

export const Default = Template.bind({});

Default.args = {
  heading: "heading",
};
