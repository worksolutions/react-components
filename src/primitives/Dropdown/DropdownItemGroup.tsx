import React from "react";

import {
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  elevation16Raw,
  maxHeight,
  overflowY,
  padding,
} from "../../index";

import Wrapper from "../Wrapper";

export interface DropdownItemGroupProps {
  children: JSX.Element[] | JSX.Element;
  styles?: any;
}

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
        maxHeight(480),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default React.memo(DropdownItemGroup);
