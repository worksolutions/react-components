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
import styled from "styled-components";

export interface ListItemInterface<ITEM extends string | number> extends SuggestInterface<ITEM> {
  leftContent?: InputIconProp | React.ReactNode;
  leftContentStyles?: any;
  rightContent?: InputIconProp | React.ReactNode;
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
          hover([backgroundColor("definitions.ListItem.selected.backgroundColor")]),
          focus(boxShadow([0, 0, 0, 2, "definitions.Button.focus.color"])),
        ]
      : [opacity(0.3)],
    isActiveItem && [
      backgroundColor("definitions.ListItem.selected.backgroundColor"),
      boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)]),
    ],
  ];
}

type ListItemComponent<CODE extends string | number> = {
  item: ListItemInterface<CODE>;
  itemSize: ListItemSize;
  isActiveItem: boolean;
  titleStyles?: any;
  titleDots?: boolean;
  showIconRightHover?: boolean;
  showArrowOnSelection?: boolean;
  showIconLeftHover?: boolean;
  styles?: any;
  onClick?: (id: CODE) => void;
};

function makeIcon(icon?: InputIconProp | React.ReactNode, styles?: any) {
  const content = icon ? isString(icon) ? <Icon icon={icon} /> : icon : null;
  if (!content) return null;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}

const HoverIcons = styled(Wrapper)`
  .rightIcon {
    opacity: ${({ showIconRightHover }) => (showIconRightHover ? 0 : 1)};
  }
  .leftIcon {
    opacity: ${({ showIconLeftHover }) => (showIconLeftHover ? 0 : 1)};
  }

  &:hover {
    .rightIcon {
      opacity: 1;
    }

    .leftIcon {
      opacity: 1;
    }
  }
`;

function ListItem<CODE extends string | number>({
  item: { title, leftContent, leftContentStyles, rightContent, rightContentStyles, code, disabled, heading, subTitle },
  itemSize,
  isActiveItem,
  titleDots,
  titleStyles,
  styles,
  showIconRightHover,
  showIconLeftHover,
  showArrowOnSelection,
  onClick,
}: ListItemComponent<CODE>) {
  const enabled = !disabled;
  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStyles]);
  const rightIcon = makeIcon(rightContent, [marginLeft(8), rightContentStyles]);

  return (
    <HoverIcons
      showIconRightHover={enabled && !showArrowOnSelection ? showIconRightHover : false}
      showIconLeftHover={enabled && showIconLeftHover}
      styles={[getItemStyles(itemSize, enabled, isActiveItem), styles]}
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
    </HoverIcons>
  );
}

export default React.memo(ListItem);
