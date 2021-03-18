import { useEffect, useState } from "react";

import { InputIconProp } from "../../InputContainer";

interface HookShowedRightIconInterface {
  selected: boolean;
  rightContent: InputIconProp;
  showArrowOnSelection?: boolean;
}

export function useRightIcon({ selected, rightContent, showArrowOnSelection }: HookShowedRightIconInterface) {
  const [resultRightContent, setResultRightContent] = useState<InputIconProp | undefined>();

  useEffect(() => {
    if (showArrowOnSelection) {
      setResultRightContent(selected ? "check" : undefined);
      return;
    }

    setResultRightContent(rightContent ? rightContent : undefined);
  }, [resultRightContent, showArrowOnSelection, selected, rightContent, setResultRightContent]);

  return resultRightContent;
}
