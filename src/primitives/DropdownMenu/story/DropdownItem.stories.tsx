import React, { useMemo, useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "../../../storybook/storyHelpers";

import { left, ListItemSize, marginRight, position, top, transform, Wrapper } from "../../../index";

import DropdownItem, { DropdownItemInterface } from "../DropdownItem";
import { internalIcons } from "../../Icon/list";
import { ListSelectedItemsManagerContext } from "../../List/ListSelectedItemsManagerContext";

export default {
  title: "DropdownMenu/DropdownItem",
  component: DropdownItem.type,
  argTypes: {
    leftContent: selectControl(Object.keys(internalIcons)),
    rightContent: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(ListItemSize)),
  },
};

const Template: Story<DropdownItemInterface> = (props: any) => {
  const [selectedItems, setSelect] = useState<any>([]);
  const value = useMemo(() => ({ onChange: setSelect, selectedItems }), [selectedItems, setSelect]);

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <ListSelectedItemsManagerContext.Provider value={value}>
        <DropdownItem {...props}>ValueByDefault</DropdownItem>
      </ListSelectedItemsManagerContext.Provider>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: ListItemSize.MEDIUM,
  subTitle: "subTitle",
  code: "code",
};
