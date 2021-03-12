import React from "react";
import {
  ai,
  borderNone,
  borderRadius,
  disableOutline,
  flex,
  hover,
  jc,
  padding,
  pointer,
  transform,
  transition,
  width,
  backgroundColor,
  border,
  borderColor,
  boxShadow,
} from "../../styles";

import Typography from "../Typography";
import Icon from "../Icon";
import Wrapper from "../Wrapper";
import { duration160 } from "../../constants/durations";

interface SwitchModeButtonInterface {
  opened: boolean;
  value: string | number;
  onClick: () => void;
  width?: number;
  styles?: any;
}

export function SwitchModeButton({ value, onClick, width: widthProp, opened, styles }: SwitchModeButtonInterface) {
  return (
    <Wrapper
      as="button"
      styles={[
        widthProp && width(widthProp),
        padding("4px 8px 4px 12px"),
        disableOutline,
        borderNone,
        borderRadius(6),
        flex,
        ai("center"),
        jc("space-between"),
        pointer,
        backgroundColor("gray-blue/01"),
        transition(`box-shadow ${duration160}, border-color ${duration160}`),
        border(1, "gray-blue/02"),
        hover(borderColor("gray-blue/03")),
        opened && boxShadow([0, 0, 0, 2, "blue/04"]),
        styles,
      ]}
      onClick={onClick}
    >
      <Typography>{value}</Typography>
      <Icon
        icon="arrow-down"
        styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
        color="gray-blue/07"
      />
    </Wrapper>
  );
}
