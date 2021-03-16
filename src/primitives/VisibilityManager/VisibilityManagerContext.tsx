import React from "react";

export interface VisibilityManagerContextInterface {
  visibility: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export const VisibilityManagerContext = React.createContext<VisibilityManagerContextInterface>({
  visibility: false,
  show: () => {},
  hide: () => {},
  toggle: () => {},
});
