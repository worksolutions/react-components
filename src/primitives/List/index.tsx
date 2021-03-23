import React from "react";

import Wrapper from "../Wrapper";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop, padding } from "../../styles";

export interface ListInterface {
  children?: React.ReactNode;
  styles?: any;
}

function List({ children, styles }: ListInterface) {
  return (
    <Wrapper styles={[flex, flexColumn, padding(8), styles, firstChild(marginTop(0)), lastChild(marginBottom(0))]}>
      {children}
    </Wrapper>
  );
}

export default React.memo(List);
