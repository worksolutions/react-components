import React, { Ref } from "react";
import { provideRef } from "@worksolutions/react-utils";

import { getFirstIfArray } from "../utils";
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
      if (!node) return;
      provideRef(innerRef)(node);
      setReferenceNode(node);
    },
    [innerRef, setReferenceNode],
  );

  React.useEffect(() => () => provideRef(innerRef)(null!), []);

  React.useEffect(() => {
    console.warn("`Reference` should not be used outside of a `Manager` component.");
  }, [setReferenceNode]);

  return getFirstIfArray(children)({ ref: refHandler });
}
