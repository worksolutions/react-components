import React, { useCallback, useMemo } from "react";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop, padding } from "../../styles";

import Wrapper from "../Wrapper";
import { ListSelectedManagerContext } from "./ListSelectedManagerContext";
import { CODE } from "./ListItem";
import { removeItemByIndex } from "../../utils/removeItemByIndex";

export interface ListInterface {
  outerStyles?: any;
  multiselect?: boolean;
  children: React.ReactNode;
  selectedItems: CODE[];
  onChange?: React.Dispatch<React.SetStateAction<CODE[]>>;
}

function List({ children, outerStyles, multiselect = false, selectedItems, onChange }: ListInterface) {
  const setSelectedItems = useCallback(
    (code: CODE) => {
      if (!onChange || !selectedItems) return;

      const foundIndex = selectedItems.indexOf(code);

      if (foundIndex === -1) {
        onChange((prevSelectedItems) => prevSelectedItems.concat(code));
        return;
      }
      onChange((prevSelectedItems) => removeItemByIndex(prevSelectedItems, foundIndex));
    },
    [selectedItems, onChange],
  );

  const value = useMemo(
    () => ({
      onChange: (code: CODE) => (multiselect ? setSelectedItems(code) : onChange && onChange([code])),
      selectedItems,
    }),
    [multiselect, selectedItems, setSelectedItems, onChange],
  );

  return (
    <ListSelectedManagerContext.Provider value={value}>
      <Wrapper
        styles={[flex, flexColumn, padding(8), outerStyles, firstChild(marginTop(4)), lastChild(marginBottom(4))]}
      >
        {children}
      </Wrapper>
    </ListSelectedManagerContext.Provider>
  );
}

export default React.memo(List);
