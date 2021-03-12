import React, { useCallback, useMemo } from "react";
import { PopperArrowProps } from "react-popper";
import { Placement } from "@popperjs/core/lib/enums";

import Wrapper from "../Wrapper";

import {
  backgroundColor,
  bottom,
  boxShadow,
  height,
  left,
  overflow,
  position,
  right,
  top,
  transform,
  width,
  zIndex,
} from "../../styles";
import { reactStylesToStylesComponent } from "../../styles/reactStylesToStylesComponent";
import { elevation16Raw } from "../../constants/shadows";

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

const Triangle = React.memo(function () {
  return (
    <Wrapper styles={[position("absolute"), width(36), height(17), overflow("hidden"), left(-22), top(-7)]}>
      <Wrapper
        styles={[
          position("absolute"),
          zIndex(2),
          backgroundColor("white"),
          transform("rotate(45deg)"),
          boxShadow(...elevation16Raw, [0, 0, 0, 1, "gray-blue/02"]),
          width(20),
          height(20),
          left(12),
          top(12),
        ]}
      />
    </Wrapper>
  );
});

interface ArrowProps {
  arrowProps: PopperArrowProps;
  placement: Placement;
  arrowPadding: number;
  arrowElem: React.ReactNode;
}

function Arrow({ arrowProps, placement, arrowPadding, arrowElem }: ArrowProps) {
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
