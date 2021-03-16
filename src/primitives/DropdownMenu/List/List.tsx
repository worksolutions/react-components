import React from "react";

import Wrapper from "../../Wrapper";

import { padding } from "../../../styles";

export interface DropdownGroupInterface {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
}

function List({ children, styles }: DropdownGroupInterface) {
  return <Wrapper styles={[padding(8), styles]}>{children}</Wrapper>;
}

export default React.memo(List);
