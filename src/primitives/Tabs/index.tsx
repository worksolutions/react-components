import React, { ReactNode } from "react";
import { sum } from "ramda";
import { isReactComponent, useChildrenWidthDetector } from "@worksolutions/react-utils";

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
import Tab, { TabItemInterface, tabHorizontalPadding } from "./Tab";

import { duration160 } from "../../constants/durations";
import { isPureObject } from "@worksolutions/utils";

export interface TabInterface {
  tabItem?: React.FC<TabItemInterface> | React.ReactNode;
  title: string;
  content: React.FC<any> | React.ReactNode;
}

export interface TabsInterface {
  styles?: any;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  tabs: TabInterface[];
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index)) + tabHorizontalPadding;
}

function Tabs({ activeIndex, styles, tabs, setActiveIndex }: TabsInterface) {
  const { ref, widths } = useChildrenWidthDetector();
  const { content: Content } = tabs[activeIndex];
  const element = isReactComponent(Content) ? <Content /> : Content;

  return (
    <>
      <Wrapper ref={ref} styles={[flex, position("relative"), zIndex(1), styles]}>
        {tabs.map(({ tabItem: TabItem = Tab, title }, key) => {
          if (!isReactComponent(TabItem)) return TabItem;
          // Почему-то если указать TabItem по умолчанию, итоговый тип TabItem будет === {} | null
          // @ts-ignore
          return <TabItem key={title} title={title} active={activeIndex === key} onClick={() => setActiveIndex(key)} />;
        })}
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
              backgroundColor("definitions.Tabs.BottomLine.color"),
            ]}
          />
        )}
      </Wrapper>
      {element}
    </>
  );
}

export default React.memo(Tabs);
