import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import {
  bottom,
  horizontalPadding,
  left,
  position,
  right,
  top,
  transition,
  verticalPadding,
  zIndex,
} from "../../styles";
import { tableContext } from "./TableContext";
import { duration200 } from "../../constants/durations";

export interface TableCellInterface {
  styles?: any;
  children: React.ReactNode;
}

function TableCell({ styles, children }: TableCellInterface) {
  const { cellVerticalPadding, cellHorizontalPadding } = React.useContext(tableContext);

  return (
    <Wrapper
      as="td"
      styles={[
        verticalPadding(cellVerticalPadding),
        horizontalPadding(cellHorizontalPadding),
        position("relative"),
        styles,
      ]}
    >
      {children}
      <Wrapper
        className="table-cell-background"
        styles={[
          transition(`background-color ${duration200}`),
          position("absolute"),
          left(0),
          top(0),
          right(0),
          bottom(0),
          zIndex(-1),
        ]}
      />
    </Wrapper>
  );
}

export default observer(TableCell);
