import * as React from "react";

export const ManagerReferenceNodeContext: any = React.createContext({});
export const ManagerReferenceNodeSetterContext: any = React.createContext({});

export type ManagerProps = {
  children: React.ReactNode;
};

export function Manager({ children }: ManagerProps) {
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
