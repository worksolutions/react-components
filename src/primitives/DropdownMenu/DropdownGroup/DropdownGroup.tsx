import React, { useMemo } from "react";

import Wrapper from "../../Wrapper";

import { DropdownGroupContext } from "./DropdownGroupContext";
import { fullWidth } from "../../../styles";

export interface DropdownGroupProps {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
  isHoveredItems?: boolean;
}

function DropdownGroup({ children, styles, isHoveredItems = false }: DropdownGroupProps) {
  const value = useMemo(() => ({ isHoveredItems }), [isHoveredItems]);

  return (
    <DropdownGroupContext.Provider value={value}>
      <Wrapper styles={[fullWidth, styles]}>{children}</Wrapper>
    </DropdownGroupContext.Provider>
  );
}

export default React.memo(DropdownGroup);
