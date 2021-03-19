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
  triggerWrapperElement: HTMLElement | undefined;
  update: () => void;
}

const PopperChildrenWrapper = forwardRef(function (
  {
    style,
    placement,
    styles,
    children,
    hasArrow,
    arrowProps,
    arrowPadding,
    triggerWrapperElement,
    update,
  }: PopperChildrenProps,
  ref: Ref<HTMLElement>,
) {
  useEffectSkipFirst(update, [update, hasArrow]);

  useEffect(() => {
    if (!triggerWrapperElement) return () => {};

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(triggerWrapperElement);

    return () => resizeObserver.disconnect();
  }, [triggerWrapperElement, update]);

  return (
    <Wrapper ref={ref} style={style} data-placement={placement} styles={styles}>
      {children}
      {hasArrow && <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} />}
    </Wrapper>
  );
});

export default React.memo(PopperChildrenWrapper);
