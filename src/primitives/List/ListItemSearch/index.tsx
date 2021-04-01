import React from "react";

import Input, { InputInterface } from "../../Input/Input";
import { InputContainerSize } from "../../InputContainer/enums";
import { backgroundColor, emptyBoxShadow, hover, focus } from "../../../styles";

export interface ListItemSearchInterface extends InputInterface {
  withDivider?: boolean;
}

function ListItemSearch({
  size = InputContainerSize.LARGE,
  rightIcon = "search-big",
  styles,
  ...props
}: ListItemSearchInterface) {
  return (
    <>
      <Input
        {...props}
        size={size}
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
