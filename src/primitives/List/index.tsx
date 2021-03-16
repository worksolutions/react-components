import React, { useCallback, useMemo, useState } from "react";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop, padding } from "../../styles";

import Wrapper from "../Wrapper";
import { ListSelectedManagerContext } from "./ListSelectedManagerContext";
import { removeItemByIndex } from "../../utils/removeItemByIndex";

import { CODE } from "./ListItem";

export interface ListInterface {
  outerStyles?: any;
  multiselect?: boolean;
  children: React.ReactNode;
}

function List({ children, outerStyles, multiselect = false }: ListInterface) {
  const [selectedItems, setSelectedItem] = useState<CODE[]>([]);

  const setSelectedItems = useCallback(
    (code: CODE) => {
      const foundIndex = selectedItems.indexOf(code);

      if (foundIndex === -1) {
        setSelectedItem((prevSelectedItems) => prevSelectedItems.concat(code));
        return;
      }
      setSelectedItem((prevSelectedItems) => removeItemByIndex(prevSelectedItems, foundIndex));
    },
    [selectedItems, setSelectedItem],
  );

  const value = useMemo(
    () => ({
      onChange: (code: CODE) => (multiselect ? setSelectedItems(code) : setSelectedItem([code])),
      selectedItems,
    }),
    [multiselect, selectedItems, setSelectedItems, setSelectedItem],
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
