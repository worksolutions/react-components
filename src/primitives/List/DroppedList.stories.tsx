import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import { ListItemId } from "./index";
import DroppedList, { DroppedListInterface, DroppedListOpenMode } from "./DroppedList";

import Button, { ButtonSize, ButtonType } from "../Button";

export default {
  title: "DroppedList",
  component: DroppedList,
  decorators: [storybookWrapper],
};

const Template: Story<DroppedListInterface<any>> = (props) => {
  const [droppedItem, setDroppedItem] = React.useState<ListItemId>();

  return (
    <DroppedList {...props} selectedItemIds={[droppedItem]} onChange={(code) => setDroppedItem(code)}>
      {(state, parentRef, subChild) => (
        <Button
          ref={parentRef}
          className="card-actions"
          type={ButtonType.ICON}
          size={ButtonSize.SMALL}
          iconLeft="kebab-horizontal"
          onClick={state.toggle}
        >
          {subChild}
        </Button>
      )}
    </DroppedList>
  );
};

export const Default = Template.bind({});

Default.args = {
  mode: DroppedListOpenMode.HOVER,
  margin: 4,
  items: [
    { title: "по новизне", code: "new" },
    { title: "по дате создания", code: "date" },
  ],
};
