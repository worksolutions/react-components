import React, { useMemo, useState } from "react";
import { Reference as MainElement } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibilityManager from "../VisibilityManager";
import PopupElement from "./PopperElement";

import { display, width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";

export interface PopperManagerInterface {
  popupStyles?: any;
  primaryPlacement?: Placement;
  popperModifiers?: StrictModifiers[];
  closeOnClickOutside?: boolean;
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popupElement: React.ReactNode;
  renderMainElement: (toggleVisibility: () => void, visibility: boolean) => React.ReactNode;
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

function getPopperStyles(mainWrapperWidth?: number, popupWidth?: number | string | "auto") {
  if (!mainWrapperWidth || !popupWidth) return null;
  if (popupWidth === "auto") return null;

  if (isNumber(popupWidth)) return width(popupWidth);
  if (isString(popupWidth)) return width(convertPercentageStringToNumber(popupWidth) * mainWrapperWidth);

  return null;
}

function PopupManager({
  popupStyles,
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
    <VisibilityManager onClickOutside={closeOnClickOutside}>
      {(toggleVisibility: () => void, visibility: boolean) => (
        <>
          <MainElement>
            {({ ref }) => (
              <Wrapper ref={provideRef(ref, setMainWrapperRef)}>
                {renderMainElement(toggleVisibility, visibility)}
              </Wrapper>
            )}
          </MainElement>
          <Wrapper styles={display(visibility ? "" : "none")}>
            <PopupElement
              primaryPlacement={primaryPlacement}
              modifiers={popperModifiers}
              styles={[popupStyles, popperWidthStyles]}
              offset={offsetValue}
              arrowPadding={arrowPadding || defaultArrowPadding}
              hasArrow={hasArrow}
              mainWrapperElement={mainWrapperRef}
            >
              {popupElement}
            </PopupElement>
          </Wrapper>
        </>
      )}
    </VisibilityManager>
  );
}

export default React.memo(PopupManager);
