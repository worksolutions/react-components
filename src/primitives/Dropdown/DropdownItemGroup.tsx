import React from "react";

import {
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  elevation16Raw,
  maxHeight,
  maxWidth,
  overflowY,
  padding,
} from "../../index";

import Wrapper from "../Wrapper";

export interface DropdownItemGroupProps {
  children: JSX.Element[] | JSX.Element;
  styles?: any;
}

const maxSizeDropdownItemGroup = 480;

function DropdownItemGroup({ children, styles }: DropdownItemGroupProps) {
  return (
    <Wrapper
      styles={[
        border(1, "gray-blue/01", "solid"),
        backgroundColor("white"),
        boxShadow(...elevation16Raw, [0, 0, 0, 1, "gray-blue/02"]),
        borderRadius(6),
        padding(8),
        overflowY("scroll"),
        maxHeight(maxSizeDropdownItemGroup),
        maxWidth(maxSizeDropdownItemGroup),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default React.memo(DropdownItemGroup);
