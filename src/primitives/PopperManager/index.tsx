import React, { useMemo, useRef } from "react";
import { Reference } from "react-popper";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import PopperElement from "./PopperElement";

interface PopperManagerProps {
  popperStyles?: any;
  placement?: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  offset?: [number, number];
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  haveArrow?: boolean;
  popperElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  referenceElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}

const defaultOffset: [number, number] = [0, 4];
const defaultOffsetWithArrow: [number, number] = [0, 14];
const defaultArrowPadding = 10;

function setOffset(offset?: [number, number], haveArrow?: boolean) {
  if (offset) return offset;
  if (haveArrow) return defaultOffsetWithArrow;
  return defaultOffset;
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
}: PopperManagerProps) {
  const referenceNode = useRef();
  const offsetValue = useMemo(() => setOffset(offset, haveArrow), [haveArrow, offset]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>
            {({ ref }) => (
              <Wrapper ref={referenceNode}>
                <Wrapper ref={ref}>{referenceElement(toggleVisible, visible)}</Wrapper>
              </Wrapper>
            )}
          </Reference>
          {visible && (
            <PopperElement
              placement={placement}
              modifiers={modifiers ? modifiers : []}
              popperStyles={popperStyles}
              offset={offsetValue}
              arrowPadding={arrowPadding ? arrowPadding : defaultArrowPadding}
              arrowElem={arrowElem}
              haveArrow={haveArrow}
              referenceNode={referenceNode.current}
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
