import React, { useCallback, useEffect, useMemo } from "react";
import { Manager } from "react-popper";

import Wrapper from "primitives/Wrapper";

import { VisibleManagerContext } from "./VisibleManagerContext";
import { HandleClickOutside } from "../../index";
import { useBoolean, useForceUpdate } from "@worksolutions/react-utils";

export interface VisibleManagerProps {
  outsideHandler: boolean;
  children: (visible: boolean, toggleVisible: () => void) => React.ReactNode;
}

const VisibleManager = function ({ children, outsideHandler }: VisibleManagerProps) {
  const [visible, setVisibility, setNotVisibility] = useBoolean(false);

  const toggleVisible = useCallback(() => (visible ? setNotVisibility() : setVisibility()), [visible]);
  const close = useCallback(() => setNotVisibility(), [setVisibility]);
  const value = useMemo(
    () => ({
      closeHandler: close,
    }),
    [close],
  );

  return (
    <Manager>
      <VisibleManagerContext.Provider value={value}>
        {outsideHandler ? (
          <HandleClickOutside onClickOutside={close}>
            {(ref) => <Wrapper ref={ref}>{children(visible, toggleVisible)}</Wrapper>}
          </HandleClickOutside>
        ) : (
          children(visible, toggleVisible)
        )}
      </VisibleManagerContext.Provider>
    </Manager>
  );
};

export default React.memo(VisibleManager);
