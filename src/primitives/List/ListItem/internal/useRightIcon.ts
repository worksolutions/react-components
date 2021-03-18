import { useEffect, useState } from "react";

import { InternalIcons } from "../../../Icon";

export type SideIconType = InternalIcons | JSX.Element | undefined;

interface HookShowedRightIconInterface {
  selected: boolean;
  rightContent: SideIconType;
  showArrowOnSelection?: boolean;
}

export function useRightIcon({ selected, rightContent, showArrowOnSelection }: HookShowedRightIconInterface) {
  const [resultRightContent, setResultRightContent] = useState<SideIconType>();

  useEffect(() => {
    if (showArrowOnSelection) {
      setResultRightContent(selected ? "check" : undefined);
      return;
    }

    setResultRightContent(rightContent ? rightContent : undefined);
  }, [resultRightContent, showArrowOnSelection, selected, rightContent, setResultRightContent]);

  return resultRightContent;
}
