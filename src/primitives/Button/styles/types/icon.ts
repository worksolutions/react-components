import { borderWidth, child, backgroundColor, boxShadow, fillColor } from "../../../../styles";
import { makeSpinnerColorStyle } from "../../../Spinner";

export const iconStyle = [
  backgroundColor("transparent"),
  borderWidth(0),
  child(fillColor("definitions.ButtonIcon.iconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonIcon.iconColor"), ".spinner"),
];
export const iconHover = [backgroundColor("definitions.ButtonIcon.hoverBackgroundColor")];
export const iconHoverSmall = [child(fillColor("definitions.ButtonIcon.hoverSmallBackgroundColor"), ".icon use")];
export const iconFocus = [boxShadow([0, 0, 0, 2, "definitions.ButtonIcon.focusBorderColor"])];
export const iconActive = [backgroundColor("definitions.ButtonIcon.activeBackgroundColor")];
export const iconDisabled = [
  child(fillColor("definitions.ButtonIcon.disabledIconColor"), ".icon use"),
  child(makeSpinnerColorStyle("definitions.ButtonIcon.disabledIconColor"), ".spinner"),
];
