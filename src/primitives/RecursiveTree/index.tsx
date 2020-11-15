import React from "react";

import Wrapper from "../Wrapper";

import renderItem, { RecursiveTreeItem, RecursiveTreeItemHandlers } from "./RenderItem";

type RecursiveTreeProps = {
  styles?: any;
  items: RecursiveTreeItem[];
  activeIds: Array<number>;
} & RecursiveTreeItemHandlers;

function RecursiveTree({ styles, items, activeIds, onChange }: RecursiveTreeProps) {
  const render = renderItem({
    activeIds,
    onChange,
  });

  return <Wrapper styles={styles}>{items.map((item) => render(item).element)}</Wrapper>;
}

export default React.memo(RecursiveTree);
