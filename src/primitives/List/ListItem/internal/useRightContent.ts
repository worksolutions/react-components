import { useMemo } from "react";

import { UniversalSideContentType } from "../../../../utils/makeUniversalIconContent";

interface UseRightContentInterface {
  selected?: boolean;
  rightContent: UniversalSideContentType;
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
