import React from "react";

import ListWithDefaultContext from "./internal/ListWithDefaultContext";
import ListWrapper from "./internal/ListWrapper";
import { useListContext } from "./ListContext/useListContext";

export interface ListInterface<CODE extends string | number> {
  outerStyles?: any;
  multiselect?: boolean;
  children?: React.ReactNode;
  selectedItemCodes: CODE[];
  setSelectedItemCodes?: (codes: CODE[]) => void;
}

function List<CODE extends string | number>(props: ListInterface<CODE>) {
  const context = useListContext();

  if (context.alreadyInUse) return <ListWrapper outerStyles={props.outerStyles}>{props.children}</ListWrapper>;
  return <ListWithDefaultContext {...props} />;
}

export default React.memo(List) as <CODE extends string | number>(props: ListInterface<CODE>) => JSX.Element;
