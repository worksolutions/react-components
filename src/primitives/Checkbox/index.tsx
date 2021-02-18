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
import { duration200 } from "../..";

export enum CheckboxSize {
  medium = "medium",
  large = "large",
}

type SizeStyles = {
  [key in CheckboxSize]: {
    width: number;
    height: number;
    borderRadius: number;
    fontSize: number;
  };
};

const sizes: SizeStyles = {
  medium: {
    width: 16,
    height: 16,
    borderRadius: 2,
    fontSize: 14,
  },
  large: {
    width: 20,
    height: 20,
    borderRadius: 2,
    fontSize: 16,
  },
};

export interface CheckboxProps {
  text: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

function getCheckboxStyles({ checked, error, disabled, indeterminate }: Pick<CheckboxProps, "checked" | "error" | "disabled" | "indeterminate">) {
  const notUnchecked = checked || indeterminate;
  const enabled = !disabled;

  return [
    !checked && !indeterminate && enabled && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
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
  onChange,
  disabled = false,
  required = false,
  indeterminate = false,
  size = CheckboxSize.medium,
}: CheckboxProps) {
  const styles = React.useMemo(() => getCheckboxStyles({ checked, error, disabled, indeterminate }), [
    checked,
    error,
    disabled,
  ]);

  const onChangeHandler = React.useCallback(() => onChange(!checked), [onChange]);
  const currentSize = sizes[size];

  return (
    <Wrapper styles={[fullWidth, height(24), padding(4), flex, jc("flex-start"), ai("center")]}>
      <Wrapper
        as="label"
        styles={[
          transition(`box-shadow ${duration200}`),
          padding(0),
          disableOutline,
          borderNone,
          width(currentSize.width),
          height(currentSize.height),
          borderRadius(currentSize.borderRadius),
          pointer,
          pointerEvents(disabled ? "none" : "auto"),
          styles,
        ]}
        tabIndex={0}
      >
        {checked && !indeterminate && (
          <Icon width={currentSize.width} height={currentSize.height} icon="check" color="white" />
        )}
        {indeterminate && (
          <Icon width={currentSize.width} height={currentSize.height} icon="minus" color="white" />
        )}
      </Wrapper>
      <Typography
        styles={[
          marginLeft(12),
          disabled
            ? [pointerEvents("none"), cursor("default"), color("gray-blue/02")]
            : [pointerEvents("auto"), cursor("pointer"), color("gray-blue/09")],
          fontSize(currentSize.fontSize),
        ]}
        onClick={onChangeHandler}
      >
        {text}
        {required && !!text && <Typography styles={color("red/05")}>*</Typography>}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
