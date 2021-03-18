import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import {
  absoluteCenter,
  AvatarSize,
  backgroundColor,
  border,
  borderRadius,
  flex,
  hover,
  List,
  ListInterface,
  ListItem,
  ListItemSize,
  padding,
  top,
  Wrapper,
} from "../../../index";

import DropdownDivider from "../ListItem/ListItemsDivider";

import AvatarComponent from "../../Avatar";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "List/List",
  component: List,
  argTypes: {
    itemSize: selectControl(Object.values(ListItemSize)),
  },
};

interface StoryDropdownProps {
  itemSize: ListItemSize;
  isHover: boolean;
}

const Template: Story<ListInterface<string> & StoryDropdownProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <List
        {...props}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        outerStyles={[border(1, "gray-blue/02"), padding(0)]}
      >
        <ListItem size={props.itemSize} code="Невозможно выбрать" showArrowOnSelection={false} canSelect={false}>
          Невозможно выбрать
        </ListItem>
        <DropdownDivider />
        <ListItem code="DropdownItemElement3" size={props.itemSize} showArrowOnSelection>
          DropdownItemElement3
        </ListItem>
        <ListItem
          code="DropdownItemElement1"
          subTitle="Еще один тайтл • email@worksolutions.ru"
          leftContent="user"
          size={props.itemSize}
          showIconRightOnHover
          showIconLeftOnHover
          showArrowOnSelection={false}
          rightContent={
            <Wrapper
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
              onClick={() => console.log("asdsa")}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          DropdownItemElement1
        </ListItem>
        <ListItem
          code="DropdownItemElement2"
          subTitle="Еще один тайтл"
          size={props.itemSize}
          showArrowOnSelection={false}
        >
          DropdownItemElement2
        </ListItem>
        <DropdownDivider />
        <ListItem
          size={props.itemSize}
          code="ValueByDefault"
          showArrowOnSelection={false}
          canSelect={false}
          rightContent={
            <Wrapper
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
              onClick={() => console.log("asdsa")}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          Невозможно выбрать, но с аватаркой
        </ListItem>
      </List>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  itemSize: ListItemSize.MEDIUM,
};
