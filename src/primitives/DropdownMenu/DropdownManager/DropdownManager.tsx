import React, { useState } from "react";

import { DropdownManagerContext } from "./DropdownManagerContext";

export interface DropdownManagerProps {
  children: JSX.Element;
}

const DropdownManager = function ({ children }: DropdownManagerProps) {
  const [selectItem, setItem] = useState("");

  return (
    <DropdownManagerContext.Provider value={{ onChange: setItem, selectItem }}>
      {children}
    </DropdownManagerContext.Provider>
  );
};

export default React.memo(DropdownManager);
