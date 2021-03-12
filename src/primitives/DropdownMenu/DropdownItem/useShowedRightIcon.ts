import React, { useRef } from "react";

import { InputIconProp } from "../../Input/InputWrapper";

export function useShowedRightIcon(
  selected: boolean,
  rightContent: InputIconProp | React.ReactNode,
  showArrowOnSelection?: boolean,
): any {
  const resultRightContent = useRef<InputIconProp | React.ReactNode | undefined>(undefined);

  if (showArrowOnSelection) {
    if (selected) resultRightContent.current = "check";
    return resultRightContent;
  }

  if (rightContent) {
    resultRightContent.current = rightContent;
    return resultRightContent;
  }

  return resultRightContent;
}
