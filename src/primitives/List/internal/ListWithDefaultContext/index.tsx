import React, { useCallback, useMemo } from "react";
import { useEffectSkipFirst } from "@worksolutions/react-utils";
import { remove } from "ramda";

import SelectedItemsManagerContextProvider from "../../ListContext/ListContextProvider";
import { ListInterface } from "../../index";
import ListWrapper from "../ListWrapper";

function ListWithDefaultContext<CODE extends string | number>({
  selectedItemCodes,
  multiselect,
  children,
  outerStyles,
  setSelectedItemCodes,
}: ListInterface<CODE>) {
  const multiselectOnChange = useCallback(
    (code: CODE) => {
      if (!setSelectedItemCodes) return;

      const foundIndex = selectedItemCodes.indexOf(code);
      setSelectedItemCodes(
        foundIndex === -1 ? selectedItemCodes.concat(code) : remove(foundIndex, 1, selectedItemCodes),
      );
    },
    [selectedItemCodes, setSelectedItemCodes],
  );

  const singleOnChange = useCallback(
    (code: CODE) => {
      if (!setSelectedItemCodes) return;

      setSelectedItemCodes([code]);
    },
    [setSelectedItemCodes],
  );

  const value = useMemo(
    () => ({
      selectedItemCodes,
      onChange: (code: CODE) => (multiselect ? multiselectOnChange(code) : singleOnChange(code)),
    }),
    [selectedItemCodes, multiselect, multiselectOnChange, singleOnChange],
  );

  useEffectSkipFirst(() => {
    if (setSelectedItemCodes) setSelectedItemCodes([]);
  }, [multiselect, setSelectedItemCodes]);

  return (
    <SelectedItemsManagerContextProvider value={value}>
      <ListWrapper outerStyles={outerStyles}>{children}</ListWrapper>
    </SelectedItemsManagerContextProvider>
  );
}

export default ListWithDefaultContext;
