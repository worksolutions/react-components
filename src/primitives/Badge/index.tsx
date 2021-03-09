import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  flex,
  height,
  horizontalPadding,
  jc,
  minHeight,
  minWidth,
} from "../../styles";

import { elevation16 } from "../../constants/shadows";
import { Colors } from "../../constants/colors";

export enum BadgeType {
  default = "default",
  prominent = "prominent",
  primary = "primary",
}

export interface BadgeInterface {
  styles?: any;
  children?: React.ReactNode;
  type?: BadgeType;
  withShadow?: boolean;
}

function Badge({ styles, type = BadgeType.default, withShadow = true, children }: BadgeInterface) {
  const colorValue = `definitions.Badge.${type}.backgroundColor` as IncomeColorVariant<Colors>;

  return (
    <Wrapper
      styles={[
        flex,
        ai("center"),
        jc("center"),
        horizontalPadding(4),
        borderRadius(12),
        backgroundColor(colorValue),
        minWidth(20),
        minHeight(20),
        height(20),
        border(2, "white"),
        withShadow && elevation16,
        styles,
      ]}
    >
      {children}
    </Wrapper>
  );
}

export default React.memo(Badge);
