import React, { Ref, useEffect } from "react";
import { Placement } from "@popperjs/core/lib/enums";
import { useEffectSkipFirst } from "@worksolutions/react-utils";

import Wrapper from "../../Wrapper";
import Arrow from "./Arrow";
import { PopperArrowProps } from "../../Popper/Popper";

interface PopperChildrenProps {
  styles?: any;
  style: CSSStyleDeclaration;
  placement: Placement;
  children: React.ReactNode;
  hasArrow?: boolean;
  arrowProps: PopperArrowProps;
  triggerElement: HTMLElement | undefined;
  update: () => void;
}

function PopperElementChildrenWrapper(
  { style, placement, styles, children, hasArrow, arrowProps, triggerElement, update }: PopperChildrenProps,
  ref: Ref<HTMLElement>,
) {
  useEffectSkipFirst(update, [update, hasArrow]);

  useEffect(update, []);
  useEffect(() => {
    if (!triggerElement) return () => {};

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(triggerElement);
    return () => resizeObserver.disconnect();
  }, [triggerElement, update]);

  return (
    <Wrapper ref={ref} style={style} data-placement={placement} styles={styles}>
      {children}
      {hasArrow && <Arrow arrowProps={arrowProps} placement={placement} />}
    </Wrapper>
  );
}

export default React.memo(React.forwardRef(PopperElementChildrenWrapper));
