import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Typography from "../Typography";
import Badge, { BadgeInterface, BadgeType } from "../Badge";

import { Colors } from "../../constants/colors";

export interface CounterInterface extends Omit<BadgeInterface, "children"> {
  textStyles?: any;
  value: number;
  displayValueLimit?: number;
}

function Counter({ styles, textStyles, value, displayValueLimit = 99, type = BadgeType.default }: CounterInterface) {
  const resultValue = React.useMemo(() => {
    if (!displayValueLimit) return value;

    return value > displayValueLimit ? `${displayValueLimit}+` : value;
  }, [value, displayValueLimit]);

  const textColor = `definitions.Counter.${type}.color` as IncomeColorVariant<Colors>;

  return (
    <Badge styles={styles} type={type}>
      <Typography color={textColor} type="overline-medium" styles={textStyles}>
        {resultValue}
      </Typography>
    </Badge>
  );
}

export default React.memo(Counter);
