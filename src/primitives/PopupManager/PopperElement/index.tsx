import React, { Ref, useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core";
import { Popper as ReactPopper } from "react-popper";

import { backgroundColor, borderRadius, boxShadow } from "../../../styles";
import { elevation16Raw } from "../../../constants/shadows";
import { zIndex_popup } from "../../../constants/zIndexes";
import PopperElementChildrenWrapper from "./PopperElementChildrenWrapper";

function getPopperStyles() {
  return [
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadowColor"]),
    borderRadius(6),
    zIndex_popup,
  ];
}
const modifierArrowPadding = 12;

function getModifiers(offset?: number) {
  return [
    {
      name: "arrow",
      options: {
        padding: modifierArrowPadding,
      },
    },
    {
      name: "offset",
      options: { offset: () => [0, offset] },
    },
  ];
}

interface PopperElementInterface {
  styles?: any;
  offset?: number;
  primaryPlacement?: Placement;
  children?: React.ReactNode;
  arrowPadding?: number;
  triggerElement: HTMLElement | undefined;
  hasArrow?: boolean;
  strategy?: PositioningStrategy;
}

const defaultOffsets = {
  withArrow: 14,
  withoutArrow: 4,
};

const defaultArrowPadding = 10;

function getOffset(incomeOffset?: number, hasArrow?: boolean) {
  if (incomeOffset) return incomeOffset;
  if (hasArrow) return defaultOffsets.withArrow;
  return defaultOffsets.withoutArrow;
}

function PopperElement(
  {
    styles,
    offset: offsetProp,
    primaryPlacement,
    children,
    arrowPadding = defaultArrowPadding,
    hasArrow,
    triggerElement,
    strategy,
  }: PopperElementInterface,
  ref: Ref<HTMLElement | undefined>,
) {
  const popperStyles = useCallback(getPopperStyles, []);
  const offset = useMemo(() => getOffset(offsetProp, hasArrow), [hasArrow, offsetProp]);
  const popperModifiers = useMemo(() => getModifiers(offset), [offset]);

  return (
    <ReactPopper placement={primaryPlacement} modifiers={popperModifiers} strategy={strategy} innerRef={ref}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperElementChildrenWrapper
          ref={ref}
          style={style}
          styles={[popperStyles, styles]}
          placement={placement}
          arrowProps={arrowProps}
          hasArrow={hasArrow}
          arrowPadding={arrowPadding}
          update={update}
          triggerElement={triggerElement}
        >
          {children}
        </PopperElementChildrenWrapper>
      )}
    </ReactPopper>
  );
}

export default React.memo(React.forwardRef(PopperElement));
