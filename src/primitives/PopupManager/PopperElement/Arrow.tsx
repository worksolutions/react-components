import React, { useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import { PopperArrowProps } from "primitives/Popper/Popper";
import Wrapper from "../../Wrapper";

import { bottom, boxShadow, child, left, right, top, transform, zIndex } from "../../../styles";
import { reactStylesToStylesComponent } from "../../../styles/reactStylesToStylesComponent";
import { elevation16Raw } from "../../../constants/shadows";
import Icon from "../../Icon";

export const popupArrowSize = 8;

function getArrowPositionStyles(placement: Placement) {
  if (!placement) return null;

  const invertedArrowPadding = popupArrowSize * -1;

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

interface PopupArrowInterface {
  arrowProps: PopperArrowProps;
  placement: Placement;
}

function Arrow({ arrowProps, placement }: PopupArrowInterface) {
  const arrowPopperStyles = useCallback(() => reactStylesToStylesComponent(arrowProps.style), [arrowProps.style]);
  const arrowPositionStyles = useMemo(() => getArrowPositionStyles(placement), [placement]);
  const arrowStyles = useMemo(() => getArrowStyles(placement), [placement]);

  return (
    <Wrapper ref={arrowProps.ref} data-popper-arrow styles={[arrowPopperStyles, arrowPositionStyles, arrowStyles]}>
      <Icon
        icon="tooltip-triangle"
        width={16}
        height={8}
        color="white"
        styles={[
          zIndex(2),
          child(boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadowColor", true]), "use"),
        ]}
      />
    </Wrapper>
  );
}

export default React.memo(Arrow);
