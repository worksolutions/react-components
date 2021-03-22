import React, { useMemo } from "react";

import PopupManager, { PopupManagerInterface, PopupManagerMode } from "../PopupManager";
import TooltipTextContent from "./internal/TooltipTextContent";

import { popupArrowWidth } from "../PopupManager/PopperElement/Arrow";

export interface TooltipInterface
  extends Omit<PopupManagerInterface, "renderTriggerElement" | "popupElement" | "closeOnClickOutside" | "mode"> {
  textStyles?: any;
  text: string;
  children: (data: { initRef: any }) => JSX.Element;
}

function Tooltip({ textStyles, text, children, hasArrow = true, offset: offsetProp = 0, ...props }: TooltipInterface) {
  const offset = React.useMemo(() => (hasArrow ? offsetProp + popupArrowWidth : offsetProp), [hasArrow, offsetProp]);

  const tooltipElement = useMemo(
    () => text.length !== 0 && <TooltipTextContent styles={textStyles}>{text}</TooltipTextContent>,
    [textStyles, text],
  );

  return (
    <PopupManager
      {...props}
      mode={PopupManagerMode.HOVER}
      hasArrow={hasArrow}
      popupElement={tooltipElement}
      offset={offset}
      renderTriggerElement={children}
    />
  );
}

export default React.memo(Tooltip);
