import React, { useCallback, useRef } from "react";
import { Popper, Reference } from "react-popper";

import { StrictModifiers } from "@popperjs/core";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";
import VisibleManager from "../VisibleManager/VisibleManager";

import {
  backgroundColor,
  border,
  borderBottom,
  borderLeft,
  borderRadius,
  borderRight,
  bottom,
  boxShadow,
  flex,
  height,
  jc,
  left,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  position,
  right,
  textAlign,
  top,
  transform,
  width,
} from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import styled from "styled-components";

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
  const defaultStylesHorizontal = [
    marginLeft("auto"),
    marginRight("auto"),
    left("50%"),
    right("50%"),
    textAlign("center"),
    flex,
    jc("center"),
  ];
  const defaultStylesVertical = [marginTop("auto"), marginBottom("auto"), top(0), bottom(0)];

  console.log(placement.startsWith("right"));
  if (placement.startsWith("bottom")) {
    return [...defaultStylesHorizontal, top(0), transform("translate(50% ,50%)")];
  }
  if (placement.startsWith("top")) {
    return [...defaultStylesHorizontal, bottom(0)];
  }
  if (placement.startsWith("left")) {
    return [...defaultStylesVertical, right(0)];
  }
  if (placement.startsWith("right")) {
    return [...defaultStylesVertical, left(0)];
  }
}

const Triangle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    width: 16px;
    height: 16px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 10px;
    left: 0;
    box-shadow: 0px 2px 6px 0px #0000000f, 0px 8px 16px 0px #00000014, 0px 0px 0px 1px #d7dbe5;
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
              {({ ref, style, placement, arrowProps }) => (
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
