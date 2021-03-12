import React from "react";

import Wrapper from "../../Wrapper";

import { fullWidth, padding } from "../../../styles";

export interface DropdownGroupProps {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
  isHoveredItems?: boolean;
}

function List({ children, styles, isHoveredItems = false }: DropdownGroupProps) {
  return <Wrapper styles={[fullWidth, padding(8), styles]}>{children}</Wrapper>;
}

export default React.memo(List);
