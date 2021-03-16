import React from "react";

export interface ListSelectedManagerInterface {
  selectedItems: string[];
  onChange: (code: string) => void;
}

export const ListSelectedManagerContext = React.createContext({
  selectedItems: [],
  onChange: () => {
    throw new Error("Нет onChange провайдера в ListSelectedManagerContext");
  },
} as ListSelectedManagerInterface);
