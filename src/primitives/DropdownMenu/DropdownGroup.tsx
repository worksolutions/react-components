import React from "react";

import Wrapper from "../Wrapper";

export interface DropdownGroupProps {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
}

function DropdownGroup({ children, styles }: DropdownGroupProps) {
  return <Wrapper styles={[styles]}>{children}</Wrapper>;
}

export default React.memo(DropdownGroup);
