import React, { useMemo, useState } from "react";
import { Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import PopperElement from "./PopperElement";
import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";
import { isNumber, isString } from "@worksolutions/utils";

interface PopperManagerProps {
  popperStyles?: any;
  primaryPlacement?: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  offset?: number;
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  hasArrow?: boolean;
  widthPopper?: number | string | "auto";
  renderPopupElement: React.ReactNode;
  referenceElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}

const defaultOffset: number = 4;
const defaultOffsetWithArrow: number = 14;
const defaultArrowPadding = 10;

function setOffset(offset?: number, haveArrow?: boolean) {
  if (offset) return offset;
  if (haveArrow) return defaultOffsetWithArrow;
  return defaultOffset;
}

function getPopperWidthStyles(referenceWidth?: number, widthPopper?: number | string | "auto") {
  if (!referenceWidth) return null;
  if (!widthPopper) return null;
  if (widthPopper === "auto") return null;

  if (isNumber(widthPopper)) return width(widthPopper);
  if (isString(widthPopper)) return width(convertPercentageStringToNumber(widthPopper) * referenceWidth);

  return null;
}

function PopupManager({
  popperStyles,
  modifiers,
  primaryPlacement,
  outsideHandler = true,
  offset,
  arrowPadding,
  arrowElem,
  hasArrow,
  referenceElement,
  renderPopupElement,
  widthPopper,
}: PopperManagerProps) {
  const [referenceNode, setReferenceNode] = useState<HTMLElement | undefined>();

  const offsetValue = useMemo(() => setOffset(offset, hasArrow), [hasArrow, offset]);
  const popperWidthStyles = useMemo(() => getPopperWidthStyles(referenceNode?.offsetWidth, widthPopper), [
    referenceNode?.offsetWidth,
    widthPopper,
  ]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(toggleVisibility, visible) => (
        <>
          <ReactPopperReference>
            {({ ref }) => (
              <Wrapper ref={provideRef(ref, setReferenceNode)}>{referenceElement(toggleVisibility, visible)}</Wrapper>
            )}
          </ReactPopperReference>
          {visible && (
            <PopperElement
              primaryPlacement={primaryPlacement}
              modifiers={modifiers}
              popperStyles={popperStyles}
              styles={popperWidthStyles}
              offset={offsetValue}
              arrowPadding={arrowPadding ? arrowPadding : defaultArrowPadding}
              arrowElem={arrowElem}
              hasArrow={hasArrow}
              referenceNode={referenceNode}
            >
              {renderPopupElement}
            </PopperElement>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopupManager);
