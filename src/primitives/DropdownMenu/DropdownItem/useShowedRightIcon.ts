import React, { useEffect, useRef } from "react";
import { useForceUpdate } from "@worksolutions/react-utils";

import { InputIconProp } from "../../Input/InputWrapper";

export function useShowedRightIcon(
  isHoveredItems: boolean | undefined,
  selected: boolean,
  rightContent: InputIconProp | React.ReactNode,
) {
  const resultRightContent = useRef<InputIconProp | React.ReactNode | undefined>(undefined);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (isHoveredItems) {
      resultRightContent.current = undefined;
      forceUpdate();
    }
  }, [isHoveredItems]);

  if (selected) resultRightContent.current = rightContent || "check";

  return resultRightContent;
}
