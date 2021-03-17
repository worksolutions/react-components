import React from "react";
import { CODE } from "./ListItem";

export interface ListSelectedManagerInterface {
  selectedItems: CODE[];
  onChange: (code: CODE) => void;
}

export const ListSelectedItemsManagerContext = React.createContext({
  selectedItems: [],
  onChange: () => {
    throw new Error("Нет onChange провайдера в ListSelectedItemsManagerContext");
  },
} as ListSelectedManagerInterface);
