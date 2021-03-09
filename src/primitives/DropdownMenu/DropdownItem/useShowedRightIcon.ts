import React, { useEffect, useRef } from "react";
import { InputIconProp } from "../../Input/InputWrapper";

export function useShowedRightIcon(
  isHoveredItems: boolean,
  selected: boolean,
  rightContent: InputIconProp | React.ReactNode,
) {
  const resultRightContent = useRef<InputIconProp | React.ReactNode | undefined>(undefined);

  useEffect(() => {
    if (isHoveredItems) {
      resultRightContent.current = undefined;
    }
  }, [isHoveredItems]);

  if (selected) resultRightContent.current = rightContent || "check";

  return resultRightContent;
}
