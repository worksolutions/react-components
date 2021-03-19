import React from "react";

import { ListItemInterface } from "index";

import List from "../../../List";

interface SelectItemsContainerInterface<CODE extends string | number> {
  items: React.ReactElement[];
  selectedItemCodes: CODE[];
  onChange: (code: CODE) => void;
}

function SelectItemsContainer<CODE extends string | number>({
  items,
  onChange,
  selectedItemCodes,
}: SelectItemsContainerInterface<CODE>) {
  const cloneElement = (child: React.ReactElement<ListItemInterface<CODE>>, index: number) => {
    if (!React.isValidElement<React.ReactElement>(child)) return null;

    const selected = selectedItemCodes.includes(child.props.code);
    return React.cloneElement(child, {
      onChange,
      key: child.props.code ? child.props.code : index,
      selected,
    });
  };

  return <List>{items.map(cloneElement)}</List>;
}

export default React.memo(SelectItemsContainer) as <CODE extends string | number>(
  props: SelectItemsContainerInterface<CODE>,
) => JSX.Element;
