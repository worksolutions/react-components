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

export const primaryStyle = [
  borderWidth(0),
  color("definitions.ButtonPrimary.color"),
  backgroundColor("definitions.ButtonPrimary.backgroundColor"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("definitions.ButtonPrimary.iconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonPrimary.iconColor"), ".loader"),
];
export const primaryHover = [backgroundColor("definitions.ButtonPrimary.hoverBackgroundColor")];
export const primaryFocus = [boxShadow([0, 0, 0, 2, "definitions.ButtonPrimary.focusBorderColor"])];
export const primaryActive = [backgroundColor("definitions.ButtonPrimary.activeBackgroundColor")];
export const primaryDisabled = [backgroundColor("definitions.ButtonPrimary.disabledBackgroundColor")];
