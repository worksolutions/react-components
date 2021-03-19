import React, { useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy, StrictModifiers } from "@popperjs/core";
import { Popper } from "react-popper";

import { backgroundColor, borderRadius, boxShadow } from "../../../styles";
import { elevation16Raw } from "../../../constants/shadows";
import { zIndex_popup } from "../../../constants/zIndexes";
import PopperChildrenWrapper from "./PopperChildrenWrapper";

function getPopperStyles() {
  return [
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadowColor"]),
    borderRadius(6),
    zIndex_popup,
  ];
}
const modifierArrowPadding = 12;

function getModifiers(modifiers: StrictModifiers[] = [], offset?: number) {
  return [
    {
      name: "arrow",
      options: {
        padding: modifierArrowPadding,
      },
    },
    ...modifiers,
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
  modifiers?: StrictModifiers[];
  arrowPadding: number;
  triggerWrapperElement: HTMLElement | undefined;
  hasArrow?: boolean;
  strategy?: PositioningStrategy;
}

function PopperElement({
  styles,
  offset,
  primaryPlacement,
  children,
  modifiers,
  arrowPadding,
  hasArrow,
  triggerWrapperElement,
  strategy,
}: PopperElementInterface) {
  const popperStyles = useCallback(getPopperStyles, []);
  const popperModifiers = useMemo(() => getModifiers(modifiers, offset), [modifiers, offset]);

  return (
    <Popper placement={primaryPlacement} modifiers={popperModifiers} strategy={strategy}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperChildrenWrapper
          ref={ref}
          style={style}
          styles={[popperStyles, styles]}
          placement={placement}
          arrowProps={arrowProps}
          hasArrow={hasArrow}
          arrowPadding={arrowPadding}
          update={update}
          triggerWrapperElement={triggerWrapperElement}
        >
          {children}
        </PopperChildrenWrapper>
      )}
    </Popper>
  );
}

export default React.memo(PopperElement);
