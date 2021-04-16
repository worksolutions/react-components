import React from "react";

import {
  ai,
  backgroundColor,
  borderRadius,
  bottom,
  boxShadow,
  child,
  createAlphaColor,
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
} from "../../styles";
import { duration160 } from "../../constants/durations";

import Wrapper from "../Wrapper";
import Typography from "../Typography";

export interface ToggleInterface {
  className?: string;
  styles?: any;
  textStyles?: any;
  enabled: boolean;
  text?: string;
  textOnRight?: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ className, styles, enabled, text, textOnRight, textStyles, onChange }: ToggleInterface) {
  return (
    <Wrapper
      className={className}
      styles={[
        flex,
        ai("center"),
        pointer,
        hover(
          child(
            enabled
              ? backgroundColor("definitions.Toggle.Enabled.hoverBackgroundColor")
              : backgroundColor("definitions.Toggle.Disabled.hoverBackgroundColor"),
            ".switch",
          ),
        ),
        styles,
      ]}
      onClick={() => onChange(!enabled)}
    >
      {!textOnRight && text && (
        <Typography styles={[marginRight(8), textStyles]} color="definitions.Toggle.textColor">
          {text}
        </Typography>
      )}
      <Wrapper
        className="switch"
        styles={[
          transition(`background-color ${duration160}`),
          width(28),
          minWidth(28),
          height(16),
          position("relative"),
          borderRadius(100),
          enabled
            ? backgroundColor("definitions.Toggle.Enabled.backgroundColor")
            : backgroundColor("definitions.Toggle.Disabled.backgroundColor"),
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
            backgroundColor("definitions.Toggle.switchBackgroundColor"),
            top(1),
            bottom(1),
            enabled ? left(`calc(100% - 15px)`) : left(1),
          ]}
        />
      </Wrapper>
      {textOnRight && text && (
        <Typography styles={[marginLeft(8), textStyles]} color="definitions.Toggle.textColor">
          {text}
        </Typography>
      )}
    </Wrapper>
  );
}

export default React.memo(Toggle);
