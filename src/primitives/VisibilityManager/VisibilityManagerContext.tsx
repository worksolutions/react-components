import React from "react";

export interface VisibilityManagerContextInterface {
  visibility: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export const VisibilityManagerContext = React.createContext<VisibilityManagerContextInterface>({
  visibility: false,
  show: () => {
    throw new Error("Нет show() провайдера в VisibilityManagerContext");
  },
  hide: () => {
    throw new Error("Нет hide() провайдера в VisibilityManagerContext");
  },
  toggle: () => {
    throw new Error("Нет toggle() провайдера в VisibilityManagerContext");
  },
});
