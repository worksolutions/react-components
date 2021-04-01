import React from "react";

import Wrapper from "../../Wrapper";

import {
  backgroundColor,
  flexShrink,
  flexValue,
  height,
  horizontalMargin,
  minHeight,
  verticalMargin,
} from "../../../styles";

export interface ListItemsDividerInterface {
  styles?: any;
  verticalPadding?: boolean;
  horizontalPadding?: boolean;
}

function ListItemsDivider({ styles, verticalPadding = true, horizontalPadding }: ListItemsDividerInterface) {
  return (
    <Wrapper
      styles={[
        flexValue(1),
        flexShrink(0),
        verticalPadding && verticalMargin(4),
        horizontalPadding && horizontalMargin(8),
        height(1),
        minHeight(1),
        backgroundColor("definitions.ListItemsDivider.backgroundColor"),
        styles,
      ]}
    />
  );
}

export default React.memo(ListItemsDivider);
