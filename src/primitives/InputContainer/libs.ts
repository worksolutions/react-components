import { memoizeWith } from "ramda";

import {
  ai,
  backgroundColor,
  borderRadius,
  borderWidth,
  child,
  color,
  disableOutline,
  flex,
  fullHeight,
  fullWidth,
  marginBottom,
  marginRight,
  padding,
  transition,
} from "../../styles";
import { Colors } from "../../constants/colors";
import { TypographyTypes } from "../Typography";
import { duration160 } from "../../constants/durations";

import { InputContainerSize, InputContainerTitlePosition, InputContainerVariant } from "./enums";

export const stylesForSize = {
  [InputContainerSize.LARGE]: {
    withIconLeft: padding("14px 12px 14px 40px"),
    withIconRight: padding("14px 40px 14px 12px"),
    withIcons: padding("14px 40px 14px 40px"),
    withoutIcons: padding("10px 12px"),
  },
  [InputContainerSize.MEDIUM]: {
    withIconLeft: padding("10px 12px 10px 40px"),
    withIconRight: padding("10px 40px 10px 12px"),
    withIcons: padding("10px 40px 10px 40px"),
    withoutIcons: padding("10px 12px"),
  },
  [InputContainerSize.SMALL]: {
    withIconLeft: padding("6px 12px 6px 40px"),
    withIconRight: padding("6px 40px 6px 12px"),
    withIcons: padding("6px 40px 6px 40px"),
    withoutIcons: padding("6px 12px"),
  },
};

export type InputContainerVariantType = {
  background: Colors;
  shadowColor: Colors;
  tip: Colors;
  placeholder: Colors;
  color: Colors;
};

export const colorsByVariant: Record<InputContainerVariant, InputContainerVariantType> = {
  [InputContainerVariant.DEFAULT]: {
    background: "definitions.InputContainerVariantDefault.background" as Colors,
    shadowColor: "definitions.InputContainerVariantDefault.shadowColor" as Colors,
    tip: "definitions.InputContainerVariantDefault.tip" as Colors,
    placeholder: "definitions.InputContainerVariantDefault.placeholder" as Colors,
    color: "definitions.InputContainerVariantDefault.color" as Colors,
  },
  [InputContainerVariant.ERROR]: {
    background: "definitions.InputContainerVariantError.background" as Colors,
    shadowColor: "definitions.InputContainerVariantError.shadowColor" as Colors,
    tip: "definitions.InputContainerVariantError.tip" as Colors,
    placeholder: "definitions.InputContainerVariantError.placeholder" as Colors,
    color: "definitions.InputContainerVariantError.color" as Colors,
  },
  [InputContainerVariant.SUCCESS]: {
    background: "definitions.InputContainerVariantSuccess.background" as Colors,
    shadowColor: "definitions.InputContainerVariantSuccess.shadowColor" as Colors,
    tip: "definitions.InputContainerVariantSuccess.tip" as Colors,
    placeholder: "definitions.InputContainerVariantSuccess.placeholder" as Colors,
    color: "definitions.InputContainerVariantSuccess.color" as Colors,
  },
  [InputContainerVariant.DISABLED]: {
    background: "definitions.InputContainerVariantDisabled.background" as Colors,
    shadowColor: "definitions.InputContainerVariantDisabled.shadowColor" as Colors,
    tip: "definitions.InputContainerVariantDisabled.tip" as Colors,
    placeholder: "definitions.InputContainerVariantDisabled.placeholder" as Colors,
    color: "definitions.InputContainerVariantDisabled.color" as Colors,
  },
};

export function getStylesNameOnIcons(hasLeftIcon: boolean, hasRightIcon: boolean): keyof typeof stylesForSize["large"] {
  if (hasLeftIcon && hasRightIcon) return "withIcons";
  if (hasLeftIcon) return "withIconLeft";
  if (hasRightIcon) return "withIconRight";
  return "withoutIcons";
}

export function getInputVariant(error?: boolean, success?: boolean, disabled?: boolean) {
  if (disabled) return InputContainerVariant.DISABLED;
  if (error) return InputContainerVariant.ERROR;
  if (success) return InputContainerVariant.SUCCESS;
  return InputContainerVariant.DEFAULT;
}

const cssAnimateProperties = [
  "color",
  "border",
  "box-shadow",
  "opacity",
  "visibility",
  "background-color",
  "transform",
];

const transitionStyle = transition(cssAnimateProperties.map((val) => `${val} ${duration160}`).join(","));

export const createDefaultInputStyles = memoizeWith(
  (placeholderColor) => placeholderColor || "",
  (placeholderColor: Colors = "gray-blue/04") => [
    padding(0),
    TypographyTypes["body-regular"],
    transitionStyle,
    borderWidth(0),
    borderRadius(6),
    fullWidth,
    fullHeight,
    disableOutline,
    backgroundColor("transparent"),
    child([color(placeholderColor), transition(`color ${duration160}`)], "::placeholder, .placeholder"),
  ],
);

export const wrapperStylesByTitlePosition: Record<InputContainerTitlePosition, { wrapper?: any; title?: any }> = {
  [InputContainerTitlePosition.LEFT]: { wrapper: [flex, ai("center")], title: marginRight(8) },
  [InputContainerTitlePosition.TOP]: { title: marginBottom(8) },
};
