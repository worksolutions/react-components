import React, { useCallback } from "react";

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

import Wrapper from "../../Wrapper";
import { VisibleManagerContext } from "../VisibleManager/VisibleManagerContext";
import Typography from "../../Typography";
import { makeIcon } from "./makeIcon";
import { getItemStyles } from "./getItemStyles";
import { ListItemSize } from "./types";
import Icon from "../../Icon";

export interface DropdownItemProps {
  children: string | JSX.Element;
  selected: boolean;
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
  onChange?: (code: string) => void;
}

function DropdownItem({
  selected,
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
  onChange,
  code,
}: DropdownItemProps) {
  const { closeHandler } = React.useContext(VisibleManagerContext);

  const enabled = !disabled;
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
