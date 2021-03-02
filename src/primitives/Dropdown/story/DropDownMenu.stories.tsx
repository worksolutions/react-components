import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import DropDownMenu, { DropDownMenuInterface } from "../DropDownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItemGroup from "../DropdownItemGroup";
import DropdownItemElement from "../DropdownItem/DropdownItem";
import { selectControl } from "../../../storybook/storyHelpers";
import { left, marginRight, position, top, transform, width } from "../../../styles";
import DropdownGroupList from "../DropdownList";
import { InputSize } from "../../Input/InputWrapper";
import { Wrapper } from "../../../index";
import { ListItemSize } from "../DropdownItem/types";

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
      <DropDownMenu
        {...props}
        targetStyles={[width(240)]}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <DropdownItemGroup>
          <DropdownGroupList
            heading="heading"
            onChange={setCheck}
            valueByDefault="valueByDefault"
            valueByDefaultSelected={!checked}
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
          </DropdownGroupList>
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
            subTitle="Еще один тайтл • "
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
