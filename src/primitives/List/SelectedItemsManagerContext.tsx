import React, { useContext, useMemo } from "react";

import { CODE } from "./ListItem";

interface SelectedItemsManagerContextInterface {
  readonly alreadyInUse?: boolean;
  selectedItems: CODE[];
  onChange: (code: CODE) => void;
}

const contextValue = {
  selectedItems: [],
  alreadyInUse: false,
  onChange: () => {
    throw new Error("Нет onChange провайдера в SelectedItemsManagerContext");
  },
};

const SelectedItemsManagerContext = React.createContext<SelectedItemsManagerContextInterface>(contextValue);

interface SelectedItemsManagerContextProviderInterface {
  value: Omit<SelectedItemsManagerContextInterface, "alreadyInUse">;
  children: React.ReactNode;
}

export function useSelectedItemsManagerContext(): SelectedItemsManagerContextInterface {
  return useContext(SelectedItemsManagerContext);
}

function SelectedItemsManagerContextProvider({ value, children }: SelectedItemsManagerContextProviderInterface) {
  const contextValue = useMemo(() => ({ ...value, alreadyInUse: true }), [value]);

  return <SelectedItemsManagerContext.Provider value={contextValue}>{children}</SelectedItemsManagerContext.Provider>;
}

export default React.memo(SelectedItemsManagerContextProvider);
