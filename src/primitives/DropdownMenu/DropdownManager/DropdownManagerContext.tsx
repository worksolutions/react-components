import React from "react";

export interface DropdownManagerContextInterface {
  onChange: (code: string) => void;
  selectItem: string;
}

export const DropdownManagerContext = React.createContext<DropdownManagerContextInterface>({
  onChange: (code: string) => {},
  selectItem: "",
});
