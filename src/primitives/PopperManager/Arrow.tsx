import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import Wrapper from "../Wrapper";

import { reactStylesToStylesComponent } from "../../styles/reactStylesToStylesComponent";
import { bottom, left, right, top, transform } from "../../styles";

function getArrowPositionStyles(placement: any, arrowPropsStyle: any, arrowPadding: number) {
  if (!placement) return [];

  const paddingFromPopperEdge = arrowPadding * -1;

  if (placement.startsWith("left")) return [arrowPropsStyle, right(paddingFromPopperEdge)];

  if (placement.startsWith("bottom")) return [arrowPropsStyle, top(paddingFromPopperEdge)];

  if (placement.startsWith("right")) return [arrowPropsStyle, left(paddingFromPopperEdge)];

  if (placement.startsWith("top")) return [arrowPropsStyle, bottom(paddingFromPopperEdge)];

  return arrowPropsStyle;
}

function getArrowStyles(placement: any) {
  if (!placement) return [];

  if (placement.startsWith("top")) return [transform("rotate(180deg)")];

  if (placement.startsWith("left")) return [transform("rotate(90deg)")];

  if (placement.startsWith("right")) return [transform("rotate(-90deg)")];
}

const Triangle = styled.div`
  position: absolute;
  width: 36px;
  height: 17px;
  overflow: hidden;
  left: -18px;
  top: -7px;

  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: 0 2px 6px 0 #0000000f, 0 8px 16px 0 #00000014, 0 0 0 1px #d7dbe5;
    width: 20px;
    height: 20px;
    top: 12px;
    left: 8px;
  }
`;

function Arrow({ arrowProps, placement, arrowPadding, arrowElem }: any) {
  const arrowPopperStyles = useCallback(() => reactStylesToStylesComponent(arrowProps.style), [arrowProps.style]);

  const arrowStyles = useCallback(() => getArrowStyles(placement), [placement]);
  const arrowPositionStyles = useMemo(() => getArrowPositionStyles(placement, arrowPopperStyles, arrowPadding), [
    placement,
    arrowPopperStyles,
    arrowPadding,
  ]);

  return (
    <Wrapper ref={arrowProps.ref} data-popper-arrow styles={arrowPositionStyles}>
      <Wrapper styles={arrowStyles}>{arrowElem ? arrowElem : <Triangle />}</Wrapper>
    </Wrapper>
  );
}

export default React.memo(Arrow);
