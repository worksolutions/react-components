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
import { SideIconType, useRightIcon } from "./internal/useRightIcon";

import { ListItemSize } from "./enum";

export interface ListItemInterface<CODE extends string | number> {
  leftContentStyles?: any;
  leftContent?: SideIconType;
  rightContentStyles?: any;
  rightContent?: SideIconType;
  titleStyles?: any;
  styles?: any;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
  size?: ListItemSize;
  titleDots?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
  showArrowOnSelection?: boolean;
  children: string;
  code: CODE;
  hoverable?: boolean;
  canSelect?: boolean;
  selected?: boolean;
  onBeforeClick?: () => void;
  onAfterClick?: () => void;
  onChange?: (code: CODE) => void;
}

function ListItem<CODE extends string | number>({
  children,
  leftContent,
  leftContentStyles: leftContentStylesProp,
  rightContent,
  rightContentStyles: rightContentStylesProp,
  code,
  disabled,
  heading,
  subTitle,
  size = ListItemSize.MEDIUM,
  titleDots,
  titleStyles,
  styles,
  showIconRightOnHover,
  showIconLeftOnHover,
  showArrowOnSelection = true,
  hoverable = true,
  canSelect = true,
  selected,
  onBeforeClick,
  onAfterClick,
  onChange,
}: ListItemInterface<CODE>) {
  const enabled = !disabled;

  const resultRightContent = useRightIcon({ selected, rightContent, showArrowOnSelection });

  const listItemStyles = useMemo(() => getListItemStyles({ size, enabled, selected, hoverable }), [
    selected,
    enabled,
    hoverable,
    size,
  ]);

  const leftContentStyles = useMemo(() => getHoveredStylesForLeftContent({ disabled, showIconLeftOnHover }), [
    disabled,
    showIconLeftOnHover,
  ]);

  const rightContentStyles = useMemo(
    () => getHoveredStylesForRightContent({ disabled, showArrowOnSelection, showIconRightOnHover }),
    [disabled, showArrowOnSelection, showIconRightOnHover],
  );

  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStylesProp]);
  const rightIcon = makeIcon(resultRightContent, [marginLeft(8), rightContentStylesProp]);

  const handleClick = useCallback(() => {
    if (disabled || !canSelect || !onChange) return;

    onBeforeClick && onBeforeClick();
    onChange(code);
    onAfterClick && onAfterClick();
  }, [canSelect, disabled, onAfterClick, onChange, code, onBeforeClick]);

  return (
    <Wrapper styles={[listItemStyles, rightContentStyles, leftContentStyles, styles]} onClick={handleClick}>
      {leftIcon && <Wrapper className="leftIcon">{leftIcon}</Wrapper>}
      <Wrapper styles={[flexValue(1), textAlign("left"), flex, flexColumn, overflow("hidden")]}>
        {heading && (
          <Typography type="caption-regular" noWrap>
            {heading}
          </Typography>
        )}
        <Typography dots={titleDots} noWrap styles={titleStyles}>
          {children}
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

export default React.memo(ListItem) as <CODE extends string | number>(props: ListItemInterface<CODE>) => JSX.Element;
