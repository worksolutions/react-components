import * as React from "react";
import { Ref } from "react";
import { safeInvoke, setRef, unwrapArray } from "../utils";
import { ManagerReferenceNodeSetterContext } from "../Manager";

export type ReferenceChildrenProps = { ref: Ref<any> };
export type ReferenceProps = {
  children: (ReferenceChildrenProps: ReferenceChildrenProps) => React.ReactNode;
  innerRef?: Ref<any>;
};

export function Reference({ children, innerRef }: ReferenceProps) {
  const setReferenceNode = React.useContext(ManagerReferenceNodeSetterContext);

  const refHandler = React.useCallback(
    (node?: HTMLElement) => {
      setRef(innerRef, node);
      safeInvoke(setReferenceNode, node);
    },
    [innerRef, setReferenceNode],
  );

  // ran on unmount
  React.useEffect(() => () => setRef(innerRef, null!), []);

  React.useEffect(() => {
    console.warn("`Reference` should not be used outside of a `Manager` component.");
  }, [setReferenceNode]);

  return unwrapArray(children)({ ref: refHandler });
}
