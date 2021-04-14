import React from "react";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Icon, { InternalIcons } from "../../../Icon";
import { transform, transition } from "../../../../styles";
import { duration160 } from "../../../../constants/durations";
import { Colors } from "../../../../constants/colors";

interface SelectRightIconInterface {
  styles?: any;
  popupVisible: boolean;
  icon: InternalIcons | null;
  width?: number | string;
  height?: number | string;
  color?: IncomeColorVariant<Colors>;
}

function SelectRightIcon({ styles, icon, color, height, width, popupVisible }: SelectRightIconInterface) {
  if (!icon) return null;
  return (
    <Icon
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${popupVisible ? "180deg" : "0deg"})`), styles]}
      icon={icon}
      width={width}
      height={height}
      color={color}
    />
  );
}

export default SelectRightIcon;
