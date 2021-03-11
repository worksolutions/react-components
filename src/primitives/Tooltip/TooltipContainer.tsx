import React, { useCallback } from "react";
import PopperManager from "../PopperManager";
import { Placement } from "@popperjs/core/lib/enums";
import Tooltip from "./index";
interface TooltipContainerProps {
  children: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  placement?: Placement;
  tooltipText: string;
}
function TooltipContainer({ children, placement, tooltipText }: TooltipContainerProps) {
  const popperElement = useCallback(() => <Tooltip>{tooltipText}</Tooltip>, [tooltipText]);

  return <PopperManager haveArrow placement={placement} referenceElement={children} popperElement={popperElement} />;
}

export default React.memo(TooltipContainer);
