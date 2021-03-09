import React, { useCallback } from "react";
import { Popper, Reference } from "react-popper";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import { backgroundColor, border, borderRadius, boxShadow, overflowY, padding } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border", "solid"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
    padding(8),
    overflowY("scroll"),
  ];
}

interface PopperManagerProps {
  popperStyles?: any;
  placement?: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  popperElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  referenceElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
}
//TODO добавть возможность использовать стрелку
function PopperManager({
  popperStyles,
  modifiers,
  placement,
  outsideHandler = true,
  referenceElement,
  popperElement,
}: PopperManagerProps) {
  const resultPopperStyles = useCallback(() => popperStyles || getPopperStyles(), [popperStyles]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>{({ ref }) => <Wrapper ref={ref}>{referenceElement(toggleVisible, visible)}</Wrapper>}</Reference>
          {visible && (
            <Popper placement={placement} modifiers={modifiers}>
              {({ ref, style, placement }) => (
                <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
                  {popperElement(toggleVisible, visible)}
                </Wrapper>
              )}
            </Popper>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(PopperManager);
