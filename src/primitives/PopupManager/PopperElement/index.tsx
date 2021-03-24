import React, { Ref, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core";

import { Popper as ReactPopper } from "react-popper";
import { zIndex_popup } from "../../../constants/zIndexes";
import PopperElementChildrenWrapper from "./PopperElementChildrenWrapper";
import { popupArrowSize } from "./Arrow";

const commonPopperStyles = [zIndex_popup];

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
  triggerElement: HTMLElement | undefined;
  hasArrow?: boolean;
  strategy?: PositioningStrategy;
}

function getOffset(incomeOffset?: number, hasArrow?: boolean) {
  if (incomeOffset) return incomeOffset;
  if (hasArrow) return 4 + popupArrowSize;
  return 4;
}

function PopperElement(
  {
    styles,
    offset: offsetProp,
    primaryPlacement,
    children,
    hasArrow,
    triggerElement,
    strategy,
  }: PopperElementInterface,
  ref: Ref<HTMLElement | undefined>,
) {
  const offset = useMemo(() => getOffset(offsetProp, hasArrow), [hasArrow, offsetProp]);
  const popperModifiers = useMemo(() => getModifiers(offset), [offset]);

  return (
    <ReactPopper placement={primaryPlacement} modifiers={popperModifiers} strategy={strategy} innerRef={ref}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperElementChildrenWrapper
          ref={ref}
          style={style}
          styles={[commonPopperStyles, styles]}
          placement={placement}
          arrowProps={arrowProps}
          hasArrow={hasArrow}
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
