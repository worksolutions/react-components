import React from "react";

import {
  active,
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  color,
  cursor,
  disableOutline,
  flex,
  focus,
  height,
  hover,
  jc,
  marginLeft,
  minHeight,
  minWidth,
  padding,
  pointer,
  pointerEvents,
  transition,
  width,
} from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";
import { duration200 } from "../../constants/durations";

export interface CheckboxProps {
  outerStyles?: any;
  checkboxStyles?: any;
  contentWrapperStyles?: any;
  content?: React.ReactNode | string;
  checked: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  onChange: (value: boolean) => void;
}

function getCheckboxStyles({
  checked,
  error,
  enabled,
}: Pick<CheckboxProps, "checked" | "error"> & { enabled: boolean }) {
  return [
    !checked && enabled && boxShadow([0, 0, 0, 1, "definitions.Checkbox.Box.UncheckedEnabled.borderColor"]),
    backgroundColor(
      enabled
        ? checked
          ? "definitions.Checkbox.Box.CheckedEnabled.backgroundColor"
          : "definitions.Checkbox.Box.UncheckedEnabled.backgroundColor"
        : "definitions.Checkbox.Box.Disabled.backgroundColor",
    ),
    focus(
      error
        ? boxShadow([0, 0, 0, 2, "definitions.Checkbox.Box.Error.borderColor"])
        : boxShadow([0, 0, 0, 2, "definitions.Checkbox.Box.Focus.borderColor"]),
    ),
    hover(
      backgroundColor(
        checked
          ? "definitions.Checkbox.Box.CheckedEnabled.hoverBackgroundColor"
          : "definitions.Checkbox.Box.UncheckedEnabled.hoverBackgroundColor",
      ),
    ),
    active(
      backgroundColor(
        checked
          ? "definitions.Checkbox.Box.CheckedEnabled.activeBackgroundColor"
          : "definitions.Checkbox.Box.UncheckedEnabled.activeBackgroundColor",
      ),
    ),
    error && boxShadow([0, 0, 0, 2, "definitions.Checkbox.Box.Error.borderColor"]),
  ];
}

function Checkbox({
  outerStyles,
  contentWrapperStyles,
  checkboxStyles,
  content,
  checked,
  error,
  disabled,
  required,
  indeterminate,
  onChange,
}: CheckboxProps) {
  const styles = React.useMemo(() => getCheckboxStyles({ checked, error, enabled: !disabled }), [
    checked,
    error,
    disabled,
  ]);

  const onChangeHandler = React.useCallback(() => onChange(!checked), [checked, onChange]);

  return (
    <Wrapper styles={[padding(4), flex, jc("flex-start"), ai("center"), outerStyles]}>
      <Wrapper
        as="label"
        styles={[
          transition(`box-shadow ${duration200}, background-color ${duration200}`),
          padding(0),
          disableOutline,
          borderNone,
          width(16),
          height(16),
          minWidth(16),
          minHeight(16),
          borderRadius(2),
          pointer,
          pointerEvents(disabled ? "none" : "auto"),
          styles,
          checkboxStyles,
        ]}
        tabIndex={0}
      >
        {checked && !indeterminate && (
          <Icon width={16} height={16} icon="check" color="definitions.Checkbox.Box.Icon.color" />
        )}
        {checked && indeterminate && (
          <Icon width={16} height={16} icon="minus-small" color="definitions.Checkbox.Box.Icon.color" />
        )}
      </Wrapper>
      <Typography
        styles={[
          marginLeft(12),
          disabled
            ? [pointerEvents("none"), cursor("default"), color("definitions.Checkbox.Text.Disabled.color")]
            : [pointerEvents("auto"), cursor("pointer"), color("definitions.Checkbox.Text.Enabled.color")],
          contentWrapperStyles,
        ]}
        onClick={onChangeHandler}
      >
        {content!}
        {required && !!content && <Typography styles={color("definitions.Checkbox.RequiredStar.color")}>*</Typography>}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Checkbox);
