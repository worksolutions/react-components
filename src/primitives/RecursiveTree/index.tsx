import React from "react";
import { child, flex, flexColumn, flexGrow, flexShrink, lastChild, marginBottom } from "../../styles";

import Wrapper from "../Wrapper";

import renderItem, { RecursiveTreeItem, RecursiveTreeItemHandlers } from "./RenderItem";

export interface RecursiveTreeInterface extends RecursiveTreeItemHandlers {
  styles?: any;
  items: RecursiveTreeItem[];
  activeIds: string[];
  useItemInnerPadding?: boolean;
  openWhenSubChildSelected?: boolean;
}

function RecursiveTree({
  styles,
  items,
  activeIds,
  onChange,
  useItemInnerPadding = true,
  openWhenSubChildSelected = false,
}: RecursiveTreeInterface) {
  const render = renderItem({ activeIds, onChange, useItemInnerPadding, openWhenSubChildSelected });

  return (
    <Wrapper
      styles={[
        flex,
        flexColumn,
        flexShrink(0),
        flexGrow(0),
        child([flexShrink(0), flexGrow(0), marginBottom(4)]),
        lastChild([marginBottom(0)]),
        styles,
      ]}
    >
      {items.map((item) => render(item).element)}
    </Wrapper>
  );
}

export default React.memo(RecursiveTree);
