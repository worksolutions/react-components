import React, { useRef } from "react";

import { InputIconProp } from "../../Input/InputWrapper";

interface HookShowedRightIconInterface {
  selected: boolean;
  rightContent: InputIconProp;
  showArrowOnSelection?: boolean;
}

type ResultRightContentType = InputIconProp | undefined;
export function useShowedRightIcon({
  selected,
  rightContent,
  showArrowOnSelection,
}: HookShowedRightIconInterface): any {
  const resultRightContent = useRef<ResultRightContentType>();

  const setAndReturnRightContent = (rightContent: ResultRightContentType) => {
    resultRightContent.current = rightContent;
    return resultRightContent;
  };

  if (showArrowOnSelection) {
    if (selected) return setAndReturnRightContent("check");

    return setAndReturnRightContent(undefined);
  }

  if (rightContent) return setAndReturnRightContent(rightContent);

  return setAndReturnRightContent(undefined);
}
