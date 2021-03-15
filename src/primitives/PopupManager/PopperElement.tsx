import React, { useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { StrictModifiers } from "@popperjs/core";
import { Popper } from "react-popper";

import { backgroundColor, border, borderRadius, boxShadow } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import { zIndex_popup } from "../../constants/zIndexes";
import PopperChildren from "./PopperChildren";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
    zIndex_popup,
  ];
}
const arrowPaddingFromEdgesPopper = 12;

function getModifiers(modifiers?: StrictModifiers[], offset?: number) {
  return [
    {
      name: "arrow",
      options: {
        padding: arrowPaddingFromEdgesPopper,
      },
    },
    ...(modifiers || []),
    {
      name: "offset",
      options: { offset: () => [0, offset] },
    },
  ];
}

interface PopperElementProps {
  popperStyles?: any;
  styles?: any;
  offset?: number;
  primaryPlacement?: Placement;
  children?: React.ReactNode;
  modifiers?: StrictModifiers[];
  arrowPadding: number;
  arrowElem?: React.ReactNode;
  referenceNode?: HTMLElement;
  hasArrow?: boolean;
}

function PopperElement({
  popperStyles,
  styles,
  offset,
  primaryPlacement,
  children,
  modifiers,
  arrowPadding,
  arrowElem,
  hasArrow,
  referenceNode,
}: PopperElementProps) {
  const resultPopperStyles = useCallback(getPopperStyles, []);
  const resultModifiers = useMemo(() => getModifiers(modifiers, offset), [modifiers, offset]);

  return (
    <Popper placement={primaryPlacement} modifiers={resultModifiers}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperChildren
          ref={ref}
          style={style}
          resultPopperStyles={[resultPopperStyles, popperStyles, styles]}
          placement={placement}
          arrowProps={arrowProps}
          children={children}
          haveArrow={hasArrow}
          arrowPadding={arrowPadding}
          arrowElem={arrowElem}
          update={update}
          referenceNode={referenceNode}
        />
      )}
    </Popper>
  );
}

export default React.memo(PopperElement);
