import React, { useCallback, useEffect, useState } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import PopperManager from "../PopperManager";
import Tooltip from "./index";

export interface TooltipContainerProps {
  placement?: Placement;
  tooltipText: string;
  tooltipStyles?: any;
  haveArrow: boolean;
  children: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}

function TooltipContainer({ haveArrow, placement, tooltipText, tooltipStyles, children }: TooltipContainerProps) {
  const [offset, setOffset] = useState<[number, number] | undefined>();

  const popperElement = useCallback(() => <Tooltip styles={tooltipStyles}>{tooltipText}</Tooltip>, [
    tooltipStyles,
    tooltipText,
  ]);

  useEffect(() => {
    if (haveArrow) {
      setOffset(undefined);
      return;
    }
    setOffset([0, 14]);
  }, [haveArrow]);

  return (
    <PopperManager
      haveArrow={haveArrow}
      placement={placement}
      referenceElement={children}
      popperElement={popperElement}
      offset={offset}
    />
  );
}

export default React.memo(TooltipContainer);
