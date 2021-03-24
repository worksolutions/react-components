import React, { useMemo } from "react";

import PopupManager, { PopupManagerInterface, PopupManagerMode } from "../PopupManager";

import { padding } from "../../styles";
import Typography from "../Typography";
import { hintPopupStyles, tooltipPopupStyles } from "./internal/popupStyles";

export enum TooltipType {
  TOOLTIP = "TOOLTIP",
  HINT = "HINT",
}

export interface TooltipInterface
  extends Omit<
    PopupManagerInterface,
    "renderTriggerElement" | "popupElement" | "closeOnClickOutside" | "mode" | "hasArrow"
  > {
  textStyles?: any;
  text: string | null | undefined;
  type?: TooltipType;
  children: (data: { initRef: any }) => JSX.Element;
}

function Tooltip({ textStyles, text, children, type = TooltipType.TOOLTIP, popupStyles, ...props }: TooltipInterface) {
  const tooltipElement = useMemo(
    () =>
      text && type === TooltipType.TOOLTIP ? (
        <Typography
          type="caption-regular"
          color="definitions.Tooltip.textColor"
          styles={[padding("8px 12px"), textStyles]}
        >
          {text}
        </Typography>
      ) : (
        <Typography type="caption-regular" color="definitions.Hint.textColor" styles={[padding("2px 8px"), textStyles]}>
          {text}
        </Typography>
      ),
    [text, textStyles, type],
  );

  return (
    <PopupManager
      {...props}
      popupStyles={[popupStyles, type === TooltipType.TOOLTIP ? tooltipPopupStyles : hintPopupStyles]}
      mode={PopupManagerMode.HOVER}
      hasArrow={false}
      popupElement={tooltipElement}
      renderTriggerElement={children}
    />
  );
}

export default React.memo(Tooltip);
