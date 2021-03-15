import React, { useCallback, useMemo } from "react";
import { Manager as ReactPopperManager } from "react-popper";
import { useBoolean } from "@worksolutions/react-utils";

import Wrapper from "primitives/Wrapper";

import { VisibilityManagerContext } from "./VisibilityManagerContext";
import { HandleClickOutside } from "../../index";

export interface VisibleManagerProps {
  outsideHandler: boolean;
  children: (toggleVisibility: () => void, visibility: boolean) => React.ReactNode;
}

function VisibleManager({ children, outsideHandler }: VisibleManagerProps) {
  const [visibility, setVisibility, setNotVisibility] = useBoolean(false);

  const toggleVisibility = useCallback(() => (visibility ? setNotVisibility() : setVisibility()), [visibility]);

  const visibleManagerContextValue = useMemo(
    () => ({
      toggle: toggleVisibility,
      show: setVisibility,
      hide: setNotVisibility,
      visibility,
    }),
    [setNotVisibility, toggleVisibility, setNotVisibility, setVisibility],
  );

  return (
    <ReactPopperManager>
      <VisibilityManagerContext.Provider value={visibleManagerContextValue}>
        {outsideHandler ? (
          <HandleClickOutside onClickOutside={setNotVisibility}>
            {(ref) => <Wrapper ref={ref}>{children(toggleVisibility, visibility)}</Wrapper>}
          </HandleClickOutside>
        ) : (
          children(toggleVisibility, visibility)
        )}
      </VisibilityManagerContext.Provider>
    </ReactPopperManager>
  );
}

export default React.memo(VisibleManager);
