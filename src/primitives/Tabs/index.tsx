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

import Tab, { tabHorizontalPadding } from "./Tab";
import { duration160 } from "../../constants/durations";
import { Colors } from "../../constants/colors";

export interface TabsInterface {
  styles?: any;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  items: {
    title: string | React.ReactNode;
    render: React.FC<any>;
  }[];
  bottomLineColor?: Colors;
  tabBackgroundColor?: Colors;
  tabTitleColor?: Colors;
  tabTitleHoverColor?: Colors;
  tabTitleActiveColor?: Colors;
  activeTabTitleColor?: Colors;
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index)) + tabHorizontalPadding;
}

function Tabs({
  activeIndex,
  setActiveIndex,
  items,
  styles,
  bottomLineColor = "blue/05",
  tabBackgroundColor,
  tabTitleColor,
  tabTitleHoverColor,
  tabTitleActiveColor,
  activeTabTitleColor,
}: TabsInterface) {
  const { ref, widths } = useChildrenWidthDetector();

  const Component = items[activeIndex].render;
  const element = <Component />;
  const elementsCache = React.useRef<ReactNode[]>([]);

  React.useEffect(() => {
    if (elementsCache.current[activeIndex]) return;
    elementsCache.current[activeIndex] = element;
  }, [activeIndex]);

  return (
    <>
      <Wrapper ref={ref} styles={[flex, position("relative"), zIndex(1), styles]}>
        {items.map(({ title }, key) => (
          <Tab
            key={key}
            active={activeIndex === key}
            title={title}
            onClick={() => setActiveIndex(key)}
            tabBackgroundColor={tabBackgroundColor}
            tabTitleColor={tabTitleColor}
            tabTitleHoverColor={tabTitleHoverColor}
            tabTitleActiveColor={tabTitleActiveColor}
            activeTabTitleColor={activeTabTitleColor}
          />
        ))}
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
              backgroundColor(bottomLineColor),
            ]}
          />
        )}
      </Wrapper>
      {elementsCache.current[activeIndex] || element}
    </>
  );
}

export default React.memo(Tabs);
