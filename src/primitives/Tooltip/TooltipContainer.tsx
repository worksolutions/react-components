import React, { useEffect, useMemo, useState } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import PopperManager from "../PopupManager";
import TooltipTextContent from "./index";

export interface TooltipContainerInterface {
  tooltipStyles?: any;
  primaryPlacement?: Placement;
  tooltipText: string;
  hasArrow: boolean;
  children: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}
const offsetTooltipWhenNotArrow = 14;

function TooltipContainer({
  tooltipStyles,
  hasArrow,
  primaryPlacement,
  tooltipText,
  children,
}: TooltipContainerInterface) {
  const [offset, setOffset] = useState<number | undefined>();

  const tooltipElement = useMemo(() => <TooltipTextContent styles={tooltipStyles}>{tooltipText}</TooltipTextContent>, [
    tooltipStyles,
    tooltipText,
  ]);

  useEffect(() => {
    hasArrow ? setOffset(undefined) : setOffset(offsetTooltipWhenNotArrow);
  }, [hasArrow]);

  return (
    <PopperManager
      hasArrow={hasArrow}
      primaryPlacement={primaryPlacement}
      referenceElement={children}
      renderPopupElement={tooltipElement}
      offset={offset}
    />
  );
}

export default React.memo(TooltipContainer);
