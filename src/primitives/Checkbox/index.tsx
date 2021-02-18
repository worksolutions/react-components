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
  pointerEvents,
  color,
  fontSize,
} from "styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
  "extra-large" = "extra-large",
}

type SizeType = keyof typeof Size;

type SizeStyles = {
  [key in SizeType]: {
    width: number;
    height: number;
    borderRadius: number;
    fontSize: number;
  };
};

const sizeStyles: SizeStyles = {
  small: {
    width: 10,
    height: 10,
    borderRadius: 2,
    fontSize: 12,
  },
  medium: {
    width: 16,
    height: 16,
    borderRadius: 4,
    fontSize: 14,
  },
  large: {
    width: 20,
    height: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  "extra-large": {
    width: 24,
    height: 24,
    borderRadius: 6,
    fontSize: 18,
  },
};

export interface CheckboxProps {
  text: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  size?: SizeType;
  indeterminate?: boolean;
}

function getCheckboxStyles({ checked, error, disabled, indeterminate }: CheckboxProps) {
  const notUnchecked = checked || indeterminate;
  const enabled = !disabled;

  return [
    !checked && enabled && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    backgroundColor(disabled ? "gray-blue/02" : notUnchecked ? "blue/05" : "transparent"),
    hover(backgroundColor(notUnchecked ? "blue/06" : "gray-blue/01")),
    focus(!error ? boxShadow([0, 0, 0, 2, "blue/04"]) : boxShadow([0, 0, 0, 2, "red/05"])),
    active(backgroundColor(notUnchecked ? "blue/07" : "gray-blue/02")),
    error && enabled && boxShadow([0, 0, 0, 2, "red/05"]),
  ];
}

function Checkbox({
  text,
  checked = false,
  error,
  onChange: onChangeProp,
  disabled = false,
  isRequired = false,
  indeterminate = false,
  size = "medium",
}: CheckboxProps) {
  const styles = React.useMemo(() => getCheckboxStyles({ checked, error, disabled, indeterminate } as CheckboxProps), [
    checked,
    error,
    disabled,
  ]);

  const onChange = React.useCallback(() => onChangeProp(!checked), [onChangeProp]);
  const currentSizeStyles = sizeStyles[size];

  return (
    <Wrapper styles={[fullWidth, height(24), padding(4), flex, jc("flex-start"), ai("center")]}>
      <Wrapper
        as="label"
        styles={[
          transition("box-shadow 0.2s"),
          padding(0),
          disableOutline,
          borderNone,
          width(currentSizeStyles.width),
          height(currentSizeStyles.height),
          borderRadius(currentSizeStyles.borderRadius),
          pointer,
          pointerEvents(disabled ? "none" : "auto"),
          styles,
        ]}
        tabIndex={0}
      >
        {checked && !indeterminate && (
          <Icon width={currentSizeStyles.width} height={currentSizeStyles.height} icon="check" color="white" />
        )}
        {indeterminate && (
          <Icon width={currentSizeStyles.width} height={currentSizeStyles.height} icon="minus" color="white" />
        )}
      </Wrapper>
      <Typography
        styles={[
          marginLeft(12),
          disabled
            ? [pointerEvents("none"), cursor("default"), color("gray-blue/02")]
            : [pointerEvents("auto"), cursor("pointer"), color("gray-blue/09")],
          fontSize(currentSizeStyles.fontSize),
        ]}
        onClick={onChange}
      >
        {text}
        {isRequired && !!text && <Typography styles={[color("red/05")]}>*</Typography>}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
