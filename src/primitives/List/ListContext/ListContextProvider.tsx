import React, { useMemo } from "react";

import { ListContext, ListContextInterface } from "./useListContext";

export interface ListContextProviderInterface<CODE extends string | number> {
  value: Omit<ListContextInterface<CODE>, "alreadyInUse">;
  children: React.ReactNode;
}

function ListContextProvider<CODE extends string | number>({ value, children }: ListContextProviderInterface<CODE>) {
  const contextValue = useMemo(() => ({ ...value, alreadyInUse: true }), [value]);

  return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
}

export default ListContextProvider;
