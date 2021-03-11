import React, { useEffect, useRef, useState } from "react";
import { Popper, Reference } from "react-popper";

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
  popperElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  referenceElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  offset?: [number, number];
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  haveArrow: boolean;
}

function PopperManager({
  popperStyles,
  modifiers,
  placement,
  outsideHandler = true,
  referenceElement,
  popperElement,
  offset,
  arrowPadding,
  arrowElem,
  haveArrow,
}: PopperManagerProps) {
  const referenceNode = useRef();

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
              offset={offset}
              modifiers={modifiers}
              popperStyles={popperStyles}
              arrowPadding={arrowPadding}
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
