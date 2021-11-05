import React from "react";
import { useMountedState } from "react-use";

export const ManagerReferenceNodeContext = React.createContext<HTMLElement>(null!);
export const ManagerReferenceNodeSetterContext = React.createContext<(elem: HTMLElement) => void>(null!);

export function Manager({ children }: React.PropsWithChildren<{}>) {
  const [referenceNode, setReferenceNode] = React.useState<HTMLElement>(null!);
  const isMounted = useMountedState();

  const handleSetReferenceNode = React.useCallback((node) => isMounted() && setReferenceNode(node), [isMounted]);

  return (
    <ManagerReferenceNodeContext.Provider value={referenceNode}>
      <ManagerReferenceNodeSetterContext.Provider value={handleSetReferenceNode}>
        {children}
      </ManagerReferenceNodeSetterContext.Provider>
    </ManagerReferenceNodeContext.Provider>
  );
}
