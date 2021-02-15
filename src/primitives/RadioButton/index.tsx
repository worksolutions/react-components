import React from "react";
import {
  flex,
  jc,
  ai,
  padding,
  height,
  width,
  fullWidth,
  borderRadius,
  pointer,
  hover,
  borderNone,
  disableOutline,
  transition,
  focus,
  active,
  cursor,
  marginLeft,
  backgroundColor,
  boxShadow,
  fontSize,
  color,
} from "styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";

export type RadioButtonProps = {
  text: string;
  isChecked: boolean;
  error?: boolean;
  disabled?: boolean;
};

function getRadioButtonStyles({ isChecked = false, error = false, disabled = false }) {
  return [
    !isChecked && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    backgroundColor(isChecked ? "blue/05" : "transparent"),
    !disabled && hover(backgroundColor(isChecked ? "blue/06" : "gray-blue/01")),
    !disabled && active(backgroundColor(isChecked ? "blue/07" : "gray-blue/02")),
    error && boxShadow([0, 0, 0, 2, "red/05"]),
    disabled && [backgroundColor("gray-blue/01"), boxShadow([0, 0, 0, 0, "transparent"]), cursor("default")],
    isChecked && disabled && backgroundColor("blue/02"),
  ];
}

function RadioButton({ text, isChecked, error, disabled }: RadioButtonProps) {
  const styles = React.useMemo(() => getRadioButtonStyles({ isChecked, error, disabled }), [
    isChecked,
    error,
    disabled,
  ]);

  return (
    <Wrapper styles={[fullWidth, height(24), padding(4), flex, jc("flex-start"), ai("center")]}>
      <Wrapper
        as="button"
        styles={[
          transition("box-shadow 0.2s"),
          padding(0),
          disableOutline,
          borderNone,
          width(18),
          height(18),
          borderRadius("50%"),
          pointer,
          focus(boxShadow([0, 0, 0, 2, "blue/04"])),
          styles,
        ]}
        disabled={disabled}
      >
        {isChecked && <Icon width={16} height={16} icon="16-small-circle" color="white" />}
      </Wrapper>
      <Typography styles={[marginLeft(12), cursor("default"), fontSize(14), disabled && color("gray-blue/02")]}>
        {text}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(RadioButton);
