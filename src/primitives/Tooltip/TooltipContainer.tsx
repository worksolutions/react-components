import React, { useEffect, useMemo, useState } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import PopperManager from "../PopupManager";
import TooltipTextContent from "./index";

import { zIndex_hint } from "../../constants/zIndexes";

export interface TooltipContainerInterface {
  tooltipStyles?: any;
  primaryPlacement?: Placement;
  tooltipText: string;
  hasArrow?: boolean;
  children: (toggleVisibility: () => void, visibility: boolean) => React.ReactNode;
}
const offsetTooltipWhenNotArrow = 14;

function TooltipContainer({
  tooltipStyles,
  primaryPlacement,
  tooltipText,
  children,
  hasArrow = true,
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
      renderMainElement={children}
      popupElement={tooltipElement}
      offset={offset}
      popupStyles={zIndex_hint}
    />
  );
}

export default React.memo(TooltipContainer);
