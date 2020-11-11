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
  boxShadow([0, 0, 0, 1, "gray-blue/02"]),
  color("gray-blue/07"),
  backgroundColor("transparent"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("gray-blue/07"), ".icon use"),
  child(makeSpinnerColorStyle("gray-blue/07"), ".loader"),
];
export const secondaryHover = [backgroundColor("gray-blue/01")];
export const secondaryFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
export const secondaryActive = [backgroundColor("gray-blue/02")];
export const secondaryDisabled = [
  color("gray-blue/03"),
  boxShadow([0, 0, 0, 1, "gray-blue/01"]),
  child(fillColor("gray-blue/03"), ".icon use"),
  child(makeSpinnerColorStyle("gray-blue/03"), ".loader"),
];
