import React, { useMemo, useState } from "react";

import { DropdownManagerContext } from "./DropdownManagerContext";

export interface DropdownManagerProps {
  children: React.ReactNode;
}

const DropdownManager = function ({ children }: DropdownManagerProps) {
  const [selectedItem, setSelect] = useState<string | null>(null);
  const value = useMemo(() => ({ onChange: setSelect, selectedItem }), [selectedItem, setSelect]);

  return <DropdownManagerContext.Provider value={value}>{children}</DropdownManagerContext.Provider>;
};

export default React.memo(DropdownManager);
