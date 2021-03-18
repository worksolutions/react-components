import React, { useMemo, useState } from "react";
import { Manager as ReactPopperManager, Reference as MainElement } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { isNumber, isString } from "@worksolutions/utils";
import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import PopperElement from "./PopperElement";
import VisibilityManager, { VisibilityManagerChildrenInterface } from "../VisibilityManager";

import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";

export interface PopperManagerInterface {
  popperStyles?: any;
  primaryPlacement?: Placement;
  popupModifiers?: StrictModifiers[];
  offset?: number;
  arrowPadding?: number;
  hasArrow?: boolean;
  popupWidth?: number | string | "auto";
  popperElement: React.ReactNode;
  closeAfterClick?: boolean;
  closeOnClickOutside?: boolean;
  renderMainElement: ({ visibility, show, hide, toggle }: VisibilityManagerChildrenInterface) => React.ReactNode;
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
  closeOnClickOutside,
  offset,
  arrowPadding,
  hasArrow,
  popperElement,
  popupWidth,
  closeAfterClick,
  renderMainElement,
}: PopperManagerInterface) {
  const [mainWrapperRef, setMainWrapperRef] = useState<HTMLElement | undefined>();

  const offsetValue = useMemo(() => setOffset(offset, hasArrow), [hasArrow, offset]);
  const popperWidthStyles = useMemo(() => getPopperStyles(mainWrapperRef?.offsetWidth, popupWidth), [
    mainWrapperRef?.offsetWidth,
    popupWidth,
  ]);

  return (
    <ReactPopperManager>
      <VisibilityManager onClickOutside={closeOnClickOutside} closeAfterClick={closeAfterClick}>
        {({ visibility, toggle, hide, show }) => (
          <>
            <MainElement>
              {({ ref }) => (
                <Wrapper ref={provideRef(ref, setMainWrapperRef)}>
                  {renderMainElement({ toggle, visibility, hide, show })}
                </Wrapper>
              )}
            </MainElement>
            {visibility && (
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
            )}
          </>
        )}
      </VisibilityManager>
    </ReactPopperManager>
  );
}

export default React.memo(PopupManager);
