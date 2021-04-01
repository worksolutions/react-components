import React from "react";

import Input, { InputInterface } from "../../Input/Input";
import { InputContainerSize } from "../../InputContainer/enums";
import { backgroundColor, emptyBoxShadow, hover } from "../../../styles";
import ListItemsDivider from "../ListItemsDivider";

export interface ListItemSearchInterface extends InputInterface {
  withDivider?: boolean;
}

function ListItemSearch({
  size = InputContainerSize.LARGE,
  rightIcon = "search-big",
  styles,
  withDivider = true,
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
          styles,
        ]}
      />
      {withDivider && <ListItemsDivider horizontalPadding verticalPadding={false} />}
    </>
  );
}

export default React.memo(ListItemSearch);
