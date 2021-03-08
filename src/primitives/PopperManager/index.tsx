import React from "react";
import { Modifier, Popper, Reference } from "react-popper";
import Wrapper from "../Wrapper";

import VisibleManager from "../Dropdown/VisibleManager/VisibleManager";
import { Placement } from "@popperjs/core/lib/enums";

interface PopperManagerProps {
  placement: Placement;
  modifiers: ReadonlyArray<Modifier<unknown>>;
  popperElement: (...args: any) => JSX.Element;
  referenceElement: (visible: boolean, toggleVisible: () => void) => JSX.Element;
  outsideHandler: boolean;
}

function PopperManager({
  referenceElement,
  popperElement,
  modifiers,
  placement,
  outsideHandler = true,
}: PopperManagerProps) {
  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>{({ ref }) => <Wrapper ref={ref}>{referenceElement(visible, toggleVisible)}</Wrapper>}</Reference>
          {visible && (
            <Popper placement={placement} modifiers={modifiers}>
              {({ ref, style, placement }) => {
                return (
                  <Wrapper ref={ref} style={style} data-placement={placement}>
                    {popperElement(visible, toggleVisible)}
                  </Wrapper>
                );
              }}
            </Popper>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopperManager);
