import React, { forwardRef, Ref, useEffect } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { PopperArrowProps } from "react-popper";

import Wrapper from "../../Wrapper";
import Arrow from "../Arrow";

interface PopperChildrenProps {
  styles?: any;
  style: React.CSSProperties;
  placement: Placement;
  children: React.ReactNode;
  hasArrow?: boolean;
  arrowProps: PopperArrowProps;
  arrowPadding: number;
  mainWrapperElement: HTMLElement | undefined;
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
    mainWrapperElement,
    update,
  }: PopperChildrenProps,
  ref: Ref<HTMLElement>,
) {
  useEffect(update, [update, hasArrow]);

  useEffect(() => {
    if (!mainWrapperElement) return () => {};

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(mainWrapperElement);

    return () => resizeObserver.disconnect();
  }, [mainWrapperElement, update]);

  return (
    <Wrapper ref={ref} style={style} data-placement={placement} styles={styles}>
      {children}
      {hasArrow && <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} />}
    </Wrapper>
  );
});

export default React.memo(PopperChildrenWrapper);
