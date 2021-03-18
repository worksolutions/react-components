import React, { useMemo, useState } from "react";
import { Manager as ReactPopperManager, Reference as MainElement } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { PositioningStrategy, StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import PopperElement from "./PopperElement";
import VisibilityManager from "../VisibilityManager";

import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";
import { VisibilityManagerContextInterface } from "../VisibilityManager/types";

export interface PopupManagerInterface {
  popupStyles?: any;
  primaryPlacement?: Placement;
  popupModifiers?: StrictModifiers[];
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popupElement: React.ReactNode;
  closeAfterClick?: boolean;
  closeOnClickOutside?: boolean;
  strategy?: PositioningStrategy;
  renderMainElement: (data: VisibilityManagerContextInterface) => React.ReactNode;
}

const defaultOffsets = {
  withArrow: 14,
  withoutArrow: 4,
};

const defaultArrowPadding = 10;

function setOffset(offset?: number, haveArrow?: boolean) {
  if (offset) return offset;
  if (haveArrow) return defaultOffsets.withArrow;
  return defaultOffsets.withoutArrow;
}

function getPopperStyles(mainWrapperWidth?: number, popperWidth?: number | string | "auto") {
  if (!mainWrapperWidth || !popperWidth) return null;
  if (popperWidth === "auto") return null;

  if (isNumber(popperWidth)) return width(popperWidth);
  if (isString(popperWidth)) return width(convertPercentageStringToNumber(popperWidth) * mainWrapperWidth);

  return null;
}

function PopupManager({
  popupStyles,
  popupModifiers,
  primaryPlacement,
  closeOnClickOutside,
  offset,
  arrowPadding,
  hasArrow,
  popupElement,
  popupWidth,
  closeAfterClick,
  strategy,
  renderMainElement,
}: PopupManagerInterface) {
  const [mainWrapperRef, setMainWrapperRef] = useState<HTMLElement | undefined>();

  const offsetValue = useMemo(() => setOffset(offset, hasArrow), [hasArrow, offset]);
  const popperWidthStyles = useMemo(() => getPopperStyles(mainWrapperRef?.offsetWidth, popupWidth), [
    mainWrapperRef?.offsetWidth,
    popupWidth,
  ]);

  return (
    <ReactPopperManager>
      <VisibilityManager closeOnClickOutside={closeOnClickOutside} closeAfterClick={closeAfterClick}>
        {({ visibility, toggle, hide, show }) => (
          <>
            <MainElement>
              {({ ref }) =>
                renderMainElement({ toggle, visibility, hide, show, ref: provideRef(ref, setMainWrapperRef) })
              }
            </MainElement>
            {visibility && (
              <PopperElement
                primaryPlacement={primaryPlacement}
                modifiers={popupModifiers}
                styles={[popupStyles, popperWidthStyles]}
                offset={offsetValue}
                arrowPadding={arrowPadding || defaultArrowPadding}
                hasArrow={hasArrow}
                mainWrapperElement={mainWrapperRef}
                strategy={strategy}
              >
                {popupElement}
              </PopperElement>
            )}
          </>
        )}
      </VisibilityManager>
    </ReactPopperManager>
  );
}

export default React.memo(PopupManager);
