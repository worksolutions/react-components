import React, { useContext } from "react";

export interface ListContextInterface<CODE extends string | number> {
  readonly alreadyInUse?: boolean;
  selectedItemCodes: CODE[];
  onChange: (code: CODE) => void;
}

const defaultContextValue = {
  selectedItemCodes: [],
  alreadyInUse: false,
  onChange: () => {
    throw new Error("onChange не определен в контексте ListContext");
  },
};

export const ListContext = React.createContext<ListContextInterface<any>>(defaultContextValue);

export function useListContext() {
  return useContext(ListContext);
}
