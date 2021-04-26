import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import { position } from "../../styles";

export interface TableRowInterface {
  styles?: any;
  children: React.ReactNode;
}

function TableRow({ styles, children }: TableRowInterface) {
  return (
    <Wrapper as="tr" styles={[position("relative"), styles]}>
      {children}
    </Wrapper>
  );
}

export default observer(TableRow);
