import React, { useContext, useMemo } from "react";

interface ListContextInterface<CODE extends string | number> {
  readonly alreadyInUse?: boolean;
  selectedItems: CODE[];
  onChange: (code: CODE) => void;
}

const defaultContextValue = {
  selectedItems: [],
  alreadyInUse: false,
  onChange: () => {
    throw new Error("onChange не определен в контексте ListContext");
  },
};

const ListContext = React.createContext<ListContextInterface<any>>(defaultContextValue);

interface ListContextProviderInterface<CODE extends string | number> {
  value: Omit<ListContextInterface<CODE>, "alreadyInUse">;
  children: React.ReactNode;
}

export function useListContext() {
  return useContext(ListContext);
}

function ListContextProvider<CODE extends string | number>({ value, children }: ListContextProviderInterface<CODE>) {
  const contextValue = useMemo(() => ({ ...value, alreadyInUse: true }), [value]);

  return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
}

export default ListContextProvider;
