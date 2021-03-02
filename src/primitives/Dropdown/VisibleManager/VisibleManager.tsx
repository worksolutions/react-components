import React, { useCallback, useState } from "react";
import { Manager } from "react-popper";

import Wrapper from "primitives/Wrapper";

import { VisibleManagerContext } from "./VisibleManagerContext";
import OutsideHandler from "./OutsideHandler";

export interface ManagerProps {
  children: (visible: boolean, toggleVisible: () => void) => JSX.Element;
  outsideHandler: boolean;
}

const VisibleManager = function ({ children, outsideHandler }: ManagerProps) {
  const [dropdownElement, setDropdownElement] = useState(null);
  const [visible, setVisibility] = useState(false);

  const toggleVisible = useCallback(() => setVisibility(!visible), [visible]);
  const closeHandler = useCallback(() => setVisibility(false), [setVisibility]);

  return (
    <Manager>
      <VisibleManagerContext.Provider value={{ closeHandler }}>
        {outsideHandler ? (
          <OutsideHandler onHandler={closeHandler} observableElement={dropdownElement}>
            <Wrapper ref={setDropdownElement}>{children(visible, toggleVisible)}</Wrapper>
          </OutsideHandler>
        ) : (
          <Wrapper ref={setDropdownElement}>{children(visible, toggleVisible)}</Wrapper>
        )}
      </VisibleManagerContext.Provider>
    </Manager>
  );
};

export default React.memo(VisibleManager);
