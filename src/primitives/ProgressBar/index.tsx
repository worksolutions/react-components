import React, { useMemo } from "react";

import {
  borderRadius,
  fullHeight,
  fullWidth,
  height,
  left,
  overflow,
  position,
  top,
  transition,
  width,
  willChange,
  zIndex,
  backgroundColor,
  boxShadow,
  createAlphaColor,
} from "../../styles";

import Wrapper from "../Wrapper";
import { duration300 } from "../../constants/durations";
import { Colors } from "../..";

interface ProgressBarProps {
  value: number;
  styles?: any;
  barStyles?: any;
}

function ProgressBar({ value, styles, barStyles }: ProgressBarProps) {
  const progressWidth = useMemo(() => width(`${value * 100}%`), [value]);

  return (
    <Wrapper
      styles={[
        fullWidth,
        boxShadow([0, 0, 0, 1, createAlphaColor("gray-blue/03", 127) as Colors, true]),
        height(8),
        borderRadius(8),
        position("relative"),
        overflow("hidden"),
        styles,
      ]}
    >
      <Wrapper
        styles={[
          position("absolute"),
          top(0),
          left(0),
          willChange("width"),
          fullHeight,
          backgroundColor("blue/05"),
          progressWidth,
          zIndex(-1),
          transition(`width ${duration300}`),
          barStyles,
        ]}
      />
    </Wrapper>
  );
}

export default React.memo(ProgressBar);
