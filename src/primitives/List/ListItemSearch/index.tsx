import React from "react";

import Input, { InputInterface } from "../../Input/Input";
import { InputContainerSize } from "../../InputContainer/enums";
import { backgroundColor, emptyBoxShadow } from "../../../styles";

export interface ListItemSearchInterface extends InputInterface {}

function ListItemSearch({
  size = InputContainerSize.MEDIUM,
  rightIcon = "search-big",
  styles,
  ...props
}: ListItemSearchInterface) {
  return (
    <Input
      {...props}
      size={size}
      rightIcon={rightIcon}
      styles={[backgroundColor("definitions.ListItemSearch.backgroundColor"), emptyBoxShadow, styles]}
    />
  );
}

export default React.memo(ListItemSearch);
