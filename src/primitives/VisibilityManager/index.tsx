import React, { useCallback, useMemo } from "react";
import { useBoolean } from "@worksolutions/react-utils";

import Wrapper from "primitives/Wrapper";

import { VisibilityManagerContext } from "./VisibilityManagerContext";
import { HandleClickOutside } from "../../index";

export interface VisibilityManagerChildrenInterface {
  visibility: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface VisibilityManagerInterface {
  onClickOutside: boolean;
  children: ({ visibility, show, hide, toggle }: VisibilityManagerChildrenInterface) => React.ReactNode;
}

function VisibilityManager({ children, onClickOutside }: VisibilityManagerInterface) {
  const [visibility, show, hide] = useBoolean(false);

  const toggle = useCallback(() => (visibility ? hide() : show()), [hide, show, visibility]);

  const visibilityManagerContextValue = useMemo(
    () => ({
      toggle,
      show,
      hide,
      visibility,
    }),
    [toggle, show, hide, visibility],
  );

  return (
    <VisibilityManagerContext.Provider value={visibilityManagerContextValue}>
      {onClickOutside ? (
        <HandleClickOutside onClickOutside={hide}>
          {(ref) => <Wrapper ref={ref}>{children({ visibility, show, hide, toggle })}</Wrapper>}
        </HandleClickOutside>
      ) : (
        children({ visibility, show, hide, toggle })
      )}
    </VisibilityManagerContext.Provider>
  );
}

export default React.memo(VisibilityManager);
