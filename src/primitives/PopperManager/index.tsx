import React, { useCallback, useRef } from "react";
import { Popper, Reference } from "react-popper";
import styled from "styled-components";
import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import {
  backgroundColor,
  border,
  borderRadius,
  bottom,
  boxShadow,
  flex,
  flexColumn,
  jc,
  left,
  padding,
  position,
  right,
  top,
  transform,
} from "../../styles";
import { elevation16Raw } from "../../constants/shadows";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border", "solid"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
    padding(8),
  ];
}

function getArrowStyles(placement: any) {
  const defaultStylesHorizontal = [left("50%"), flex, jc("center")];
  const defaultStylesVertical = [top("50%"), flex, flexColumn, jc("center")];

  if (placement.startsWith("bottom")) {
    return [...defaultStylesHorizontal, top(-10)];
  }
  if (placement.startsWith("top")) {
    return [...defaultStylesHorizontal, bottom(-10), transform("rotate(180deg)")];
  }
  if (placement.startsWith("left")) {
    return [...defaultStylesVertical, right(-5), transform("rotate(90deg)")];
  }
  if (placement.startsWith("right")) {
    return [...defaultStylesVertical, left(-5), transform("rotate(-90deg)")];
  }
}

const Triangle = styled.div`
  position: absolute;
  width: 16px;
  height: 11px;
  overflow: hidden;
  left: -9px;

  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: 0px 2px 6px 0px #0000000f, 0px 8px 16px 0px #00000014, 0px 0px 0px 1px #d7dbe5;
    width: 20px;
    height: 20px;
    top: 5px;
    left: -2px;
  }
`;

interface PopperManagerProps {
  popperStyles?: any;
  placement?: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  popperElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  referenceElement: (toggleVisible: () => void, visible: boolean) => React.ReactNode;
  offset?: [number, number];
}

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
  const arrowElementNode = useRef(null);
  const arrowStyles = useCallback(getArrowStyles, []);
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
              {({ ref, style, placement }) => (
                <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
                  <Wrapper>{popperElement(toggleVisible, visible)}</Wrapper>
                  <Wrapper styles={[position("absolute"), arrowStyles(placement)]}>
                    <Triangle />
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
