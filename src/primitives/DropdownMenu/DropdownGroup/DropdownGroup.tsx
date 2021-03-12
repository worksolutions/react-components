import React, { useContext, useMemo } from "react";
import { useEffectSkipFirst } from "@worksolutions/react-utils";

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

  useEffectSkipFirst(() => {
    if (!onChange) return;
    onChange(null);
  }, [isHoveredItems, onChange]);

  const value = useMemo(() => ({ isHoveredItems }), [isHoveredItems]);

  return (
    <DropdownGroupContext.Provider value={value}>
      <Wrapper styles={[fullWidth, padding(8), styles]}>{children}</Wrapper>
    </DropdownGroupContext.Provider>
  );
}

export default React.memo(DropdownGroup);
