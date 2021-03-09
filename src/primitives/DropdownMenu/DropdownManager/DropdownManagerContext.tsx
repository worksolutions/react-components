import React from "react";

export interface DropdownManagerContextInterface {
  selectedItem: string | null;
  hoveredItems: boolean;
  onChange: (code: string | null) => void;
}

export const DropdownManagerContext = React.createContext({} as DropdownManagerContextInterface);
