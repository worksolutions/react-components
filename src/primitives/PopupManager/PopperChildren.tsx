import { Placement } from "@popperjs/core/lib/enums";
import React, { forwardRef, useEffect } from "react";
import { PopperArrowProps } from "react-popper";

import Wrapper from "../Wrapper";
import Arrow from "./Arrow";

interface PopperChildrenProps {
  resultPopperStyles?: any;
  style: React.CSSProperties;
  placement: Placement;
  children: React.ReactNode;
  haveArrow?: boolean;
  arrowProps: PopperArrowProps;
  arrowPadding: number;
  arrowElem: React.ReactNode;
  referenceNode?: HTMLElement;
  update: () => void;
}

const PopperChildren = forwardRef(function (
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
    if (!referenceNode) return () => {};

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
});

export default React.memo(PopperChildren);
