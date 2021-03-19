import React, { useMemo, useState } from "react";
import { Manager as ReactPopperManager, Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { PositioningStrategy } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import PopperElement from "./PopperElement";
import VisibilityManager from "../VisibilityManager";

import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";
import { VisibilityManagerContextInterface } from "../VisibilityManager/types";

export enum PopupManagerMode {
  HOVER = "HOVER",
  CLICK = "CLICK",
  EXTERNAL_CONTROL = "EXTERNAL_CONTROL",
}

export type PopupManagerInterface = {
  popupStyles?: any;
  primaryPlacement?: Placement;
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popupElement?: React.ReactNode;
  strategy?: PositioningStrategy;
} & (
  | {
      mode: PopupManagerMode.CLICK;
      closeOnClickOutside?: boolean;
      renderTriggerElement: (data: { initRef: any }) => JSX.Element;
    }
  | {
      mode: PopupManagerMode.HOVER;
      renderTriggerElement: (data: { initRef: any }) => JSX.Element;
    }
  | {
      mode: PopupManagerMode.EXTERNAL_CONTROL;
      renderTriggerElement: (data: VisibilityManagerContextInterface) => JSX.Element;
    }
);

function getPopperStyles(triggerElementWidth?: number, popupWidth?: number | string | "auto") {
  if (!triggerElementWidth || !popupWidth) return null;
  if (popupWidth === "auto") return null;

  if (isNumber(popupWidth)) return width(popupWidth);
  if (isString(popupWidth)) return width(convertPercentageStringToNumber(popupWidth) * triggerElementWidth);

  return null;
}

function PopupManager({
  popupStyles,
  primaryPlacement,
  offset,
  arrowPadding,
  hasArrow,
  popupElement,
  popupWidth,
  strategy,
  ...props
}: PopupManagerInterface) {
  const [{ context, triggerElement }, setContext] = useState<{
    context: VisibilityManagerContextInterface | undefined;
    triggerElement: HTMLElement | undefined;
  }>({ context: undefined, triggerElement: undefined });

  const [popupElementNodeRef, setPopupElementNodeRef] = React.useState<HTMLElement | undefined>(undefined);

  const setVisibilityContextAndTriggerRef = React.useCallback(
    (context: VisibilityManagerContextInterface) => (triggerElement: HTMLElement | undefined) => {
      setContext({ context, triggerElement });
    },
    [],
  );

  const popperWidthStyles = useMemo(() => getPopperStyles(triggerElement?.offsetWidth, popupWidth), [
    triggerElement?.offsetWidth,
    popupWidth,
  ]);

  React.useEffect(() => {
    if (!triggerElement || !context) return () => null;

    if (props.mode === PopupManagerMode.HOVER) {
      triggerElement.addEventListener("mouseenter", context.show);
      triggerElement.addEventListener("mouseleave", context.hide);
      return () => {
        triggerElement.removeEventListener("mouseenter", context.show);
        triggerElement.removeEventListener("mouseleave", context.hide);
      };
    }

    if (props.mode === PopupManagerMode.CLICK) {
      triggerElement.addEventListener("click", context.toggle);
      return () => {
        triggerElement.removeEventListener("click", context.toggle);
      };
    }

    return () => null;
  }, [props.mode, context, triggerElement]);

  const popupElementNode = context?.visible && popupElement && (
    <PopperElement
      ref={setPopupElementNodeRef}
      primaryPlacement={primaryPlacement}
      styles={[popupStyles, popperWidthStyles]}
      offset={offset}
      arrowPadding={arrowPadding}
      hasArrow={hasArrow}
      triggerElement={triggerElement}
      strategy={strategy}
    >
      {popupElement}
    </PopperElement>
  );

  if (props.mode === PopupManagerMode.HOVER) {
    const TriggerElement = props.renderTriggerElement; // TODO: вынести в отдельные компоненты

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Element = React.useCallback(
      (context: VisibilityManagerContextInterface) => (
        <>
          <ReactPopperReference>
            {({ ref: reactPopperReferenceRef }) => (
              <TriggerElement
                initRef={provideRef(
                  context.initRef,
                  reactPopperReferenceRef,
                  setVisibilityContextAndTriggerRef(context),
                )}
              />
            )}
          </ReactPopperReference>
        </>
      ),
      [TriggerElement, setVisibilityContextAndTriggerRef],
    );

    return (
      <>
        <ReactPopperManager>
          <VisibilityManager>{Element}</VisibilityManager>
          {popupElementNode}
        </ReactPopperManager>
      </>
    );
  }

  if (props.mode === PopupManagerMode.CLICK) {
    const TriggerElement = props.renderTriggerElement; // TODO: вынести в отдельные компоненты

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Element = React.useCallback(
      (context: VisibilityManagerContextInterface) => (
        <>
          <ReactPopperReference>
            {({ ref: reactPopperReferenceRef }) => (
              <TriggerElement
                initRef={provideRef(
                  context.initRef,
                  reactPopperReferenceRef,
                  setVisibilityContextAndTriggerRef(context),
                )}
              />
            )}
          </ReactPopperReference>
        </>
      ),
      [TriggerElement, setVisibilityContextAndTriggerRef],
    );

    const ignoreElements = React.useMemo(() => [popupElementNodeRef], [popupElementNodeRef]);

    return (
      <ReactPopperManager>
        <VisibilityManager ignoreElements={ignoreElements}>{Element}</VisibilityManager>
        {popupElementNode}
      </ReactPopperManager>
    );
  }

  const TriggerElement = props.renderTriggerElement; // TODO: вынести в отдельные компоненты

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <ReactPopperReference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              toggle={context.toggle}
              visible={context.visible}
              hide={context.hide}
              show={context.show}
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
            />
          )}
        </ReactPopperReference>
      </>
    ),
    [TriggerElement, setVisibilityContextAndTriggerRef],
  );

  return (
    <>
      <ReactPopperManager>
        <VisibilityManager>{Element}</VisibilityManager>
        {popupElementNode}
      </ReactPopperManager>
    </>
  );
}

export default React.memo(PopupManager);
