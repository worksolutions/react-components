import { TransitionStatus } from "react-transition-group";

import {
  centerToLeftOnEntering,
  centerToRightOnEntering,
  SLIDE_CENTER_TO_LEFT_WITH_ROLLBACK,
  SLIDE_CENTER_TO_RIGHT_WITH_ROLLBACK,
} from "../../../css/slideAnimationClassNames";

export type AnimationState = null | "center-to-right" | "center-to-left";

export function getClassNameForTransitionGroup(animationState: AnimationState, status: TransitionStatus) {
  if (!animationState) return undefined;
  if (animationState === "center-to-right")
    return centerToRightOnEntering(status, { entered: SLIDE_CENTER_TO_RIGHT_WITH_ROLLBACK });
  if (animationState === "center-to-left")
    return centerToLeftOnEntering(status, { entered: SLIDE_CENTER_TO_LEFT_WITH_ROLLBACK });
}
