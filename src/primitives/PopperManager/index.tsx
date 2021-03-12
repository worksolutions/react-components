import React, { useMemo, useState } from "react";
import { Reference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import PopperElement from "./PopperElement";
import { width } from "../../styles";
import { convertPercentageStringToNumber } from "../../utils/convertPercentageStringToNumber";

interface PopperManagerProps {
  popperStyles?: any;
  placement?: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  offset?: number;
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  haveArrow?: boolean;
  widthPopper?: number | string | "auto";
  popperElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
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

function setPopperWidth(referenceWidth?: number, widthPopper?: number | string | "auto") {
  if (!referenceWidth) return null;
  if (!widthPopper) return null;
  if (widthPopper === "auto") return null;

  if (typeof widthPopper === "number") return [width(widthPopper)];
  if (typeof widthPopper === "string") return [width(convertPercentageStringToNumber(widthPopper) * referenceWidth)];

  return [];
}

function PopperManager({
  popperStyles,
  modifiers,
  placement,
  outsideHandler = true,
  offset,
  arrowPadding,
  arrowElem,
  haveArrow,
  referenceElement,
  popperElement,
  widthPopper,
}: PopperManagerProps) {
  const [referenceNode, setReferenceNode] = useState<HTMLElement | undefined>();

  const offsetValue = useMemo(() => setOffset(offset, haveArrow), [haveArrow, offset]);
  const popperWidth = useMemo(
    // @ts-ignore
    () => setPopperWidth(referenceNode?.offsetWidth, widthPopper),
    [referenceNode?.offsetWidth, widthPopper],
  );

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>
            {({ ref }) => (
              <Wrapper ref={provideRef(ref, setReferenceNode)}>{referenceElement(toggleVisible, visible)}</Wrapper>
            )}
          </Reference>
          {visible && (
            <PopperElement
              placement={placement}
              modifiers={modifiers ? modifiers : []}
              popperStyles={popperStyles}
              styles={popperWidth}
              offset={offsetValue}
              arrowPadding={arrowPadding ? arrowPadding : defaultArrowPadding}
              arrowElem={arrowElem}
              haveArrow={haveArrow}
              referenceNode={referenceNode}
            >
              {popperElement(toggleVisible, visible)}
            </PopperElement>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopperManager);
