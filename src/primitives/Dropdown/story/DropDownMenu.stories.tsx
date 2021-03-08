import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { left, marginRight, position, top, transform, width } from "styles";
import { selectControl } from "storybook/storyHelpers";

import { Wrapper } from "../../../index";
import DropDownMenu, { DropDownMenuInterface } from "../DropdownMenu";
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

const Template: Story<DropDownMenuInterface & StoryDropDownProp> = (props: any) => {
  const [checked, setChecked] = useState("");

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropDownMenu
        {...props}
        stylesReference={[width(350)]}
        title={checked}
        placeholder="на этом месте будут выбранные элементы"
      >
        <DropdownGroup
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
                code="ValueByDefault"
                selected={checked === "ValueByDefault"}
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
