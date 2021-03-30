import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Typography from "../Typography";
import Badge, { BadgeInterface } from "../Badge";

import { Colors } from "../../constants/colors";

export interface CounterInterface extends Omit<BadgeInterface, "children"> {
  textStyles?: any;
  value: number;
  displayValueLimit?: number;
  textColor?: IncomeColorVariant<Colors>;
  size?: number;
}

function Counter({
  styles,
  textStyles,
  value,
  displayValueLimit = 99,
  textColor = "white",
  ...badgeProps
}: CounterInterface) {
  const resultValue = React.useMemo(() => {
    if (!displayValueLimit) return value;

    return value > displayValueLimit ? `${displayValueLimit}+` : value;
  }, [value, displayValueLimit]);

  return (
    <Badge styles={styles} {...badgeProps}>
      <Typography color={textColor} type="overline-medium" styles={textStyles}>
        {resultValue}
      </Typography>
    </Badge>
  );
}

export default React.memo(Counter);
