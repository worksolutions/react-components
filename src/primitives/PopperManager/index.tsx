import React, { useEffect, useState } from "react";
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
  arrowPadding: number;
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
}: PopperManagerProps) {
  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>{({ ref }) => <Wrapper ref={ref}>{referenceElement(toggleVisible, visible)}</Wrapper>}</Reference>
          {visible && (
            <PopperElement
              placement={placement}
              offset={offset}
              popperElement={popperElement}
              modifiers={modifiers}
              popperStyles={popperStyles}
              arrowPadding={arrowPadding}
            />
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopperManager);
