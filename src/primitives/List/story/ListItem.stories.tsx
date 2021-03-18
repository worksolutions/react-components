import React, { useMemo, useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "../../../storybook/storyHelpers";

import { left, ListItemInterface, ListItemSize, marginRight, position, top, transform, Wrapper } from "../../../index";

import { internalIcons } from "../../Icon/list";
import SelectedItemsManagerContextProvider from "../ListContext";
import ListItem from "../ListItem";

export default {
  title: "List/ListItem",
  component: ListItem.type,
  argTypes: {
    leftContent: selectControl(Object.keys(internalIcons)),
    rightContent: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(ListItemSize)),
  },
};

const Template: Story<ListItemInterface<string>> = (props: any) => {
  const [selectedItems, setSelect] = useState<any>([]);
  const value = useMemo(() => ({ onChange: setSelect, selectedItems }), [selectedItems, setSelect]);

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <SelectedItemsManagerContextProvider value={value}>
        <ListItem {...props}>ValueByDefault</ListItem>
      </SelectedItemsManagerContextProvider>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: ListItemSize.MEDIUM,
  subTitle: "subTitle",
  code: "code",
};
