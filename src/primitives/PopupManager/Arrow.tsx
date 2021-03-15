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

function getArrowPositionStyles(placement: Placement, arrowPadding: number) {
  if (!placement) return null;

  const paddingFromPopperEdge = arrowPadding * -1;

  if (placement.startsWith("left")) return right(paddingFromPopperEdge);

  if (placement.startsWith("bottom")) return top(paddingFromPopperEdge);

  if (placement.startsWith("right")) return left(paddingFromPopperEdge);

  if (placement.startsWith("top")) return bottom(paddingFromPopperEdge);

  return null;
}

function getArrowStyles(placement: Placement) {
  if (!placement) return null;

  if (placement.startsWith("top")) return transform("rotate(180deg)");

  if (placement.startsWith("left")) return transform("rotate(90deg)");

  if (placement.startsWith("right")) return transform("rotate(-90deg)");
}

const Triangle = React.memo(function () {
  return (
    <Wrapper styles={[position("absolute"), width(30), height(17), overflow("hidden"), left(-15), top(-6)]}>
      <Wrapper
        styles={[
          position("absolute"),
          zIndex(2),
          backgroundColor("white"),
          transform("rotate(45deg)"),
          boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadowColor"]),
          width(16),
          height(16),
          left(7),
          top(11),
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

  const arrowStyles = useMemo(() => getArrowStyles(placement), [placement]);
  const arrowPositionStyles = useMemo(() => getArrowPositionStyles(placement, arrowPadding), [placement, arrowPadding]);

  return (
    <Wrapper ref={arrowProps.ref} data-popper-arrow styles={[arrowPopperStyles, arrowPositionStyles]}>
      <Wrapper styles={arrowStyles}>{arrowElem ? arrowElem : <Triangle />}</Wrapper>
    </Wrapper>
  );
}

export default React.memo(Arrow);
