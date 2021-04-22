import React from "react";
import { sum } from "ramda";
import { isReactComponent, useChildrenWidthDetector } from "@worksolutions/react-utils";

import {
  backgroundColor,
  borderRadius,
  bottom,
  firstChild,
  flex,
  height,
  lastChild,
  left,
  paddingLeft,
  paddingRight,
  position,
  transition,
  width,
} from "../../styles";

import Wrapper from "../Wrapper";
import Tab, { tabHorizontalPadding, TabItemInterface } from "./Tab";

import { duration160 } from "../../constants/durations";

export interface TabInterface {
  tabItem?: React.FC<TabItemInterface> | React.ReactNode;
  title: string;
  content: React.FC<any> | React.ReactNode;
}

export interface TabsInterface {
  useResizeObserverForBottomLineWidthDetect?: boolean;
  outerStyles?: any;
  tabsListWrapperStyles?: any;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  tabs: TabInterface[];
}

function getBottomLineStyles(widths: number[], index: number) {
  const leftBasePosition = sum(widths.slice(0, index));
  if (index === 0) return [width(widths[index] - tabHorizontalPadding), left(leftBasePosition)];
  if (index === widths.length - 1)
    return [width(widths[index] - tabHorizontalPadding), left(leftBasePosition + tabHorizontalPadding)];

  return [width(widths[index] - 2 * tabHorizontalPadding), left(leftBasePosition + tabHorizontalPadding)];
}

function Tabs({
  activeIndex,
  outerStyles,
  tabsListWrapperStyles,
  tabs,
  useResizeObserverForBottomLineWidthDetect = false,
  setActiveIndex,
}: TabsInterface) {
  const { initRef, widths } = useChildrenWidthDetector(useResizeObserverForBottomLineWidthDetect);
  const { content: Content } = tabs[activeIndex];
  const element = isReactComponent(Content) ? <Content /> : Content;

  return (
    <>
      <Wrapper styles={[position("relative"), outerStyles]}>
        <Wrapper
          ref={initRef}
          styles={[flex, firstChild(paddingLeft(0)), lastChild(paddingRight(0)), tabsListWrapperStyles]}
        >
          {tabs.map(({ tabItem: TabItem = Tab, title }, key) => {
            if (!isReactComponent(TabItem)) return TabItem;
            return (
              // Почему-то если указать TabItem по умолчанию, итоговый тип TabItem будет === {} | null
              // @ts-ignore
              <TabItem key={title} title={title} active={activeIndex === key} onClick={() => setActiveIndex(key)} />
            );
          })}
        </Wrapper>
        {widths && widths.length !== 0 && (
          <Wrapper
            styles={[
              borderRadius(2),
              transition(`left ${duration160}, width ${duration160}`),
              position("absolute"),
              getBottomLineStyles(widths, activeIndex),
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
