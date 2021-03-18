import React, { useEffect, useMemo, useState } from "react";
import { isNotNil } from "@worksolutions/utils";

import PopupManager, { PopupManagerInterface } from "../PopupManager";
import TooltipTextContent from "./internal/TooltipTextContent";

import { VisibilityManagerContextInterface } from "../VisibilityManager/types";
import { popupArrowWidth } from "../PopupManager/PopperElement/Arrow";

export interface TooltipInterface extends Omit<PopupManagerInterface, "renderMainElement" | "popupElement"> {
  textStyles?: any;
  text?: React.ReactNode;
  children: ({ visibility, show, hide, toggle }: VisibilityManagerContextInterface) => React.ReactNode;
}

function Tooltip({ textStyles, text, children, hasArrow = true, offset: offsetProp = 0, ...props }: TooltipInterface) {
  const [offset, setOffset] = useState<number | undefined>();

  const tooltipElement = useMemo(
    () => isNotNil(text) && <TooltipTextContent styles={textStyles}>{text!}</TooltipTextContent>,
    [textStyles, text],
  );

  useEffect(() => {
    setOffset(hasArrow ? offsetProp + popupArrowWidth : offsetProp);
  }, [hasArrow]);

  return (
    <PopupManager
      {...props}
      hasArrow={hasArrow}
      renderMainElement={children}
      popupElement={tooltipElement}
      offset={offset}
    />
  );
}

export default React.memo(Tooltip);
