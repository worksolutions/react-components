import React, { useCallback } from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";
import Icon from "../../Icon";

import { VisibleManagerContext } from "../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

import { makeIcon } from "./makeIcon";
import { getItemStyles } from "./getItemStyles";
import {
  flexValue,
  textAlign,
  flex,
  flexColumn,
  overflow,
  InputIconProp,
  marginRight,
  marginLeft,
  width,
} from "../../../index";

import { ListItemSize } from "./types";

export interface DropdownItemProps {
  children: string | JSX.Element;
  disabled?: boolean;
  itemSize?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp;
  circledLeftContent?: boolean;
  rightContent?: InputIconProp;
  circledRightContent?: boolean;
  heading?: string | number;
  subTitle?: string | number;
  code: string;
}

function DropdownItem({
  disabled,
  itemSize = ListItemSize.SMALL,
  titleDots,
  titleStyles,
  styles,
  children,
  leftContent,
  heading,
  rightContent,
  subTitle,
  circledLeftContent,
  circledRightContent,
  code,
}: DropdownItemProps) {
  const { closeHandler } = React.useContext(VisibleManagerContext);
  const { onChange, selectItem } = React.useContext(DropdownManagerContext);

  const enabled = !disabled;
  const selected = selectItem === code;

  const leftIcon = makeIcon(leftContent, marginRight(8), circledLeftContent);
  const rightIcon = makeIcon(rightContent, marginLeft(8), circledRightContent);

  const onHandlerClick = useCallback(() => {
    if (!onChange && enabled) return;
    onChange && onChange(code);
    closeHandler();
  }, [onChange, closeHandler, selected, disabled]);

  return (
    <Wrapper
      as="button"
      disabled={!!disabled}
      styles={[getItemStyles(itemSize, enabled, selected), styles, width("100%")]}
      onClick={() => enabled && onHandlerClick()}
    >
      {leftIcon}
      <Wrapper styles={[flexValue(1), textAlign("left"), flex, flexColumn, overflow("hidden")]}>
        {heading && <Typography type="caption-regular">{heading}</Typography>}
        <Typography dots={titleDots} styles={titleStyles}>
          {children}
        </Typography>
        {subTitle && (
          <Typography color="gray-blue/05" type="caption-regular">
            {subTitle}
          </Typography>
        )}
      </Wrapper>
      {rightIcon}
      {enabled && selected && <Icon icon="check" />}
    </Wrapper>
  );
}

export default React.memo(DropdownItem);
