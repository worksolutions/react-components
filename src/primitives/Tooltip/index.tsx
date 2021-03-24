import React, { useMemo } from "react";

import PopupManager, { PopupManagerInterface, PopupManagerMode } from "../PopupManager";

import { backgroundColor, borderRadius, boxShadow, padding } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import Typography from "../Typography";

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

const tooltipStyles = [
  backgroundColor("white"),
  boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadowColor"]),
  borderRadius(4),
];

const hintStyles: any[] = [backgroundColor("blue/10"), boxShadow([0, 0, 0, 1, "gray-blue/03"]), borderRadius(4)];

function Tooltip({ textStyles, text, children, type = TooltipType.TOOLTIP, popupStyles, ...props }: TooltipInterface) {
  const tooltipElement = useMemo(
    () =>
      text && type === TooltipType.TOOLTIP ? (
        <Typography type="caption-regular" styles={[padding("8px 12px"), textStyles]}>
          {text}
        </Typography>
      ) : (
        <Typography type="caption-regular" color="white" styles={[padding("2px 8px"), textStyles]}>
          {text}
        </Typography>
      ),
    [text, textStyles, type],
  );

  return (
    <PopupManager
      {...props}
      popupStyles={[popupStyles, type === TooltipType.TOOLTIP ? tooltipStyles : hintStyles]}
      mode={PopupManagerMode.HOVER}
      hasArrow={false}
      popupElement={tooltipElement}
      renderTriggerElement={children}
    />
  );
}

export default React.memo(Tooltip);
