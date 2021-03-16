import React, { useMemo, useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "../../../storybook/storyHelpers";

import { left, ListItemSize, marginRight, position, top, transform, Wrapper } from "../../../index";

import DropdownItem, { DropdownItemProps } from "../DropdownItem/DropdownItem";
import { internalIcons } from "../../Icon/list";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

export default {
  title: "DropdownMenu/DropdownItem",
  component: DropdownItem.type,
  argTypes: {
    leftContent: selectControl(Object.keys(internalIcons)),
    rightContent: selectControl(Object.keys(internalIcons)),
    itemSize: selectControl(Object.values(ListItemSize)),
  },
};

const Template: Story<DropdownItemProps> = (props: any) => {
  const [selectedItem, setSelect] = useState<string | null>(null);
  const value = useMemo(() => ({ onChange: setSelect, selectedItem }), [selectedItem, setSelect]);

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropdownManagerContext.Provider value={value}>
        <DropdownItem {...props}>ValueByDefault</DropdownItem>
      </DropdownManagerContext.Provider>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  itemSize: ListItemSize.MEDIUM,
  subTitle: "subTitle",
  code: "code",
};
