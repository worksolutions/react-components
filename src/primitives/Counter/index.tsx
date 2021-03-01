import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Typography from "../Typography";
import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  color,
  display,
  flex,
  fontSize,
  fontWeight,
  height,
  lineHeight,
  minWidth,
  width,
  jc,
  padding,
} from "../../styles";

import { elevation16 } from "../../constants/shadows";

export enum CounterType {
  default = "default",
  prominent = "prominent",
  primary = "primary",
}

export interface CounterProps {
  value: number;
  type?: CounterType;
  withShadow?: boolean;
}

type BackgroundColors = {
  [key in CounterType]: IncomeColorVariant<any>;
};

const backgroundColors: BackgroundColors = {
  default: "definitions.Counter.default.backgroundColor",
  prominent: "definitions.Counter.prominent.backgroundColor",
  primary: "definitions.Counter.primary.backgroundColor",
};

function Counter({ value, type = CounterType.default, withShadow = false }: CounterProps) {
  const displayedValue = value > 99 ? "99+" : value;
  console.log(backgroundColors[type]);

  return (
    <Typography
      styles={[
        flex,
        ai("center"),
        jc("center"),
        padding("0 5px"),
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
      {displayedValue}
    </Typography>
  );
}

export default React.memo(Counter);
