import React from "react";

import {
  ai,
  borderRadius,
  bottom,
  child,
  flex,
  height,
  hover,
  left,
  marginLeft,
  marginRight,
  minWidth,
  pointer,
  position,
  top,
  transition,
  width,
  backgroundColor,
  boxShadow,
  createAlphaColor,
  mediaScreen,
} from "styles";
import { duration160 } from "constants/durations";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { Colors } from "../..";

export interface ToggleInterface {
  className?: string;
  styles?: any;
  textStyles?: any;
  enabled: boolean;
  text?: string;
  textOnRight?: boolean;
  onChange: (enabled: boolean) => void;
}

const tabletDownMedia = "(max-width: 768px)";

function Toggle({ className, styles, enabled, text, textOnRight, textStyles, onChange }: ToggleInterface) {
  return (
    <Wrapper
      className={className}
      styles={[
        flex,
        ai("center"),
        pointer,
        hover(child(enabled ? backgroundColor("blue/06") : backgroundColor("gray-blue/03"), ".switch")),
        styles,
      ]}
      onClick={() => onChange(!enabled)}
    >
      {!textOnRight && text && <Typography styles={marginRight(8)}>{text}</Typography>}
      <Wrapper
        className="switch"
        styles={[
          transition(`background-color ${duration160}`),
          width(28),
          minWidth(28),
          height(16),
          position("relative"),
          borderRadius(100),
          enabled ? backgroundColor("blue/05") : backgroundColor("gray-blue/02"),
          mediaScreen(tabletDownMedia, [width(42), minWidth(42), height(24)]),
        ]}
      >
        <Wrapper
          styles={[
            boxShadow([0, 2, 4, 0, createAlphaColor("black", 30)], [0, 0, 1, 0, createAlphaColor("black", 61)]),
            transition(`left ${duration160}`),
            position("absolute"),
            width(14),
            height(14),
            borderRadius(100),
            backgroundColor("white"),
            top(1),
            bottom(1),
            enabled ? left(`calc(100% - 15px)`) : left(1),
            mediaScreen(tabletDownMedia, enabled ? left(`calc(100% - 23px)`) : left(1)),
            mediaScreen(tabletDownMedia, [width(22), height(22)]),
          ]}
        />
      </Wrapper>
      {textOnRight && text && <Typography styles={[marginLeft(8), textStyles]}>{text}</Typography>}
    </Wrapper>
  );
}

export default React.memo(Toggle);
