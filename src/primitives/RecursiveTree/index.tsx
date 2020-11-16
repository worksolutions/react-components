import React from "react";
import { child, flex, flexColumn, lastChild, marginBottom } from "../../styles";

import Wrapper from "../Wrapper";

import renderItem, { RecursiveTreeItem, RecursiveTreeItemHandlers } from "./RenderItem";

export interface RecursiveTreeInterface extends RecursiveTreeItemHandlers {
  styles?: any;
  items: RecursiveTreeItem[];
  activeIds: Array<number>;
  useItemInnerPadding?: boolean;
}

function RecursiveTree({ styles, items, activeIds, onChange, useItemInnerPadding = true }: RecursiveTreeInterface) {
  const render = renderItem({ activeIds, onChange, useItemInnerPadding });

  return (
    <Wrapper styles={[flex, flexColumn, child([marginBottom(4)]), lastChild([marginBottom(0)]), styles]}>
      {items.map((item) => render(item).element)}
    </Wrapper>
  );
}

export default React.memo(RecursiveTree);
