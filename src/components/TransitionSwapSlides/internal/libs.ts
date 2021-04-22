import { TransitionStatus } from "react-transition-group";

import { centerToLeft, centerToRight } from "./statusMatches";

export type AnimationState = null | "center-to-right" | "center-to-left";

export function getClassNameForTransitionGroup(animationState: AnimationState, status: TransitionStatus) {
  if (!animationState) return undefined;
  if (animationState === "center-to-right") return centerToRight(status);
  if (animationState === "center-to-left") return centerToLeft(status);
}
