import React from "react";
import { prop, sum } from "ramda";
import { isReactComponent, useChildrenMeasure } from "@worksolutions/react-utils";

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
import Tab, { tabHorizontalPadding, TabComponentInterface } from "./Tab";

import { duration160 } from "../../constants/durations";

export type TabsListItemInterface<T extends Object = {}> = Omit<
  TabComponentInterface<T>,
  "onClick" | "title" | "active" | "updateSizes"
> & {
  tabItemComponent?: React.FC<TabComponentInterface<T>>;
  title: string;
  children: React.FC<any> | React.ReactNode;
};

export interface TabsInterface<T extends Object = {}> {
  useResizeObserverForBottomLineWidthDetect?: boolean;
  outerStyles?: any;
  tabsListWrapperStyles?: any;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  tabs: TabsListItemInterface<T>[];
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
  const { initRef, measures, update } = useChildrenMeasure(useResizeObserverForBottomLineWidthDetect);
  const widths = React.useMemo(() => measures?.map(prop("width")), [measures]);

  const { children: Content } = tabs[activeIndex];
  const element = isReactComponent(Content) ? <Content /> : Content;

  return (
    <>
      <Wrapper styles={[position("relative"), outerStyles]}>
        <Wrapper
          ref={initRef}
          styles={[flex, firstChild(paddingLeft(0)), lastChild(paddingRight(0)), tabsListWrapperStyles]}
        >
          {tabs.map(({ tabItemComponent: TabItem = Tab, title, children, ...otherProps }, key) => (
            <TabItem
              key={title}
              title={title}
              active={activeIndex === key}
              onClick={() => setActiveIndex(key)}
              updateSizes={update}
              {...otherProps}
            />
          ))}
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

export default React.memo(Tabs) as <T extends Object = {}>(props: TabsInterface<T>) => JSX.Element;
