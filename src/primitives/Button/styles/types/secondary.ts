import {
  borderWidth,
  child,
  marginLeft,
  marginRight,
  backgroundColor,
  boxShadow,
  color,
  fillColor,
} from "../../../../styles";
import { makeSpinnerColorStyle } from "../../../Spinner";

export const secondaryStyle = [
  borderWidth(0),
  color("definitions.ButtonSecondary.textColor"),
  boxShadow([0, 0, 0, 1, "definitions.ButtonSecondary.borderColor"]),
  backgroundColor("transparent"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("definitions.ButtonSecondary.iconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonSecondary.iconColor"), ".loader"),
];
export const secondaryHover = [backgroundColor("definitions.ButtonSecondary.hoverBackgroundColor")];
export const secondaryFocus = [boxShadow([0, 0, 0, 2, "definitions.ButtonSecondary.focusBorderColor"])];
export const secondaryActive = [backgroundColor("definitions.ButtonSecondary.activeBackgroundColor")];
export const secondaryDisabled = [
  color("definitions.ButtonSecondary.disabledTextAndIconColor"),
  boxShadow([0, 0, 0, 1, "definitions.ButtonSecondary.disabledBorderColor"]),
  child(fillColor("definitions.ButtonSecondary.disabledTextAndIconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonSecondary.disabledTextAndIconColor"), ".loader"),
];
