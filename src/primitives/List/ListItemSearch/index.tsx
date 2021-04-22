import React from "react";

import Input, { InputInterface } from "../../Input/Input";
import { backgroundColor, emptyBoxShadow, hover, focus } from "../../../styles";
import { ListItemSize } from "../ListItem/enum";
import { InputContainerSize } from "../../InputContainer/enums";

export interface ListItemSearchInterface extends Omit<InputInterface, "size"> {
  size?: ListItemSize;
  withDivider?: boolean;
}

const matchListItemSizesAndInputContainerSizes: Record<ListItemSize, InputContainerSize> = {
  [ListItemSize.SMALL]: InputContainerSize.LARGE,
  [ListItemSize.MEDIUM]: InputContainerSize.LARGE,
  [ListItemSize.LARGE]: InputContainerSize.LARGE,
};

function ListItemSearch({
  size = ListItemSize.MEDIUM,
  rightIcon = "search-big",
  styles,
  ...props
}: ListItemSearchInterface) {
  return (
    <>
      <Input
        {...props}
        size={matchListItemSizesAndInputContainerSizes[size]}
        rightIcon={rightIcon}
        styles={[
          backgroundColor("definitions.ListItemSearch.backgroundColor"),
          emptyBoxShadow,
          hover(emptyBoxShadow),
          focus(emptyBoxShadow),
          styles,
        ]}
      />
    </>
  );
}

export default React.memo(ListItemSearch);
