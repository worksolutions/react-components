import React, { useCallback, useRef, useState } from "react";
import { Popper, Reference } from "react-popper";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import { backgroundColor, border, borderRadius, boxShadow, height, overflowY, padding, width } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import styled from "styled-components";

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
  offset?: [number, number];
}
//TODO добавть возможность использовать стрелку
function PopperManager({
  popperStyles,
  modifiers,
  placement,
  outsideHandler = true,
  referenceElement,
  popperElement,
  offset,
}: PopperManagerProps) {
  const resultPopperStyles = useCallback(() => popperStyles || getPopperStyles(), [popperStyles]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible, toggleVisible) => (
        <>
          <Reference>{({ ref }) => <Wrapper ref={ref}>{referenceElement(toggleVisible, visible)}</Wrapper>}</Reference>
          {visible && (
            <Popper
              placement={placement}
              modifiers={[
                // @ts-ignore
                ...modifiers,
                {
                  name: "offset",
                  options: {
                    offset: () => offset,
                  },
                },
              ]}
            >
              {({ ref, style, placement, arrowProps }) => (
                <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
                  {popperElement(toggleVisible, visible)}
                  <Wrapper>
                    <Wrapper id="arrow" data-popper-arrow styles={[backgroundColor("black"), width(15), height(15)]} />
                  </Wrapper>
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
