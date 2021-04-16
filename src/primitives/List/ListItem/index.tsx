import React, { useCallback, useMemo } from "react";

import { flex, flexColumn, flexValue, marginLeft, marginRight, overflow, textAlign } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { getHoveredStylesForBorderContent } from "./internal/additionalContent";
import { getListItemStyles } from "./internal/libs";
import { useRightContent } from "./internal/useRightContent";
import { makeUniversalIconContent, UniversalSideContentType } from "../../../utils/makeUniversalIconContent";

import { ListItemSize } from "./enum";

export interface ListItemInterface {
  leftContentStyles?: any;
  leftContent?: UniversalSideContentType;
  showLeftContentOnHover?: boolean;
  rightContentStyles?: any;
  rightContent?: UniversalSideContentType;
  showRightContentOnHover?: boolean;
  mainTextStyles?: any;
  styles?: any;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
  size?: ListItemSize;
  titleDots?: boolean;
  showArrowWhenSelected?: boolean;
  children: string | number;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

function ListItem(
  {
    leftContent,
    leftContentStyles: leftContentStylesProp,
    showLeftContentOnHover,
    rightContent,
    rightContentStyles: rightContentStylesProp,
    showRightContentOnHover,
    children,
    disabled,
    heading,
    subTitle,
    size = ListItemSize.MEDIUM,
    titleDots,
    mainTextStyles,
    styles,
    showArrowWhenSelected,
    hoverable,
    selected,
    onClick,
  }: ListItemInterface,
  ref: React.Ref<HTMLElement>,
) {
  const listItemStyles = useMemo(() => getListItemStyles({ size, disabled, selected, hoverable }), [
    size,
    disabled,
    selected,
    hoverable,
  ]);

  const leftContentStyles = useMemo(
    () => getHoveredStylesForBorderContent(".list-item-left-content", showLeftContentOnHover),
    [showLeftContentOnHover],
  );

  const rightContentStyles = useMemo(
    () => getHoveredStylesForBorderContent(".list-item-right-content", showRightContentOnHover),
    [showRightContentOnHover],
  );

  const resultLeftContent = makeUniversalIconContent(leftContent, [marginRight(8), leftContentStylesProp]);
  const resultRightContent = makeUniversalIconContent(
    useRightContent({ selected, rightContent, showArrowWhenSelected }),
    [marginLeft(8), rightContentStylesProp],
  );

  const handleClick = useCallback(() => {
    if (disabled || !onClick) return;
    onClick();
  }, [disabled, onClick]);

  return (
    <Wrapper ref={ref} styles={[listItemStyles, rightContentStyles, leftContentStyles, styles]} onClick={handleClick}>
      {resultLeftContent && <Wrapper className="list-item-left-content">{resultLeftContent}</Wrapper>}
      <Wrapper styles={[flexValue(1), textAlign("left"), flex, flexColumn, overflow("hidden")]}>
        {heading && (
          <Typography type="caption-regular" noWrap>
            {heading}
          </Typography>
        )}
        <Typography dots={titleDots} noWrap styles={mainTextStyles}>
          {children}
        </Typography>
        {subTitle && (
          <Typography color="gray-blue/05" type="caption-regular" noWrap>
            {subTitle}
          </Typography>
        )}
      </Wrapper>
      {resultRightContent && <Wrapper className="list-item-right-content">{resultRightContent}</Wrapper>}
    </Wrapper>
  );
}

export default React.memo(React.forwardRef(ListItem));
