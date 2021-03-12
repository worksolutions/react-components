import React, { useContext, useEffect, useMemo } from "react";

import Wrapper from "../../Wrapper";

import { DropdownGroupContext } from "./DropdownGroupContext";
import { fullWidth, padding } from "../../../styles";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

export interface DropdownGroupProps {
  children: React.ReactNode[] | React.ReactNode;
  styles?: any;
  isHoveredItems?: boolean;
}

function DropdownGroup({ children, styles, isHoveredItems = false }: DropdownGroupProps) {
  const { onChange } = useContext(DropdownManagerContext);

  useEffect(() => onChange(null), [isHoveredItems]);

  const value = useMemo(() => ({ isHoveredItems }), [isHoveredItems]);

  return (
    <DropdownGroupContext.Provider value={value}>
      <Wrapper styles={[fullWidth, padding(8), styles]}>{children}</Wrapper>
    </DropdownGroupContext.Provider>
  );
}

export default React.memo(DropdownGroup);
