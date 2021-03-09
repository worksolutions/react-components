import React from "react";

export interface DropdownManagerContextInterface {
  onChange: (code: string) => void;
  selectedItem: string | null;
}

export const DropdownManagerContext = React.createContext({} as DropdownManagerContextInterface);
