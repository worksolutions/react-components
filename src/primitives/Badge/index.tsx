import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import {
  ai,
  backgroundColor,
  borderRadius,
  boxShadow,
  flex,
  horizontalPadding,
  jc,
  minHeight,
  minWidth,
} from "../../styles";

import { BoxShadow, elevation16Raw } from "../../constants/shadows";
import { Colors } from "../../constants/colors";

export interface BadgeInterface {
  styles?: any;
  children?: React.ReactNode;
  color: IncomeColorVariant<Colors>;
  withShadow?: boolean;
  size?: number;
  borderWidth?: number;
}

function Badge({ styles, color, withShadow = true, children, size = 16, borderWidth = 2 }: BadgeInterface) {
  const shadow = [0, 0, 0, borderWidth, "white"] as BoxShadow;
  return (
    <Wrapper
      styles={[
        flex,
        ai("center"),
        jc("center"),
        borderRadius(size / 2),
        backgroundColor(color),
        minWidth(size),
        minHeight(size),
        horizontalPadding(4),
        withShadow ? boxShadow(...elevation16Raw, shadow) : boxShadow(shadow),
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default React.memo(Badge);
