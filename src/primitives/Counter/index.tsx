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
  lineHeight,
  minWidth,
  jc,
  horizontalPadding,
} from "../../styles";

import { elevation16 } from "../../constants/shadows";

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

type BackgroundColors = {
  [key in CounterType]: IncomeColorVariant<any>;
};

const backgroundColors: BackgroundColors = {
  default: "definitions.Counter.default.backgroundColor",
  prominent: "definitions.Counter.prominent.backgroundColor",
  primary: "definitions.Counter.primary.backgroundColor",
};

function Counter({ value, displayValueLimit = 99, type = CounterType.default, withShadow = false }: CounterProps) {
  const getDisplayedValue = React.useMemo(() => {
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
      {getDisplayedValue}
    </Typography>
  );
}

export default React.memo(Counter);
