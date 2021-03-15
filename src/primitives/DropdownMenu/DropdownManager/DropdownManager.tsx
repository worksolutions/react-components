import React, { useMemo, useState } from "react";

import { DropdownManagerContext } from "./DropdownManagerContext";

export interface DropdownManagerInterface {
  children: React.ReactNode;
}

const DropdownManager = function ({ children }: DropdownManagerInterface) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const value = useMemo(() => ({ onChange: setSelectedItem, selectedItem }), [selectedItem, setSelectedItem]);

  return <DropdownManagerContext.Provider value={value}>{children}</DropdownManagerContext.Provider>;
};

export default React.memo(DropdownManager);
