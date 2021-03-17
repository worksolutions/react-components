import React, { useCallback, useMemo } from "react";

import SelectedItemsManagerContextProvider from "../ListContext";
import { ListInterface } from "../index";
import ListWrapper from "../ListWrapper";

import { removeItemByIndex } from "../../../utils/removeItemByIndex";

function ListWithDefaultContext<CODE extends string | number>({
  selectedItems,
  multiselect,
  children,
  outerStyles,
  setSelectedItems,
}: ListInterface<CODE>) {
  const multiselectOnChange = useCallback(
    (code: CODE) => {
      if (!setSelectedItems) return;
      const foundIndex = selectedItems.indexOf(code);
      setSelectedItems(foundIndex === -1 ? selectedItems.concat(code) : removeItemByIndex(selectedItems, foundIndex));
    },
    [selectedItems, setSelectedItems],
  );

  const singleOnChange = useCallback(
    (code: CODE) => {
      if (!setSelectedItems) return;
      setSelectedItems([code]);
    },
    [setSelectedItems],
  );

  const value = useMemo(
    () => ({
      selectedItems,
      onChange: (code: CODE) => (multiselect ? multiselectOnChange(code) : singleOnChange(code)),
    }),
    [selectedItems, multiselect, multiselectOnChange, singleOnChange],
  );

  return (
    <SelectedItemsManagerContextProvider value={value}>
      <ListWrapper outerStyles={outerStyles}>{children}</ListWrapper>
    </SelectedItemsManagerContextProvider>
  );
}

export default ListWithDefaultContext;
