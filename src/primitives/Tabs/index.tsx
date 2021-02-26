import React, { ReactNode } from "react";
import { sum } from "ramda";
import { useChildrenWidthDetector } from "@worksolutions/react-utils";

import {
  borderRadius,
  bottom,
  flex,
  height,
  left,
  position,
  transition,
  width,
  zIndex,
  backgroundColor,
} from "../../styles";

import Wrapper from "../Wrapper";

import { tabHorizontalPadding } from "./Tab";
import { duration160 } from "../../constants/durations";

export interface TabsInterface {
  styles?: any;
  activeIndex: number;
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index)) + tabHorizontalPadding;
}

function Tabs({ activeIndex, styles, children }: TabsInterface & { children: React.ReactNode }) {
  const { ref, widths } = useChildrenWidthDetector();
  const Component = (React.Children.toArray(children)[activeIndex] as JSX.Element).props.renderContent;
  const element = <Component />;
  const elementsCache = React.useRef<ReactNode[]>([]);

  React.useEffect(() => {
    if (elementsCache.current[activeIndex]) return;
    elementsCache.current[activeIndex] = element;
  }, [activeIndex]);

  return (
    <>
      <Wrapper ref={ref} styles={[flex, position("relative"), zIndex(1), styles]}>
        {children}
        {widths && widths.length !== 0 && (
          <Wrapper
            styles={[
              borderRadius(2),
              transition(`left ${duration160}, width ${duration160}`),
              left(getLeft(widths, activeIndex)),
              position("absolute"),
              width(widths[activeIndex] - tabHorizontalPadding * 2),
              bottom(-1),
              height(2),
              backgroundColor("definitions.Tabs.bottomLineColor"),
            ]}
          />
        )}
      </Wrapper>
      {elementsCache.current[activeIndex] || element}
    </>
  );
}

export default React.memo(Tabs);
