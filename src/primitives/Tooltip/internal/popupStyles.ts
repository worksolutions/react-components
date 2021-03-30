import { backgroundColor, borderRadius, boxShadow } from "../../../styles";
import { elevation16Raw } from "../../../constants/shadows";

export const tooltipPopupStyles = [
  backgroundColor("definitions.Tooltip.backgroundColor"),
  boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Tooltip.shadowColor"]),
  borderRadius(4),
];

export const hintPopupStyles = [
  backgroundColor("definitions.Hint.backgroundColor"),
  boxShadow([0, 0, 0, 1, "definitions.Hint.borderColor"]),
  borderRadius(4),
];
