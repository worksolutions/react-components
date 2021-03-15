import React from "react";

import Wrapper from "../../Wrapper";

import { fullWidth, padding } from "../../../styles";

export interface DropdownGroupProps {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
}

function List({ children, styles }: DropdownGroupProps) {
  return <Wrapper styles={[padding(8), styles]}>{children}</Wrapper>;
}

export default React.memo(List);
