import React, { useCallback, useMemo } from "react";

import { CODE } from "../ListItem";
import SelectedItemsManagerContextProvider from "../SelectedItemsManagerContext";
import { ListInterface } from "../index";
import ListWrapper from "../ListWrapper";

import { removeItemByIndex } from "../../../utils/removeItemByIndex";

function ListWithDefaultContext({
  selectedItems,
  multiselect,
  children,
  outerStyles,
  setSelectedItems,
}: ListInterface) {
  const onChange = useCallback(
    (code: CODE) => {
      if (!setSelectedItems) return;

      const foundIndex = selectedItems.indexOf(code);

      if (foundIndex === -1) {
        setSelectedItems(selectedItems.concat(code));
        return;
      }
      setSelectedItems(removeItemByIndex(selectedItems, foundIndex));
    },
    [selectedItems, setSelectedItems],
  );

  const value = useMemo(
    () => ({
      onChange: (code: CODE) => (multiselect ? onChange(code) : setSelectedItems && setSelectedItems([code])),
      selectedItems,
    }),
    [multiselect, selectedItems, setSelectedItems, onChange],
  );

  return (
    <SelectedItemsManagerContextProvider value={value}>
      <ListWrapper outerStyles={outerStyles}>{children}</ListWrapper>
    </SelectedItemsManagerContextProvider>
  );
}

export default React.memo(ListWithDefaultContext);
