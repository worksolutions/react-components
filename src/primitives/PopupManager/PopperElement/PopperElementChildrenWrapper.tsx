import React, { forwardRef, Ref, useEffect } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { useEffectSkipFirst } from "@worksolutions/react-utils";
import { PopperArrowProps } from "react-popper";

import Wrapper from "../../Wrapper";
import Arrow from "./Arrow";

interface PopperChildrenProps {
  styles?: any;
  style: React.CSSProperties;
  placement: Placement;
  children: React.ReactNode;
  hasArrow?: boolean;
  arrowProps: PopperArrowProps;
  arrowPadding: number;
  triggerElement: HTMLElement | undefined;
  update: () => void;
}

function PopperElementChildrenWrapper(
  {
    style,
    placement,
    styles,
    children,
    hasArrow,
    arrowProps,
    arrowPadding,
    triggerElement,
    update,
  }: PopperChildrenProps,
  ref: Ref<HTMLElement>,
) {
  useEffectSkipFirst(update, [update, hasArrow]);

  useEffect(() => {
    if (!triggerElement) return () => {};

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(triggerElement);
    return () => resizeObserver.disconnect();
  }, [triggerElement, update]);

  return (
    <Wrapper ref={ref} style={style} data-placement={placement} styles={styles}>
      {children}
      {hasArrow && <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} />}
    </Wrapper>
  );
}

export default React.memo(React.forwardRef(PopperElementChildrenWrapper));
