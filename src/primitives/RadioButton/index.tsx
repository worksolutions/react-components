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

function getRadioButtonStyles({ isChecked = false, disabled = false, error = false }) {
  return [
    isChecked ? backgroundColor("blue/05") : boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    disabled
      ? [
          backgroundColor(isChecked ? "blue/02" : "gray-blue/01"),
          boxShadow([0, 0, 0, 0, "transparent"]),
          cursor("default"),
        ]
      : [
          hover(backgroundColor(isChecked ? "blue/06" : "gray-blue/01")),
          active(backgroundColor(isChecked ? "blue/07" : "gray-blue/02")),
        ],
    !disabled && error && boxShadow([0, 0, 0, 2, "red/05"]),
  ];
}

function getRadioButtonTextStyle({ disabled = false }) {
  return [disabled && color("gray-blue/02")];
}

function RadioButton({ text, isChecked, error, disabled }: RadioButtonProps) {
  const stylesButton = React.useMemo(() => getRadioButtonStyles({ isChecked, error, disabled }), [
    isChecked,
    error,
    disabled,
  ]);

  const stylesText = React.useMemo(() => getRadioButtonTextStyle({ disabled }), [disabled]);

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
          stylesButton,
        ]}
        disabled={disabled}
      >
        {isChecked && <Icon width={16} height={16} icon="16-small-circle" color="white" />}
      </Wrapper>
      <Typography styles={[marginLeft(12), cursor("default"), fontSize(14), stylesText]}>{text}</Typography>
    </Wrapper>
  );
}

export default React.memo(RadioButton);
