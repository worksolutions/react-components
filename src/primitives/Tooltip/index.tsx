import React, { useEffect, useMemo, useState } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { isNotNil } from "@worksolutions/utils";

import PopperManager from "../PopupManager";
import TooltipTextContent from "./internal/TooltipTextContent";

import { zIndex_hint } from "../../constants/zIndexes";
import { VisibilityManagerContextInterface } from "../VisibilityManager/types";
import { popupArrowWidth } from "../PopupManager/PopperElement/Arrow";

export interface TooltipInterface {
  styles?: any;
  offset?: number;
  primaryPlacement?: Placement;
  text?: React.ReactNode;
  hasArrow?: boolean;
  children: ({ visibility, show, hide, toggle }: VisibilityManagerContextInterface) => React.ReactNode;
}

function Tooltip({
  styles,
  primaryPlacement,
  text,
  children,
  hasArrow = true,
  offset: offsetProp = 0,
}: TooltipInterface) {
  const [offset, setOffset] = useState<number | undefined>();

  const tooltipElement = useMemo(
    () => isNotNil(text) && <TooltipTextContent styles={styles}>{text!}</TooltipTextContent>,
    [styles, text],
  );

  useEffect(() => {
    setOffset(hasArrow ? offsetProp + popupArrowWidth : offsetProp);
  }, [hasArrow]);

  return (
    <PopperManager
      hasArrow={hasArrow}
      primaryPlacement={primaryPlacement}
      renderMainElement={children}
      popupElement={tooltipElement}
      offset={offset}
      popperStyles={zIndex_hint}
    />
  );
}

export default React.memo(Tooltip);
