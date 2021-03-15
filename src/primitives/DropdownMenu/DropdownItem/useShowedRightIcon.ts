import { useEffect, useState } from "react";

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
  const [resultRightContent, setResultRightContent] = useState<ResultRightContentType>();

  useEffect(() => {
    if (showArrowOnSelection) {
      if (selected) setResultRightContent("check");
      return;
    }

    if (rightContent) {
      setResultRightContent(rightContent);
      return;
    }

    setResultRightContent(undefined);
  }, [resultRightContent, showArrowOnSelection, selected, rightContent, setResultRightContent]);

  return resultRightContent;
}
