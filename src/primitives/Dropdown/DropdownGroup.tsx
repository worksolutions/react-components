import React, { FC } from "react";

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

export interface DropdownGroupProps {
  children: JSX.Element[] | JSX.Element;
  styles?: any;
  topElement?: FC<any> | React.ReactNode;
  bottomElement?: FC<any> | React.ReactNode;
}

const maxSizeDropdownItemGroup = 480;

function DropdownGroup({ topElement, children, styles, bottomElement }: DropdownGroupProps) {
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
      {topElement}
      {children}
      {bottomElement}
    </Wrapper>
  );
}

export default React.memo(DropdownGroup);
