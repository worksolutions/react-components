import React, { Ref, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { PositioningStrategy } from "@popperjs/core";
import popperMaxSizeModifier from "popper-max-size-modifier";

// import { Modifier, Popper } from "react-popper";
import { Modifier } from "react-popper";
import { zIndex_popup } from "../../../constants/zIndexes";
import PopperElementChildrenWrapper from "./PopperElementChildrenWrapper";
import { popupArrowSize } from "./Arrow";
import { Popper } from "../../Popper/Popper";

const commonPopperStyles = [zIndex_popup];

const modifierArrowPadding = 12;

function getModifiers(offset?: number): Modifier<string>[] {
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
    popperMaxSizeModifier,
    {
      name: "applyMaxSize",
      enabled: true,
      phase: "beforeWrite",
      requires: ["maxSize"],
      fn({ state }) {
        const { height } = state.modifiersData.maxSize;
        state.styles.popper.maxHeight = `${height - 16}px`;
      },
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
    <Popper
      referenceElement={triggerElement}
      placement={primaryPlacement}
      modifiers={popperModifiers as any}
      strategy={strategy}
      innerRef={ref}
    >
      {({ ref, style, placement, arrowProps, update }) => {
        console.log({ ref, style, placement, arrowProps, update });
        return (
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
        );
      }}
    </Popper>
  );
}

export default React.memo(React.forwardRef(PopperElement));
