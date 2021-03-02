import Wrapper from "primitives/Wrapper";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Manager } from "react-popper";
import { VisibleManagerContext } from "./VisibleManagerContext";

export interface ManagerProps {
  children: (visible: boolean, toggleVisible: () => void) => JSX.Element;
}

const VisibleManager = function ({ children }: ManagerProps) {
  const [dropdownElement, setDropdownElement] = useState();
  const [visible, setVisibility] = useState(false);

  const toggleVisible = useCallback(() => setVisibility(!visible), [visible]);
  const closeHandler = useCallback(() => setVisibility(false), [setVisibility]);

  const handleClickOutside = (e: any) => {
    const nodePopper = ReactDOM.findDOMNode(dropdownElement);

    if (!nodePopper || !nodePopper.contains(e.target)) {
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [dropdownElement]);

  return (
    <Manager>
      <VisibleManagerContext.Provider value={{ closeHandler }}>
        <Wrapper ref={setDropdownElement}>{children(visible, toggleVisible)}</Wrapper>
      </VisibleManagerContext.Provider>
    </Manager>
  );
};

export default React.memo(VisibleManager);
