import React, { useMemo, useState } from "react";
import { Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";
import PopperElement from "./PopperElement";

import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";

export interface PopperManagerInterface {
  popperStyles?: any;
  primaryPlacement?: Placement;
  popperModifiers?: StrictModifiers[];
  closeOnClickOutside?: boolean;
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popupElement: React.ReactNode;
  renderMainElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
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
  popperStyles,
  popperModifiers,
  primaryPlacement,
  closeOnClickOutside = true,
  offset,
  arrowPadding,
  hasArrow,
  renderMainElement,
  popupElement,
  popupWidth,
}: PopperManagerInterface) {
  const [mainWrapperRef, setMainWrapperRef] = useState<HTMLElement | undefined>();

  const offsetValue = useMemo(() => setOffset(offset, hasArrow), [hasArrow, offset]);
  const popperWidthStyles = useMemo(() => getPopperStyles(mainWrapperRef?.offsetWidth, popupWidth), [
    mainWrapperRef?.offsetWidth,
    popupWidth,
  ]);

  return (
    <VisibleManager outsideHandler={closeOnClickOutside}>
      {(toggleVisibility, visible) => (
        <>
          <ReactPopperReference>
            {({ ref }) => (
              <Wrapper ref={provideRef(ref, setMainWrapperRef)}>{renderMainElement(toggleVisibility, visible)}</Wrapper>
            )}
          </ReactPopperReference>
          {visible && (
            <PopperElement
              primaryPlacement={primaryPlacement}
              modifiers={popperModifiers}
              styles={[popperStyles, popperWidthStyles]}
              offset={offsetValue}
              arrowPadding={arrowPadding ? arrowPadding : defaultArrowPadding}
              hasArrow={hasArrow}
              mainWrapperElement={mainWrapperRef}
            >
              {popupElement}
            </PopperElement>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopupManager);
