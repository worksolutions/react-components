import { backgroundColor, borderWidth, boxShadow, child, color, createAlphaColor, fillColor } from "../../../../styles";
import { makeSpinnerColorStyle } from "../../../Spinner";

export const ghostStyle = [
  borderWidth(0),
  color("definitions.ButtonGhost.textColor"),
  backgroundColor("transparent"),
  child(fillColor("definitions.ButtonGhost.iconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonGhost.iconColor"), ".spinner"),
];
export const ghostHover = [
  backgroundColor("definitions.ButtonGhost.hoverBackgroundColor"),
  boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)]),
];
export const ghostFocus = [boxShadow([0, 0, 0, 2, "definitions.ButtonGhost.focusBorderColor"])];
export const ghostActive = [backgroundColor("definitions.ButtonGhost.activeBackgroundColor")];
export const ghostDisabled = [
  color("definitions.ButtonGhost.disabledColor"),
  child(fillColor("definitions.ButtonGhost.disabledColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonGhost.disabledColor"), ".spinner"),
];
