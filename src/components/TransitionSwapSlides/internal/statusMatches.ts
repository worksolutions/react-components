import { TransitionStatus } from "react-transition-group";

import {
  SLIDE_CENTER_TO_LEFT,
  SLIDE_CENTER_TO_LEFT_WITH_ROLLBACK,
  SLIDE_CENTER_TO_RIGHT,
  SLIDE_CENTER_TO_RIGHT_WITH_ROLLBACK,
} from "../../../css/slideAnimationClassNames";

function slideMatchRTGStatusFabric(statusesClassNames: Partial<Record<TransitionStatus, string>>) {
  return function (status: TransitionStatus) {
    return statusesClassNames[status] || "";
  };
}

export const centerToLeft = slideMatchRTGStatusFabric({
  entering: SLIDE_CENTER_TO_LEFT,
  entered: SLIDE_CENTER_TO_LEFT_WITH_ROLLBACK,
});

export const centerToRight = slideMatchRTGStatusFabric({
  entering: SLIDE_CENTER_TO_RIGHT,
  entered: SLIDE_CENTER_TO_RIGHT_WITH_ROLLBACK,
});
