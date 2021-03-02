import React from "react";
import { isString, SuggestInterface } from "@worksolutions/utils";

import { flex, flexColumn, flexValue, marginLeft, marginRight, overflow, textAlign } from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { InputIconProp } from "../Input/InputWrapper";

import { makeIcon } from "../Dropdown/DropdownItem/makeIcon";
import { getItemStyles } from "../Dropdown/DropdownItem/getItemStyles";
import { ListItemSize } from "../Dropdown/DropdownItem/types";

export interface ListItemInterface<ITEM extends string | number> extends SuggestInterface<ITEM> {
  leftContent?: InputIconProp;
  circledLeftContent?: boolean;
  rightContent?: InputIconProp;
  circledRightContent?: boolean;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
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

function ListItem<CODE extends string | number>({
  item: {
    title,
    leftContent,
    code,
    disabled,
    heading,
    rightContent,
    subTitle,
    circledLeftContent,
    circledRightContent,
  },
  itemSize,
  isActiveItem,
  onClick,
  titleDots,
  titleStyles,
  styles,
}: ListItemComponent<CODE>) {
  const enabled = !disabled;
  const leftIcon = makeIcon(leftContent, marginRight(8), circledLeftContent);
  const rightIcon = makeIcon(rightContent, marginLeft(8), circledRightContent);

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
