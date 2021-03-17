import React from "react";

import { useSelectedItemsManagerContext } from "./SelectedItemsManagerContext";
import { CODE } from "./ListItem";
import ListWithDefaultContext from "./ListWithDefaultContext";
import ListWrapper from "./ListWrapper";

export interface ListInterface {
  outerStyles?: any;
  multiselect?: boolean;
  children?: React.ReactNode;
  selectedItems: CODE[];
  setSelectedItems?: (...args: any) => any;
}

function List(props: ListInterface) {
  const context = useSelectedItemsManagerContext();

  if (context.alreadyInUse) return <ListWrapper outerStyles={props.outerStyles}>{props.children}</ListWrapper>;
  return <ListWithDefaultContext {...props} />;
}

export default React.memo(List);
