import React, { Fragment } from "react";
import { prop, propEq } from "ramda";
import { useChildrenMeasure } from "@worksolutions/react-utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  child,
  disableOutline,
  flex,
  flexShrink,
  flexValue,
  focus,
  height,
  horizontalPadding,
  jc,
  marginRight,
  opacity,
  overflow,
  padding,
  paddingLeft,
  pointer,
  position,
  transition,
  verticalPadding,
  zIndex,
} from "../../styles";
import Wrapper from "../Wrapper";
import Typography from "../Typography";

import ActiveBackplate from "./ActiveBackplate";
import Divider from "./Divider";

import { duration160, duration200 } from "../../constants/durations";
import { makeUniversalIconContent, UniversalSideContentType } from "../../utils/makeUniversalIconContent";

export enum RadioGroupSize {
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export interface RadioGroupItemInterface<CODE extends string | number> {
  title: string;
  code: CODE;
  leftContent?: UniversalSideContentType;
  leftContentStyles?: any;
  styles?: any;
}

export interface RadioGroupInterface<CODE extends string | number> {
  styles?: any;
  itemStyles?: any;
  active: CODE;
  items: RadioGroupItemInterface<CODE>[];
  size?: RadioGroupSize;
  disabled?: boolean;
  onChange: (active: CODE) => void;
}

const sizesByEnum: Record<RadioGroupSize, { height: number; horizontal: number; dividerVerticalPadding: number }> = {
  [RadioGroupSize.MEDIUM]: { height: 30, horizontal: 12, dividerVerticalPadding: 9 },
  [RadioGroupSize.SMALL]: { height: 22, horizontal: 8, dividerVerticalPadding: 5 },
};

function RadioGroups({
  active,
  size = RadioGroupSize.MEDIUM,
  items,
  styles,
  itemStyles: itemStylesProp,
  disabled,
  onChange,
}: RadioGroupInterface<string>) {
  const { initRef, measures } = useChildrenMeasure();
  const widths = React.useMemo(() => measures?.map(prop("width")) || null, [measures]);

  const sizes = sizesByEnum[size];

  const { activeIndex, activeIndexInWidthsArray } = React.useMemo(() => {
    const activeIndex = items.findIndex(propEq("code", active));
    const activeIndexInWidthsArray = activeIndex + activeIndex;
    return { activeIndex, activeIndexInWidthsArray };
  }, [active, items]);

  const lastItemsIndex = React.useMemo(() => items.length - 1, [items]);

  return (
    <Wrapper
      styles={[
        position("relative"),
        flex,
        flexShrink(0),
        borderRadius(50),
        boxShadow([0, 0, 0, 1, "definitions.RadioGroup.borderColor"]),
        backgroundColor("definitions.RadioGroup.backgroundColor"),
        overflow("hidden"),
        padding(1),
        child(transition(`opacity ${duration160}`)),
        disabled && child(opacity(0.3)),
        styles,
      ]}
    >
      <ActiveBackplate activeIndex={activeIndex} activeIndexInWidthsArray={activeIndexInWidthsArray} widths={widths} />
      <Wrapper ref={initRef} styles={[flex, zIndex(1), flexValue(1)]}>
        {items.map(
          ({ code, title, leftContent, leftContentStyles: leftContentStylesProp, styles: itemStyles }, index) => {
            const isActive = activeIndex === index;
            const resultLeftContent = makeUniversalIconContent({
              icon: leftContent,
              styles: [marginRight(8), leftContentStylesProp],
            });

            return (
              <Fragment key={code}>
                <Wrapper
                  as="button"
                  disabled={isActive}
                  styles={[
                    flex,
                    flexValue(1),
                    ai("center"),
                    jc("center"),
                    transition(`box-shadow ${duration200}`),
                    borderRadius(50),
                    disableOutline,
                    borderNone,
                    backgroundColor("transparent"),
                    verticalPadding(0),
                    height(sizes.height),
                    horizontalPadding(sizes.horizontal),
                    !disabled && focus(boxShadow([0, 0, 0, 2, "definitions.RadioGroup.focusBorderColor", true])),
                    leftContent && paddingLeft(8),
                    !isActive && !disabled && pointer,
                    itemStyles,
                    itemStylesProp,
                  ]}
                  onClick={() => !isActive && !disabled && onChange(code)}
                >
                  {resultLeftContent && <Wrapper className="list-item-left-content">{resultLeftContent}</Wrapper>}
                  <Typography
                    styles={transition(`color ${duration200}`)}
                    color={isActive ? "definitions.RadioGroup.activeTextColor" : "definitions.RadioGroup.textColor"}
                    noWrap
                  >
                    {title}
                  </Typography>
                </Wrapper>
                {index !== lastItemsIndex && (
                  <Divider
                    styles={[
                      verticalPadding(sizes.dividerVerticalPadding),
                      opacity(isActive || activeIndex === index + 1 ? 0 : 1),
                    ]}
                  />
                )}
              </Fragment>
            );
          },
        )}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(RadioGroups) as <T extends string | number>(props: RadioGroupInterface<T>) => JSX.Element;
