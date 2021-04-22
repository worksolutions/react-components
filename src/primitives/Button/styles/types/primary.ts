import { backgroundColor, borderWidth, boxShadow, child, color, fillColor } from "../../../../styles";
import { makeSpinnerColorStyle } from "../../../Spinner";

export const primaryStyle = [
  borderWidth(0),
  color("definitions.ButtonPrimary.color"),
  backgroundColor("definitions.ButtonPrimary.backgroundColor"),
  child(fillColor("definitions.ButtonPrimary.iconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonPrimary.iconColor"), ".spinner"),
];
export const primaryHover = [backgroundColor("definitions.ButtonPrimary.hoverBackgroundColor")];
export const primaryFocus = [boxShadow([0, 0, 0, 2, "definitions.ButtonPrimary.focusBorderColor"])];
export const primaryActive = [backgroundColor("definitions.ButtonPrimary.activeBackgroundColor")];
export const primaryDisabled = [backgroundColor("definitions.ButtonPrimary.disabledBackgroundColor")];
