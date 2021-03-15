import React from "react";

export interface DropdownManagerContextInterface {
  selectedItem: string | null;
  onChange: (code: string | null) => void;
}

export const DropdownManagerContext = React.createContext({
  selectedItem: null,
  onChange: () => {
    throw new Error("Нет onChange провайдера в DropdownManagerContext");
  },
} as DropdownManagerContextInterface);
