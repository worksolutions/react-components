import React from "react";

import Wrapper from "../../../Wrapper";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop, padding } from "../../../../styles";

interface ListWrapperInterface {
  children?: React.ReactNode;
  outerStyles?: any;
}

function ListWrapper({ children, outerStyles }: ListWrapperInterface) {
  return (
    <Wrapper styles={[flex, flexColumn, padding(8), outerStyles, firstChild(marginTop(4)), lastChild(marginBottom(4))]}>
      {children}
    </Wrapper>
  );
}

export default React.memo(ListWrapper);
