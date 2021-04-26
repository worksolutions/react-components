import React from "react";
import { sum } from "ramda";

import {
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  height,
  left,
  marginLeft,
  position,
  transition,
  width,
} from "../../styles";
import { duration200 } from "../../constants/durations";

import Wrapper from "../Wrapper";

interface ActiveBackplateInterface {
  activeIndex: number;
  activeIndexInWidthsArray: number;
  widths: number[] | null;
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index));
}

function ActiveBackplate({ activeIndex, activeIndexInWidthsArray, widths }: ActiveBackplateInterface) {
  if (!widths) return null;
  if (activeIndex === -1) return null;
  return (
    <Wrapper
      styles={[
        marginLeft(1),
        transition(`left ${duration200}, width ${duration200}`),
        position("absolute"),
        width(widths[activeIndexInWidthsArray]),
        left(getLeft(widths, activeIndexInWidthsArray)),
        height("calc(100% - 2px)"),
        borderRadius(50),
        backgroundColor("definitions.RadioGroup.Active.backgroundColor"),
        boxShadow(
          [0, 0, 1, 0, "definitions.RadioGroup.Active.borderColor"],
          [0, 2, 8, 0, createAlphaColor("black", 41)],
        ),
      ]}
    />
  );
}

export default React.memo(ActiveBackplate);
