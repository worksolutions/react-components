import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import {
  backgroundColor,
  borderLeftRadius,
  borderRightRadius,
  child,
  firstChild,
  hover,
  lastChild,
} from "../../styles";

export interface TableBodyInterface {
  styles?: any;
  children: React.ReactNode;
}

function TableBody({ styles, children }: TableBodyInterface) {
  return (
    <Wrapper
      as="tbody"
      styles={[
        child(
          [
            firstChild(child(borderLeftRadius(4), ".table-cell-background")),
            lastChild(child(borderRightRadius(4), ".table-cell-background")),
            hover(backgroundColor("gray-blue/01"), ".table-cell-background"),
          ],
          "tr",
        ),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default observer(TableBody);
