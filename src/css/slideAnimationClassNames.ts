import { TransitionStatus } from "react-transition-group";

export const SLIDE_CENTER_TO_RIGHT = "slide-center-to-right";
export const SLIDE_CENTER_TO_RIGHT_WITH_ROLLBACK = "slide-center-to-right-with-rollback";
export const SLIDE_RIGHT_TO_CENTER = "slide-right-to-center";
export const SLIDE_RIGHT_TO_CENTER_WITH_ROLLBACK = "slide-right-to-center-with-rollback";

export const SLIDE_CENTER_TO_LEFT = "slide-center-to-left";
export const SLIDE_CENTER_TO_LEFT_WITH_ROLLBACK = "slide-center-to-left-with-rollback";
export const SLIDE_LEFT_TO_CENTER = "slide-left-to-center";
export const SLIDE_LEFT_TO_CENTER_WITH_ROLLBACK = "slide-left-to-center-with-rollback";

export function slideMatchRTGStatusFabric(statusesClassNames: Partial<Record<TransitionStatus, string>>) {
  return function (status: TransitionStatus, override: Partial<Record<TransitionStatus, string>> = {}) {
    return Object.assign({}, statusesClassNames, override)[status] || "";
  };
}

export const centerToRightOnEntering = slideMatchRTGStatusFabric({
  entering: SLIDE_CENTER_TO_RIGHT,
});
export const centerToRightOnExiting = slideMatchRTGStatusFabric({
  exiting: SLIDE_CENTER_TO_RIGHT,
});

export const rightToCenterOnEntering = slideMatchRTGStatusFabric({
  entering: SLIDE_RIGHT_TO_CENTER,
});
export const rightToCenterOnExiting = slideMatchRTGStatusFabric({
  exiting: SLIDE_RIGHT_TO_CENTER,
});

export const centerToLeftOnEntering = slideMatchRTGStatusFabric({
  entering: SLIDE_CENTER_TO_LEFT,
});
export const centerToLeftOnExiting = slideMatchRTGStatusFabric({
  exiting: SLIDE_CENTER_TO_LEFT,
});

export const leftToCenterOnEntering = slideMatchRTGStatusFabric({
  entering: SLIDE_LEFT_TO_CENTER,
});
export const leftToCenterOnExiting = slideMatchRTGStatusFabric({
  exiting: SLIDE_LEFT_TO_CENTER,
});
