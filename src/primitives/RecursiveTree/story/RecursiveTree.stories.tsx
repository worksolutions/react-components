import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { width } from "styles";

import RecursiveTree, { RecursiveTreeInterface } from "../index";
import { injectLevelToRecursiveTreeItems, injectParentIdToRecursiveTreeItems } from "../RenderItem/libs";

export default {
  title: "Recursive tree",
  component: RecursiveTree.type,
};

const Template: Story<RecursiveTreeInterface> = ({ activeIds: activeIdsProp, ...other }) => {
  const [activeIds, setActiveIds] = React.useState(activeIdsProp);
  return (
    <RecursiveTree
      activeIds={activeIds}
      {...other}
      styles={[width(200), other.styles]}
      onChange={(...args) => {
        setActiveIds(args[0]);
        other.onChange(...args);
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  activeIds: ["2"],
  items: injectParentIdToRecursiveTreeItems(
    injectLevelToRecursiveTreeItems([
      {
        id: "1",
        text: "One",
      },
      {
        id: "2",
        text: "Two",
        icon: "arrow-left-long",
        items: [
          { id: "3", text: "three" },
          { id: "4", text: "four" },
        ],
      },
    ]),
  ),
};
