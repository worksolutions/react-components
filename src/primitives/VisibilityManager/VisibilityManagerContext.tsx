import React from "react";

import { VisibilityManagerContextInterface } from "./types";

export const VisibilityManagerContext = React.createContext<VisibilityManagerContextInterface>({
  visible: false,
  show: () => throwMethodError("show"),
  hide: () => throwMethodError("hide"),
  toggle: () => throwMethodError("toggle"),
});

function throwMethodError(methodName: string) {
  throw new Error(`Метод ${methodName}() не определен в контексте VisibilityManagerContext`);
}
