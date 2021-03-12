import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { StrictModifiers } from "@popperjs/core";
import { Popper, PopperArrowProps } from "react-popper";

import Wrapper from "../Wrapper";
import Arrow from "./Arrow";

import { backgroundColor, border, borderRadius, boxShadow } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import { zIndex_popup } from "../../constants/zIndexes";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border", "solid"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
    zIndex_popup,
  ];
}

function getModifiers(modifiers: StrictModifiers[], offset?: number) {
  return [
    {
      name: "arrow",
      options: {
        padding: 12,
      },
    },
    ...modifiers,
    {
      name: "offset",
      options: { offset: () => [0, offset] },
    },
  ];
}

interface PopperElementProps {
  offset?: number;
  placement?: Placement;
  children?: React.ReactNode;
  popperStyles?: any;
  styles?: any;
  modifiers: StrictModifiers[];
  arrowPadding: number;
  arrowElem?: React.ReactNode;
  referenceNode?: HTMLElement;
  haveArrow?: boolean;
}

function PopperElement({
  offset,
  placement,
  children,
  popperStyles,
  modifiers,
  arrowPadding,
  arrowElem,
  haveArrow,
  referenceNode,
  styles,
}: PopperElementProps) {
  const resultPopperStyles = useCallback(() => getPopperStyles(), []);
  const resultModifiers = useMemo(() => getModifiers(modifiers, offset), [modifiers, offset]);

  return (
    <Popper placement={placement} modifiers={resultModifiers}>
      {({ ref, style, placement, arrowProps, update }) => (
        <PopperChildren
          ref={ref}
          style={style}
          resultPopperStyles={[resultPopperStyles, popperStyles, styles]}
          placement={placement}
          arrowProps={arrowProps}
          children={children}
          haveArrow={haveArrow}
          arrowPadding={arrowPadding}
          arrowElem={arrowElem}
          update={update}
          referenceNode={referenceNode}
        />
      )}
    </Popper>
  );
}

interface PopperChildrenProps {
  resultPopperStyles?: any;
  placement: Placement;
  children: React.ReactNode;
  style: React.CSSProperties;
  haveArrow?: boolean;
  arrowProps: PopperArrowProps;
  arrowPadding: number;
  arrowElem: React.ReactNode;
  referenceNode?: HTMLElement;
  update: () => void;
}

const PopperChildren = React.memo(
  forwardRef(function (
    {
      style,
      placement,
      resultPopperStyles,
      children,
      haveArrow,
      arrowProps,
      arrowPadding,
      arrowElem,
      referenceNode,
      update,
    }: PopperChildrenProps,
    ref,
  ) {
    function updatePopperWhenResizeReferenceElement() {
      if (!referenceNode) return;

      const resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(referenceNode);

      return () => resizeObserver.disconnect();
    }

    useEffect(update, [haveArrow]);
    useEffect(updatePopperWhenResizeReferenceElement, [referenceNode]);

    return (
      <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
        {children}
        {haveArrow && (
          <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} arrowElem={arrowElem} />
        )}
      </Wrapper>
    );
  }),
);

export default React.memo(PopperElement);
