import React from "react";
import { Story } from "@storybook/react/types-6-0";

import List, { ListInterface } from "../index";
import { ListItemSize } from "../ListItem/enum";

export default {
  title: "List",
  // @ts-ignore
  component: List.type,
};

const DefaultTemplate: Story<ListInterface<any>> = (props) => {
  return <List {...props} />;
};

export const Default = DefaultTemplate.bind({});

Default.args = {
  items: [
    { code: "1", title: "List item 1", size: ListItemSize.SMALL },
    { code: "2", title: "List item 2", size: ListItemSize.SMALL },
    { code: "3", title: "List item 3", size: ListItemSize.SMALL },
  ],
};
