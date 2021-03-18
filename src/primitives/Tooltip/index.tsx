import React, { useEffect, useMemo, useState } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import PopperManager from "../PopupManager";
import TooltipTextContent from "./TooltipTextContent";

import { zIndex_hint } from "../../constants/zIndexes";
import { VisibilityManagerChildrenInterface } from "../VisibilityManager";

export interface TooltipInterface {
  tooltipStyles?: any;
  primaryPlacement?: Placement;
  tooltipText: string;
  hasArrow?: boolean;
  children: ({ visibility, show, hide, toggle }: VisibilityManagerChildrenInterface) => React.ReactNode;
}
const offsetTooltipWhenNotArrow = 14;

function Tooltip({ tooltipStyles, primaryPlacement, tooltipText, children, hasArrow = true }: TooltipInterface) {
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
      popperElement={tooltipElement}
      offset={offset}
      popperStyles={zIndex_hint}
    />
  );
}

export default React.memo(Tooltip);
