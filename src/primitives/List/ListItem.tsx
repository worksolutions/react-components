import React from "react";
import { isString, SuggestInterface } from "@worksolutions/utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  createAlphaColor,
  disableOutline,
  flex,
  flexColumn,
  flexShrink,
  flexValue,
  focus,
  horizontalPadding,
  hover,
  jc,
  margin,
  marginLeft,
  marginRight,
  minHeight,
  overflow,
  pointer,
  textAlign,
  transition,
} from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";
import { InputIconProp } from "../Input/InputWrapper";

import { duration160 } from "../../constants/durations";

export interface ListItemInterface<ITEM extends string | number> extends SuggestInterface<ITEM> {
  leftContent?: InputIconProp;
  leftContentStyles?: any;
  rightContent?: InputIconProp;
  rightContentStyles?: any;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
}

export enum ListItemSize {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
}

const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 40,
  [ListItemSize.MEDIUM]: 32,
};

export function getItemStyles(itemSize: ListItemSize, enabled: boolean, isActiveItem: boolean) {
  return [
    backgroundColor("transparent"),
    disableOutline,
    borderNone,
    minHeight(heightForItemSize[itemSize]),
    flex,
    margin("2px 1px"),
    ai("center"),
    borderRadius(4),
    horizontalPadding(8),
    transition(`all ${duration160}`),
    enabled && [pointer, hover([backgroundColor("gray-blue/01")]), focus(boxShadow([0, 0, 0, 2, "blue/04"]))],
    isActiveItem && [backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])],
  ];
}

type ListItemComponent<CODE extends string | number> = {
  item: ListItemInterface<CODE>;
  itemSize: ListItemSize;
  isActiveItem: boolean;
  onClick?: (id: CODE) => void;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
};

function makeIcon(icon?: InputIconProp, styles?: any) {
  const content = icon ? isString(icon) ? <Icon icon={icon} /> : icon : null;
  if (!content) return null;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}

function ListItem<CODE extends string | number>({
  item: { title, leftContent, leftContentStyles, rightContent, rightContentStyles, code, disabled, heading, subTitle },
  itemSize,
  isActiveItem,
  onClick,
  titleDots,
  titleStyles,
  styles,
}: ListItemComponent<CODE>) {
  const enabled = !disabled;
  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStyles]);
  const rightIcon = makeIcon(rightContent, [marginLeft(8), rightContentStyles]);

  return (
    <Wrapper
      styles={[getItemStyles(itemSize, enabled, isActiveItem), styles]}
      onClick={() => onClick && enabled && onClick(code)}
    >
      {leftIcon}
      <Wrapper styles={[flexValue(1), textAlign("left"), flex, flexColumn, overflow("hidden")]}>
        {heading && (
          <Typography type="caption-regular" noWrap>
            {heading}
          </Typography>
        )}
        <Typography dots={titleDots} noWrap styles={titleStyles}>
          {title}
        </Typography>
        {subTitle && (
          <Typography color="gray-blue/05" type="caption-regular" noWrap>
            {subTitle}
          </Typography>
        )}
      </Wrapper>
      {rightIcon}
    </Wrapper>
  );
}

export default React.memo(ListItem);
