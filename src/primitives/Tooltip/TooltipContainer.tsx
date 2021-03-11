import React, { useCallback } from "react";
import PopperManager from "../PopperManager";
import { Placement } from "@popperjs/core/lib/enums";
import Tooltip from "./index";
interface TooltipContainerProps {
  placement?: Placement;
  tooltipText: string;
  tooltipStyles: any;
  children: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}
function TooltipContainer({ children, placement, tooltipText, tooltipStyles }: TooltipContainerProps) {
  const popperElement = useCallback(() => <Tooltip styles={tooltipStyles}>{tooltipText}</Tooltip>, [
    tooltipStyles,
    tooltipText,
  ]);

  return <PopperManager haveArrow placement={placement} referenceElement={children} popperElement={popperElement} />;
}

export default React.memo(TooltipContainer);
