import React from "react";

export const ManagerReferenceNodeContext = React.createContext<HTMLElement>(null!);
export const ManagerReferenceNodeSetterContext = React.createContext<(elem: HTMLElement) => void>(null!);

export function Manager({ children }: React.PropsWithChildren<{}>) {
  const [referenceNode, setReferenceNode] = React.useState<any>(null);

  const hasUnmounted = React.useRef(false);
  React.useEffect(() => {
    return () => {
      hasUnmounted.current = true;
    };
  }, []);

  const handleSetReferenceNode = React.useCallback((node) => {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);

  return (
    <ManagerReferenceNodeContext.Provider value={referenceNode}>
      <ManagerReferenceNodeSetterContext.Provider value={handleSetReferenceNode}>
        {children}
      </ManagerReferenceNodeSetterContext.Provider>
    </ManagerReferenceNodeContext.Provider>
  );
}
