import React, { useCallback, useMemo } from "react";
import { isString, SuggestInterface } from "@worksolutions/utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  child,
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
  opacity,
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
  SMALL = "SMALL",
}

const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 48,
  [ListItemSize.MEDIUM]: 40,
  [ListItemSize.SMALL]: 32,
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
    enabled
      ? [
          pointer,
          hover([backgroundColor("definitions.ListItem.Selected.backgroundColor")]),
          focus(boxShadow([0, 0, 0, 2, "definitions.Button.focus.color"])),
        ]
      : [opacity(0.3)],
    isActiveItem && [backgroundColor("definitions.ListItem.Selected.backgroundColor")],
  ];
}
interface HoveredStylesRightContentInterface {
  disabled?: boolean;
  showArrowOnSelection?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
}

export function getHoveredStylesRightContent({
  disabled,
  showArrowOnSelection,
  showIconRightOnHover,
}: HoveredStylesRightContentInterface) {
  if (disabled || showArrowOnSelection) return null;
  if (showIconRightOnHover) {
    return [hover(child(opacity(1), ".rightIcon")), child(opacity(0), ".rightIcon")];
  }
  return null;
}

export function getHoveredStylesLeftContent({ disabled, showIconLeftOnHover }: HoveredStylesRightContentInterface) {
  if (disabled) return null;

  if (showIconLeftOnHover) {
    return [hover(child(opacity(1), ".leftIcon")), child(opacity(0), ".leftIcon")];
  }
  return null;
}

type ListItemComponent<CODE extends string | number> = {
  item: ListItemInterface<CODE>;
  isActiveItem: boolean;
  titleStyles?: any;
  styles?: any;
  title?: string;
  leftContent?: InputIconProp;
  rightContent?: InputIconProp;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
  size: ListItemSize;
  code?: CODE;
  titleDots?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
  showArrowOnSelection?: boolean;
  onClick?: (id: CODE) => void;
};

function makeIcon(icon?: InputIconProp | React.ReactNode, styles?: any) {
  const content = icon ? isString(icon) ? <Icon icon={icon} /> : icon : null;
  if (!content) return null;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}

function ListItem<CODE extends string | number>({
  item: { title, leftContent, leftContentStyles, rightContent, rightContentStyles, code, disabled, heading, subTitle },
  size,
  isActiveItem,
  titleDots,
  titleStyles,
  styles,
  showIconRightOnHover,
  showIconLeftOnHover,
  showArrowOnSelection,
  onClick,
}: ListItemComponent<CODE>) {
  const enabled = !disabled;
  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStyles]);
  const rightIcon = makeIcon(rightContent, [marginLeft(8), rightContentStyles]);

  const rightIconHoverStyles = useMemo(
    () => getHoveredStylesRightContent({ disabled, showArrowOnSelection, showIconRightOnHover }),
    [disabled, showArrowOnSelection, showIconRightOnHover, showIconLeftOnHover],
  );
  const leftIconHoverStyles = useMemo(() => getHoveredStylesLeftContent({ disabled, showIconLeftOnHover }), [
    disabled,
    showIconLeftOnHover,
  ]);

  return (
    <Wrapper
      styles={[getItemStyles(size, enabled, isActiveItem), rightIconHoverStyles, leftIconHoverStyles, styles]}
      onClick={() => onClick && enabled && onClick(code)}
    >
      {leftIcon && <Wrapper className="leftIcon">{leftIcon}</Wrapper>}
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
      {rightIcon && <Wrapper className="rightIcon">{rightIcon}</Wrapper>}
    </Wrapper>
  );
}

export default React.memo(ListItem);
