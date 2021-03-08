import React from "react";

export interface VisibleManagerContextInterface {
  closeHandler: () => void;
}

export const VisibleManagerContext = React.createContext<VisibleManagerContextInterface>({ closeHandler: () => {} });
