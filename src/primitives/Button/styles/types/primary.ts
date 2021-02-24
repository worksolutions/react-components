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
  color("definitions.Button.primary.color"),
  backgroundColor("definitions.Button.primary.backgroundColor"),
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  child(fillColor("white"), ".icon use"),
  child(makeSpinnerColorStyle("white"), ".loader"),
];
export const primaryHover = [backgroundColor("blue/06")];
export const primaryFocus = [boxShadow([0, 0, 0, 2, "blue/04"])];
export const primaryActive = [backgroundColor("blue/07")];
export const primaryDisabled = [backgroundColor("blue/02")];
