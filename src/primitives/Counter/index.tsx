import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Typography from "../Typography";
import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  color,
  flex,
  fontSize,
  fontWeight,
  height,
  horizontalPadding,
  jc,
  lineHeight,
  minWidth,
} from "../../styles";

import { elevation16 } from "../../constants/shadows";
import { Colors } from "../../constants/colors";

export enum CounterType {
  default = "default",
  prominent = "prominent",
  primary = "primary",
}

export interface CounterProps {
  value: number;
  displayValueLimit?: number;
  type?: CounterType;
  withShadow?: boolean;
}

const backgroundColors: {
  [key in CounterType]: IncomeColorVariant<Colors>;
} = {
  default: "definitions.Counter.default.backgroundColor",
  prominent: "definitions.Counter.prominent.backgroundColor",
  primary: "definitions.Counter.primary.backgroundColor",
};

function Counter({ value, displayValueLimit = 99, type = CounterType.default, withShadow = true }: CounterProps) {
  const resultValue = React.useMemo(() => {
    if (!displayValueLimit) return value;

    return value > displayValueLimit ? `${displayValueLimit}+` : value;
  }, [value, displayValueLimit]);

  return (
    <Typography
      styles={[
        flex,
        ai("center"),
        jc("center"),
        horizontalPadding(5),
        fontSize(10),
        lineHeight(12),
        fontWeight("bold"),
        borderRadius(12),
        backgroundColor(backgroundColors[type]),
        color("white"),
        minWidth(20),
        height(20),
        border(2, "white"),
        withShadow && elevation16,
      ]}
    >
      {resultValue}
    </Typography>
  );
}

export default React.memo(Counter);
