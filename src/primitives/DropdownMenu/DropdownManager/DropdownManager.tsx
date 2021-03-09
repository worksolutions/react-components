import React, { useMemo, useState } from "react";

import { DropdownManagerContext } from "./DropdownManagerContext";

export interface DropdownManagerProps {
  children: React.ReactNode;
  hoveredItems: boolean;
}

const DropdownManager = function ({ children, hoveredItems }: DropdownManagerProps) {
  const [selectedItem, setSelect] = useState<string | null>(null);
  const value = useMemo(() => ({ onChange: setSelect, selectedItem, hoveredItems }), [
    selectedItem,
    setSelect,
    hoveredItems,
  ]);

  return <DropdownManagerContext.Provider value={value}>{children}</DropdownManagerContext.Provider>;
};

export default React.memo(DropdownManager);
