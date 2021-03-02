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
import Tab, { TabInterface, tabHorizontalPadding } from "./Tab";

import { duration160 } from "../../constants/durations";

export interface TabsInterface {
  styles?: any;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  tabs: {
    tabItem?: React.FC<TabInterface> | React.ReactNode;
    title: string;
    content: React.ReactNode | React.FC<any>;
  }[];
}

function getLeft(widths: number[], index: number) {
  return sum(widths.slice(0, index)) + tabHorizontalPadding;
}

function Tabs({ activeIndex, styles, tabs, setActiveIndex }: TabsInterface) {
  const { ref, widths } = useChildrenWidthDetector();
  const { content: Content } = tabs[activeIndex] as any; // todo: проверить тип элемента
  const element = React.isValidElement(Content) ? Content : <Content />;

  return (
    <>
      <Wrapper ref={ref} styles={[flex, position("relative"), zIndex(1), styles]}>
        {tabs.map(({ tabItem: TabItem = Tab as any, title }, key) => {
          // todo: проверить тип элемента
          if (React.isValidElement(TabItem)) return TabItem;
          return <TabItem title={title} key={title} active={activeIndex === key} onClick={() => setActiveIndex(key)} />;
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
              backgroundColor("definitions.Tabs.bottomLine.color"),
            ]}
          />
        )}
      </Wrapper>
      {element}
    </>
  );
}

export default React.memo(Tabs);
