import React from "react";

import Wrapper from "../../Wrapper";

import { backgroundColor, fullWidth, height, verticalMargin } from "../../../styles";

export interface ListItemsDividerInterface {
  styles?: any;
}

function ListItemsDivider({ styles }: ListItemsDividerInterface) {
  return (
    <Wrapper
      styles={[
        fullWidth,
        verticalMargin(4),
        height(1),
        backgroundColor("definitions.ListItemsDivider.backgroundColor"),
        styles,
      ]}
    />
  );
}

export default React.memo(ListItemsDivider);
