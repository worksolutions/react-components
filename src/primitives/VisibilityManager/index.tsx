import React, { useCallback, useMemo } from "react";
import { Manager as ReactPopperManager } from "react-popper";
import { useBoolean } from "@worksolutions/react-utils";

import Wrapper from "primitives/Wrapper";

import { VisibilityManagerContext } from "./VisibilityManagerContext";
import { HandleClickOutside } from "../../index";

export interface VisibilityManagerInterface {
  onClickOutside: boolean;
  children: (toggleVisibility: () => void, visibility: boolean) => React.ReactNode;
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
    <ReactPopperManager>
      <VisibilityManagerContext.Provider value={visibilityManagerContextValue}>
        {onClickOutside ? (
          <HandleClickOutside onClickOutside={hide}>
            {(ref) => <Wrapper ref={ref}>{children(toggle, visibility)}</Wrapper>}
          </HandleClickOutside>
        ) : (
          children(toggle, visibility)
        )}
      </VisibilityManagerContext.Provider>
    </ReactPopperManager>
  );
}

export default React.memo(VisibilityManager);
