import React, { useEffect, useMemo, useState } from "react";
import { isNotNil } from "@worksolutions/utils";

import PopupManager, { PopupManagerInterface, TriggerPopupElementType } from "../PopupManager";
import TooltipTextContent from "./internal/TooltipTextContent";

import { popupArrowWidth } from "../PopupManager/PopperElement/Arrow";

export interface TooltipInterface extends Omit<PopupManagerInterface, "renderTriggerElement" | "popupElement"> {
  textStyles?: any;
  text?: React.ReactNode;
  children: TriggerPopupElementType;
}

function Tooltip({ textStyles, text, children, hasArrow = true, offset: offsetProp = 0, ...props }: TooltipInterface) {
  const [offset, setOffset] = useState<number | undefined>();

  const tooltipElement = useMemo(
    () => isNotNil(text) && <TooltipTextContent styles={textStyles}>{text!}</TooltipTextContent>,
    [textStyles, text],
  );

  useEffect(() => {
    setOffset(hasArrow ? offsetProp + popupArrowWidth : offsetProp);
  }, [hasArrow, offsetProp]);

  return (
    <PopupManager
      {...props}
      hasArrow={hasArrow}
      renderTriggerElement={children}
      popupElement={tooltipElement}
      offset={offset}
    />
  );
}

export default React.memo(Tooltip);
