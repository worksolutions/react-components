import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { left, marginRight, position, top, transform, width } from "styles";
import { selectControl } from "storybook/storyHelpers";

import DropDownMenu, { DropDownMenuInterface } from "../DropDownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItemGroup from "../DropdownItemGroup";
import DropdownItemElement from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import { Wrapper } from "../../../index";
import { ListItemSize } from "../DropdownItem/types";
import DropdownGroup from "../DropdownGroup";

export default {
  title: "DropDownMenu",
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
  const [checked, setChecked] = useState(false);

  const setCheck = () => setChecked(!checked);

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropDownMenu {...props} targetStyles={[width(240)]}>
        <DropdownItemGroup>
          <DropdownGroup
            heading="heading"
            topElement={
              <DropdownItemElement onChange={setCheck} selected={!checked} itemSize={props.itemSize}>
                ValueByDefault
              </DropdownItemElement>
            }
          >
            <DropdownItemElement onChange={setCheck} selected={!checked} itemSize={props.itemSize}>
              DropdownItemElement3
            </DropdownItemElement>
            <DropdownItemElement
              onChange={setCheck}
              selected={checked}
              disabled={true}
              leftContent="user"
              itemSize={props.itemSize}
            >
              DropdownItemElement4
            </DropdownItemElement>
          </DropdownGroup>
          <DropdownItemElement
            onChange={setCheck}
            selected={!checked}
            subTitle="Еще один тайтл • email@worksolutions.ru"
            leftContent="user"
            itemSize={props.itemSize}
          >
            DropdownItemElement1
          </DropdownItemElement>
          <DropdownItemElement
            onChange={setCheck}
            selected={checked}
            subTitle="Еще один тайтл"
            itemSize={props.itemSize}
          >
            DropdownItemElement2
          </DropdownItemElement>
        </DropdownItemGroup>
      </DropDownMenu>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  placement: "bottom-start",
  title: "title",
  size: InputSize.MEDIUM,
  itemSize: ListItemSize.MEDIUM,
};
