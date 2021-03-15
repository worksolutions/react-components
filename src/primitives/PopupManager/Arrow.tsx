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

  const invertedArrowPadding = arrowPadding * -1;

  if (placement.startsWith("left")) return right(invertedArrowPadding);
  if (placement.startsWith("bottom")) return top(invertedArrowPadding);
  if (placement.startsWith("right")) return left(invertedArrowPadding);
  if (placement.startsWith("top")) return bottom(invertedArrowPadding);

  return null;
}

function getArrowStyles(placement: Placement) {
  if (!placement) return null;

  if (placement.startsWith("top")) return transform("rotate(180deg)");
  if (placement.startsWith("left")) return transform("rotate(90deg)");
  if (placement.startsWith("right")) return transform("rotate(-90deg)");

  return null;
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

interface PopupArrowInterface {
  arrowProps: PopperArrowProps;
  placement: Placement;
  arrowPadding: number;
}

function Arrow({ arrowProps, placement, arrowPadding }: PopupArrowInterface) {
  const arrowPopperStyles = useCallback(() => reactStylesToStylesComponent(arrowProps.style), [arrowProps.style]);

  const arrowStyles = useMemo(() => getArrowStyles(placement), [placement]);
  const arrowPositionStyles = useMemo(() => getArrowPositionStyles(placement, arrowPadding), [placement, arrowPadding]);

  return (
    <Wrapper ref={arrowProps.ref} data-popper-arrow styles={[arrowPopperStyles, arrowPositionStyles]}>
      <Wrapper styles={arrowStyles}>
        <Triangle />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(Arrow);
