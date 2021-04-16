import React, { Fragment } from "react";
import { propEq } from "ramda";
import { useChildrenWidthDetector } from "@worksolutions/react-utils";

import {
  borderNone,
  borderRadius,
  disableOutline,
  flex,
  focus,
  horizontalPadding,
  opacity,
  overflow,
  padding,
  pointer,
  position,
  transition,
  verticalPadding,
  zIndex,
  backgroundColor,
  border,
  boxShadow,
  marginRight,
  ai,
  paddingLeft,
} from "../../styles";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { SideContentType } from "../List/ListItem/internal/useRightContent";

import ActiveBackplate from "./ActiveBackplate";
import Divider from "./Divider";
import { makeIcon } from "../List/ListItem/internal/additionalContent";
import Title from "../InputContainer/Title";
import { wrapperStylesByTitlePosition } from "../InputContainer/libs";
import { InputContainerTitlePosition } from "../..";

export enum RadioGroupSize {
  MEDIUM,
  SMALL,
}

export interface RadioGroupItemInterface<CODE extends string | number> {
  title: string;
  code: CODE;
  leftContent?: SideContentType;
  leftContentStyles?: any;
  styles?: any;
}

export interface RadioGroupInterface<CODE extends string | number> {
  styles?: any;
  wrapperStyles?: any;
  active: CODE;
  items: RadioGroupItemInterface<CODE>[];
  size?: RadioGroupSize;
  title?: string;
  titlePosition?: InputContainerTitlePosition;
  onChange: (active: CODE) => void;
}

const paddingBySize: Record<
  RadioGroupSize,
  { vertical: number; horizontal: number; dividerVerticalPadding: number }
> = {
  [RadioGroupSize.MEDIUM]: { vertical: 4, horizontal: 20, dividerVerticalPadding: 9 },
  [RadioGroupSize.SMALL]: { vertical: 0, horizontal: 16, dividerVerticalPadding: 5 },
};

function RadioGroups({
  active,
  size = RadioGroupSize.MEDIUM,
  title,
  titlePosition = InputContainerTitlePosition.TOP,
  items,
  styles,
  wrapperStyles,
  onChange,
}: RadioGroupInterface<string>) {
  const { initRef, widths } = useChildrenWidthDetector();

  const paddingValue = paddingBySize[size];

  const { activeIndex, activeIndexInWidthsArray } = React.useMemo(() => {
    const activeIndex = items.findIndex(propEq("code", active));
    const activeIndexInWidthsArray = activeIndex + activeIndex;
    return { activeIndex, activeIndexInWidthsArray };
  }, [active, items]);

  const lastItemsIndex = React.useMemo(() => items.length - 1, [items]);
  const positioningStyles = wrapperStylesByTitlePosition[titlePosition];

  return (
    <Wrapper styles={[positioningStyles.wrapper, wrapperStyles]}>
      <Title styles={positioningStyles.title} title={title} />
      <Wrapper
        styles={[
          position("relative"),
          flex,
          borderRadius(50),
          border(1, "gray-blue/02"),
          backgroundColor("gray-blue/01"),
          overflow("hidden"),
          padding(1),
          styles,
        ]}
      >
        <ActiveBackplate
          activeIndex={activeIndex}
          activeIndexInWidthsArray={activeIndexInWidthsArray}
          widths={widths}
        />
        <Wrapper ref={initRef} styles={[flex, zIndex(1)]}>
          {items.map(
            ({ code, title, leftContent, leftContentStyles: leftContentStylesProp, styles: itemStyles }, index) => {
              const isActive = activeIndex === index;
              const resultLeftContent = makeIcon(leftContent, [marginRight(8), leftContentStylesProp]);

              return (
                <Fragment key={code}>
                  <Wrapper
                    as="button"
                    disabled={isActive}
                    styles={[
                      flex,
                      ai("center"),
                      transition("box-shadow 0.2s"),
                      borderRadius(50),
                      disableOutline,
                      borderNone,
                      backgroundColor("transparent"),
                      verticalPadding(paddingValue.vertical),
                      horizontalPadding(paddingValue.horizontal),
                      focus(boxShadow([0, 0, 0, 2, "blue/04", true])),
                      leftContent && paddingLeft(4),
                      !isActive && pointer,
                      itemStyles,
                    ]}
                    onClick={() => !isActive && onChange(code)}
                  >
                    {resultLeftContent && <Wrapper className="list-item-left-content">{resultLeftContent}</Wrapper>}
                    <Typography styles={transition("color 0.2s")} color={isActive ? "gray-blue/09" : "gray-blue/07"}>
                      {title}
                    </Typography>
                  </Wrapper>
                  {index !== lastItemsIndex && (
                    <Divider
                      styles={[
                        verticalPadding(paddingValue.dividerVerticalPadding),
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
    </Wrapper>
  );
}

export default React.memo(RadioGroups) as <T extends string | number>(props: RadioGroupInterface<T>) => JSX.Element;
