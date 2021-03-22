import { useMemo } from "react";

import { InternalIcons } from "../../../Icon";

export type SideContentType = InternalIcons | JSX.Element | undefined;

interface UseRightContentInterface {
  selected?: boolean;
  rightContent: SideContentType;
  showArrowWhenSelected?: boolean;
}

export function useRightContent({ selected, rightContent, showArrowWhenSelected }: UseRightContentInterface) {
  return useMemo(() => {
    if (showArrowWhenSelected) {
      return selected ? "check" : rightContent;
    }

    return rightContent;
  }, [rightContent, selected, showArrowWhenSelected]);
}
