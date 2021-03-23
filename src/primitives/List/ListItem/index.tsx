import React, { useCallback, useMemo } from "react";

import { flex, flexColumn, flexValue, marginLeft, marginRight, overflow, textAlign } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import {
  getHoveredStylesForLeftContent,
  getHoveredStylesForRightContent,
  makeIcon,
} from "./internal/additionalContent";
import { getListItemStyles } from "./internal/libs";
import { SideContentType, useRightContent } from "./internal/useRightContent";

import { ListItemSize } from "./enum";

export interface ListItemInterface {
  leftContentStyles?: any;
  leftContent?: SideContentType;
  showLeftContentOnHover?: boolean;
  rightContentStyles?: any;
  rightContent?: SideContentType;
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

function ListItem({
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
  size = ListItemSize.LARGE,
  titleDots,
  mainTextStyles,
  styles,
  showArrowWhenSelected,
  hoverable,
  selected,
  onClick,
}: ListItemInterface) {
  const listItemStyles = useMemo(() => getListItemStyles({ size, disabled, selected, hoverable }), [
    size,
    disabled,
    selected,
    hoverable,
  ]);

  const leftContentStyles = useMemo(() => getHoveredStylesForLeftContent(showLeftContentOnHover), [
    showLeftContentOnHover,
  ]);

  const rightContentStyles = useMemo(() => getHoveredStylesForRightContent(showRightContentOnHover), [
    showRightContentOnHover,
  ]);

  const resultLeftContent = makeIcon(leftContent, [marginRight(8), leftContentStylesProp]);
  const resultRightContent = makeIcon(useRightContent({ selected, rightContent, showArrowWhenSelected }), [
    marginLeft(8),
    rightContentStylesProp,
  ]);

  const handleClick = useCallback(() => {
    if (disabled || !onClick) return;
    onClick();
  }, [disabled, onClick]);

  return (
    <Wrapper styles={[listItemStyles, rightContentStyles, leftContentStyles, styles]} onClick={handleClick}>
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

export default React.memo(ListItem);
