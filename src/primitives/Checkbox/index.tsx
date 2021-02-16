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
} from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";

import { colors } from "../../constants/colors";

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
  name: string;
  value: string;
  isChecked: boolean;
  onChange: () => void;
  error?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  size: SizeType;
  isIndeterminate?: boolean;
}

function getCheckboxStyles({ isChecked = false, error = false, disabled = false, isIndeterminate = false }) {
  return [
    !isChecked && !disabled && boxShadow([0, 0, 0, 1, "gray-blue/03", true]),
    backgroundColor(disabled ? "gray-blue/02" : isChecked || isIndeterminate ? "blue/05" : "transparent"),
    hover(backgroundColor(isChecked || isIndeterminate ? "blue/06" : "gray-blue/01")),
    focus(!error ? boxShadow([0, 0, 0, 2, "blue/04"]) : boxShadow([0, 0, 0, 2, "red/05"])),
    active(backgroundColor(isChecked || isIndeterminate ? "blue/07" : "gray-blue/02")),
    error && !disabled && boxShadow([0, 0, 0, 2, "red/05"]),
  ];
}

function Checkbox({
  text,
  isChecked = false,
  error,
  onChange: onChangeProp,
  disabled = false,
  value,
  name,
  isRequired = false,
  isIndeterminate = false,
  size = "medium",
}: CheckboxProps) {
  const [isCheckedProp, setCheckedProp] = React.useState(isChecked);
  const styles = React.useMemo(
    () => getCheckboxStyles({ isChecked: isCheckedProp, error, disabled, isIndeterminate }),
    [isCheckedProp, error, disabled],
  );

  const onChange = React.useCallback(() => {
    if (!disabled) {
      onChangeProp();
      setCheckedProp((prevCheckedProp) => !prevCheckedProp);
    }
  }, [onChangeProp, isCheckedProp, setCheckedProp, disabled]);

  return (
    <Wrapper styles={[fullWidth, height(24), padding(4), flex, jc("flex-start"), ai("center")]}>
      <Wrapper
        as="label"
        styles={[
          transition("box-shadow 0.2s"),
          padding(0),
          disableOutline,
          borderNone,
          width(sizeStyles[size].width),
          height(sizeStyles[size].height),
          borderRadius(sizeStyles[size].borderRadius),
          pointer,
          pointerEvents(disabled ? "none" : "auto"),
          styles,
        ]}
        tabIndex={0}
      >
        {isCheckedProp && !isIndeterminate && (
          <Icon width={sizeStyles[size].width} height={sizeStyles[size].height} icon="check" color="white" />
        )}
        {isIndeterminate && (
          <Icon width={sizeStyles[size].width} height={sizeStyles[size].height} icon="minus" color="white" />
        )}
        <input
          type="checkbox"
          style={{ position: "absolute", opacity: 0, zIndex: -1 }}
          value={value}
          name={name}
          checked={isCheckedProp}
          onChange={onChange}
          disabled={disabled}
          required={isRequired}
        />
      </Wrapper>
      <Typography
        styles={[
          marginLeft(12),
          pointerEvents(disabled ? "none" : "auto"),
          cursor(disabled ? "default" : "pointer"),
          color(disabled ? "gray-blue/02" : "gray-blue/09"),
          fontSize(sizeStyles[size].fontSize),
        ]}
        onClick={onChange}
      >
        {text}
        {isRequired && !!text?.length && <span style={{ color: colors["red/05"] }}>*</span>}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
