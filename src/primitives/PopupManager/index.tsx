import React, { useMemo, useState } from "react";
import { isNumber, isString } from "@worksolutions/utils";
import { PositioningStrategy } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";
import { provideRef } from "@worksolutions/react-utils";

import PopperElement from "./PopperElement";
import { VisibilityManagerContextInterface } from "../VisibilityManager";

import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";
import PopupManagerForHover, { PopperManagerForHoverInterface } from "./PopupManagers/PopupManagerForHover";
import PopupManagerForClick, { PopupManagerForClickInterface } from "./PopupManagers/PopupManagerForClick";
import PopupManagerForExternalControl, {
  PopupManagerForExternalControlInterface,
} from "./PopupManagers/PopupManagerForExternalControl";
import { handleTriggerElementEventsForClick, handleTriggerElementEventsForHover } from "./libs";

export enum PopupManagerMode {
  HOVER = "HOVER",
  CLICK = "CLICK",
  EXTERNAL_CONTROL = "EXTERNAL_CONTROL",
}

export type PopupManagerInterface = {
  popupStyles?: any;
  primaryPlacement?: Placement;
  offset?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popupElement?: React.ReactNode;
  strategy?: PositioningStrategy;
} & (
  | ({
      mode: PopupManagerMode.CLICK;
    } & Pick<PopupManagerForClickInterface, "renderTriggerElement" | "closeOnClickOutside">)
  | ({
      mode: PopupManagerMode.HOVER;
    } & Pick<PopperManagerForHoverInterface, "renderTriggerElement" | "showDelay">)
  | ({
      mode: PopupManagerMode.EXTERNAL_CONTROL;
    } & Pick<PopupManagerForExternalControlInterface, "renderTriggerElement">)
);

function getPopupStyles(triggerElementWidth?: number, popupWidth?: number | string | "auto") {
  if (!triggerElementWidth || !popupWidth) return null;
  if (popupWidth === "auto") return null;

  if (isNumber(popupWidth)) return width(popupWidth);
  if (isString(popupWidth)) return width(convertPercentageStringToNumber(popupWidth) * triggerElementWidth);

  return null;
}

export type PopupManagerRef = Omit<VisibilityManagerContextInterface, "initRef">;

function PopupManager(
  {
    popupStyles,
    primaryPlacement = "bottom-start",
    offset,
    hasArrow,
    popupElement,
    popupWidth,
    strategy,
    ...props
  }: PopupManagerInterface,
  ref: React.Ref<PopupManagerRef>,
) {
  const [{ context, triggerElement }, setContext] = useState<{
    context: VisibilityManagerContextInterface | undefined;
    triggerElement: HTMLElement | undefined;
  }>({ context: undefined, triggerElement: undefined });

  const setVisibilityContextAndTriggerRef = React.useCallback(
    (context: VisibilityManagerContextInterface) => (triggerElement: HTMLElement | undefined) => {
      provideRef(ref)(context);
      setContext({ context, triggerElement });
    },
    [ref],
  );

  const popupWidthStyles = useMemo(() => getPopupStyles(triggerElement?.offsetWidth, popupWidth), [
    triggerElement?.offsetWidth,
    popupWidth,
  ]);

  React.useEffect(() => {
    if (!triggerElement || !context) return () => null;

    if (props.mode === PopupManagerMode.HOVER) {
      const { showDelay = 300 } = props;
      return handleTriggerElementEventsForHover(triggerElement, showDelay, context);
    }

    if (props.mode === PopupManagerMode.CLICK) {
      return handleTriggerElementEventsForClick(triggerElement, context);
    }

    return () => null;
  }, [props.mode, context, triggerElement, props]);

  const popupElementNode = context?.visible && popupElement && (
    <PopperElement
      primaryPlacement={primaryPlacement}
      styles={[popupStyles, popupWidthStyles]}
      offset={offset}
      hasArrow={hasArrow}
      triggerElement={triggerElement}
      strategy={strategy}
    >
      {popupElement}
    </PopperElement>
  );

  if (props.mode === PopupManagerMode.HOVER) {
    return (
      <PopupManagerForHover
        popupElementNode={popupElementNode}
        renderTriggerElement={props.renderTriggerElement}
        setVisibilityContextAndTriggerRef={setVisibilityContextAndTriggerRef}
      />
    );
  }

  if (props.mode === PopupManagerMode.CLICK) {
    return (
      <PopupManagerForClick
        popupElementNode={popupElementNode}
        renderTriggerElement={props.renderTriggerElement}
        closeOnClickOutside={props.closeOnClickOutside}
        setVisibilityContextAndTriggerRef={setVisibilityContextAndTriggerRef}
      />
    );
  }

  return (
    <PopupManagerForExternalControl
      popupElementNode={popupElementNode}
      renderTriggerElement={props.renderTriggerElement}
      setVisibilityContextAndTriggerRef={setVisibilityContextAndTriggerRef}
    />
  );
}

export default React.memo(React.forwardRef(PopupManager));
