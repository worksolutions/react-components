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
  verticalMargin?: number;
  horizontalMargin?: number;
}

function ListItemsDivider({
  styles,
  verticalMargin: verticalMarginProp = 0,
  horizontalMargin: horizontalMarginProp = 8,
}: ListItemsDividerInterface) {
  return (
    <Wrapper
      styles={[
        flexValue(1),
        flexShrink(0),
        verticalMarginProp ? verticalMargin(verticalMarginProp) : null,
        horizontalMarginProp ? horizontalMargin(horizontalMarginProp) : null,
        height(1),
        minHeight(1),
        backgroundColor("definitions.ListItemsDivider.backgroundColor"),
        styles,
      ]}
    />
  );
}

export default React.memo(ListItemsDivider);
