import React from "react";

export interface DropdownGroupContextInterface {
  isHoveredItems?: boolean;
}

export const DropdownGroupContext = React.createContext({} as DropdownGroupContextInterface);
