import React, { useMemo, useState } from "react";
import { Reference as MainElement } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import PopperElement from "./PopperElement";
import VisibilityManager from "../VisibilityManager";

import { display, width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";

export interface PopperManagerInterface {
  popperStyles?: any;
  primaryPlacement?: Placement;
  popupModifiers?: StrictModifiers[];
  closeOnClickOutside?: boolean;
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popperElement: React.ReactNode;
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

function getPopperStyles(mainWrapperWidth?: number, popperWidth?: number | string | "auto") {
  if (!mainWrapperWidth || !popperWidth) return null;
  if (popperWidth === "auto") return null;

  if (isNumber(popperWidth)) return width(popperWidth);
  if (isString(popperWidth)) return width(convertPercentageStringToNumber(popperWidth) * mainWrapperWidth);

  return null;
}

function PopupManager({
  popperStyles,
  popupModifiers,
  primaryPlacement,
  closeOnClickOutside = true,
  offset,
  arrowPadding,
  hasArrow,
  renderMainElement,
  popperElement,
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
            <PopperElement
              primaryPlacement={primaryPlacement}
              modifiers={popupModifiers}
              styles={[popperStyles, popperWidthStyles]}
              offset={offsetValue}
              arrowPadding={arrowPadding || defaultArrowPadding}
              hasArrow={hasArrow}
              mainWrapperElement={mainWrapperRef}
            >
              {popperElement}
            </PopperElement>
          </Wrapper>
        </>
      )}
    </VisibilityManager>
  );
}

export default React.memo(PopupManager);
