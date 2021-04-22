import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";

import PopupManager, { PopupManagerInterface, PopupManagerMode, PopupManagerRef } from "../PopupManager";

import { padding } from "../../styles";
import Typography from "../Typography";
import { hintPopupStyles, tooltipPopupStyles } from "./internal/popupStyles";

export { hintPopupStyles, tooltipPopupStyles } from "./internal/popupStyles";

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
  mode?: PopupManagerMode;
  text: string | null | undefined;
  type?: TooltipType;
  children: (data: { initRef: any }) => JSX.Element;
}

function Tooltip(
  {
    textStyles,
    text,
    children,
    type = TooltipType.TOOLTIP,
    popupStyles,
    mode = PopupManagerMode.HOVER,
    ...props
  }: TooltipInterface,
  ref: React.Ref<PopupManagerRef>,
) {
  const tooltipElement = useMemo(
    () =>
      text &&
      (type === TooltipType.TOOLTIP ? (
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
      )),
    [text, textStyles, type],
  );

  return (
    <PopupManager
      {...props}
      ref={ref}
      popupStyles={[popupStyles, type === TooltipType.TOOLTIP ? tooltipPopupStyles : hintPopupStyles]}
      mode={mode}
      hasArrow={false}
      popupElement={tooltipElement}
      renderTriggerElement={children}
    />
  );
}

export default observer(Tooltip, { forwardRef: true });
